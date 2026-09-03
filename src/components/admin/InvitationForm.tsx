"use client";

import { useState, useTransition } from "react";
import { uploadToBlob } from "./useUpload";
import { useRouter } from "next/navigation";
import { saveInvitation } from "@/app/admin/actions";
import type { InvitationInput } from "@/lib/validators";
import { defaultContent, type InvitationContent } from "@/lib/content";
import { slugify } from "@/lib/site";
import { templates } from "@/templates/registry";

type Props = { id?: string; initial?: InvitationInput };

const blockLabels: Record<keyof InvitationContent["blocks"], string> = {
  greeting: "Salomlashuv",
  date: "Sana va kalendar",
  countdown: "Sanoq (countdown)",
  schedule: "Kun dasturi",
  venues: "Manzil",
  details: "Muhim ma'lumot",
  dressCode: "Kiyim tarzi",
  gallery: "Galereya",
  rsvp: "RSVP anketasi",
  contacts: "Kontaktlar",
  closing: "Yakuniy so'z",
};

const inp = "w-full rounded-lg border px-3 py-2 text-sm";
const lbl = "block text-xs font-medium text-neutral-600 mb-1";
const card = "rounded-2xl border bg-white p-5";
const h2 = "text-base font-semibold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      {children}
    </label>
  );
}

