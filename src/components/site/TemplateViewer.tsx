"use client";

import { useState } from "react";
import type { CatalogItem } from "@/lib/catalog";
import { PhoneFrame, PhoneCover, PhoneScreen } from "./Phone";

const thumbs: [string, string][] = [["cover", "Muqova"], ["date", "Sana"], ["schedule", "Dastur"], ["rsvp", "RSVP"]];

/** Katta telefon — jonli demo (iframe); kichik ekranlar bosilganda demo shu blokka o'tadi */
export function TemplateViewer({ item }: { item: CatalogItem }) {
  const [screen, setScreen] = useState("cover");
  const src = `/t/${item.id}?intro=0${screen === "cover" ? "" : `#${screen}`}`;
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <div className="flex h-[560px] items-center justify-center overflow-hidden rounded-[20px] bg-[#F5EEDF] lg:h-[820px] lg:rounded-3xl">
        <div className="lg:hidden">
          <PhoneFrame scale={0.62}>
            <iframe key={src} src={src} title={item.name} className="absolute inset-0 h-full w-full bg-white" />
          </PhoneFrame>
        </div>
        <div className="hidden lg:block">
          <PhoneFrame scale={0.9}>
            <iframe key={src} src={src} title={item.name} className="absolute inset-0 h-full w-full bg-white" />
          </PhoneFrame>
        </div>
      </div>
      <div className="text-center font-mr text-xs text-[#8A7A5A] lg:text-[13px]">Telefonga teging, demo jonli ochiladi</div>
      <div className="grid grid-cols-4 gap-2 lg:gap-3">
        {thumbs.map(([s, label]) => (
          <button key={s} type="button" onClick={() => setScreen(s)} className="flex flex-col items-center gap-1.5 lg:gap-2">
            <div className={`flex h-[130px] w-full justify-center overflow-hidden rounded-xl border bg-[#F5EEDF] pt-2 lg:h-[190px] lg:rounded-2xl lg:pt-2.5 ${screen === s ? "border-[#B8973F]" : "border-[#E2D6B8]"}`}>
              <PhoneFrame scale={0.17} className="lg:hidden">{s === "cover" ? <PhoneCover item={item} /> : <PhoneScreen screen={s} />}</PhoneFrame>
              <PhoneFrame scale={0.26} className="hidden lg:block">{s === "cover" ? <PhoneCover item={item} /> : <PhoneScreen screen={s} />}</PhoneFrame>
            </div>
            <div className="font-mr text-[11px] font-medium text-[#8A7A5A] lg:text-xs">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
