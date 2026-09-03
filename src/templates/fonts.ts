import { Alex_Brush, Cormorant_Garamond, Great_Vibes, Manrope, Marcellus, Pinyon_Script } from "next/font/google";

/** Dizayndagi shriftlar (Google Fonts). Utilities: font-cg, font-ps, font-gv, font-ab, font-mc, font-mr (globals.css) */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
export const pinyon = Pinyon_Script({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-pinyon", display: "swap" });
export const greatVibes = Great_Vibes({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-vibes", display: "swap" });
export const alexBrush = Alex_Brush({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-alex", display: "swap" });
export const marcellus = Marcellus({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-marcellus", display: "swap" });
export const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["400", "500", "600"], variable: "--font-manrope", display: "swap" });

export const fontVars = [cormorant, pinyon, greatVibes, alexBrush, marcellus, manrope].map((f) => f.variable).join(" ");
