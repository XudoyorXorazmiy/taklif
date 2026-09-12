import "server-only";
import { cache } from "react";
import { prisma } from "./db";
import { parseContent } from "./content";
export { isExpired, isLive, isTrial } from "./lifecycle";
import type { InvitationData } from "@/templates/types";

/** Subdomen bo'yicha nashr qilingan taklifnoma (sahifa va OG rasm bir so'rovda ulashadi) */
export const getPublishedBySlug = cache(async (slug: string) => {
  const inv = await prisma.invitation.findUnique({ where: { slug } });
  if (!inv) return null;
  return inv;
});

export function toTemplateData(inv: {
  id: string;
  slug: string;
  locale: InvitationData["locale"];
  groomName: string;
  brideName: string;
  eventAt: Date;
  coverImage: string | null;
  gallery: string[];
  music: string | null;
  content: unknown;
}): InvitationData {
  return {
    id: inv.id,
    slug: inv.slug,
    locale: inv.locale,
    groomName: inv.groomName,
    brideName: inv.brideName,
    eventAt: inv.eventAt,
    coverImage: inv.coverImage,
    gallery: inv.gallery,
    music: inv.music,
    content: parseContent(inv.content),
  };
}

