import { getTracks, trackLabel } from "@/lib/tracks";
import type { InlineButton } from "@/lib/telegram";
import { templates } from "@/templates/registry";

/** Botda to'planadigan javoblar */
export interface BotData {
  templateId?: string;
  groom?: string;
  bride?: string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:MM
  venue?: string;
  address?: string;
  mapUrl?: string;
  greeting?: string;
  phoneGroom?: string;
  phoneBride?: string;
  cover?: string;
  gallery?: string[];
  music?: string;
}

export type StepKind = "choice" | "text" | "photo";

export interface Step {
  key: keyof BotData;
  kind: StepKind;
  /** Savol matni */
  ask: (d: BotData) => string;
  /** Tanlov qadamlari uchun tugmalar */
  choices?: () => InlineButton[][] | Promise<InlineButton[][]>;
  /** Bo'sh qoldirish mumkinmi */
  optional?: boolean;
  /** Matnni tekshirish; xato bo'lsa xabar qaytaradi */
  validate?: (v: string) => string | null;
  /** Saqlashdan oldin tozalash */
  clean?: (v: string) => string;
  /** Bir nechta rasm yig'iladimi */
  multi?: boolean;
}

const SKIP = "O'tkazib yuborish";
export const SKIP_DATA = "skip";
export const DONE_DATA = "done";

const phoneOk = (v: string) => /^\+?\d[\d\s-]{7,16}$/.test(v.trim());
const cleanPhone = (v: string) => v.replace(/[\s-]/g, "");