function Upload({ folder, onDone, accept, label }: { folder: string; onDone: (url: string) => void; accept: string; label: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-50">
      {busy ? "Yuklanmoqda…" : label}
      <input
        type="file"
        accept={accept}
        className="hidden"
        disabled={busy}
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setBusy(true);
          try {
            onDone(await uploadToBlob(f, folder));
          } catch (err) {
            alert((err as Error).message || "Yuklashda xatolik");
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
    </label>
  );
}

export function InvitationForm({ id, initial }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!initial);

  const [v, setV] = useState<InvitationInput>(
    initial ?? {
      slug: "",
      templateId: templates[0].id,
      locale: "UZ",
      groomName: "",
      brideName: "",
      eventAt: "",
      coverImage: null,
      gallery: [],
      music: null,
      ogImage: null,
      clientName: null,
      clientPhone: null,
      price: null,
      paid: false,
      note: null,
      expiresAt: null,
      content: defaultContent(),
    },
  );

  const set = <K extends keyof InvitationInput>(k: K, val: InvitationInput[K]) => setV((s) => ({ ...s, [k]: val }));
  const setC = <K extends keyof InvitationContent>(k: K, val: InvitationContent[K]) =>
    setV((s) => ({ ...s, content: { ...s.content, [k]: val } }));
  const c = v.content;

  const onNames = (groom: string, bride: string) => {
    setV((s) => ({
      ...s,
      groomName: groom,
      brideName: bride,
      slug: slugTouched ? s.slug : slugify(groom, bride),
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    start(async () => {
      const r = await saveInvitation(id ?? null, v);
      if (r.error) return setError(r.error);
      router.push(`/admin/${r.id}`);
      router.refresh();
    });
  };

  // ── Ro'yxat yordamchilari ────────────────────────────────────────────
  const listEdit = <T,>(list: T[], i: number, patch: Partial<T>) => list.map((x, j) => (j === i ? { ...x, ...patch } : x));
  const listRemove = <T,>(list: T[], i: number) => list.filter((_, j) => j !== i);

  return (
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-5">
        {/* Asosiy */}
        <section className={card}>
          <h2 className={h2}>Asosiy</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Kuyov ismi">
              <input className={inp} value={v.groomName} onChange={(e) => onNames(e.target.value, v.brideName)} />
            </Field>
            <Field label="Kelin ismi">
              <input className={inp} value={v.brideName} onChange={(e) => onNames(v.groomName, e.target.value)} />
            </Field>
            <Field label="Ismlar o'rniga matn (masalan: Ehtirom ila). To'ldirilsa muqovada ismlar chiqmaydi">
              <input
                className={inp}
                value={c.hero.title}
                placeholder="Ehtirom ila"
                onChange={(e) => {
                  const title = e.target.value;
                  setV((s) => ({
                    ...s,
                    content: { ...s.content, hero: { ...s.content.hero, title } },
                    slug: slugTouched || s.groomName || s.brideName ? s.slug : slugify(title),
                  }));
                }}
              />
            </Field>
            <Field label="Konvert muhri va monogram harflari (masalan: N&M yoki ♥). Bo'sh bo'lsa ismlarning bosh harfi">
              <input className={inp} value={c.hero.initials} placeholder="N&M" onChange={(e) => setC("hero", { ...c.hero, initials: e.target.value })} />
            </Field>
            <Field label="Subdomen">
              <div className="flex items-center gap-1">
                <input
                  className={inp}
                  value={v.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value.toLowerCase());
                  }}
                  pattern="[a-z0-9][a-z0-9-]{1,38}[a-z0-9]"
                  required
                />
                <span className="whitespace-nowrap text-sm text-neutral-500">.taklif.site</span>
              </div>
              {id && <span className="mt-1 block text-[11px] text-neutral-500">O'zgartirsangiz eski havola ishlamay qoladi.</span>}
            </Field>
            <div className="grid grid-cols-[1fr_120px] gap-2">
              <Field label="To'y sanasi">
                <input
                  type="date"
                  className={inp}
                  value={v.eventAt.slice(0, 10)}
                  onChange={(e) => set("eventAt", `${e.target.value}T${v.eventAt.slice(11, 16) || "00:00"}`)}
                  required
                />
              </Field>
              <Field label="Vaqt (ixtiyoriy)">
                <input
                  type="time"
                  className={inp}
                  value={c.hero.showTime ? v.eventAt.slice(11, 16) : ""}
                  onChange={(e) => {
                    const tm = e.target.value;
                    setV((s) => ({
                      ...s,
                      eventAt: `${s.eventAt.slice(0, 10)}T${tm || "00:00"}`,
                      content: { ...s.content, hero: { ...s.content.hero, showTime: !!tm } },
                    }));
                  }}
                />
              </Field>
            </div>
            <Field label="Shablon">
              <select className={inp} value={v.templateId} onChange={(e) => set("templateId", e.target.value)}>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Til">
              <select className={inp} value={v.locale} onChange={(e) => set("locale", e.target.value as "UZ" | "RU")}>
                <option value="UZ">O'zbek (lotin)</option>
                <option value="RU">Русский</option>
              </select>
            </Field>
          </div>
        </section>

        {/* Muqova */}
        <section className={card}>
          <h2 className={h2}>Muqova</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Kichik yozuv (masalan: TO'Y KUNI)">
              <input className={inp} value={c.hero.eyebrow} onChange={(e) => setC("hero", { ...c.hero, eyebrow: e.target.value })} />
            </Field>
            <Field label="Shior (masalan: Ikki qalb · Bir taqdir)">
              <input className={inp} value={c.hero.tagline} onChange={(e) => setC("hero", { ...c.hero, tagline: e.target.value })} />
            </Field>
            <div>
              <span className={lbl}>Asosiy rasm</span>
              <div className="flex items-center gap-3">
                {v.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.coverImage} alt="" className="h-16 w-12 rounded object-cover" />
                )}
                <Upload folder={v.slug || "cover"} accept="image/*" label="Rasm yuklash" onDone={(u) => set("coverImage", u)} />
                {v.coverImage && (
                  <button type="button" className="text-sm text-red-600" onClick={() => set("coverImage", null)}>
                    olib tashlash
                  </button>
                )}
              </div>
            </div>
            <div>
              <span className={lbl}>Fon musiqasi (mp3)</span>
              <div className="flex items-center gap-3">
                {v.music && <audio src={v.music} controls className="h-8 w-44" />}
                <Upload folder={v.slug || "music"} accept="audio/*" label="Musiqa yuklash" onDone={(u) => set("music", u)} />
                {v.music && (
                  <button type="button" className="text-sm text-red-600" onClick={() => set("music", null)}>
                    olib tashlash
                  </button>
                )}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={c.hero.intro} onChange={(e) => setC("hero", { ...c.hero, intro: e.target.checked })} />
              Ochilish (intro) ekranini ko'rsatish
            </label>
          </div>
        </section>

        {/* Salomlashuv */}
        <section className={card}>
          <h2 className={h2}>Salomlashuv</h2>
          <div className="mt-4 grid gap-4">
            <Field label="Sarlavha">
              <input className={inp} value={c.greeting.title} onChange={(e) => setC("greeting", { ...c.greeting, title: e.target.value })} />
            </Field>
            <Field label="Matn">
              <textarea rows={4} className={inp} value={c.greeting.text} onChange={(e) => setC("greeting", { ...c.greeting, text: e.target.value })} />
            </Field>
          </div>
        </section>

        {/* Manzil */}
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className={h2}>Manzil (tadbirlar)</h2>
            <button
              type="button"
              className="text-sm text-blue-600"
              onClick={() => setC("venues", [...c.venues, { title: "", time: "", name: "", address: "", mapUrl: "", image: "" }])}
            >
              + Tadbir qo'shish
            </button>
          </div>
          <p className="mt-1 text-xs text-neutral-500">Bir nechta tadbir bo'lsa (masalan, Kelin salom va To'y), har birini alohida qo'shing.</p>
          {c.venues.map((ven, i) => (
            <div key={i} className="mt-4 grid gap-3 rounded-xl border bg-neutral-50 p-4 sm:grid-cols-2">
              <Field label="Tadbir nomi (ixtiyoriy)">
                <input className={inp} value={ven.title} onChange={(e) => setC("venues", listEdit(c.venues, i, { title: e.target.value }))} />
              </Field>
              <Field label="Vaqt (ixtiyoriy)">
                <input className={inp} value={ven.time} placeholder="18:00" onChange={(e) => setC("venues", listEdit(c.venues, i, { time: e.target.value }))} />
              </Field>
              <Field label="To'yxona nomi">
                <input className={inp} value={ven.name} onChange={(e) => setC("venues", listEdit(c.venues, i, { name: e.target.value }))} />
              </Field>
              <Field label="Manzil">
                <input className={inp} value={ven.address} onChange={(e) => setC("venues", listEdit(c.venues, i, { address: e.target.value }))} />
              </Field>
              <Field label="Xarita havolasi (Yandex/Google)">
                <input className={inp} value={ven.mapUrl} onChange={(e) => setC("venues", listEdit(c.venues, i, { mapUrl: e.target.value }))} />
              </Field>
              <div>
                <span className={lbl}>To'yxona rasmi</span>
                <div className="flex items-center gap-2">
                  {ven.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ven.image} alt="" className="h-10 w-16 rounded object-cover" />
                  )}
                  <Upload folder={v.slug || "venue"} accept="image/*" label="Yuklash" onDone={(u) => setC("venues", listEdit(c.venues, i, { image: u }))} />
                </div>
              </div>
              <button type="button" className="text-left text-sm text-red-600" onClick={() => setC("venues", listRemove(c.venues, i))}>
                Tadbirni o'chirish
              </button>
            </div>
          ))}
        </section>

        {/* Dastur */}
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className={h2}>Kun dasturi</h2>
            <button type="button" className="text-sm text-blue-600" onClick={() => setC("schedule", [...c.schedule, { time: "", title: "", note: "" }])}>
              + Band qo'shish
            </button>
          </div>
          {c.schedule.map((s, i) => (
            <div key={i} className="mt-3 grid grid-cols-[80px_1fr_1fr_auto] items-center gap-2">
              <input className={inp} placeholder="18:00" value={s.time} onChange={(e) => setC("schedule", listEdit(c.schedule, i, { time: e.target.value }))} />
              <input className={inp} placeholder="Nikoh marosimi" value={s.title} onChange={(e) => setC("schedule", listEdit(c.schedule, i, { title: e.target.value }))} />
              <input className={inp} placeholder="Izoh (ixtiyoriy)" value={s.note} onChange={(e) => setC("schedule", listEdit(c.schedule, i, { note: e.target.value }))} />
              <button type="button" className="px-2 text-red-600" onClick={() => setC("schedule", listRemove(c.schedule, i))}>
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Tafsilotlar */}
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className={h2}>Muhim ma'lumot</h2>
            <button type="button" className="text-sm text-blue-600" onClick={() => setC("details", [...c.details, { title: "", text: "" }])}>
              + Qo'shish
            </button>
          </div>
          <p className="mt-1 text-xs text-neutral-500">Sovg'a, gul, bolalar, transport haqidagi iltimoslar.</p>
          {c.details.map((d, i) => (
            <div key={i} className="mt-3 grid grid-cols-[1fr_2fr_auto] items-start gap-2">
              <input className={inp} placeholder="Sarlavha" value={d.title} onChange={(e) => setC("details", listEdit(c.details, i, { title: e.target.value }))} />
              <textarea rows={2} className={inp} placeholder="Matn" value={d.text} onChange={(e) => setC("details", listEdit(c.details, i, { text: e.target.value }))} />
              <button type="button" className="px-2 text-red-600" onClick={() => setC("details", listRemove(c.details, i))}>
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Dress-kod */}
        <section className={card}>
          <h2 className={h2}>Kiyim tarzi</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Matn">
              <input className={inp} value={c.dressCode.text} onChange={(e) => setC("dressCode", { ...c.dressCode, text: e.target.value })} />
            </Field>
            <Field label="Ranglar (HEX, vergul bilan: #1a1a1a, #c9a961)">
              <input
                className={inp}
                value={c.dressCode.colors.join(", ")}
                onChange={(e) =>
                  setC("dressCode", {
                    ...c.dressCode,
                    colors: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
            <div className="flex gap-2">
              {c.dressCode.colors.map((col) => (
                <span key={col} className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ background: col }} />
              ))}
            </div>
          </div>
        </section>

        {/* Galereya */}
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className={h2}>Galereya</h2>
            <Upload folder={v.slug || "gallery"} accept="image/*" label="+ Rasm yuklash" onDone={(u) => set("gallery", [...v.gallery, u])} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {v.gallery.map((g, i) => (
              <div key={g} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => set("gallery", listRemove(v.gallery, i))}
                  className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section className={card}>
          <h2 className={h2}>RSVP anketasi</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Muddat yozuvi (masalan: 1-oktabrgacha javob bering)">
              <input className={inp} value={c.rsvp.deadline} onChange={(e) => setC("rsvp", { ...c.rsvp, deadline: e.target.value })} />
            </Field>
            <Field label="Rahmat matni">
              <input className={inp} value={c.rsvp.thanks} onChange={(e) => setC("rsvp", { ...c.rsvp, thanks: e.target.value })} />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={c.rsvp.askGuests} onChange={(e) => setC("rsvp", { ...c.rsvp, askGuests: e.target.checked })} />
              Necha kishi kelishini so'rash
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={c.rsvp.askNote} onChange={(e) => setC("rsvp", { ...c.rsvp, askNote: e.target.checked })} />
              Izoh maydonini ko'rsatish
            </label>
          </div>
        </section>

        {/* Kontaktlar */}
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className={h2}>Kontaktlar</h2>
            <button type="button" className="text-sm text-blue-600" onClick={() => setC("contacts", [...c.contacts, { name: "", phone: "", telegram: "" }])}>
              + Qo'shish
            </button>
          </div>
          {c.contacts.map((k, i) => (
            <div key={i} className="mt-3 grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-2">
              <input className={inp} placeholder="Kuyov tomon" value={k.name} onChange={(e) => setC("contacts", listEdit(c.contacts, i, { name: e.target.value }))} />
              <input className={inp} placeholder="+998..." value={k.phone} onChange={(e) => setC("contacts", listEdit(c.contacts, i, { phone: e.target.value }))} />
              <input className={inp} placeholder="@telegram" value={k.telegram} onChange={(e) => setC("contacts", listEdit(c.contacts, i, { telegram: e.target.value }))} />
              <button type="button" className="px-2 text-red-600" onClick={() => setC("contacts", listRemove(c.contacts, i))}>
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Yakun */}
        <section className={card}>
          <h2 className={h2}>Yakuniy so'z</h2>
          <div className="mt-4 grid gap-4">
            <Field label="Matn">
              <input className={inp} value={c.closing.text} onChange={(e) => setC("closing", { ...c.closing, text: e.target.value })} />
            </Field>
            <Field label="Imzo (ixtiyoriy, bir necha qator). Bo'sh bo'lsa imzo qatori umuman chiqmaydi">
              <textarea rows={2} className={inp} value={c.closing.signature} onChange={(e) => setC("closing", { ...c.closing, signature: e.target.value })} placeholder={"Ehtirom ila,\nOta-onalar"} />
            </Field>
          </div>
        </section>

        {/* Blok sarlavhalari */}
        <section className={card}>
          <h2 className={h2}>Blok sarlavhalari</h2>
          <p className="mt-1 text-xs text-neutral-500">Bo'sh qoldirsangiz standart yozuv chiqadi. Yashirish uchun «-» yozing.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["dateTitle", "Sana bloki", "To'y sanasi"],
                ["scheduleEyebrow", "Dastur — kichik yozuv", "Marosim"],
                ["scheduleTitle", "Dastur — sarlavha", "Kun dasturi"],
                ["venueEyebrow", "Manzil — kichik yozuv", "Joy"],
                ["venueTitle", "Manzil — sarlavha", "Manzil"],
                ["detailsTitle", "Muhim ma'lumot", "Muhim ma'lumot"],
                ["dressCodeTitle", "Kiyim tarzi", "Kiyim tarzi"],
                ["galleryEyebrow", "Galereya — kichik yozuv", "Lahzalar"],
                ["galleryTitle", "Galereya — sarlavha", "Galereya"],
                ["rsvpTitle", "RSVP sarlavha", "Qatnashishingizni tasdiqlang"],
                ["contactsTitle", "Kontaktlar", "Kontaktlar"],
              ] as [keyof InvitationContent["labels"], string, string][]
            ).map(([k, label, ph]) => (
              <Field key={k} label={label}>
                <input className={inp} value={c.labels[k]} placeholder={ph} onChange={(e) => setC("labels", { ...c.labels, [k]: e.target.value })} />
              </Field>
            ))}
          </div>
        </section>
      </div>

      {/* O'ng ustun */}
      <aside className="grid content-start gap-5">
        <section className={card}>
          <h2 className={h2}>Bloklar</h2>
          <div className="mt-3 grid gap-2">
            {(Object.keys(blockLabels) as (keyof InvitationContent["blocks"])[]).map((k) => (
              <label key={k} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={c.blocks[k]} onChange={(e) => setC("blocks", { ...c.blocks, [k]: e.target.checked })} />
                {blockLabels[k]}
              </label>
            ))}
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}>Mijoz va to'lov</h2>
          <div className="mt-3 grid gap-3">
            <Field label="Mijoz ismi">
              <input className={inp} value={v.clientName ?? ""} onChange={(e) => set("clientName", e.target.value || null)} />
            </Field>
            <Field label="Telefon">
              <input className={inp} value={v.clientPhone ?? ""} onChange={(e) => set("clientPhone", e.target.value || null)} />
            </Field>
            <Field label="Narx (so'm)">
              <input
                type="number"
                className={inp}
                value={v.price ?? ""}
                onChange={(e) => set("price", e.target.value ? Number(e.target.value) : null)}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={v.paid} onChange={(e) => set("paid", e.target.checked)} />
              To'langan
            </label>
            <Field label="Muddati (shu sanadan keyin yopiladi)">
              <input type="datetime-local" className={inp} value={v.expiresAt ?? ""} onChange={(e) => set("expiresAt", e.target.value || null)} />
            </Field>
            <Field label="Ichki izoh">
              <textarea rows={3} className={inp} value={v.note ?? ""} onChange={(e) => set("note", e.target.value || null)} />
            </Field>
          </div>
        </section>

        <div className="sticky bottom-4">
          {error && <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button disabled={pending} className="w-full rounded-xl bg-neutral-900 py-3 text-white shadow-lg disabled:opacity-60">
            {pending ? "Saqlanmoqda…" : id ? "Saqlash" : "Yaratish"}
          </button>
        </div>
      </aside>
    </form>
  );
}
