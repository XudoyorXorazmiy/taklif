import "server-only";
import { prisma } from "./db";
import { templates as registry, getTemplateMeta } from "@/templates/registry";
import type { TemplateMeta } from "@/templates/types";

/** Katalog kartasi: kod (registry) + admin kiritgan ma'lumot (DB) */
export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  body: string;
  category: string;
  price: number | null;
  thumbnail: string | null;
  screens: string[];
  features: string[];
  published: boolean;
  badge: string | null;
  sortOrder: number;
  /** Koddan: yon fon rangi, OG palitrasi */
  meta: TemplateMeta;
}

function fromRegistry(m: TemplateMeta, i: number): CatalogItem {
  return {
    id: m.id,
    name: m.name,
    description: m.description,
    body: "",
    category: m.category,
    price: null,
    thumbnail: null,
    screens: [],
    features: [],
    published: true,
    badge: null,
    sortOrder: i,
    meta: m,
  };
}

/**
 * Barcha shablonlar (admin uchun). DB'da yozuv bo'lmasa registry'dan olinadi.
 * DB ulanmagan bo'lsa (masalan, prod'da hali DATABASE_URL yo'q) registry qaytadi.
 */
export async function getCatalogAll(): Promise<CatalogItem[]> {
  let rows: Awaited<ReturnType<typeof prisma.template.findMany>> = [];
  try {
    rows = await prisma.template.findMany();
  } catch {
    rows = [];
  }
  const byId = new Map(rows.map((r) => [r.id, r]));
  const items = registry.map((m, i) => {
    const r = byId.get(m.id);
    if (!r) return fromRegistry(m, i);
    return { ...r, meta: m };
  });
  return items.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

/** Faqat nashr qilinganlar (katalog, landing) */
export async function getCatalog(): Promise<CatalogItem[]> {
  return (await getCatalogAll()).filter((t) => t.published);
}

export async function getCatalogItem(id: string): Promise<CatalogItem | null> {
  const m = getTemplateMeta(id);
  if (!m) return null;
  return (await getCatalogAll()).find((t) => t.id === id) ?? null;
}
