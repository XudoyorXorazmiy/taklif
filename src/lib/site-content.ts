/** Sayt matnlari (dizayndan). Keyinchalik admin'ga o'tkazish mumkin. */

export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/taklif_site";
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/taklif.site";
export const PHONE = process.env.NEXT_PUBLIC_PHONE ?? "+998 90 000 00 00";

export const steps = [
  { n: "01", t: "Shablonni tanlang" },
  { n: "02", t: "Ismlar, sana, manzilni Telegram'ga yuboring" },
  { n: "03", t: "Biz saytni yasab, havolani beramiz" },
  { n: "04", t: "Havolani mehmonlarga yuboring, javoblarni kuzating" },
];

export const icons = {
  envelope: "M2 5h16v11H2zM2 5l8 6 8-6",
  music: "M7 16V4l9-2v12M4 16a3 3 0 106 0 3 3 0 00-6 0zM13 14a3 3 0 106 0 3 3 0 00-6 0z",
  calendar: "M3 4h14v14H3zM3 8h14M7 2v4M13 2v4",
  clock: "M10 18a8 8 0 100-16 8 8 0 000 16zM10 5v5l3 2",
  list: "M4 5h12M4 10h12M4 15h8",
  pin: "M10 18s-6-5.5-6-10a6 6 0 0112 0c0 4.5-6 10-6 10zM10 10a2 2 0 100-4 2 2 0 000 4z",
  check: "M3 10l4 4 10-10",
  user: "M10 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM3 18c0-3.5 3-6 7-6s7 2.5 7 6",
};

export const features = [
  { t: "Konvert ochilish animatsiyasi", d: "Havola ochilganda konvert yoki kartochka ochiladi", icon: icons.envelope },
  { t: "Fon musiqasi", d: "Siz tanlagan qo'shiq, bir bosishda o'chadi", icon: icons.music },
  { t: "Sanoq va kalendar", d: "To'ygacha qolgan kun, soat, daqiqa", icon: icons.calendar },
  { t: "Xarita havolasi", d: "Yandex yoki Google xaritada bir bosishda to'yxona", icon: icons.pin },
  { t: "RSVP — bir bosishda javob", d: "Kelaman / kela olmayman, necha kishi", icon: icons.check },
  { t: "Har mehmonga shaxsiy murojaat", d: "\"Hurmatli Ali aka\" — har havola alohida", icon: icons.user },
];

/** Shablon sahifasidagi standart "nimalar kiradi" (admin ro'yxat kiritmasa) */
export const defaultIncludes = [
  { t: "Konvert ochilish animatsiyasi", icon: icons.envelope },
  { t: "Fon musiqasi", icon: icons.music },
  { t: "Sana va kalendar", icon: icons.calendar },
  { t: "Sanoq", icon: icons.clock },
  { t: "Kun dasturi", icon: icons.list },
  { t: "Manzil va xarita", icon: icons.pin },
  { t: "RSVP anketasi", icon: icons.check },
  { t: "Shaxsiy murojaat", icon: icons.user },
];

export const plans = [
  { name: "Standart", price: "299 000", unit: "so'm", items: ["Tayyor shablon", "Matn va rasm almashtirish", "RSVP anketasi"], time: "TAYYOR BO'LISH: 1 KUN", hot: false },
  { name: "Premium", price: "450 000", unit: "so'm", items: ["Standart tarifdagi hamma narsa", "Fon musiqasi va galereya", "2 tadbir (kelin salom + to'y)", "Har mehmonga shaxsiy havola", "Rus tili"], time: "TAYYOR BO'LISH: 1 KUN", hot: true },
  { name: "Individual", price: "900 000", unit: "so'mdan", items: ["Noldan dizayn", "Siz xohlagan bloklar va animatsiya", "Premium tarifdagi hamma narsa"], time: "TAYYOR BO'LISH: 5 KUN", hot: false },
];

export const reviews = [
  { name: "Dilnoza", city: "Toshkent", text: "Mehmonlar havolani ochib hayron qolishdi, hammasi telefonda chiroyli chiqdi." },
  { name: "Jasur", city: "Samarqand", text: "Kechqurun yozdim, ertasi kuni tayyor edi. Kim kelishini oldindan bilib, stollarni to'g'ri qo'ydik." },
  { name: "Madina", city: "Farg'ona", text: "Qog'oz taklifnoma bosdirmadik, hamma narsa Telegram'da ketdi. Qarindoshlar rus tilida ham ochdi." },
];

export const homeFaq: [string, string][] = [
  ["Taklifnoma qancha vaqt ochiq turadi?", "To'ydan keyin 3 oy. Istasangiz, yillik uzaytirish mumkin."],
  ["Mehmonlar javobini qayerda ko'raman?", "Har bir javob darhol Telegram'ingizga keladi, jadval ko'rinishida ham beramiz."],
  ["Matnni keyin o'zgartira olamanmi?", "Ha, to'ygacha istalgan vaqtda — Telegram'ga yozing, 1 soat ichida yangilaymiz."],
  ["Havolani qanday ulashaman?", "Telegram, WhatsApp yoki SMS orqali. Har mehmon uchun shaxsiy havola ham qilamiz."],
  ["Rus tilida bo'ladimi?", "Premium va Individual tariflarda o'zbek va rus tili kiradi."],
  ["To'lov qanday?", "Click, Payme yoki karta o'tkazmasi. 50% oldindan, 50% tayyor bo'lganda."],
];

export const templateFaq: [string, string][] = [
  ["Matnni keyin o'zgartira olamanmi?", "Ha, to'ygacha istalgan vaqtda — Telegram'ga yozing, 1 soat ichida yangilaymiz."],
  ["Rasmlarni qayerdan olasiz?", "Siz yuborasiz: kelin-kuyov rasmi va 4–6 galereya rasmi. Rasm bo'lmasa, rasmsiz variantni qilamiz."],
  ["Rus tilida bo'ladimi?", "Ha, Premium tarifda o'zbek va rus tili kiradi — mehmon o'zi tilni tanlaydi."],
  ["To'lov qanday?", "Click, Payme yoki karta o'tkazmasi. 50% oldindan, 50% tayyor bo'lganda."],
];

export const categoryLabels: Record<string, string> = {
  classic: "Klassik",
  floral: "Gulli",
  dark: "Qorong'i",
  national: "Milliy",
  minimal: "Minimal",
  luxury: "Hashamatli",
};
export const categoryLabel = (c: string) => categoryLabels[c] ?? c;

export const blocksList: [string, string][] = [
  ["cover", "Muqova"], ["greeting", "Salomlashuv"], ["date", "Sana"], ["schedule", "Dastur"], ["venue", "Manzil"], ["details", "Ma'lumot"],
  ["dresscode", "Kiyim"], ["gallery", "Galereya"], ["rsvp", "RSVP"], ["contacts", "Kontaktlar"], ["closing", "Yakun"],
];

export const formatPrice = (p: number | null) => (p != null ? `${p.toLocaleString("ru-RU")} so'm` : "Narx so'rang");
