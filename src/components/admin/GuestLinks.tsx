"use client";

import { useState } from "react";

/**
 * Mehmonlar ro'yxatidan shaxsiy havolalar: har bir qator → ?m=Ism
 * Mijoz shu havolalarni mehmonlarga alohida yuboradi.
 */
export function GuestLinks({ baseUrl }: { baseUrl: string }) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const names = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const linkFor = (n: string) => `${baseUrl}/?m=${encodeURIComponent(n).replace(/%20/g, "+")}`;

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Mehmonlar uchun shaxsiy havolalar</h2>
        {names.length > 0 && (
          <button type="button" className="text-sm text-blue-600" onClick={() => copy("all", names.map((n) => `${n}: ${linkFor(n)}`).join("\n"))}>
            {copied === "all" ? "Nusxalandi ✓" : "Hammasini nusxalash"}
          </button>
        )}
      </div>
      <p className="mt-1 text-xs text-neutral-500">Har qatorga bitta ism yozing. Havola ochilganda "Hurmatli Ali aka" deb chiqadi.</p>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Ali aka\nZuhra opa\nKarimovlar oilasi"}
        className="mt-3 w-full rounded-lg border px-3 py-2 text-sm"
      />
      {names.length > 0 && (
        <ul className="mt-3 divide-y text-sm">
          {names.map((n) => (
            <li key={n} className="flex items-center justify-between gap-3 py-2">
              <span className="font-medium">{n}</span>
              <span className="truncate text-neutral-500">{linkFor(n)}</span>
              <button type="button" className="shrink-0 rounded-lg border px-2 py-1 text-xs" onClick={() => copy(n, linkFor(n))}>
                {copied === n ? "✓" : "Nusxalash"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
