const items = ["Dam olish kunlarisiz ishlaymiz", "1 kunda tayyor", "Cheksiz mehmon", "Telegram'da qo'llab-quvvatlash"];

export function Ticker() {
  const row = [...items, ...items, ...items];
  return (
    <div className="flex h-11 items-center overflow-hidden whitespace-nowrap border-y border-[#B8973F] lg:h-[52px]">
      <div className="ticker-track flex gap-6 font-mr text-[11px] font-medium uppercase tracking-[.12em] text-[#8A7A5A] lg:gap-10 lg:text-[13px]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 lg:gap-10">
            <span>{t}</span>
            <span className="text-[#B8973F]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
