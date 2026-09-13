import { shade } from "./PaperEnvelope";

/**
 * Qorong'i qog'oz ustida o'yilgan qog'oz to'r (doily) — to'liq SVG.
 * Ochilganda to'r kattalashib yo'qoladi (.intro-oval).
 */

const VW = 300;
const VH = 420;
const OX = 150;
const OY = 210;
const A = 140;
const B = 200;

const at = (s: number, t: number) => [OX + A * s * Math.cos(t), OY + B * s * Math.sin(t)] as const;
const f1 = (n: number) => n.toFixed(1);

const OUTER = (() => {
  const pts: string[] = [];
  const N = 720;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = 1 - 0.05 * Math.pow(1 - Math.abs(Math.sin(30 * t)), 1.7);
    const [x, y] = at(r, t);
    pts.push(`${f1(x)} ${f1(y)}`);
  }
  return `M${pts.join(" L")} Z`;
})();

function ring(n: number, s: number, offset = 0) {
  return Array.from({ length: n }, (_, i) => {
    const t = ((i + offset) / n) * Math.PI * 2;
    const [x, y] = at(s, t);
    const ang = (Math.atan2(B * Math.sin(t), A * Math.cos(t)) * 180) / Math.PI;
    return { x, y, ang };
  });
}

export function LaceOval({ initials, eyebrow, open, hint }: { initials: string; eyebrow: string; open: string; hint: string }) {
  const bg = "#2A1C15";
  const lace = "#EDE3CF";
  const inner = "#F4EDDF";
  const gold = "#B9975A";
  const ink = "#3A281E";

  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{ background: `radial-gradient(110% 75% at 50% 42%, ${shade(bg, 0.05)} 0%, ${bg} 55%, ${shade(bg, -0.06)} 100%)` }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <filter id="lace-bg-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="9" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 .08  0 0 0 0 .05  0 0 0 0 .03  1.1 0 0 0 -.45" />
        </filter>
        <filter id="lace-bg-fiber" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".05 .14" numOctaves="3" seed="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 .55  0 0 0 0 .42  0 0 0 0 .3  .9 0 0 0 -.42" />
        </filter>
        <rect width="100%" height="100%" filter="url(#lace-bg-fiber)" opacity=".18" />
        <rect width="100%" height="100%" filter="url(#lace-bg-grain)" opacity=".7" />
      </svg>

      <div className="relative [container-type:inline-size]" style={{ width: "min(100vw, 430px, calc(100dvh * 390 / 844))", aspectRatio: "390 / 844" }}>
        <div className="absolute inset-x-0 mx-auto [container-type:inline-size]" style={{ top: "15%", width: "78%", aspectRatio: `${VW} / ${VH}` }}>
          <div className="intro-oval relative h-full w-full" style={{ filter: "drop-shadow(0 16px 26px rgba(0,0,0,.5))" }}>
            <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <clipPath id="lace-clip">
                  <path d={OUTER} />
                </clipPath>
                <filter id="lace-grain" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="5" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0 0 0 0 .35  0 0 0 0 .28  0 0 0 0 .2  1.1 0 0 0 -.52" />
                </filter>
                <radialGradient id="lace-shade" cx="42%" cy="36%" r="70%">
                  <stop offset="0" stopColor={shade(lace, 0.02)} />
                  <stop offset="1" stopColor={shade(lace, -0.05)} />
                </radialGradient>
              </defs>
              <path d={OUTER} fill="url(#lace-shade)" />
              {/* Tashqi teshikchalar qatori */}
              {ring(60, 0.915).map((p, i) => (
                <ellipse key={`h${i}`} cx={f1(p.x)} cy={f1(p.y)} rx="2.2" ry="4.4" fill={bg} transform={`rotate(${f1(p.ang + 90)} ${f1(p.x)} ${f1(p.y)})`} />
              ))}
              {/* Gulbarg o'yiqlari */}
              {ring(34, 0.815).map((p, i) => (
                <ellipse key={`p${i}`} cx={f1(p.x)} cy={f1(p.y)} rx="4.2" ry="9.5" fill={bg} transform={`rotate(${f1(p.ang + 90)} ${f1(p.x)} ${f1(p.y)})`} />
              ))}
              {ring(34, 0.815, 0.5).map((p, i) => (
                <circle key={`c${i}`} cx={f1(p.x)} cy={f1(p.y)} r="2.1" fill={bg} />
              ))}
              {ring(76, 0.735).map((p, i) => (
                <circle key={`d${i}`} cx={f1(p.x)} cy={f1(p.y)} r="1.15" fill={bg} />
              ))}
              <ellipse cx={OX} cy={OY} rx={A * 0.7} ry={B * 0.7} fill="none" stroke={bg} strokeWidth="1.5" />
              <ellipse cx={OX} cy={OY} rx={A * 0.675} ry={B * 0.675} fill={inner} />
              <ellipse cx={OX} cy={OY} rx={A * 0.645} ry={B * 0.645} fill="none" stroke={gold} strokeWidth=".8" opacity=".8" />
              <g clipPath="url(#lace-clip)">
                <rect width={VW} height={VH} filter="url(#lace-grain)" opacity=".55" />
              </g>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4.5cqw] text-center">
              <div className="whitespace-nowrap text-[3.3cqw] font-medium uppercase tracking-[.26em]" style={{ color: shade(gold, -0.12) }}>
                {eyebrow}
              </div>
              <div className="whitespace-nowrap font-ab text-[17cqw] leading-[1.05]" style={{ color: ink }}>
                {initials}
              </div>
              <div className="h-px w-[13cqw]" style={{ background: gold }} />
              <div className="flex h-[14cqw] items-center justify-center rounded-full border px-[8cqw] text-[3.9cqw] font-semibold uppercase tracking-[.16em]" style={{ borderColor: `${ink}55`, color: ink }}>
                {open}
              </div>
            </div>
          </div>
        </div>
        <div className="intro-hint absolute inset-x-0 flex flex-col items-center gap-2 text-center text-[#F1E6D2]/65" style={{ top: "84%" }}>
          <svg width="18" height="10" viewBox="0 0 18 10" className="soft-pulse" aria-hidden>
            <path d="M1 9 L9 1 L17 9" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="whitespace-nowrap font-cg text-[3.2cqw] font-medium uppercase tracking-[.24em]">{hint}</span>
        </div>
      </div>
    </div>
  );
}
