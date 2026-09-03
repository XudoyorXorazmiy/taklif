import type { CSSProperties, ReactNode } from "react";
import type { CatalogItem } from "@/lib/catalog";

/**
 * Telefon ramkasi 406×860 (ekran 390×844, radius 40). `scale` bilan kichraytiriladi:
 * tashqi konteyner scale'langan o'lchamni egallaydi, shuning uchun layout to'g'ri qoladi.
 */
export function PhoneFrame({ scale = 1, children, className = "", style }: { scale?: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ width: 406 * scale, height: 860 * scale, ...style }}>
      <div className="rounded-[48px] bg-[#141210] p-2 shadow-[0_24px_60px_rgba(30,26,22,.28)]" style={{ width: 406, height: 860, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[40px] bg-[#FBF8F1] text-[#1E1A16]">
          <div className="absolute left-1/2 top-0 z-[5] h-[26px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-[#141210]" />
          {children}
          <div className="absolute bottom-2 left-1/2 z-[5] h-1 w-[130px] -translate-x-1/2 rounded-full bg-black/30" />
        </div>
      </div>
    </div>
  );
}

const G: Record<string, { bg: string; text: string; accent: string; line: string; frameRadius: string; family: string; size: string; weight: number; tracking: string; photoRadius: string; photo: string }> = {
  national: { bg: "#FBF6EA", text: "#1E1A16", accent: "#1F6F6A", line: "#1F6F6A", frameRadius: "0", family: "var(--font-cormorant),serif", size: "50px", weight: 500, tracking: ".02em", photoRadius: "85px 85px 0 0", photo: "linear-gradient(160deg,#E6EFE9,#BFD6CD)" },
  minimal: { bg: "#FFFFFF", text: "#1E1A16", accent: "#1E1A16", line: "#E5E1DA", frameRadius: "0", family: "var(--font-manrope),sans-serif", size: "40px", weight: 500, tracking: "-.02em", photoRadius: "0", photo: "linear-gradient(160deg,#EEECE7,#D8D4CC)" },
  luxury: { bg: "#F3E9D8", text: "#1E1A16", accent: "#B8973F", line: "#B8973F", frameRadius: "170px 170px 0 0", family: "var(--font-cormorant),serif", size: "52px", weight: 500, tracking: ".04em", photoRadius: "85px 85px 0 0", photo: "linear-gradient(160deg,#E9DBBE,#D2BD8E)" },
};

const scrollHint = (color: string, line: string) => (
  <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 font-mr text-[10px] font-medium uppercase tracking-[.2em]" style={{ color }}>
    <span>Pastga suring</span>
    <span className="h-[22px] w-px" style={{ background: line }} />
  </div>
);

/** Shablon muqovasi (statik mockup, dizayndagi PhoneCover). Admin rasm yuklagan bo'lsa u ko'rsatiladi. */
export function PhoneCover({ item, groom = "Nodirbek", bride = "Malika", date = "12 · OKTABR · 2026" }: { item: CatalogItem; groom?: string; bride?: string; date?: string }) {
  if (item.thumbnail) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.thumbnail} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />;
  }
  const id = item.meta.id;
  if (id === "classic-gold") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FBF8F1] font-mr">
        <div className="absolute inset-4 border border-[#C9AD5F]" />
        {["left-6 top-6 border-l border-t", "right-6 top-6 border-r border-t", "bottom-6 left-6 border-b border-l", "bottom-6 right-6 border-b border-r"].map((c) => (
          <div key={c} className={`absolute h-[26px] w-[26px] border-[#B8973F] ${c}`} />
        ))}
        <div className="mb-[26px] grid h-16 w-16 place-items-center rounded-full border border-[#C9AD5F] font-cg text-xl font-medium text-[#B8973F]">{groom[0]}&amp;{bride[0]}</div>
        <div className="text-[11px] font-medium uppercase tracking-[.32em] text-[#B8973F]">To'y kuni</div>
        <div className="mt-[22px] font-ps text-[58px] leading-[1.05]">{groom}</div>
        <div className="my-1 font-cg text-[30px] italic leading-none text-[#B8973F]">&amp;</div>
        <div className="font-ps text-[58px] leading-[1.05]">{bride}</div>
        <div className="mt-[26px] h-[230px] w-[180px] rounded-t-[90px] border border-[#C9AD5F] p-1.5"><div className="h-full w-full rounded-t-[84px]" style={{ background: "linear-gradient(160deg,#EFE4CC,#DCCB9E)" }} /></div>
        <div className="mt-6 font-cg text-lg font-medium tracking-[.14em]">{date}</div>
        {scrollHint("#8A7A5A", "#C9AD5F")}
      </div>
    );
  }
  if (id === "floral-watercolor") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white font-mr text-[#3B3A36]">
        <div className="absolute -left-10 -top-10 h-[280px] w-[230px] rounded-br-[140px]" style={{ background: "radial-gradient(circle at 40% 40%,rgba(241,217,214,.9),rgba(185,196,168,.5) 60%,transparent 75%)" }} />
        <div className="absolute -bottom-10 -right-[50px] h-[280px] w-[250px] rounded-tl-[140px]" style={{ background: "radial-gradient(circle at 60% 60%,rgba(241,217,214,.9),rgba(185,196,168,.5) 60%,transparent 75%)" }} />
        <div className="relative text-[11px] font-medium uppercase tracking-[.32em] text-[#7A8C6E]">To'y kuni</div>
        <div className="relative mt-6 font-gv text-[66px] leading-[1.05]">{groom}</div>
        <div className="relative font-gv text-[40px] leading-none text-[#C2A36B]">&amp;</div>
        <div className="relative font-gv text-[66px] leading-[1.05]">{bride}</div>
        <div className="relative mt-[30px] h-[230px] w-[190px] rounded-[95px] border border-[#C2A36B]" style={{ background: "linear-gradient(160deg,#EEF0E6,#D7DDCB)" }} />
        <div className="relative mt-[26px] font-cg text-base font-medium tracking-[.16em]">{date}</div>
        {scrollHint("#7A8C6E", "#C2A36B")}
      </div>
    );
  }
  if (id === "dark-elegant") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2B1D16] font-mr text-[#F1E6D2]">
        <div className="relative flex h-[540px] w-[300px] flex-col items-center justify-center rounded-[150px] border border-[#C9A961] p-6">
          <div className="absolute -inset-3 rounded-[162px] border border-dashed border-[#C9A961]/40" />
          <div className="text-[11px] font-medium uppercase tracking-[.32em] text-[#C9A961]">To'y kuni</div>
          <div className="mt-[26px] font-ab text-[64px] leading-[1.1]">{groom}</div>
          <div className="my-1 font-mc text-[26px] leading-none text-[#C9A961]">&amp;</div>
          <div className="font-ab text-[64px] leading-[1.1]">{bride}</div>
          <div className="mt-[22px] h-[150px] w-[130px] rounded-t-[65px] border border-[#C9A961]/50" style={{ background: "linear-gradient(160deg,#4A3327,#2B1D16)" }} />
          <div className="mt-[22px] font-mc text-[15px] tracking-[.18em]">{date}</div>
        </div>
        {scrollHint("rgba(241,230,210,.55)", "#C9A961")}
      </div>
    );
  }
  const g = G[item.category] ?? G.minimal;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mr" style={{ background: g.bg, color: g.text }}>
      <div className="absolute inset-[18px] border" style={{ borderColor: g.line, borderRadius: g.frameRadius }} />
      <div className="text-[11px] font-medium uppercase tracking-[.32em]" style={{ color: g.accent }}>To'y kuni</div>
      <div className="mt-6 leading-[1.1]" style={{ fontFamily: g.family, fontSize: g.size, fontWeight: g.weight, letterSpacing: g.tracking }}>{groom}</div>
      <div className="my-1 font-cg text-[30px] italic leading-none" style={{ color: g.accent }}>&amp;</div>
      <div className="leading-[1.1]" style={{ fontFamily: g.family, fontSize: g.size, fontWeight: g.weight, letterSpacing: g.tracking }}>{bride}</div>
      <div className="mt-7 h-[210px] w-[170px] border" style={{ borderColor: g.accent, borderRadius: g.photoRadius, background: g.photo }} />
      <div className="mt-6 font-cg text-base font-medium tracking-[.16em]">{date}</div>
    </div>
  );
}

