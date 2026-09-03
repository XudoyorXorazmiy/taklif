export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.toLowerCase() ?? "taklif.site";

/** Subdomen sifatida ishlatib bo'lmaydigan nomlar */
export const RESERVED_SLUGS = new Set([
  "www",
  "admin",
  "api",
  "app",
  "mail",
  "test",
  "demo",
  "static",
  "cdn",
]);

/** Slug: faqat lotin kichik harf, raqam va defis, 3–40 belgi */
export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/;

export function invitationUrl(slug: string): string {
  const proto = ROOT_DOMAIN.includes("localhost") ? "http" : "https";
  return `${proto}://${slug}.${ROOT_DOMAIN}`;
}

/** Ism → slug: "Nodirbek" + "Malika" → "nodirbek-malika" */
export function slugify(...parts: string[]): string {
  return parts
    .join(" ")
    .toLowerCase()
    .replace(/[ʻʼ'`’‘]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/** Admin ro'yxati va sarlavhalar uchun: ismlar yoki muqova matni */
export function displayName(inv: { groomName: string; brideName: string; content?: unknown }): string {
  const title = ((inv.content as { hero?: { title?: string } } | null)?.hero?.title ?? "").trim();
  const names = [inv.groomName, inv.brideName].filter(Boolean).join(" & ");
  return names || title || "Taklifnoma";
}
