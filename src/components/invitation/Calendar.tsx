import { tashkent, type Dict } from "@/lib/i18n";

export interface CalendarUi {
  wrap: string;
  month: string;
  dayName: string;
  day: string;
  active: string;
}

/** Oy jadvali, to'y kuni belgilangan. Dushanbadan boshlanadi. Uslub shablondan keladi. */
export function Calendar({ date, labels, ui }: { date: Date; labels: Dict; ui: CalendarUi }) {
  const { m, d, daysInMonth, firstWd } = tashkent(date);
  const cells: (number | null)[] = [...Array<null>(firstWd).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  return (
    <div className={ui.wrap}>
      <div className={ui.month}>{labels.months[m].toUpperCase()}</div>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {labels.weekdays.map((n) => (
          <div key={n} className={ui.dayName}>
            {n}
          </div>
        ))}
        {cells.map((c, i) => (
          <div key={i} className="flex h-9 items-center justify-center">
            {c !== null && <div className={c === d ? ui.active : ui.day}>{c}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
