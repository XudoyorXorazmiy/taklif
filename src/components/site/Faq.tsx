"use client";

import { useState } from "react";

export function Faq({ items, defaultOpen = 0 }: { items: [string, string][]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col border-t border-[#E2D6B8]">
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={q} className="border-b border-[#E2D6B8]">
            <button type="button" onClick={() => setOpen(on ? -1 : i)} className="flex min-h-12 w-full items-center justify-between gap-4 py-[18px] text-left lg:gap-6 lg:py-6" aria-expanded={on}>
              <div className="font-cg text-[19px] font-medium leading-[1.3] lg:text-[22px]">{q}</div>
              <div className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full border border-[#B8973F] font-cg text-lg font-light leading-none text-[#B8973F] lg:h-8 lg:w-8 lg:text-xl">{on ? "−" : "+"}</div>
            </button>
            {on && <div className="pb-[18px] font-mr text-sm leading-[1.6] text-[#5B554D] lg:pb-6 lg:pr-[60px] lg:text-[15px] lg:leading-[1.65]">{a}</div>}
          </div>
        );
      })}
    </div>
  );
}
