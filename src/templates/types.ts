import type { ReactNode } from "react";
import type { InvitationContent } from "@/lib/content";
import type { Locale } from "@/lib/generated/prisma/client";

/** Shablonga uzatiladigan to'liq ma'lumot (bazadan olingan, JSON parse qilingan) */
export interface InvitationData {
  id: string;
  slug: string;
  locale: Locale;
  groomName: string;
  brideName: string;
  eventAt: Date;
  coverImage: string | null;
  gallery: string[];
  music: string | null;
  content: InvitationContent;
}

export interface TemplateProps {
  data: InvitationData;
  /** ?m=Ali+aka — shaxsiy murojaat */
  guest?: string;
  /** Admin preview'da RSVP yuborilmaydi */
  preview?: boolean;
  /** Bo'sh rasm/illyustratsiya joylarini shtrix chiziq bilan ko'rsatish (asset spetsifikatsiyasi) */
  slots?: boolean;
}

export type TemplateComponent = (props: TemplateProps) => ReactNode;

export interface TemplateMeta {
  id: string;
  name: string;
  /** "classic" | "floral" | "dark" | "national" | "minimal" */
  category: string;
  description: string;
  /** Katalog uchun rasm: /templates/<id>.jpg */
  thumbnail: string;
  /** Desktopda yon tomon fon rangi */
  frameColor: string;
  /** Qaysi bloklarni qo'llab-quvvatlaydi (hammasi bo'lmasa) */
  blocks?: (keyof InvitationContent["blocks"])[];
  /** Telegram preview (OG rasm) uslubi */
  og: {
    bg: string;
    text: string;
    accent: string;
    muted: string;
    script: "pinyon" | "vibes" | "alex" | "cormorantItalic";
    serif: "cormorant" | "marcellus";
    frame: "square" | "oval" | "none";
  };
}