const H = ({ children }: { children: ReactNode }) => <div className="font-cg text-[30px] font-medium leading-[1.15]">{children}</div>;
const S = ({ children }: { children: ReactNode }) => <div className="font-ps text-[26px] leading-none text-[#B8973F]">{children}</div>;

/** Blok ekranlari (dizayndagi klassik uslub), sahifa mockup'lari uchun */
export function PhoneScreen({ screen }: { screen: string }) {
  const cells: (number | null)[] = [null, null, null, ...Array.from({ length: 31 }, (_, i) => i + 1), null];
  const schedule = [
    ["17:00", "Mehmonlarni kutib olish", "Yengil taomlar va musiqa"],
    ["18:00", "Nikoh marosimi", "Asosiy zal"],
    ["19:00", "Ziyofat", "Dasturxon va tabriklar"],
    ["20:30", "Tort kesish", ""],
    ["21:00", "Raqs va musiqa", "Kechning yakuni"],
  ];

  switch (screen) {
    case "greeting":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-4 bg-[#FBF8F1] px-8 py-[120px] text-center font-mr">
          <div className="font-cg text-[22px] font-medium italic leading-none text-[#8A7A5A]">Hurmatli Ali aka,</div>
          <H>Aziz do'stlar va yaqinlar!</H>
          <div className="h-px w-12 bg-[#B8973F]" />
          <p className="m-0 text-[15px] leading-[1.75] text-[#4A423A]">Hayotimizdagi eng baxtli kunda sizni oramizda ko'rishdan mamnun bo'lamiz. Sevgi, kulgu va unutilmas lahzalar bilan to'lgan bu kechani birga nishonlaylik.</p>
        </div>
      );
    case "date":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-[18px] bg-[#F5EEDF] px-7 pb-10 pt-[72px] font-mr">
          <S>To'y sanasi</S>
          <div className="text-center">
            <div className="font-cg text-[38px] font-medium leading-[1.05]">12-oktabr, 2026</div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-[.2em] text-[#8A7A5A]">Dushanba · 18:00</div>
          </div>
          <div className="w-full border border-[#E2D6B8] bg-[#FBF8F1] px-3 pb-3 pt-4">
            <div className="mb-2.5 text-center font-cg text-[13px] font-semibold tracking-[.2em]">OKTABR</div>
            <div className="grid grid-cols-7 text-center">
              {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d) => <div key={d} className="text-[10px] font-semibold leading-[22px] text-[#8A7A5A]">{d}</div>)}
              {cells.map((c, i) => (
                <div key={i} className="flex h-[34px] items-center justify-center">
                  {c && (c === 12 ? <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#B8973F] text-[13px] font-semibold text-[#FBF8F1]">12</div> : <div className="text-[13px] text-[#4A423A]">{c}</div>)}
                </div>
              ))}
            </div>
          </div>
          <div className="grid w-full grid-cols-4 gap-2">
            {[["39", "kun"], ["12", "soat"], ["45", "daqiqa"], ["08", "soniya"]].map(([n, l]) => (
              <div key={l} className="border border-[#E2D6B8] bg-[#FBF8F1] px-1 py-3 text-center"><div className="font-cg text-[28px] font-medium leading-none">{n}</div><div className="mt-1.5 text-[9px] font-medium uppercase tracking-[.14em] text-[#8A7A5A]">{l}</div></div>
            ))}
          </div>
        </div>
      );
    case "schedule":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-7 bg-[#FBF8F1] px-8 py-20 font-mr">
          <div className="text-center"><S>Marosim</S><div className="mt-1.5"><H>Kun dasturi</H></div></div>
          <div className="flex w-full flex-col">
            {schedule.map(([t, ti, n], i) => (
              <div key={t} className="grid min-h-[88px] grid-cols-[72px_24px_1fr] gap-x-3">
                <div className="pt-0.5 text-right font-cg text-[22px] font-medium leading-none">{t}</div>
                <div className="flex flex-col items-center"><div className="mt-1.5 h-[9px] w-[9px] rounded-full border border-[#B8973F] bg-[#FBF8F1]" />{i < 4 && <div className="mt-1 w-px flex-1 bg-[#DCCB9E]" />}</div>
                <div className="pb-5"><div className="text-[15px] font-semibold leading-[1.3]">{ti}</div>{n && <div className="mt-1 text-[13px] leading-[1.5] text-[#8A7A5A]">{n}</div>}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "venue":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-5 bg-[#F5EEDF] px-7 py-[72px] font-mr">
          <div className="text-center"><S>Joy</S><div className="mt-1.5"><H>Manzil</H></div></div>
          <div className="flex w-full flex-col items-center gap-2.5 border border-[#E2D6B8] bg-[#FBF8F1] p-[22px] text-center">
            <div className="h-[170px] w-full" style={{ background: "linear-gradient(180deg,#F3EAD5,#E6D9B8)" }} />
            <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[.24em] text-[#B8973F]">Nikoh to'yi · 18:00</div>
            <div className="font-cg text-2xl font-medium leading-[1.2]">"Navro'z" to'yxonasi</div>
            <div className="text-sm leading-[1.5] text-[#4A423A]">Toshkent, Yunusobod tumani,<br />Amir Temur ko'chasi 108</div>
            <div className="mt-2 flex h-11 items-center bg-[#B8973F] px-6 text-[13px] font-semibold tracking-[.06em] text-[#FBF8F1]">Xaritada ochish</div>
          </div>
        </div>
      );
    case "details":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-6 bg-[#FBF8F1] px-8 py-[100px] font-mr">
          <H>Muhim ma'lumot</H>
          <div className="flex w-full flex-col">
            {[["Sovg'alar", "Eng katta sovg'a — sizning kelishingiz. Gul o'rniga konvert afzal."], ["Bolalar", "Kichkintoylar uchun alohida stol va animator bo'ladi."], ["Transport", "To'yxona oldida bepul avtoturargoh mavjud."]].map(([t, d]) => (
              <div key={t} className="grid grid-cols-[96px_1fr] gap-3 border-t border-[#E2D6B8] py-[18px]"><div className="font-cg text-[19px] font-medium leading-[1.2] text-[#B8973F]">{t}</div><div className="text-sm leading-[1.6] text-[#4A423A]">{d}</div></div>
            ))}
            <div className="border-t border-[#E2D6B8]" />
          </div>
        </div>
      );
    case "dresscode":
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[18px] bg-[#F5EEDF] px-8 text-center font-mr">
          <H>Kiyim tarzi</H>
          <p className="m-0 text-sm leading-[1.6] text-[#4A423A]">Tantanali kechki libos. Ranglar palitrasiga rioya qilsangiz xursand bo'lamiz.</p>
          <div className="mt-1.5 flex gap-3.5">{["#1E1A16", "#5C3A2E", "#B8973F", "#7E8C6E", "#EFE7D6"].map((c) => <div key={c} className="h-10 w-10 rounded-full shadow-[inset_0_0_0_1px_#C9AD5F]" style={{ background: c }} />)}</div>
        </div>
      );
    case "gallery":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-6 bg-[#FBF8F1] px-8 py-20 font-mr">
          <div className="text-center"><S>Lahzalar</S><div className="mt-1.5"><H>Galereya</H></div></div>
          <div className="grid w-full grid-cols-2 gap-2.5">
            {["linear-gradient(160deg,#EFE4CC,#DCCB9E)", "linear-gradient(200deg,#F3EAD5,#D9C79A)", "linear-gradient(160deg,#E9DDC2,#CDB98A)", "linear-gradient(200deg,#EFE4CC,#DCCB9E)"].map((g, i) => <div key={i} className={`h-[200px] ${i % 2 ? "mt-6" : ""}`} style={{ background: g }} />)}
          </div>
        </div>
      );
    case "rsvp":
      return (
        <div className="absolute inset-0 flex flex-col items-center gap-5 bg-[#F5EEDF] px-6 pb-8 pt-16 font-mr">
          <div className="text-center"><div className="font-cg text-[28px] font-medium leading-[1.15]">Qatnashishingizni tasdiqlang</div><div className="mt-2 text-[11px] font-medium uppercase tracking-[.14em] text-[#8A7A5A]">1-oktabrgacha javob bering</div></div>
          <div className="flex w-full flex-col gap-3.5 border border-[#E2D6B8] bg-[#FBF8F1] p-5">
            <div className="flex flex-col gap-1.5"><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8A7A5A]">Ismingiz</span><div className="flex h-11 items-center border border-[#DCCB9E] bg-white px-3.5 text-sm">Ali Karimov</div></div>
            <div className="flex flex-col gap-2">
              <div className="flex h-11 items-center gap-2.5 bg-[#B8973F] px-3.5 text-[13px] font-semibold text-[#FBF8F1]"><span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-[#FBF8F1]"><span className="h-1.5 w-1.5 rounded-full bg-[#FBF8F1]" /></span>Albatta kelaman</div>
              <div className="flex h-11 items-center gap-2.5 border border-[#DCCB9E] bg-white px-3.5 text-[13px] font-medium"><span className="h-3.5 w-3.5 rounded-full border border-[#B8973F]" />Kela olmayman</div>
              <div className="flex h-11 items-center gap-2.5 border border-[#DCCB9E] bg-white px-3.5 text-[13px] font-medium"><span className="h-3.5 w-3.5 rounded-full border border-[#B8973F]" />Keyinroq aytaman</div>
            </div>
            <div className="flex flex-col gap-1.5"><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8A7A5A]">Necha kishi kelasiz?</span><div className="flex h-11 border border-[#DCCB9E] bg-white"><div className="grid w-11 place-items-center border-r border-[#DCCB9E] font-cg text-xl text-[#B8973F]">−</div><div className="flex flex-1 items-center justify-center text-[15px] font-medium">2</div><div className="grid w-11 place-items-center border-l border-[#DCCB9E] font-cg text-xl text-[#B8973F]">+</div></div></div>
            <div className="flex h-[46px] items-center justify-center bg-[#1E1A16] text-[13px] font-semibold tracking-[.08em] text-[#FBF8F1]">Yuborish</div>
          </div>
        </div>
      );
    case "contacts":
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#FBF8F1] px-7 font-mr">
          <H>Kontaktlar</H>
          <div className="grid w-full grid-cols-2 gap-3">
            {[["Kuyov tomon", "+998 90 123 45 67"], ["Kelin tomon", "+998 91 234 56 78"]].map(([t, p]) => (
              <div key={t} className="flex flex-col items-center gap-3 border border-[#E2D6B8] px-3.5 py-5 text-center"><div className="text-[11px] font-medium uppercase tracking-[.2em] text-[#B8973F]">{t}</div><div className="whitespace-nowrap text-sm font-medium">{p}</div><div className="flex h-11 w-full items-center justify-center bg-[#B8973F] text-xs font-semibold text-[#FBF8F1]">Qo'ng'iroq</div><div className="flex h-11 w-full items-center justify-center border border-[#B8973F] text-xs font-semibold text-[#B8973F]">Telegram</div></div>
            ))}
          </div>
        </div>
      );
    case "closing":
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[18px] bg-[#F5EEDF] px-8 text-center font-mr">
          <div className="absolute inset-4 border border-[#C9AD5F]" />
          <div className="font-ps text-[44px] leading-[1.2] text-[#B8973F]">Sizni intiqlik bilan kutamiz!</div>
          <div className="h-px w-12 bg-[#B8973F]" />
          <div className="font-cg text-xl font-medium italic leading-[1.3]">Hurmat bilan,<br />Nodirbek va Malika</div>
        </div>
      );
    default:
      return null;
  }
}
