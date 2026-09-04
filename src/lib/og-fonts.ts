import "server-only";

/**
 * OG rasm uchun Google Fonts'dan TTF olish (next/og faqat TTF/OTF/WOFF qabul qiladi).
 * Natija modul darajasida keshlanadi.
 */
const FAMILIES: Record<string, string> = {
  pinyon: "Pinyon+Script",
  vibes: "Great+Vibes",
  alex: "Alex+Brush",
  cormorantItalic: "Cormorant+Garamond:ital,wght@1,600",
  cormorant: "Cormorant+Garamond:wght@500",
  marcellus: "Marcellus",
  manrope: "Manrope:wght@500",
};

const cache = new Map<string, Promise<ArrayBuffer | null>>();

export function loadOgFont(key: string, text?: string): Promise<ArrayBuffer | null> {
  const family = FAMILIES[key];
  if (!family) return Promise.resolve(null);
  const cacheKey = `${key}:${text ?? ""}`;
  if (!cache.has(cacheKey)) {
    cache.set(
      cacheKey,
      (async () => {
        try {
          const sub = key === "cormorantItalic" || key === "cormorant" || key === "manrope" ? "&subset=latin,latin-ext,cyrillic" : "";
          const url = `https://fonts.googleapis.com/css2?family=${family}${text ? `&text=${encodeURIComponent(text)}` : ""}${sub}`;
          // Eski UA → TTF (woff2 emas)
          const css = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" } }).then((r) => r.text());
          const m = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/);
          if (!m) return null;
          return await fetch(m[1]).then((r) => r.arrayBuffer());
        } catch {
          return null;
        }
      })(),
    );
  }
  return cache.get(cacheKey)!;
}
