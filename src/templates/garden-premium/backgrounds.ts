/**
 * "Bog' saroyi" shablonining standart blok fonlari.
 * Akvarel uslubidagi 8 ta sahna (foydalanuvchi bergan Dizayn_fon tasmasidan kesilgan),
 * Vercel Blob'da, 820px kenglikda WebP.
 *
 * Admin blok foniga o'z rasmini yuklasa, o'sha ustun bo'ladi; bo'sh bo'lsa shular ishlatiladi.
 */
/** Har bir sahna: rasm havolasi va uning pastki chet rangi.
 *  Blok panel balandligidan uzunroq bo'lsa, ortig'i shu rang bilan to'ldiriladi —
 *  shunda rasm hech qachon qirqilmaydi. */
const P = {
  chandelier: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-1-B2DQcMRosOvaeT8UG9W6Nmnrscguni.webp", edge: "#DAD4C6" },
  gardenSteps: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-2-LmY3cCCJXlFFD4Z4TeaSaXblGiROAv.webp", edge: "#DED6C6" },
  goldRing: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-3-epMvE00aiRj5vqCDTeziwb8xGli4UX.webp", edge: "#BFB39E" },
  ivyArch: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-4-KFeq7jAkq56PfdUNX0jLDSgFvLNx4E.webp", edge: "#BCB5A4" },
  colonnade: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-5-J4v2BscONWOWuT28LaEGC2IT9QoKuM.webp", edge: "#D9D4C9" },
  floralColumns: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-6-HJlehXaLvzxxDSpFiVQ8kUf1SFrJTc.webp", edge: "#EDE5DB" },
  softCorner: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-7-aBBhLyqK7bhcPdKdntjQy1WOalxVCa.webp", edge: "#E9E4DD" },
  cypressPath: { url: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-8-AkYs0cOSzin0ENy6dVVShQ1QfkcNQC.webp", edge: "#D9D3C7" },
} as const;

export const DEFAULT_BG = {
  // PDF maketdagi tartib: har bir sahna o'z blokiga
  cover: P.chandelier,        // ismlar, katta ochilish
  greeting: P.gardenSteps,    // salomlashuv va sana
  countdown: P.goldRing,      // oltin doira ramka - sanoq
  venue: P.ivyArch,           // manzil
  schedule: P.colonnade,      // kun dasturi
  dressCode: P.floralColumns, // kiyim tarzi
  rsvp: P.softCorner,         // anketa - eng ochiq fon
  closing: P.cypressPath,     // yakun

  // Maketda yo'q, bizda bor bloklar: qo'shni bloklar bilan takrorlanmasin
  date: P.colonnade,
  details: P.softCorner,
  gallery: P.gardenSteps,
  contacts: P.floralColumns,
} as const;

export type BgKey = keyof typeof DEFAULT_BG;
export type Bg = (typeof DEFAULT_BG)[BgKey];
