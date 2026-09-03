"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TELEGRAM_URL } from "@/lib/site-content";

const nav = [
  { href: "/shablonlar", label: "Shablonlar" },
  { href: "/#how", label: "Qanday ishlaydi" },
  { href: "/#pricing", label: "Narxlar" },
  { href: "/#faq", label: "Savollar" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-cg text-[28px] font-medium leading-none tracking-[.01em] text-[#1E1A16] ${className}`}>
      taklif<span className="text-[#B8973F]">.</span>site
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-[#E2D6B8] bg-[#FAF8F3]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:h-[84px] lg:px-[120px]">
        <Logo className="text-2xl lg:text-[28px]" />
        <nav className="hidden gap-10 font-mr text-[15px] font-medium lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`transition hover:text-[#B8973F] ${path.startsWith("/shablonlar") && n.href === "/shablonlar" ? "text-[#B8973F]" : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={TELEGRAM_URL} className="hidden h-12 items-center rounded-full bg-[#1E1A16] px-7 font-mr text-sm font-semibold text-white lg:inline-flex">
          Buyurtma berish
        </a>
        <button type="button" aria-label="Menyu" onClick={() => setOpen((o) => !o)} className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-px w-[22px] bg-[#1E1A16] transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-[22px] bg-[#1E1A16] transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="border-t border-[#E2D6B8] bg-[#FAF8F3] px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4 font-mr text-base font-medium">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a href={TELEGRAM_URL} className="mt-6 flex h-12 items-center justify-center rounded-full bg-[#1E1A16] font-mr text-sm font-semibold text-white">
            Buyurtma berish
          </a>
        </div>
      )}
    </header>
  );
}
