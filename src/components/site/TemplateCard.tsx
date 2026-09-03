import Link from "next/link";
import type { CatalogItem } from "@/lib/catalog";
import { categoryLabel, formatPrice } from "@/lib/site-content";
import { PhoneCover, PhoneFrame } from "./Phone";

/** Katalog kartasi (asosiy sahifa va katalog). `compact` — mobil 2 ustunli grid */
export function TemplateCard({ item, showDesc = false, compact = false }: { item: CatalogItem; showDesc?: boolean; compact?: boolean }) {
  return (
    <div className={`group relative flex flex-col rounded-3xl border border-[#E2D6B8] bg-white transition hover:shadow-[0_20px_50px_rgba(30,26,22,.1)] ${compact ? "gap-3 p-2.5 lg:gap-[18px] lg:p-5" : "gap-4 p-4 lg:gap-[18px] lg:p-5"}`}>
      {item.badge && (
        <div className={`absolute z-[2] flex items-center rounded-full bg-[#1E1A16] font-mr font-semibold uppercase tracking-[.1em] text-white ${compact ? "left-[18px] top-[18px] h-6 px-2.5 text-[9px] lg:left-[34px] lg:top-[34px] lg:h-7 lg:px-3 lg:text-[11px]" : "left-7 top-7 h-[26px] px-2.5 text-[10px] lg:left-[34px] lg:top-[34px] lg:h-7 lg:px-3 lg:text-[11px]"}`}>
          {item.badge}
        </div>
      )}
      <Link href={`/shablonlar/${item.id}`} className={`flex items-end justify-center overflow-hidden rounded-2xl bg-[#F5EEDF] ${compact ? "h-[230px] rounded-[14px] lg:h-[400px] lg:rounded-2xl" : "h-[340px] lg:h-[400px]"}`}>
        <div className={`transition duration-300 group-hover:-translate-y-3 ${compact ? "-mb-[100px] lg:-mb-40" : "-mb-40"}`}>
          <PhoneFrame scale={compact ? 0.36 : 0.55} className="lg:hidden">
            <PhoneCover item={item} />
          </PhoneFrame>
          <PhoneFrame scale={0.62} className="hidden lg:block">
            <PhoneCover item={item} />
          </PhoneFrame>
        </div>
      </Link>
      <div className={`flex flex-col gap-1 ${compact ? "px-1 lg:gap-1.5 lg:px-1.5" : "gap-1.5 px-1 lg:px-1.5"}`}>
        <div className={`font-mr font-semibold uppercase tracking-[.2em] text-[#B8973F] ${compact ? "text-[9px] lg:text-[11px]" : "text-[10px] lg:text-[11px]"}`}>{categoryLabel(item.category)}</div>
        <Link href={`/shablonlar/${item.id}`} className={`font-cg font-medium leading-[1.1] ${compact ? "text-xl lg:text-[28px]" : "text-[26px] lg:text-[28px]"}`}>
          {item.name}
        </Link>
        {showDesc && <div className="font-mr text-sm leading-[1.55] text-[#5B554D]">{item.description}</div>}
        {compact && <div className="mt-0.5 font-cg text-[15px] font-medium text-[#5B554D] lg:hidden">{formatPrice(item.price)}</div>}
        {!compact && <div className="mt-1.5 font-cg text-xl font-medium lg:hidden">{formatPrice(item.price)}</div>}
      </div>
      <div className={`flex items-center justify-between border-[#E2D6B8] lg:border-t lg:px-1.5 lg:pb-1 lg:pt-[18px] ${compact ? "" : ""}`}>
        <div className="hidden font-cg text-xl font-medium lg:block">{formatPrice(item.price)}</div>
        <div className={`grid w-full grid-cols-2 gap-1.5 lg:flex lg:w-auto lg:gap-2 ${compact ? "" : "gap-2"}`}>
          <a href={`/t/${item.id}`} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center rounded-full border border-[#B8973F] font-mr font-semibold hover:bg-[#F5EEDF] ${compact ? "h-11 text-xs lg:h-12 lg:px-5 lg:text-[13px]" : "h-12 text-[13px] lg:px-5"}`}>
            Demo
          </a>
          <Link href={`/shablonlar/${item.id}`} className={`inline-flex items-center justify-center rounded-full bg-[#1E1A16] font-mr font-semibold text-white hover:bg-[#B8973F] ${compact ? "h-11 text-xs lg:h-12 lg:px-5 lg:text-[13px]" : "h-12 text-[13px] lg:px-5"}`}>
            Buyurtma
          </Link>
        </div>
      </div>
    </div>
  );
}
