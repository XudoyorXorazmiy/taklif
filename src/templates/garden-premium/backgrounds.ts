/**
 * "Bog' saroyi" shablonining standart blok fonlari.
 * Akvarel uslubidagi 8 ta sahna (foydalanuvchi bergan Dizayn_fon tasmasidan kesilgan),
 * Vercel Blob'da, 820px kenglikda WebP.
 *
 * Admin blok foniga o'z rasmini yuklasa, o'sha ustun bo'ladi; bo'sh bo'lsa shular ishlatiladi.
 */
const P = {
  chandelier: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-1-B2DQcMRosOvaeT8UG9W6Nmnrscguni.webp",
  gardenSteps: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-2-LmY3cCCJXlFFD4Z4TeaSaXblGiROAv.webp",
  goldRing: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-3-epMvE00aiRj5vqCDTeziwb8xGli4UX.webp",
  ivyArch: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-4-KFeq7jAkq56PfdUNX0jLDSgFvLNx4E.webp",
  colonnade: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-5-J4v2BscONWOWuT28LaEGC2IT9QoKuM.webp",
  floralColumns: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-6-HJlehXaLvzxxDSpFiVQ8kUf1SFrJTc.webp",
  softCorner: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-7-aBBhLyqK7bhcPdKdntjQy1WOalxVCa.webp",
  cypressPath: "https://qal5gpeam9g7wiee.public.blob.vercel-storage.com/templates/garden-premium/bg-8-AkYs0cOSzin0ENy6dVVShQ1QfkcNQC.webp",
} as const;

export const DEFAULT_BG = {
  cover: P.chandelier,
  greeting: P.softCorner,
  date: P.goldRing,
  countdown: P.cypressPath,
  venue: P.gardenSteps,
  schedule: P.ivyArch,
  details: P.floralColumns,
  dressCode: P.colonnade,
  gallery: P.ivyArch,
  rsvp: P.softCorner,
  contacts: P.floralColumns,
  closing: P.cypressPath,
} as const;

export type BgKey = keyof typeof DEFAULT_BG;
