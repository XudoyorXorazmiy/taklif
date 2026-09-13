/**
 * Real qog'oz konvert — to'liq SVG, tashqi rasm yo'q:
 * qog'oz donadorligi va tolalari, bosma (blind emboss) naqsh, burma soyalari,
 * notekis chetli surg'uch muhr va unga o'yilgan harflar.
 * Ochilish ketma-ketligi globals.css da: muhr sinadi → qopqoq ochiladi → sahifa.
 */

export interface EnvelopeTheme {
  /** Konvert atrofidagi fon (desktopda ko'rinadi) */
  outer: string;
  paper: string;
  side: string;
  bottom: string;
  top: string;
  emboss: "vines" | "eucalyptus";
  /** Bosma naqsh rangi — qog'ozga juda yaqin bo'lishi kerak */
  embossTone: string;
  /** Muhr: och, asosiy, to'q */
  seal: [string, string, string];
  sealText: string;
  sealFont: string;
  sealItalic?: boolean;
  /** "Ochish uchun bosing" rangi */
  ink: string;
  /** Konvert ustidan o'tgan lenta */
  ribbon?: string;
  /** Lenta ostiga qistirilgan quruq gul shoxchasi */
  sprig?: boolean;
}

const W = 390;
const H = 844;
const CX = 195;
const CY = 470;
const FLAP_H = 490;

export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + amt * 255)));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => f(c).toString(16).padStart(2, "0")).join("")}`;
}

type Leaf = { x: number; y: number; rx: number; ry: number; rot: number };
type Motif = { stems: string[]; leaves: Leaf[]; flowers: { x: number; y: number }[] };

/** Egilgan shox bo'ylab barglar va gullar (deterministik — SSR/hydration mos) */
function vine(x0: number, y0: number, y1: number, sway: number, phase: number, kind: EnvelopeTheme["emboss"]): Motif {
  const len = y1 - y0;
  const k = Math.PI * 2.2;
  const xAt = (t: number) => x0 + sway * Math.sin(t * k + phase);
  const steps = Math.max(10, Math.round(Math.abs(len) / 5));
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push(`${xAt(t).toFixed(1)} ${(y0 + len * t).toFixed(1)}`);
  }
  const leaves: Leaf[] = [];
  const flowers: { x: number; y: number }[] = [];
  const gap = kind === "vines" ? 24 : 27;
  const n = Math.max(2, Math.floor(Math.abs(len) / gap));
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const x = xAt(t);
    const y = y0 + len * t;
    const side = i % 2 ? 1 : -1;
    const slope = (Math.cos(t * k + phase) * sway * k) / len;
    const ang = (Math.atan(slope) * 180) / Math.PI;
    if (kind === "vines") {
      leaves.push({ x: x + side * 7.5, y: y - 2, rx: 7.8, ry: 3.3, rot: ang + side * 40 });
      if (i % 4 === 2) flowers.push({ x: x - side * 11, y: y + 5 });
    } else {
      leaves.push({ x: x + side * 6.8, y, rx: 5.8, ry: 4.8, rot: ang + side * 18 });
    }
  }
  if (kind === "vines") flowers.push({ x: xAt(1), y: y1 });
  return { stems: [`M${pts.join(" L")}`], leaves, flowers };
}

function merge(...m: Motif[]): Motif {
  return { stems: m.flatMap((x) => x.stems), leaves: m.flatMap((x) => x.leaves), flowers: m.flatMap((x) => x.flowers) };
}

function Shapes({ m, color }: { m: Motif; color: string }) {
  return (
    <>
      {m.stems.map((d, i) => (
        <path key={`s${i}`} d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {m.leaves.map((l, i) => (
        <ellipse key={`l${i}`} cx={l.x.toFixed(1)} cy={l.y.toFixed(1)} rx={l.rx} ry={l.ry} transform={`rotate(${l.rot.toFixed(1)} ${l.x.toFixed(1)} ${l.y.toFixed(1)})`} fill={color} />
      ))}
      {m.flowers.map((f, i) => (
        <g key={`f${i}`} transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-4.8" rx="3.3" ry="4.6" transform={`rotate(${a})`} fill={color} />
          ))}
          <circle r="2" fill={color} />
        </g>
      ))}
    </>
  );
}

/** Ko'r bosma: pastki-o'ngga soya, yuqori-chapga yorug'lik, ustida qog'oz rangi */
function Emboss({ m, tone, id }: { m: Motif; tone: string; id: string }) {
  return (
    <g>
      <g transform="translate(.9 1.2)" filter={`url(#${id}-soft)`}>
        <Shapes m={m} color="rgba(70,52,28,.26)" />
      </g>
      <g transform="translate(-.8 -1)" filter={`url(#${id}-soft)`}>
        <Shapes m={m} color="rgba(255,255,255,.8)" />
      </g>
      <Shapes m={m} color={tone} />
    </g>
  );
}

function PaperDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-soft`} x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation=".6" />
      </filter>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="11" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 .3  0 0 0 0 .24  0 0 0 0 .17  1.1 0 0 0 -.5" />
      </filter>
      <filter id={`${id}-fiber`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".06 .16" numOctaves="3" seed="4" />
        <feColorMatrix type="matrix" values="0 0 0 0 .36  0 0 0 0 .3  0 0 0 0 .22  1 0 0 0 -.44" />
      </filter>
      <filter id={`${id}-lift`} x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="-2" stdDeviation="2.6" floodColor="#2e2010" floodOpacity=".13" />
      </filter>
    </defs>
  );
}

const SEAL_PATH = (() => {
  const pts: string[] = [];
  const N = 90;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = 44 + 2.4 * Math.sin(5 * a + 0.6) + 1.7 * Math.sin(9 * a + 1.9) + 1.1 * Math.sin(14 * a + 0.3);
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
})();

export function WaxSeal({ theme, initials, id }: { theme: EnvelopeTheme; initials: string; id: string }) {
  const [light, mid, dark] = theme.seal;
  const size = initials.length <= 3 ? 25 : initials.length <= 5 ? 19 : 14;
  const text = (fill: string, dy: number, opacity = 1) => (
    <text
      x="50"
      y={50 + dy}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={size}
      fill={fill}
      opacity={opacity}
      style={{ fontFamily: theme.sealFont, fontStyle: theme.sealItalic ? "italic" : "normal", fontWeight: 500 }}
    >
      {initials}
    </text>
  );
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id={`${id}-wax`} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor={light} />
          <stop offset=".5" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
        <radialGradient id={`${id}-well`} cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor={shade(mid, 0.02)} />
          <stop offset="1" stopColor={shade(dark, 0.03)} />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <path d={SEAL_PATH} fill={`url(#${id}-wax)`} />
      <path d={SEAL_PATH} fill="none" stroke={shade(dark, -0.06)} strokeWidth=".9" opacity=".55" />
      <circle cx="50" cy="50" r="37" fill="none" stroke={light} strokeWidth=".8" opacity=".28" />
      <circle cx="50" cy="50" r="32.5" fill={`url(#${id}-well)`} />
      <circle cx="50" cy="50" r="32.5" fill="none" stroke={shade(dark, -0.1)} strokeWidth="1.8" opacity=".5" transform="translate(-.3 -.9)" />
      <circle cx="50" cy="50" r="32.5" fill="none" stroke={light} strokeWidth="1.1" opacity=".38" transform="translate(.3 .9)" />
      <ellipse cx="35" cy="27" rx="15" ry="7" fill="#fff" opacity=".3" filter={`url(#${id}-blur)`} transform="rotate(-32 35 27)" />
      {text(shade(dark, -0.12), -0.8, 0.75)}
      {text(light, 0.9, 0.35)}
      {text(theme.sealText, 0)}
    </svg>
  );
}

