"use client";

import { useEffect, useState } from "react";

interface Props {
  target: string | Date;
  labels: { days: string; hours: string; minutes: string; seconds: string };
  className?: string;
  cellClassName?: string;
  numberClassName?: string;
  labelClassName?: string;
}

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown({ target, labels, className, cellClassName, numberClassName, labelClassName }: Props) {
  const t = typeof target === "string" ? new Date(target) : target;
  const [v, setV] = useState(() => diff(t));

  useEffect(() => {
    const id = setInterval(() => setV(diff(t)), 1000);
    return () => clearInterval(id);
  }, [t]);

  const cells = [
    [v.days, labels.days],
    [v.hours, labels.hours],
    [v.minutes, labels.minutes],
    [v.seconds, labels.seconds],
  ] as const;

  return (
    <div className={className ?? "flex justify-center gap-4"} suppressHydrationWarning>
      {cells.map(([n, l]) => (
        <div key={l} className={cellClassName ?? "flex flex-col items-center min-w-14"}>
          <span className={numberClassName ?? "text-4xl font-light tabular-nums"} suppressHydrationWarning>
            {String(n).padStart(2, "0")}
          </span>
          <span className={labelClassName ?? "text-[11px] uppercase tracking-widest opacity-70"}>{l}</span>
        </div>
      ))}
    </div>
  );
}
