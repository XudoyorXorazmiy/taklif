"use client";

import { useState, useTransition } from "react";
import { uploadToBlob } from "./useUpload";
import { useRouter } from "next/navigation";
import { saveTemplate } from "@/app/admin/actions";
import type { TemplateInput } from "@/lib/validators";

const inp = "w-full rounded-lg border px-3 py-2 text-sm";
const lbl = "block text-xs font-medium text-neutral-600 mb-1";
const card = "rounded-2xl border bg-white p-5";

const categories = [
  ["classic", "Klassik"],
  ["floral", "Gulli"],
  ["dark", "Qorong'i"],
  ["national", "Milliy"],
  ["minimal", "Minimal"],
  ["luxury", "Hashamatli"],
];

function Upload({ folder, onDone, label }: { folder: string; onDone: (url: string) => void; label: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-50">
      {busy ? "Yuklanmoqda…" : label}
      <input
        type="file"
        accept="image/*"
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

export function TemplateForm({ id, initial }: { id: string; initial: TemplateInput }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [v, setV] = useState<TemplateInput>(initial);
  const set = <K extends keyof TemplateInput>(k: K, val: TemplateInput[K]) => setV((s) => ({ ...s, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    start(async () => {
      const r = await saveTemplate(id, v);
      if (r.error) return setError(r.error);
      setSaved(true);
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-5">
        <section className={card}>
          <h2 className="text-base font-semibold">Katalog kartasi</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={lbl}>Nomi</span>
              <input className={inp} value={v.name} onChange={(e) => set("name", e.target.value)} required />
            </label>
            <label className="block">
              <span className={lbl}>Kategoriya</span>
              <select className={inp} value={v.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map(([k, l]) => (
                  <option key={k} value={k}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={lbl}>Narx (so'm, bo'sh bo'lsa "narx so'rang")</span>
              <input type="number" className={inp} value={v.price ?? ""} onChange={(e) => set("price", e.target.value ? Number(e.target.value) : null)} />
            </label>
            <label className="block">
              <span className={lbl}>Belgi (Yangi, Mashhur…)</span>
              <input className={inp} value={v.badge ?? ""} onChange={(e) => set("badge", e.target.value || null)} />
            </label>
            <label className="block sm:col-span-2">
              <span className={lbl}>Qisqa tavsif (kartada)</span>
              <input className={inp} value={v.description} onChange={(e) => set("description", e.target.value)} maxLength={300} />
            </label>
            <div className="sm:col-span-2">
              <span className={lbl}>Katalog rasmi (9:16, telefon ekrani)</span>
              <div className="flex items-center gap-3">
                {v.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail} alt="" className="h-24 w-14 rounded-lg object-cover" />
                )}
                <Upload folder={`templates/${id}`} label="Rasm yuklash" onDone={(u) => set("thumbnail", u)} />
                {v.thumbnail && (
                  <button type="button" className="text-sm text-red-600" onClick={() => set("thumbnail", null)}>
                    olib tashlash
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className={card}>
          <h2 className="text-base font-semibold">Ichki sahifa</h2>
          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className={lbl}>To'liq tavsif</span>
              <textarea rows={5} className={inp} value={v.body} onChange={(e) => set("body", e.target.value)} />
            </label>
            <label className="block">
              <span className={lbl}>Nimalar kiradi (har qatorga bitta)</span>
              <textarea
                rows={6}
                className={inp}
                value={v.features.join("\n")}
                onChange={(e) =>
                  set(
                    "features",
                    e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  )
                }
                placeholder={"Konvert ochilish animatsiyasi\nFon musiqasi\nRSVP anketasi\nSanoq va kalendar\nXarita havolasi"}
              />
            </label>
            <div>
              <div className="flex items-center justify-between">
                <span className={lbl}>Ekran rasmlari (ichki sahifa galereyasi)</span>
                <Upload folder={`templates/${id}`} label="+ Rasm" onDone={(u) => set("screens", [...v.screens, u])} />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {v.screens.map((s, i) => (
                  <div key={s} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s} alt="" className="h-28 w-16 rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => set("screens", v.screens.filter((_, j) => j !== i))}
                      className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-xs text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="grid content-start gap-5">
        <section className={card}>
          <h2 className="text-base font-semibold">Ko'rinish</h2>
          <div className="mt-3 grid gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={v.published} onChange={(e) => set("published", e.target.checked)} />
              Katalogda ko'rsatish
            </label>
            <label className="block">
              <span className={lbl}>Tartib raqami (kichigi oldin)</span>
              <input type="number" className={inp} value={v.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value) || 0)} />
            </label>
          </div>
        </section>
        <div className="sticky bottom-4">
          {error && <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {saved && <p className="mb-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Saqlandi</p>}
          <button disabled={pending} className="w-full rounded-xl bg-neutral-900 py-3 text-white shadow-lg disabled:opacity-60">
            {pending ? "Saqlanmoqda…" : "Saqlash"}
          </button>
        </div>
      </aside>
    </form>
  );
}
