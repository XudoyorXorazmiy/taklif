import "server-only";
import { ImageResponse } from "next/og";
import { t } from "./i18n";
import { loadOgFont } from "./og-fonts";
import type { Locale } from "./generated/prisma/client";
import type { TemplateMeta } from "@/templates/types";

export const OG_SIZE = { width: 1200, height: 630 };

interface Params {
  meta: TemplateMeta;
  locale: Locale;
  groom: string;
  bride: string;
  dateLine: string;
  footer: string;
}

/** Telegram/WhatsApp preview — dizayndagi "telegram preview" taxtasi, shablon uslubida */
export async function renderOg({ meta, locale, groom, bride, dateLine, footer }: Params) {
  const L = t(locale);
  const o = meta.og;

  const [script, serif, sans] = await Promise.all([loadOgFont(o.script, `${groom}&${bride} `), loadOgFont(o.serif), loadOgFont("manrope")]);
  const fonts = [
    script && { name: "Script", data: script, style: "normal" as const },
    serif && { name: "Serif", data: serif, style: "normal" as const },
    sans && { name: "Sans", data: sans, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; style: "normal" }[];

  const scriptFamily = script ? "Script" : "serif";
  const serifFamily = serif ? "Serif" : "serif";
  const sansFamily = sans ? "Sans" : "sans-serif";
  const big = o.script === "pinyon" ? 104 : o.script === "cormorantItalic" ? 96 : 120;
  const scriptStyle = o.script === "cormorantItalic" ? ("italic" as const) : ("normal" as const);
  const ovalSvg =
    o.frame === "oval"
      ? `url("data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect x='80' y='55' width='1040' height='520' rx='260' fill='none' stroke='${o.accent}' stroke-width='1.5'/><rect x='68' y='43' width='1064' height='544' rx='272' fill='none' stroke='${o.accent}' stroke-width='1.5' stroke-dasharray='6 6' opacity='0.4'/></svg>`,
        )}")`
      : undefined;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, background: o.bg, ...(ovalSvg ? { backgroundImage: ovalSvg, backgroundSize: "1200px 630px" } : {}), color: o.text, position: "relative", fontFamily: sansFamily }}>
        {o.frame === "square" && (
          <>
            <div style={{ position: "absolute", top: 28, left: 28, right: 28, bottom: 28, border: `1px solid ${o.accent}` }} />
            <div style={{ position: "absolute", top: 36, left: 36, right: 36, bottom: 36, border: `1px solid ${o.accent}`, opacity: 0.45 }} />
          </>
        )}
        <div style={{ fontSize: 16, letterSpacing: 6.4, textTransform: "uppercase", color: o.accent, fontWeight: 500 }}>{L.introEyebrow}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontFamily: scriptFamily, fontStyle: scriptStyle, fontSize: bride ? big : Math.round(big * 0.8), lineHeight: 1.1, textAlign: "center", maxWidth: 1000 }}>{groom}</span>
          {bride && <span style={{ fontFamily: o.script === "vibes" ? scriptFamily : serifFamily, fontSize: o.script === "vibes" ? 72 : 60, color: o.accent, lineHeight: 1 }}>&amp;</span>}
          {bride && <span style={{ fontFamily: scriptFamily, fontStyle: scriptStyle, fontSize: big, lineHeight: 1 }}>{bride}</span>}
        </div>
        {o.frame === "square" && <div style={{ width: 80, height: 1, background: o.accent }} />}
        <div style={{ fontFamily: serifFamily, fontSize: o.serif === "marcellus" ? 26 : 28, letterSpacing: 5.6 }}>{dateLine}</div>
        <div style={{ position: "absolute", bottom: 52, fontSize: 14, letterSpacing: 2.8, textTransform: "uppercase", color: o.muted, fontWeight: 500 }}>{footer}</div>
      </div>
    ),
    { ...OG_SIZE, ...(fonts.length ? { fonts } : {}) },
  );
}
