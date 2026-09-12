import "server-only";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { defaultContent } from "@/lib/content";
import { prisma } from "@/lib/db";
import { RESERVED_SLUGS, invitationUrl, slugify } from "@/lib/site";
import { ADMIN_TELEGRAM } from "@/lib/site-content";
import { answerCallback, downloadFile, getFilePath, notifyAdmin, sendAudio, sendMessage } from "@/lib/telegram";
import { getTemplateMeta, templates } from "@/templates/registry";
import { DONE_DATA, SKIP_DATA, type BotData, optionalButtons, stepByKey, steps } from "./flow";

const MAX_GALLERY = 4;

interface TgUser { id: number; username?: string; first_name?: string; last_name?: string }
interface TgPhoto { file_id: string; file_size?: number; width: number }
interface TgMessage { chat: { id: number }; from?: TgUser; text?: string; photo?: TgPhoto[] }
interface TgCallback { id: string; data?: string; from: TgUser; message?: { chat: { id: number } } }
export interface TgUpdate { message?: TgMessage; callback_query?: TgCallback }

const fullName = (u?: TgUser) => [u?.first_name, u?.last_name].filter(Boolean).join(" ") || null;

async function session(chatId: number, u?: TgUser) {
  return prisma.botSession.upsert({
    where: { chatId: BigInt(chatId) },
    update: { username: u?.username ?? undefined, fullName: fullName(u) ?? undefined },
    create: { chatId: BigInt(chatId), username: u?.username ?? null, fullName: fullName(u) },
  });
}

const read = (raw: unknown): BotData => (raw && typeof raw === "object" ? (raw as BotData) : {});

async function save(chatId: number, step: string, data: BotData) {
  await prisma.botSession.update({
    where: { chatId: BigInt(chatId) },
    data: { step, data: data as object },
  });
}

/** Navbatdagi savolni yuborish (yoki tugatish) */
async function askStep(chatId: number, key: string, data: BotData, prefix = ""): Promise<void> {
  const step = stepByKey(key);
  if (!step) return finish(chatId, data);

  const choices = step.choices ? await step.choices() : undefined;
  // tanlov qadami bo'sh bo'lsa (masalan kutubxonada qo'shiq yo'q) - o'tkazib yuboramiz
  if (step.choices && (!choices || choices.length === 0)) {
    const nk = nextKey(key);
    await save(chatId, nk ?? "done", data);
    return nk ? askStep(chatId, nk, data) : finish(chatId, data);
  }

  const n = steps.findIndex((s) => s.key === key) + 1;
  const head = `<i>${n}/${steps.length}</i>\n`;
  const buttons = choices ? [...choices, ...(optionalButtons(step) ?? [])] : optionalButtons(step);
  await sendMessage(chatId, prefix + head + step.ask(data), buttons);
}

function nextKey(key: string): string | null {
  const i = steps.findIndex((s) => s.key === key);
  return i >= 0 && i + 1 < steps.length ? (steps[i + 1].key as string) : null;
}

