import { z } from "zod";
import { contentSchema } from "./content";
import { RESERVED_SLUGS, SLUG_RE } from "./site";
import { getTemplateMeta } from "@/templates/registry";

export const invitationInput = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(SLUG_RE, "Slug: faqat lotin harf, raqam va defis (3–40 belgi)")
    .refine((s) => !RESERVED_SLUGS.has(s), "Bu nom band"),
  templateId: z.string().refine((id) => !!getTemplateMeta(id), "Shablon topilmadi"),
  locale: z.enum(["UZ", "RU"]),
  groomName: z.string().trim().min(1, "Kuyov ismi kerak").max(60),
  brideName: z.string().trim().min(1, "Kelin ismi kerak").max(60),
  /** "2026-10-12T18:00" — Toshkent vaqti */
  eventAt: z.string().min(1, "Sana kerak"),
  coverImage: z.string().nullable().default(null),
  gallery: z.array(z.string()).default([]),
  music: z.string().nullable().default(null),
  ogImage: z.string().nullable().default(null),
  clientName: z.string().trim().max(100).nullable().default(null),
  clientPhone: z.string().trim().max(30).nullable().default(null),
  price: z.number().int().nonnegative().nullable().default(null),
  paid: z.boolean().default(false),
  note: z.string().trim().max(1000).nullable().default(null),
  expiresAt: z.string().nullable().default(null),
  content: contentSchema,
});

export type InvitationInput = z.infer<typeof invitationInput>;

export const templateInput = z.object({
  name: z.string().trim().min(1, "Nomi kerak").max(80),
  description: z.string().trim().max(300).default(""),
  body: z.string().trim().max(5000).default(""),
  category: z.string().trim().min(1).max(40).default("classic"),
  price: z.number().int().nonnegative().nullable().default(null),
  thumbnail: z.string().nullable().default(null),
  screens: z.array(z.string()).default([]),
  features: z.array(z.string().trim().min(1)).default([]),
  published: z.boolean().default(true),
  badge: z.string().trim().max(30).nullable().default(null),
  sortOrder: z.number().int().default(0),
});
export type TemplateInput = z.infer<typeof templateInput>;
