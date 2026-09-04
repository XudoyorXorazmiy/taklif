/**
 * "Bog' saroyi" uchun akvarel uslubidagi dekorativ qatlamlar (o'z SVG'larimiz).
 * Fon rasmi yuklanmagan blokda shular chiqadi — sahifa bo'sh ko'rinmaydi.
 */

const GREEN_D = "#3F5A42";
const GREEN_M = "#6E8C6A";
const GREEN_L = "#A9BFA0";
const CREAM = "#F7F3EC";
const GOLD = "#C0A268";

/** Yumshoq akvarel dog'lari — har blokda fon sifatida */
export function Wash({ seed = 0, className = "" }: { seed?: number; className?: string }) {
  const blobs = [
    { cx: 12, cy: 8, rx: 34, ry: 26, c: GREEN_L, o: 0.28 },
    { cx: 92, cy: 22, rx: 30, ry: 34, c: GREEN_M, o: 0.16 },
    { cx: 78, cy: 88, rx: 38, ry: 28, c: GREEN_L, o: 0.24 },
    { cx: 6, cy: 74, rx: 26, ry: 30, c: GREEN_M, o: 0.14 },
  ];
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <filter id={`wash${seed}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g filter={`url(#wash${seed})`}>
        {blobs.map((b, i) => (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={b.c} opacity={b.o} />
        ))}
      </g>
    </svg>
  );
}

/** Bitta akvarel barg shoxi */
function Branch({ flip }: { flip?: boolean }) {
  const leaves = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <g transform={flip ? "scale(-1,1) translate(-200,0)" : undefined}>
      <path d="M14 6 C 52 30, 88 74, 104 134" stroke={GREEN_D} strokeWidth="1.6" fill="none" opacity=".55" />
      {leaves.map((i) => {
        const t = i / 7;
        const x = 14 + t * 90;
        const y = 6 + t * t * 128;
        const s = 1 - t * 0.35;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${-28 + i * 9}) scale(${s})`}>
            <ellipse cx="13" cy="0" rx="14" ry="6.6" fill={GREEN_M} opacity=".62" />
            <ellipse cx="-13" cy="3" rx="12" ry="5.8" fill={GREEN_D} opacity=".42" />
          </g>
        );
      })}
    </g>
  );
}

/** Oq atirgul + romashka to'plami */
function Bloom({ x, y, s = 1, tone = CREAM }: { x: number; y: number; s?: number; tone?: string }) {
  const petals = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {petals.map((i) => (
        <ellipse key={i} cx="0" cy="-13" rx="8.4" ry="13" fill={tone} opacity=".95" stroke={GREEN_L} strokeWidth=".5" transform={`rotate(${i * 45})`} />
      ))}
      <circle r="6" fill="#E6D9AE" />
      <circle r="3" fill={GOLD} opacity=".7" />
    </g>
  );
}

/** Burchak gul kompozitsiyasi: chap-yuqori va o'ng-past */
export function FloralCorner({ position = "tl", className = "" }: { position?: "tl" | "br" | "tr" | "bl"; className?: string }) {
  const rot = { tl: "", tr: "scale(-1,1) translate(-200,0)", bl: "scale(1,-1) translate(0,-200)", br: "rotate(180 100 100)" }[position];
  return (
    <svg className={`pointer-events-none absolute h-[46%] w-[62%] ${className}`} viewBox="0 0 200 200" aria-hidden>
      <g transform={rot} opacity=".92">
        <Branch />
        <Branch flip />
        <Bloom x={38} y={34} s={1.15} />
        <Bloom x={86} y={72} s={0.9} />
        <Bloom x={26} y={92} s={0.75} />
        <Bloom x={104} y={26} s={0.6} tone="#FBF8F1" />
      </g>
    </svg>
  );
}

/** Yuqoridan osilgan yashillik gulchambari */
export function TopGarland({ className = "" }: { className?: string }) {
  const drops = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg className={`pointer-events-none absolute inset-x-0 top-0 h-[210px] w-full ${className}`} viewBox="0 0 390 210" preserveAspectRatio="none" aria-hidden>
      <path d="M-10 6 Q 100 62 195 40 Q 290 18 400 66" stroke={GREEN_D} strokeWidth="2" fill="none" opacity=".5" />
      {drops.map((i) => {
        const x = 6 + i * 38;
        const len = 46 + ((i * 37) % 78);
        return (
          <g key={i} opacity=".62">
            <path d={`M${x} 24 C ${x - 8} ${24 + len * 0.4}, ${x + 8} ${24 + len * 0.7}, ${x - 3} ${24 + len}`} stroke={GREEN_D} strokeWidth="1.3" fill="none" />
            {[0.3, 0.55, 0.8].map((t, j) => (
              <ellipse key={j} cx={x + (j % 2 ? 7 : -7)} cy={24 + len * t} rx="8" ry="4" fill={j % 2 ? GREEN_M : GREEN_D} opacity=".7" transform={`rotate(${j % 2 ? 24 : -24} ${x} ${24 + len * t})`} />
            ))}
          </g>
        );
      })}
      <g opacity=".95">
        <Bloom x={54} y={40} s={0.95} />
        <Bloom x={168} y={30} s={1.1} />
        <Bloom x={286} y={48} s={0.85} />
        <Bloom x={340} y={22} s={0.65} />
      </g>
    </svg>
  );
}

/** Marmar arka konturi — muqova va manzil bloklarida */
export function Arch({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="col" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D9D2C4" stopOpacity=".85" />
          <stop offset=".45" stopColor="#F2EDE4" stopOpacity=".7" />
          <stop offset="1" stopColor="#CFC7B6" stopOpacity=".8" />
        </linearGradient>
      </defs>
      <rect x="4" y="120" width="46" height="724" fill="url(#col)" />
      <rect x="340" y="120" width="46" height="724" fill="url(#col)" />
      <rect x="-2" y="104" width="60" height="20" fill="#E4DCCC" opacity=".9" />
      <rect x="332" y="104" width="60" height="20" fill="#E4DCCC" opacity=".9" />
      <path d="M50 210 Q 195 74 340 210" stroke="#D7CFBE" strokeWidth="14" fill="none" opacity=".75" />
      <path d="M50 210 Q 195 92 340 210" stroke={CREAM} strokeWidth="4" fill="none" opacity=".8" />
    </svg>
  );
}

/** Sarv daraxtlari xiyoboni — yakuniy blok uchun */
export function Cypresses({ className = "" }: { className?: string }) {
  const trees = [
    { x: 16, w: 44, h: 250 }, { x: 62, w: 34, h: 196 }, { x: 100, w: 26, h: 150 },
    { x: 264, w: 26, h: 150 }, { x: 296, w: 34, h: 196 }, { x: 334, w: 44, h: 250 },
  ];
  return (
    <svg className={`pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full ${className}`} viewBox="0 0 390 300" preserveAspectRatio="xMidYMax slice" aria-hidden>
      {trees.map((t, i) => (
        <g key={i} opacity={0.42 + (i % 3) * 0.12}>
          <path d={`M${t.x + t.w / 2} ${300 - t.h} C ${t.x} ${300 - t.h * 0.45}, ${t.x + 3} 300, ${t.x + t.w / 2} 300 C ${t.x + t.w - 3} 300, ${t.x + t.w} ${300 - t.h * 0.45}, ${t.x + t.w / 2} ${300 - t.h} Z`} fill={i % 2 ? GREEN_D : GREEN_M} />
        </g>
      ))}
      <g opacity=".9">
        <Bloom x={30} y={252} s={0.8} />
        <Bloom x={74} y={278} s={0.62} />
        <Bloom x={318} y={258} s={0.75} />
        <Bloom x={356} y={284} s={0.6} />
      </g>
    </svg>
  );
}