/** Telegram rasmini Blob'ga ko'chirish */
async function storePhoto(photos: TgPhoto[], folder: string): Promise<string | null> {
  const best = [...photos].sort((a, b) => b.width - a.width)[0];
  if (!best) return null;
  const path = await getFilePath(best.file_id);
  if (!path) return null;
  const buf = await downloadFile(path);
  if (!buf) return null;
  const blob = await put(`bot/${folder}/${nanoid(10)}.jpg`, buf, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

/** Band bo'lmagan subdomen tanlash */
async function uniqueSlug(groom: string, bride: string): Promise<string> {
  const base = slugify(groom, bride) || "taklifnoma";
  for (let i = 0; i < 60; i++) {
    const slug = i === 0 ? base : `${base}-${i + 1}`;
    if (RESERVED_SLUGS.has(slug)) continue;
    const taken = await prisma.invitation.findUnique({ where: { slug }, select: { id: true } });
    if (!taken) return slug;
  }
  return `${base}-${nanoid(4).toLowerCase()}`;
}

/** Javoblardan taklifnoma yasash */
async function createInvitation(chatId: number, d: BotData) {
  const groom = d.groom ?? "";
  const bride = d.bride ?? "";
  const slug = await uniqueSlug(groom, bride);
  const eventAt = new Date(`${d.date}T${d.time}:00+05:00`);

  const content = defaultContent();
  content.blocks.contacts = true;
  content.blocks.gallery = (d.gallery?.length ?? 0) > 0;
  content.blocks.details = false;
  content.blocks.dressCode = false;
  if (d.greeting?.trim()) content.greeting.text = d.greeting.trim();
  content.venues = [
    { title: "Nikoh to'yi", time: d.time ?? "", name: d.venue ?? "", address: d.address ?? "", mapUrl: d.mapUrl ?? "", image: "" },
  ];
  content.contacts = [
    ...(d.phoneGroom ? [{ name: "Kuyov tomon", phone: d.phoneGroom, telegram: "" }] : []),
    ...(d.phoneBride ? [{ name: "Kelin tomon", phone: d.phoneBride, telegram: "" }] : []),
  ];

  const session = await prisma.botSession.findUnique({ where: { chatId: BigInt(chatId) } });

  const inv = await prisma.invitation.create({
    data: {
      slug,
      templateId: d.templateId && getTemplateMeta(d.templateId) ? d.templateId : templates[0].id,
      status: "PENDING",
      source: "BOT",
      locale: "UZ",
      groomName: groom,
      brideName: bride,
      eventAt,
      content: content as object,
      coverImage: d.cover ?? null,
      music: d.music ?? null,
      gallery: d.gallery ?? [],
      clientName: session?.fullName ?? null,
      clientPhone: d.phoneGroom ?? null,
      tgChatId: BigInt(chatId),
      tgUsername: session?.username ?? null,
      submittedAt: new Date(),
    },
  });
  await prisma.botSession.update({ where: { chatId: BigInt(chatId) }, data: { invitationId: inv.id, step: "done" } });
  return inv;
}

/** Suhbat yakuni */
async function finish(chatId: number, d: BotData): Promise<void> {
  const inv = await createInvitation(chatId, d);
  const tpl = getTemplateMeta(inv.templateId)?.name ?? inv.templateId;

  await sendMessage(
    chatId,
    "<b>Rahmat, ma'lumotlar qabul qilindi.</b>\n\n" +
      `Shablon: ${tpl}\nHavola: ${invitationUrl(inv.slug)}\n\n` +
      "Taklifnomangiz tayyorlanmoqda. Tasdiqlangach havola sizga yuboriladi va <b>2 soat</b> ochiq turadi — ko'rib chiqing.\n\n" +
      `To'lovdan keyin havola to'ygacha ishlaydi. To'lov uchun: ${ADMIN_TELEGRAM}\n\n` +
      "Qaytadan boshlash uchun /start",
  );

  await notifyAdmin(
    `<b>Yangi buyurtma (bot)</b>\n\n` +
      `${inv.groomName} &amp; ${inv.brideName}\n` +
      `Shablon: ${tpl}\n` +
      `Sana: ${d.date} ${d.time}\n` +
      `To'yxona: ${d.venue}\n` +
      `Tel: ${d.phoneGroom ?? "-"}\n` +
      (inv.tgUsername ? `Telegram: @${inv.tgUsername}\n` : "") +
      `\nTasdiqlash: https://taklif.site/admin/${inv.id}`,
  );
}

async function restart(chatId: number, u?: TgUser) {
  await session(chatId, u);
  await prisma.botSession.update({ where: { chatId: BigInt(chatId) }, data: { step: steps[0].key as string, data: {}, invitationId: null } });
  await sendMessage(
    chatId,
    "<b>Assalomu alaykum!</b>\n\n" +
      "Men to'y taklifnomasi tayyorlayman. Bir nechta savolga javob bering — 5 daqiqada tayyor bo'ladi.\n\n" +
      "Istalgan paytda qaytadan boshlash uchun /start",
  );
  await askStep(chatId, steps[0].key as string, {});
}

/** Asosiy kirish nuqtasi */
export async function handleUpdate(update: TgUpdate): Promise<void> {
  const cb = update.callback_query;
  const msg = update.message;
  const chatId = cb?.message?.chat.id ?? msg?.chat.id;
  if (!chatId) return;
  const from = cb?.from ?? msg?.from;

  if (msg?.text?.trim().startsWith("/start")) return restart(chatId, from);

  const s = await session(chatId, from);
  const data = read(s.data);
  const key = s.step;

  if (key === "start" || key === "done") {
    if (cb) await answerCallback(cb.id);
    await sendMessage(chatId, "Taklifnoma tayyorlash uchun /start buyrug'ini yuboring.");
    return;
  }

  const step = stepByKey(key);
  if (!step) return restart(chatId, from);

  // ── Tugma bosildi ──────────────────────────────────────────────────
  if (cb) {
    await answerCallback(cb.id);
    const d = cb.data ?? "";
    if (d.startsWith("tpl:")) {
      const id = d.slice(4);
      if (!getTemplateMeta(id)) return;
      data.templateId = id;
      const nk = nextKey(key);
      await save(chatId, nk ?? "done", data);
      await sendMessage(chatId, `Tanlandi: <b>${getTemplateMeta(id)!.name}</b>`);
      return nk ? askStep(chatId, nk, data) : finish(chatId, data);
    }
    if (d.startsWith("play:")) {
      const t = await prisma.track.findUnique({ where: { id: d.slice(5) } });
      if (t) await sendAudio(chatId, t.url, t.title, t.artist || undefined);
      return;
    }
    if (d.startsWith("mus:")) {
      const t = await prisma.track.findUnique({ where: { id: d.slice(4) } });
      if (!t) return;
      data.music = t.url;
      const nk = nextKey(key);
      await save(chatId, nk ?? "done", data);
      await sendMessage(chatId, `Tanlandi: <b>${t.title}</b>${t.artist ? ` — ${t.artist}` : ""}`);
      return nk ? askStep(chatId, nk, data) : finish(chatId, data);
    }
    if (d === SKIP_DATA || d === DONE_DATA) {
      const nk = nextKey(key);
      await save(chatId, nk ?? "done", data);
      return nk ? askStep(chatId, nk, data) : finish(chatId, data);
    }
    return;
  }

  // ── Rasm yuborildi ─────────────────────────────────────────────────
  if (msg?.photo?.length) {
    if (step.kind !== "photo") {
      await sendMessage(chatId, "Hozir rasm kerak emas. Savolga matn bilan javob bering.");
      return;
    }
    const url = await storePhoto(msg.photo, String(chatId));
    if (!url) {
      await sendMessage(chatId, "Rasmni yuklab bo'lmadi. Qaytadan yuboring yoki o'tkazib yuboring.", optionalButtons(step));
      return;
    }
    if (step.multi) {
      const list = [...(data.gallery ?? []), url].slice(0, MAX_GALLERY);
      data.gallery = list;
      await save(chatId, key, data);
      if (list.length >= MAX_GALLERY) {
        const nk = nextKey(key);
        await save(chatId, nk ?? "done", data);
        await sendMessage(chatId, `${MAX_GALLERY} ta rasm qabul qilindi.`);
        return nk ? askStep(chatId, nk, data) : finish(chatId, data);
      }
      await sendMessage(chatId, `Qabul qilindi (${list.length}/${MAX_GALLERY}). Yana yuboring yoki «Tayyor».`, optionalButtons(step));
      return;
    }
    (data as Record<string, unknown>)[step.key] = url;
    const nk = nextKey(key);
    await save(chatId, nk ?? "done", data);
    await sendMessage(chatId, "Rasm qabul qilindi.");
    return nk ? askStep(chatId, nk, data) : finish(chatId, data);
  }

  // ── Matn yuborildi ─────────────────────────────────────────────────
  const text = msg?.text?.trim();
  if (!text) {
    await askStep(chatId, key, data, "Iltimos, javob yuboring.\n\n");
    return;
  }
  if (step.kind === "choice") {
    await askStep(chatId, key, data, "Quyidagi tugmalardan birini tanlang.\n\n");
    return;
  }
  if (step.kind === "photo") {
    await sendMessage(chatId, "Rasm yuboring yoki tugmani bosing.", optionalButtons(step));
    return;
  }
  const err = step.validate?.(text);
  if (err) {
    await sendMessage(chatId, err, optionalButtons(step));
    return;
  }
  (data as Record<string, unknown>)[step.key] = step.clean ? step.clean(text) : text;
  const nk = nextKey(key);
  await save(chatId, nk ?? "done", data);
  return nk ? askStep(chatId, nk, data) : finish(chatId, data);
}
