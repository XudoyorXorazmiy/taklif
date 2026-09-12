"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTrack, saveTrack, setTrackPublished } from "@/app/admin/actions";
import type { TrackItem } from "@/lib/tracks";
import { uploadToBlob } from "./useUpload";

const inp = "w-full rounded-lg border px-3 py-2 text-sm";
const btn = "rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50";

function Row({ t }: { t: TrackItem }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(t.title);
  const [artist, setArtist] = useState(t.artist);
  const [sortOrder, setSortOrder] = useState(t.sortOrder);
  const dirty = title !== t.title || artist !== t.artist || sortOrder !== t.sortOrder;

  return (
    <tr className="border-t align-top">
      <td className="px-4 py-3">
        <input className={`${inp} mb-1`} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={inp} value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Ijrochi" />
      </td>
      <td className="px-4 py-3">
        <audio src={t.url} controls preload="none" className="h-9 w-56" />
      </td>
      <td className="px-4 py-3">
        <input
          type="number"
          className={`${inp} w-20`}
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
        />
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => setTrackPublished(t.id, !t.published))}
          className={`rounded-full px-2.5 py-0.5 text-xs disabled:opacity-50 ${t.published ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}
        >
          {t.published ? "Ko'rinadi" : "Yashirin"}
        </button>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          {dirty && (
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  await saveTrack(t.id, { title, artist, url: t.url, published: t.published, sortOrder });
                  router.refresh();
                })
              }
              className={`${btn} border-neutral-900 bg-neutral-900 text-white`}
            >
              Saqlash
            </button>
          )}
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm(`"${t.title}" o'chirilsinmi? Bu qo'shiq tanlangan taklifnomalarda musiqa yo'qoladi.`))
                start(() => deleteTrack(t.id));
            }}
            className={`${btn} border-red-200 text-red-600`}
          >
            O'chirish
          </button>
        </div>
      </td>
    </tr>
  );
}

export function MusicManager({ tracks }: { tracks: TrackItem[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <>
      <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-white p-5">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white">
          {busy ? "Yuklanmoqda…" : "+ Qo'shiq yuklash"}
          <input
            type="file"
            accept="audio/*,.mp3,.m4a,.aac,.ogg,.wav"
            className="hidden"
            disabled={busy}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              setErr(null);
              try {
                const url = await uploadToBlob(f, "music");
                const title = f.name.replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ").trim();
                const r = await saveTrack(null, { title, artist: "", url, published: true, sortOrder: tracks.length });
                if (r.error) setErr(r.error);
                else router.refresh();
              } catch (e2) {
                setErr((e2 as Error).message);
              } finally {
                setBusy(false);
                e.target.value = "";
              }
            }}
          />
        </label>
        <p className="text-sm text-neutral-500">mp3, m4a yoki wav. Yuklangach nomi va ijrochisini to'g'rilang.</p>
      </div>
      {err && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}

      {tracks.length === 0 ? (
        <p className="mt-8 text-neutral-500">Hali qo'shiq yo'q. Birinchisini yuklang.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3">Nomi va ijrochisi</th>
                <th className="px-4 py-3">Tinglash</th>
                <th className="px-4 py-3">Tartib</th>
                <th className="px-4 py-3">Holat</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((t) => (
                <Row key={t.id} t={t} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
