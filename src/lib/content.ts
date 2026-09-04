import { z } from "zod";

/**
 * Taklifnoma bloklari mazmuni. Invitation.content JSON ustunida saqlanadi.
 * Har bir shablon shu ma'lumotni o'z dizaynida ko'rsatadi.
 */

export const venueSchema = z.object({
  /** "Nikoh to'yi", "Kelin salom" — bir nechta tadbir bo'lsa */
  title: z.string().default(""),
  /** "18:00" — asosiy eventAt'dan farq qilsa */
  time: z.string().default(""),
  name: z.string().default(""),
  address: z.string().default(""),
  mapUrl: z.string().default(""),
  /** To'yxona rasmi yoki illyustratsiya (Blob URL) */
  image: z.string().default(""),
});

export const scheduleItemSchema = z.object({
  time: z.string().default(""),
  title: z.string().default(""),
  note: z.string().default(""),
});

export const detailSchema = z.object({
  title: z.string().default(""),
  text: z.string().default(""),
});

export const contactSchema = z.object({
  name: z.string().default(""),
  phone: z.string().default(""),
  telegram: z.string().default(""),
});

export const blocksSchema = z.object({
  greeting: z.boolean().default(true),
  date: z.boolean().default(true),
  countdown: z.boolean().default(true),
  schedule: z.boolean().default(true),
  venues: z.boolean().default(true),
  details: z.boolean().default(false),
  dressCode: z.boolean().default(false),
  gallery: z.boolean().default(false),
  rsvp: z.boolean().default(true),
  contacts: z.boolean().default(false),
  closing: z.boolean().default(true),
});

export const contentSchema = z.object({
  /** Bloklarni yoqish/o'chirish */
  blocks: blocksSchema.prefault({}),

  hero: z
    .object({
      /** "TO'Y KUNI" / "Nikoh to'yi" kabi kichik yozuv */
      eyebrow: z.string().default(""),
      /** Muqovadagi qisqa satr: "Ikki qalb · Bir taqdir" */
      tagline: z.string().default(""),
      /** Konvert/ochilish ekranini ko'rsatish */
      intro: z.boolean().default(true),
      /** Ismlar o'rniga muqovada chiqadigan matn ("Ehtirom ila" kabi). Bo'sh bo'lsa ismlar */
      title: z.string().default(""),
      /** Konvert muhri / monogram harflari ("N&M"). Bo'sh bo'lsa ismlarning bosh harfi */
      initials: z.string().default(""),
      /** Soat kiritilmagan bo'lsa false — sana blokida va preview'da vaqt chiqmaydi */
      showTime: z.boolean().default(true),
    })
    .prefault({}),

  /** Blok sarlavhalari: bo'sh — standart yorliq, "-" — yashirish */
  labels: z
    .object({
      dateTitle: z.string().default(""),
      scheduleEyebrow: z.string().default(""),
      scheduleTitle: z.string().default(""),
      venueEyebrow: z.string().default(""),
      venueTitle: z.string().default(""),
      detailsTitle: z.string().default(""),
      dressCodeTitle: z.string().default(""),
      galleryEyebrow: z.string().default(""),
      galleryTitle: z.string().default(""),
      rsvpTitle: z.string().default(""),
      contactsTitle: z.string().default(""),
    })
    .prefault({}),

  greeting: z
    .object({
      title: z.string().default("Aziz mehmonlar!"),
      text: z.string().default(""),
    })
    .prefault({}),

  venues: z.array(venueSchema).default([]),
  schedule: z.array(scheduleItemSchema).default([]),
  details: z.array(detailSchema).default([]),

  dressCode: z
    .object({
      text: z.string().default(""),
      colors: z.array(z.string()).default([]),
    })
    .prefault({}),

  rsvp: z
    .object({
      /** "9-avgustgacha javob bering" */
      deadline: z.string().default(""),
      askGuests: z.boolean().default(true),
      askNote: z.boolean().default(true),
      /** Telefon raqamini so'rash (premium shablonlarda) */
      askPhone: z.boolean().default(false),
      thanks: z.string().default(""),
    })
    .prefault({}),

  contacts: z.array(contactSchema).default([]),

  /** Blok fon rasmlari (Blob URL). Faqat fonli shablonlar ishlatadi. */
  backgrounds: z
    .object({
      cover: z.string().default(""),
      greeting: z.string().default(""),
      date: z.string().default(""),
      countdown: z.string().default(""),
      schedule: z.string().default(""),
      venue: z.string().default(""),
      details: z.string().default(""),
      dressCode: z.string().default(""),
      gallery: z.string().default(""),
      rsvp: z.string().default(""),
      contacts: z.string().default(""),
      closing: z.string().default(""),
    })
    .prefault({}),

  closing: z
    .object({
      text: z.string().default("Sizni intiqlik bilan kutamiz!"),
      /** "Hurmat bilan, Nodirbek va Malika" o'rniga o'z imzosi (ko'p qatorli) */
      signature: z.string().default(""),
    })
    .prefault({}),
});

export type InvitationContent = z.infer<typeof contentSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type ScheduleItem = z.infer<typeof scheduleItemSchema>;

export function parseContent(raw: unknown): InvitationContent {
  const r = contentSchema.safeParse(raw ?? {});
  return r.success ? r.data : contentSchema.parse({});
}

export const defaultContent = (): InvitationContent =>
  contentSchema.parse({
    greeting: {
      title: "Aziz do'stlar va yaqinlar!",
      text: "Hayotimizdagi eng baxtli kunda sizni oramizda ko'rishdan mamnun bo'lamiz. Bu kunni birga nishonlaylik!",
    },
    schedule: [
      { time: "17:00", title: "Mehmonlarni kutib olish" },
      { time: "18:00", title: "Nikoh marosimi" },
      { time: "19:00", title: "Ziyofat" },
      { time: "21:00", title: "Raqs va musiqa" },
    ],
    venues: [{ title: "To'y", name: "", address: "", mapUrl: "" }],
    rsvp: { deadline: "", thanks: "Rahmat! Javobingiz qabul qilindi." },
  });
