import type { ReactNode } from "react";

/**
 * Mobil taklifnoma desktopda o'rtada 430px ustun bo'lib turadi,
 * yon tomonlar shablon rangi bilan to'ldiriladi.
 */
export function Frame({ children, color, pattern }: { children: ReactNode; color: string; pattern?: string }) {
  return (
    <div className="min-h-dvh w-full" style={{ background: color, backgroundImage: pattern }}>
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] shadow-2xl md:shadow-[0_0_60px_rgba(0,0,0,0.15)]">
        {children}
      </div>
    </div>
  );
}
