import Link from "next/link";
import { INSTAGRAM_URL, PHONE, TELEGRAM_URL } from "@/lib/site-content";
import { Logo } from "./Header";

export function Footer() {
  const col = "flex flex-col gap-3.5 font-mr text-sm font-medium";
  const head = "mb-1 font-mr text-[11px] font-semibold uppercase tracking-[.2em] text-[#B8973F]";
  return (
    <footer className="border-t border-[#E2D6B8]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 pb-8 pt-12 lg:gap-12 lg:px-[120px] lg:pb-10 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_200px_200px] lg:gap-16">
          <div className="flex flex-col gap-3 lg:gap-4">
            <Logo className="text-2xl lg:text-[28px]" />
            <p className="m-0 max-w-[320px] font-mr text-[13px] leading-[1.6] text-[#8A7A5A] lg:text-sm">Onlayn to'y taklifnomalari. Havola yuboring — mehmonlar telefonda ochib, kelishini tasdiqlaydi.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:contents">
            <div className={col}>
              <div className={head}>Sayt</div>
              <Link href="/shablonlar" className="hover:text-[#B8973F]">Shablonlar</Link>
              <Link href="/#pricing" className="hover:text-[#B8973F]">Narxlar</Link>
              <Link href="/#faq" className="hover:text-[#B8973F]">Savollar</Link>
            </div>
            <div className={col}>
              <div className={head}>Aloqa</div>
              <a href={TELEGRAM_URL} className="hover:text-[#B8973F]">Telegram</a>
              <a href={INSTAGRAM_URL} className="hover:text-[#B8973F]">Instagram</a>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-[#B8973F]">{PHONE}</a>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-[#E2D6B8] pt-5 font-mr text-xs text-[#8A7A5A] lg:pt-6 lg:text-[13px]">
          <span>© {new Date().getFullYear()} taklif.site</span>
          <Link href="/oferta" className="hover:text-[#B8973F]">Ommaviy oferta</Link>
        </div>
      </div>
    </footer>
  );
}
