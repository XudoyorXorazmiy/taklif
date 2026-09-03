import type { ReactNode } from "react";
import { TELEGRAM_URL } from "@/lib/site-content";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`font-mr text-[10px] font-semibold uppercase tracking-[.24em] text-[#B8973F] lg:text-[11px] ${className}`}>{children}</div>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`m-0 font-cg text-4xl font-medium leading-[1.1] lg:text-5xl ${className}`}>{children}</h2>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 lg:px-[120px] ${className}`}>{children}</div>;
}

const base = "inline-flex items-center justify-center rounded-full font-mr font-semibold transition";
export function BtnPrimary({ href, children, className = "", external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={`${base} bg-[#1E1A16] text-white hover:bg-[#B8973F] ${className}`}>
      {children}
    </a>
  );
}
export function BtnSecondary({ href, children, className = "", external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={`${base} border border-[#B8973F] text-[#1E1A16] hover:bg-[#F5EEDF] ${className}`}>
      {children}
    </a>
  );
}

export function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d={d} />
    </svg>
  );
}

export function IconCircle({ d, className = "h-11 w-11" }: { d: string; className?: string }) {
  return (
    <div className={`grid flex-none place-items-center rounded-full border border-[#B8973F] text-[#B8973F] ${className}`}>
      <Icon d={d} />
    </div>
  );
}

export function Dot() {
  return <span className="h-1 w-1 rounded-full bg-[#B8973F]" />;
}

/** "Boshlaymizmi?" — krem CTA bloki */
export function Cta() {
  return (
    <Container className="pb-16 lg:pb-28">
      <div className="relative flex flex-col items-center gap-[18px] rounded-[28px] bg-[#F5EEDF] px-6 py-14 text-center lg:gap-[22px] lg:rounded-[32px] lg:px-20 lg:py-24">
        <div className="pointer-events-none absolute inset-3 rounded-[18px] border border-[#E2D6B8] lg:inset-5 lg:rounded-[20px]" />
        <div className="font-ps text-[56px] leading-none text-[#B8973F] lg:text-[84px]">Boshlaymizmi?</div>
        <p className="m-0 max-w-[520px] font-mr text-[15px] leading-[1.6] text-[#5B554D] lg:text-lg">Shablon nomi, ismlar va sanani Telegram'ga yozing, qolganini biz qilamiz</p>
        <BtnPrimary href={TELEGRAM_URL} external className="relative mt-1 h-[50px] w-full text-sm lg:mt-2 lg:h-[52px] lg:w-auto lg:px-9 lg:text-[15px]">
          Telegram'da yozish
        </BtnPrimary>
      </div>
    </Container>
  );
}
