"use client";

import { useMemo, useState } from "react";
import type { CatalogItem } from "@/lib/catalog";
import { categoryLabel } from "@/lib/site-content";
import { TemplateCard } from "./TemplateCard";

type Sort = "popular" | "new" | "price";

export function CatalogGrid({ items }: { items: CatalogItem[] }) {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("popular");

  const cats = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const visible = useMemo(() => {
    const list = items.filter((i) => cat === "all" || i.category === cat);
    if (sort === "price") return [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "new") return [...list].sort((a, b) => Number(b.badge === "Yangi") - Number(a.badge === "Yangi") || b.sortOrder - a.sortOrder);
    return list;
  }, [items, cat, sort]);

  const chip = (on: boolean) =>
    `flex h-11 flex-none cursor-pointer items-center rounded-full px-[18px] font-mr text-sm font-medium transition lg:px-5 ${on ? "bg-[#1E1A16] text-white" : "border border-[#E2D6B8] bg-white hover:border-[#B8973F]"}`;
  const seg = (on: boolean) => `flex items-center rounded-full px-3.5 lg:px-[18px] ${on ? "bg-[#F5EEDF] text-[#1E1A16]" : "hover:text-[#1E1A16]"}`;

  return (
    <>
      <div className="flex flex-col gap-3 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:pb-10">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:gap-2.5 lg:px-0 [&::-webkit-scrollbar]:hidden">
          <button type="button" onClick={() => setCat("all")} className={chip(cat === "all")}>
            Barchasi
          </button>
          {cats.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={chip(cat === c)}>
              {categoryLabel(c)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5 font-mr text-[13px] font-medium text-[#8A7A5A] lg:gap-3.5 lg:text-sm">
          <span>Saralash:</span>
          <div className="flex h-10 rounded-full border border-[#E2D6B8] bg-white p-[3px] lg:h-11 lg:p-1">
            {([["popular", "Mashhur"], ["new", "Yangi"], ["price", "Narx"]] as [Sort, string][]).map(([k, l]) => (
              <button key={k} type="button" onClick={() => setSort(k)} className={seg(sort === k)}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-7">
        {visible.map((t) => (
          <TemplateCard key={t.id} item={t} compact />
        ))}
      </div>
      {visible.length === 0 && <p className="py-16 text-center font-mr text-[#8A7A5A]">Bu kategoriyada hozircha shablon yo'q.</p>}
    </>
  );
}
