import type { Locale } from "./generated/prisma/client";

/** Shablonlardagi doimiy yozuvlar (mazmun emas, yorliqlar) */
const dict = {
  UZ: {
    introEyebrow: "To'y taklifnomasi",
    coverEyebrow: "To'y kuni",
    scrollHint: "Pastga suring",
    open: "Ochish",
    tapToOpen: "Ochish uchun bosing",
    dear: "Hurmatli",
    dateTitle: "To'y sanasi",
    countdownTitle: "To'ygacha qoldi",
    days: "kun",
    hours: "soat",
    minutes: "daqiqa",
    seconds: "soniya",
    scheduleEyebrow: "Marosim",
    scheduleTitle: "Kun dasturi",
    venueEyebrow: "Joy",
    venueTitle: "Manzil",
    openMap: "Xaritada ochish",
    detailsTitle: "Muhim ma'lumot",
    dressCodeTitle: "Kiyim tarzi",
    galleryEyebrow: "Lahzalar",
    galleryTitle: "Galereya",
    rsvpTitle: "Qatnashishingizni tasdiqlang",
    rsvpName: "Ismingiz",
    rsvpNamePlaceholder: "Ism va familiya",
    rsvpYes: "Albatta kelaman",
    rsvpNo: "Kela olmayman",
    rsvpMaybe: "Keyinroq aytaman",
    rsvpGuests: "Necha kishi kelasiz?",
    rsvpNote: "Izoh",
    rsvpNotePlaceholder: "Tilaklar yoki qo'shimcha ma'lumot",
    rsvpSend: "Yuborish",
    rsvpSending: "Yuborilmoqda…",
    thanksTitle: "Rahmat!",
    thanksText: "Javobingiz qabul qilindi.",
    seeYou: "Sizni {date} kuni kutamiz.",
    rsvpError: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    contactsTitle: "Kontaktlar",
    call: "Qo'ng'iroq",
    telegram: "Telegram",
    withLove: "Hurmat bilan,",
    and: "va",
    expired: "Bu taklifnomaning muddati tugagan.",
    notFound: "Taklifnoma topilmadi.",
    months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    weekdays: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
    weekdaysFull: ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"],
  },
  RU: {
    introEyebrow: "Свадебное приглашение",
    coverEyebrow: "День свадьбы",
    scrollHint: "Листайте вниз",
    open: "Открыть",
    tapToOpen: "Нажмите, чтобы открыть",
    dear: "Дорогой(ая)",
    dateTitle: "Дата свадьбы",
    countdownTitle: "До свадьбы осталось",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    scheduleEyebrow: "Церемония",
    scheduleTitle: "План дня",
    venueEyebrow: "Место",
    venueTitle: "Локация",
    openMap: "Открыть на карте",
    detailsTitle: "Детали",
    dressCodeTitle: "Дресс-код",
    galleryEyebrow: "Моменты",
    galleryTitle: "Галерея",
    rsvpTitle: "Подтвердите присутствие",
    rsvpName: "Ваше имя",
    rsvpNamePlaceholder: "Имя и фамилия",
    rsvpYes: "С удовольствием приду",
    rsvpNo: "Не смогу прийти",
    rsvpMaybe: "Отвечу позже",
    rsvpGuests: "Сколько вас будет?",
    rsvpNote: "Комментарий",
    rsvpNotePlaceholder: "Пожелания или дополнительная информация",
    rsvpSend: "Отправить",
    rsvpSending: "Отправка…",
    thanksTitle: "Спасибо!",
    thanksText: "Ваш ответ принят.",
    seeYou: "Ждём вас {date}.",
    rsvpError: "Произошла ошибка. Попробуйте ещё раз.",
    contactsTitle: "Контакты",
    call: "Позвонить",
    telegram: "Telegram",
    withLove: "С уважением,",
    and: "и",
    expired: "Срок действия приглашения истёк.",
    notFound: "Приглашение не найдено.",
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    weekdaysFull: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
  },
} as const;

export type Dict = (typeof dict)[Locale];
export function t(locale: Locale): Dict {
  return dict[locale] ?? dict.UZ;
}

/** Sana qismlari Toshkent vaqtida (UTC+5). Serverda TZ qanday bo'lishidan qat'i nazar bir xil. */
export function tashkent(d: Date) {
  const s = new Date(d.getTime() + 5 * 3600 * 1000);
  return {
    y: s.getUTCFullYear(),
    m: s.getUTCMonth(),
    d: s.getUTCDate(),
    h: s.getUTCHours(),
    min: s.getUTCMinutes(),
    /** 0 = dushanba */
    wd: (s.getUTCDay() + 6) % 7,
    /** shu oydagi kunlar soni */
    daysInMonth: new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth() + 1, 0)).getUTCDate(),
    /** oyning 1-kuni haftaning qaysi kuni (0 = dushanba) */
    firstWd: (new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), 1)).getUTCDay() + 6) % 7,
  };
}

/** "12-oktabr, 2026" / "12 октября 2026" */
export function formatDate(d: Date, locale: Locale): string {
  const { y, m, d: day } = tashkent(d);
  const month = t(locale).months[m];
  return locale === "RU" ? `${day} ${ruGenitive(month)} ${y}` : `${day}-${month.toLowerCase()}, ${y}`;
}

/** "12-oktabr" (seeYou uchun) */
export function formatDayMonth(d: Date, locale: Locale): string {
  const { m, d: day } = tashkent(d);
  const month = t(locale).months[m];
  return locale === "RU" ? `${day} ${ruGenitive(month)}` : `${day}-${month.toLowerCase()}`;
}

/** "12 · OKTABR · 2026" */
export function formatDateDots(d: Date, locale: Locale): string {
  const { y, m, d: day } = tashkent(d);
  return `${day} · ${t(locale).months[m].toUpperCase()} · ${y}`;
}

/** "12.10.2026" */
export function formatDateNumeric(d: Date): string {
  const { y, m, d: day } = tashkent(d);
  return `${String(day).padStart(2, "0")}.${String(m + 1).padStart(2, "0")}.${y}`;
}

/** "18:00" */
export function formatTime(d: Date): string {
  const { h, min } = tashkent(d);
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

/** "Dushanba" */
export function formatWeekday(d: Date, locale: Locale): string {
  return t(locale).weekdaysFull[tashkent(d).wd];
}

function ruGenitive(month: string): string {
  const map: Record<string, string> = {
    Январь: "января", Февраль: "февраля", Март: "марта", Апрель: "апреля", Май: "мая", Июнь: "июня",
    Июль: "июля", Август: "августа", Сентябрь: "сентября", Октябрь: "октября", Ноябрь: "ноября", Декабрь: "декабря",
  };
  return map[month] ?? month.toLowerCase();
}