export const steps: Step[] = [
  {
    key: "templateId",
    kind: "choice",
    ask: () =>
      "<b>Shablonni tanlang</b>\n\nChapdagi tugma shablonni shu yerning o'zida ochadi, " +
      "o'ngdagisi uni tanlaydi.",
    choices: () =>
      templates.map((t) => [
        { text: t.name, webApp: `https://taklif.site/t/${t.id}?intro=0` },
        { text: "Tanlash", data: `tpl:${t.id}` },
      ]),
  },
  {
    key: "groom",
    kind: "text",
    ask: () => "<b>Kuyovning ismi?</b>\n\nMasalan: Nodirbek",
    validate: (v) => (v.trim().length < 2 || v.trim().length > 40 ? "Ism 2-40 harf bo'lsin." : null),
  },
  {
    key: "bride",
    kind: "text",
    ask: () => "<b>Kelinning ismi?</b>\n\nMasalan: Malika",
    validate: (v) => (v.trim().length < 2 || v.trim().length > 40 ? "Ism 2-40 harf bo'lsin." : null),
  },
  {
    key: "date",
    kind: "text",
    ask: () => "<b>To'y sanasi?</b>\n\nKun.Oy.Yil ko'rinishida yozing.\nMasalan: 12.10.2026",
    validate: (v) => {
      const m = v.trim().match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
      if (!m) return "Sanani shunday yozing: 12.10.2026";
      const [, d, mo, y] = m;
      const dt = new Date(Date.UTC(+y, +mo - 1, +d));
      if (dt.getUTCMonth() !== +mo - 1 || dt.getUTCDate() !== +d) return "Bunday sana yo'q. Qayta yozing.";
      if (dt.getTime() < Date.now() - 86400000) return "Sana o'tib ketgan. To'y kunini yozing.";
      return null;
    },
    clean: (v) => {
      const m = v.trim().match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/)!;
      return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    },
  },
  {
    key: "time",
    kind: "text",
    ask: () => "<b>To'y necha soatda boshlanadi?</b>\n\nMasalan: 18:00",
    validate: (v) => (/^([01]?\d|2[0-3])[:.]([0-5]\d)$/.test(v.trim()) ? null : "Vaqtni shunday yozing: 18:00"),
    clean: (v) => {
      const m = v.trim().match(/^([01]?\d|2[0-3])[:.]([0-5]\d)$/)!;
      return `${m[1].padStart(2, "0")}:${m[2]}`;
    },
  },
  {
    key: "venue",
    kind: "text",
    ask: () => "<b>To'yxona nomi?</b>\n\nMasalan: «Navro'z» to'yxonasi",
    validate: (v) => (v.trim().length < 2 ? "To'yxona nomini yozing." : null),
  },
  {
    key: "address",
    kind: "text",
    ask: () => "<b>To'yxona manzili?</b>\n\nMasalan: Toshkent, Yunusobod tumani, Amir Temur ko'chasi 108",
    validate: (v) => (v.trim().length < 5 ? "Manzilni to'liqroq yozing." : null),
  },
  {
    key: "mapUrl",
    kind: "text",
    optional: true,
    ask: () =>
      "<b>Xarita havolasi</b>\n\nYandex yoki Google xaritadan to'yxona havolasini yuboring.\nBilmasangiz, o'tkazib yuboring — biz manzil bo'yicha o'zimiz topamiz.",
    validate: (v) => (/^https?:\/\/\S+$/.test(v.trim()) ? null : "Havola http bilan boshlanishi kerak."),
  },
  {
    key: "greeting",
    kind: "text",
    optional: true,
    ask: () =>
      "<b>Mehmonlarga murojaat matni</b>\n\nO'z so'zingizni yozing yoki o'tkazib yuboring — biz tayyor matnni qo'yamiz.",
    validate: (v) => (v.trim().length > 600 ? "Matn 600 belgidan oshmasin." : null),
  },
  {
    key: "phoneGroom",
    kind: "text",
    ask: () => "<b>Kuyov tomon telefon raqami?</b>\n\nMasalan: +998 90 123 45 67",
    validate: (v) => (phoneOk(v) ? null : "Raqamni shunday yozing: +998 90 123 45 67"),
    clean: cleanPhone,
  },
  {
    key: "phoneBride",
    kind: "text",
    optional: true,
    ask: () => "<b>Kelin tomon telefon raqami?</b>\n\nKerak bo'lmasa, o'tkazib yuboring.",
    validate: (v) => (phoneOk(v) ? null : "Raqamni shunday yozing: +998 91 234 56 78"),
    clean: cleanPhone,
  },
  {
    key: "cover",
    kind: "photo",
    optional: true,
    ask: () =>
      "<b>Kelin-kuyov rasmi</b>\n\nTaklifnomaning birinchi ekranida turadi. Rasmni yuboring yoki o'tkazib yuboring.",
  },
  {
    key: "gallery",
    kind: "photo",
    optional: true,
    multi: true,
    ask: () =>
      "<b>Galereya uchun rasmlar</b>\n\n4 tagacha rasm yuborishingiz mumkin. Yuborib bo'lgach «Tayyor» tugmasini bosing.",
  },
  {
    key: "music",
    kind: "choice",
    optional: true,
    ask: () =>
      "<b>Fon musiqasi</b>\n\nChapdagi tugma qo'shiqni shu yerda tinglatadi, o'ngdagisi uni tanlaydi.\n" +
      "Musiqa kerak bo'lmasa, o'tkazib yuboring.",
    choices: async () => {
      const tracks = await getTracks();
      return tracks.map((t) => [
        { text: trackLabel(t), data: `play:${t.id}` },
        { text: "Tanlash", data: `mus:${t.id}` },
      ]);
    },
  },
];

export const stepIndex = (key: string) => steps.findIndex((s) => s.key === key);
export const stepByKey = (key: string) => steps.find((s) => s.key === key);

/** Ixtiyoriy qadam uchun tugmalar */
export function optionalButtons(step: Step): InlineButton[][] | undefined {
  const rows: InlineButton[][] = [];
  if (step.multi) rows.push([{ text: "Tayyor", data: DONE_DATA }]);
  if (step.optional) rows.push([{ text: SKIP, data: SKIP_DATA }]);
  return rows.length ? rows : undefined;
}
