import { contentSchema } from "./content";
import { DEMO_PHOTOS } from "./demo-photos";
import type { InvitationData } from "@/templates/types";

/** Demo fon musiqasi (Vercel Blob, foydalanuvchi bergan fayl) */
export const DEMO_MUSIC_URL = "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/music/demo-1-TK7P6DwcqMlD413GypB7QoO2keRaVp.mp3";



/** Katalog demo'si va dizayn tekshiruvi uchun namuna ma'lumot */
export function sampleInvitation(locale: "UZ" | "RU" = "UZ"): InvitationData {
  const uz = locale === "UZ";
  return {
    id: "sample",
    slug: "nodirbek-malika",
    locale,
    groomName: "Nodirbek",
    brideName: "Malika",
    eventAt: new Date("2026-10-12T18:00:00+05:00"),
    coverImage: DEMO_PHOTOS.cover,
    gallery: [...DEMO_PHOTOS.gallery],
    music: DEMO_MUSIC_URL,
    content: contentSchema.parse({
      blocks: { details: true, dressCode: true, contacts: true, gallery: true },
      hero: { eyebrow: uz ? "TO'Y KUNI" : "СВАДЬБА", tagline: uz ? "Ikki qalb · Bir taqdir" : "Два сердца · Одна судьба", intro: true },
      greeting: {
        title: uz ? "Aziz do'stlar va yaqinlar!" : "Дорогие родные и друзья!",
        text: uz
          ? "Hayotimizdagi eng baxtli kunda sizni oramizda ko'rishdan mamnun bo'lamiz. Sevgi, kulgu va unutilmas lahzalar bilan to'lgan bu kechani birga nishonlaylik."
          : "Будем рады видеть вас в самый счастливый день нашей жизни. Давайте вместе проведём этот вечер, полный любви, смеха и незабываемых моментов.",
      },
      venues: [
        {
          title: uz ? "Kelin salom" : "Келин салом",
          time: "10:00",
          name: uz ? "Nodirbek uyi" : "Дом Нодирбека",
          address: uz ? "Toshkent, Chilonzor 20-kvartal" : "Ташкент, Чиланзар, 20 квартал",
          mapUrl: "https://yandex.uz/maps/",
          image: DEMO_PHOTOS.venueHouse,
        },
        {
          title: uz ? "Nikoh to'yi" : "Свадьба",
          time: "18:00",
          name: uz ? "«Navro'z» to'yxonasi" : "Банкетный зал «Навруз»",
          address: uz ? "Toshkent, Yunusobod tumani, Amir Temur ko'chasi 108" : "Ташкент, Юнусабадский район, ул. Амира Темура 108",
          mapUrl: "https://yandex.uz/maps/",
          image: DEMO_PHOTOS.venueHall,
        },
      ],
      schedule: uz
        ? [
            { time: "17:00", title: "Mehmonlarni kutib olish", note: "Yengil taomlar va musiqa" },
            { time: "18:00", title: "Nikoh marosimi", note: "Asosiy zal" },
            { time: "19:00", title: "Ziyofat", note: "Dasturxon va tabriklar" },
            { time: "20:30", title: "Tort kesish" },
            { time: "21:00", title: "Raqs va musiqa", note: "Kechning yakuni" },
          ]
        : [
            { time: "17:00", title: "Сбор гостей" },
            { time: "18:00", title: "Церемония" },
            { time: "19:00", title: "Банкет" },
            { time: "20:30", title: "Торт" },
            { time: "21:00", title: "Танцы" },
          ],
      details: uz
        ? [
            { title: "Sovg'alar", text: "Eng katta sovg'a — sizning kelishingiz. Gul o'rniga konvert afzal." },
            { title: "Bolalar", text: "Kichkintoylar uchun alohida stol va animator bo'ladi." },
            { title: "Transport", text: "To'yxona oldida bepul avtoturargoh mavjud." },
          ]
        : [
            { title: "Подарки", text: "Лучший подарок — ваше присутствие." },
            { title: "Дети", text: "Вечерний банкет только для взрослых." },
          ],
      dressCode: {
        text: uz ? "Tantanali kechki libos. Ranglar palitrasiga rioya qilsangiz xursand bo'lamiz." : "Торжественный вечерний стиль. Будем рады, если поддержите нашу палитру.",
        colors: ["#1E1A16", "#5C3A2E", "#B8973F", "#7E8C6E", "#EFE7D6"],
      },
      rsvp: { deadline: uz ? "Iltimos, 1-oktabrgacha javob bering" : "Просим заполнить форму подтверждения до 1 октября", askGuests: true, askNote: true, askPhone: true, thanks: "" },
      contacts: [
        { name: uz ? "Kuyov tomon" : "Со стороны жениха", phone: "+998 90 123 45 67", telegram: "nodirbek" },
        { name: uz ? "Kelin tomon" : "Со стороны невесты", phone: "+998 91 234 56 78", telegram: "malika" },
      ],
      closing: { text: uz ? "Sizni intiqlik bilan kutamiz!" : "Ждём вас с нетерпением!" },
    }),
  };
}
