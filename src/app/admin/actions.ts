"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, loginAdmin, logoutAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { invitationInput, templateInput } from "@/lib/validators";
import { getTemplateMeta } from "@/templates/registry";

export async function loginAction(_: unknown, form: FormData) {
  const ok = await loginAdmin(String(form.get("password") ?? ""));
  if (!ok) return { error: "Parol noto'g'ri" };
  redirect("/admin");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}


function toDate(local: string): Date {
  // Admin Toshkent vaqtida kiritadi (UTC+5)
  return new Date(`${local}:00+05:00`);
}

export async function saveInvitation(id: string | null, raw: unknown): Promise<{ id?: string; error?: string }> {
  await requireAdmin();
  const parsed = invitationInput.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Xato" };
  const d = parsed.data;

  const dup = await prisma.invitation.findUnique({ where: { slug: d.slug }, select: { id: true } });
  if (dup && dup.id !== id) return { error: "Bu subdomen allaqachon band" };

  const data = {
    slug: d.slug,
    templateId: d.templateId,
    locale: d.locale,
    groomName: d.groomName,
    brideName: d.brideName,
    eventAt: toDate(d.eventAt),
    coverImage: d.coverImage || null,
    gallery: d.gallery,
    music: d.music || null,
    ogImage: d.ogImage || null,
    clientName: d.clientName || null,
    clientPhone: d.clientPhone || null,
    price: d.price,
    paid: d.paid,
    note: d.note || null,
    expiresAt: d.expiresAt ? toDate(d.expiresAt) : null,
    content: d.content,
  };

  const inv = id
    ? await prisma.invitation.update({ where: { id }, data })
    : await prisma.invitation.create({ data });

  revalidatePath("/admin");
  revalidatePath(`/s/${inv.slug}`);
  return { id: inv.id };
}

export async function setStatus(id: string, status: "DRAFT" | "PUBLISHED" | "ARCHIVED") {
  await requireAdmin();
  const inv = await prisma.invitation.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  revalidatePath(`/s/${inv.slug}`);
}

export async function deleteInvitation(id: string) {
  await requireAdmin();
  await prisma.invitation.delete({ where: { id } });
  revalidatePath("/admin");
  redirect("/admin");
}

// ─── Shablon katalogi ─────────────────────────────────────────────────────

export async function saveTemplate(id: string, raw: unknown): Promise<{ ok?: true; error?: string }> {
  await requireAdmin();
  if (!getTemplateMeta(id)) return { error: "Bunday shablon kodda yo'q" };
  const parsed = templateInput.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Xato" };
  const d = parsed.data;
  await prisma.template.upsert({
    where: { id },
    update: d,
    create: { id, ...d },
  });
  revalidatePath("/");
  revalidatePath("/admin/templates");
  revalidatePath(`/shablonlar/${id}`);
  return { ok: true };
}

export async function setTemplatePublished(id: string, published: boolean) {
  await requireAdmin();
  const meta = getTemplateMeta(id);
  if (!meta) return;
  await prisma.template.upsert({
    where: { id },
    update: { published },
    create: { id, name: meta.name, description: meta.description, category: meta.category, published },
  });
  revalidatePath("/");
  revalidatePath("/admin/templates");
}

/** Taklifnoma nusxasi: DRAFT holatda, yangi subdomen (slug-2, slug-3 …), RSVP va ko'rishlarsiz */
export async function duplicateInvitation(id: string) {
  await requireAdmin();
  const src = await prisma.invitation.findUnique({ where: { id } });
  if (!src) return;
  const base = src.slug.replace(/-\d+$/, "").slice(0, 36);
  let slug = "";
  for (let n = 2; n < 100; n++) {
    const candidate = `${base}-${n}`;
    if (!(await prisma.invitation.findUnique({ where: { slug: candidate }, select: { id: true } }))) {
      slug = candidate;
      break;
    }
  }
  if (!slug) return;
  const copy = await prisma.invitation.create({
    data: {
      slug,
      templateId: src.templateId,
      status: "DRAFT",
      locale: src.locale,
      groomName: src.groomName,
      brideName: src.brideName,
      eventAt: src.eventAt,
      content: src.content as object,
      coverImage: src.coverImage,
      gallery: src.gallery,
      music: src.music,
      ogImage: src.ogImage,
      clientName: src.clientName,
      clientPhone: src.clientPhone,
      price: src.price,
      paid: false,
      note: src.note,
      expiresAt: src.expiresAt,
    },
  });
  revalidatePath("/admin");
  redirect(`/admin/${copy.id}`);
}