function Ribbon({ color, id, y0, y1 }: { color: string; id: string; y0: number; y1: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-satin`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(color, -0.1)} />
          <stop offset=".3" stopColor={color} />
          <stop offset=".5" stopColor={shade(color, 0.05)} />
          <stop offset=".72" stopColor={color} />
          <stop offset="1" stopColor={shade(color, -0.12)} />
        </linearGradient>
      </defs>
      <rect x={CX - 14} y={y0} width="28" height={y1 - y0} fill={`url(#${id}-satin)`} />
      <rect x={CX - 14} y={y0} width="1" height={y1 - y0} fill="rgba(0,0,0,.08)" />
      <rect x={CX + 13} y={y0} width="1" height={y1 - y0} fill="rgba(0,0,0,.1)" />
    </>
  );
}

function Sprig() {
  const leaves = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g>
      {[
        { d: `M${CX} ${CY + 4} C 170 530, 150 570, 118 626`, dir: -1 },
        { d: `M${CX} ${CY + 4} C 215 520, 240 556, 262 598`, dir: 1 },
      ].map((s, j) => (
        <g key={j}>
          <path d={s.d} stroke="#8C7A55" strokeWidth="1.3" fill="none" />
          {leaves.map((i) => {
            const t = (i + 1) / 8;
            const x = CX + s.dir * (t * (j ? 67 : 77));
            const y = CY + 8 + t * (j ? 125 : 150);
            return (
              <g key={i}>
                <ellipse cx={x + s.dir * 5} cy={y} rx="6" ry="2.6" fill="#A8A07F" opacity=".85" transform={`rotate(${s.dir * 35} ${x} ${y})`} />
                {i % 2 === 0 && <circle cx={x - s.dir * 6} cy={y - 3} r="3" fill="#F5F0E3" stroke="#D9CFB4" strokeWidth=".5" />}
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
}

export function PaperEnvelope({ theme, initials, hint, id = "env" }: { theme: EnvelopeTheme; initials: string; hint: string; id?: string }) {
  const k = theme.emboss;
  const baseMotif = merge(
    vine(40, 140, 790, 9, 0, k),
    vine(350, 140, 790, 9, Math.PI, k),
    ...(theme.ribbon ? [] : [vine(150, 830, 640, 7, 1.2, k), vine(240, 830, 640, 7, 4.3, k)]),
  );
  const flapMotif = merge(vine(112, 22, 214, 6, 0.4, k), vine(278, 22, 214, 6, 3.5, k));

  const left = `M0 0 Q 118 250 ${CX} ${CY} Q 118 700 0 ${H} Z`;
  const right = `M${W} 0 Q ${W - 118} 250 ${CX} ${CY} Q ${W - 118} 700 ${W} ${H} Z`;
  const bottom = `M0 ${H} Q 128 640 ${CX} ${CY - 12} Q ${W - 128} 640 ${W} ${H} Z`;
  const topFlap = `M0 0 L${W} 0 Q ${W - 104} 236 ${CX} ${FLAP_H - 6} Q 104 236 0 0 Z`;

  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{ background: `radial-gradient(120% 80% at 50% 45%, ${shade(theme.outer, 0.03)} 0%, ${theme.outer} 58%, ${shade(theme.outer, -0.06)} 100%)` }}
    >
      <div className="relative [container-type:inline-size]" style={{ width: "min(100vw, 430px, calc(100dvh * 390 / 844))", aspectRatio: "390 / 844", perspective: "1500px" }}>
        {/* Orqa panel, yon va pastki qopqoqlar */}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <PaperDefs id={id} />
          <defs>
            <linearGradient id={`${id}-gl`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={shade(theme.side, 0.015)} />
              <stop offset="1" stopColor={shade(theme.side, -0.035)} />
            </linearGradient>
            <linearGradient id={`${id}-gr`} x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor={shade(theme.side, 0.01)} />
              <stop offset="1" stopColor={shade(theme.side, -0.04)} />
            </linearGradient>
            <linearGradient id={`${id}-gb`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={shade(theme.bottom, 0.015)} />
              <stop offset="1" stopColor={shade(theme.bottom, -0.045)} />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill={theme.paper} />
          <path d={left} fill={`url(#${id}-gl)`} />
          <path d={right} fill={`url(#${id}-gr)`} />
          <path d={bottom} fill={`url(#${id}-gb)`} filter={`url(#${id}-lift)`} />
          <path d={bottom} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth=".8" transform="translate(0 1)" />
          <Emboss m={baseMotif} tone={theme.embossTone} id={id} />
          {theme.ribbon && <Ribbon color={theme.ribbon} id={id} y0={CY - 20} y1={H} />}
          {theme.sprig && <Sprig />}
          <rect width={W} height={H} filter={`url(#${id}-fiber)`} opacity=".22" />
          <rect width={W} height={H} filter={`url(#${id}-grain)`} opacity=".6" />
        </svg>

        {/* Yuqori qopqoq — ochilganda yuqoriga buriladi */}
        <div className="envelope-flap absolute inset-x-0 top-0" style={{ height: `${(FLAP_H / H) * 100}%`, filter: "drop-shadow(0 4px 6px rgba(55,38,15,.16))" }}>
          <svg viewBox={`0 0 ${W} ${FLAP_H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            <PaperDefs id={`${id}f`} />
            <defs>
              <linearGradient id={`${id}-gt`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={shade(theme.top, 0.01)} />
                <stop offset=".75" stopColor={theme.top} />
                <stop offset="1" stopColor={shade(theme.top, -0.03)} />
              </linearGradient>
              <clipPath id={`${id}-clip`}>
                <path d={topFlap} />
              </clipPath>
            </defs>
            <path d={topFlap} fill={`url(#${id}-gt)`} />
            <g clipPath={`url(#${id}-clip)`}>
              <Emboss m={flapMotif} tone={shade(theme.embossTone, 0.012)} id={`${id}f`} />
              {theme.ribbon && <Ribbon color={theme.ribbon} id={`${id}f`} y0={0} y1={FLAP_H} />}
              <rect width={W} height={FLAP_H} filter={`url(#${id}f-fiber)`} opacity=".2" />
              <rect width={W} height={FLAP_H} filter={`url(#${id}f-grain)`} opacity=".6" />
            </g>
            <path d={topFlap} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth=".9" />
          </svg>
        </div>

        {/* Surg'uch muhr */}
        <div className="absolute" style={{ left: "50%", top: `${(CY / H) * 100}%`, width: "25%", aspectRatio: "1", transform: "translate(-50%, -50%)" }}>
          <div className="wax-seal h-full w-full" style={{ filter: "drop-shadow(0 6px 8px rgba(35,12,8,.34))" }}>
            <WaxSeal theme={theme} initials={initials} id={`${id}-seal`} />
          </div>
        </div>

        <div className="intro-hint absolute inset-x-0 flex flex-col items-center gap-2 text-center" style={{ top: "70.5%", color: theme.ink }}>
          <svg width="18" height="10" viewBox="0 0 18 10" className="soft-pulse" aria-hidden>
            <path d="M1 9 L9 1 L17 9" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="whitespace-nowrap font-cg text-[3.2cqw] font-medium uppercase tracking-[.24em]">{hint}</span>
        </div>
      </div>
    </div>
  );
}
