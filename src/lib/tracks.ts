import "server-only";
import { prisma } from "./db";

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  url: string;
  seconds: number | null;
  published: boolean;
  sortOrder: number;
}

const order = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

/** Mijozga ko'rinadigan qo'shiqlar (bot va taklifnoma formasi) */
export async function getTracks(): Promise<TrackItem[]> {
  try {
    return await prisma.track.findMany({ where: { published: true }, orderBy: order });
  } catch {
    return [];
  }
}

/** Hammasi (admin ro'yxati) */
export async function getAllTracks(): Promise<TrackItem[]> {
  try {
    return await prisma.track.findMany({ orderBy: order });
  } catch {
    return [];
  }
}

export const trackLabel = (t: { title: string; artist: string }) => (t.artist ? `${t.title} — ${t.artist}` : t.title);
