"use client";

import { useRef } from "react";
import type { CatalogItem } from "@/lib/catalog";
import { blocksList } from "@/lib/site-content";
import { PhoneCover, PhoneFrame, PhoneScreen } from "./Phone";
import { Eyebrow, H2 } from "./Ui";

export function BlocksCarousel({ item }: { item: CatalogItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  return (
    <section className="overflow-hidden py-14 lg:py-24">
      <div className="mx-auto max-w-[1440px] pl-5 lg:pl-[120px]">
        <div className="flex items-end justify-between pr-5 lg:mb-10 lg:pr-[120px]">
          <div>
            <Eyebrow>11 blok</Eyebrow>
            <H2 className="mt-3 text-[32px] lg:mt-4 lg:text-[44px]">Bloklar</H2>
          </div>
          <div className="hidden gap-2 lg:flex">
            <button type="button" onClick={() => go(-1)} aria-label="Oldingi" className="grid h-12 w-12 place-items-center rounded-full border border-[#E2D6B8] text-[#8A7A5A] hover:border-[#B8973F]">←</button>
            <button type="button" onClick={() => go(1)} aria-label="Keyingi" className="grid h-12 w-12 place-items-center rounded-full border border-[#B8973F] hover:bg-[#F5EEDF]">→</button>
          </div>
        </div>
        <div ref={ref} className="mt-6 flex gap-3 overflow-x-auto pr-5 [scrollbar-width:none] lg:mt-0 lg:gap-5 lg:pr-[120px] [&::-webkit-scrollbar]:hidden">
          {blocksList.map(([s, label], i) => (
            <div key={s} className="flex flex-none flex-col items-center gap-2 lg:gap-3">
              <div className="flex h-60 w-[120px] justify-center overflow-hidden rounded-[14px] bg-[#F5EEDF] pt-2.5 lg:h-[300px] lg:w-[150px] lg:rounded-2xl lg:pt-3">
                <PhoneFrame scale={0.25} className="lg:hidden">{s === "cover" ? <PhoneCover item={item} /> : <PhoneScreen screen={s} />}</PhoneFrame>
                <PhoneFrame scale={0.31} className="hidden lg:block">{s === "cover" ? <PhoneCover item={item} /> : <PhoneScreen screen={s} />}</PhoneFrame>
              </div>
              <div className="font-mr text-xs font-medium lg:text-[13px]">
                <span className="text-[#B8973F]">{String(i + 1).padStart(2, "0")}</span> {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
