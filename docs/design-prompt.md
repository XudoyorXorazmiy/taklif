# Claude Design uchun prompt — taklif.site shablonlari

Quyidagi matnni Claude Design'ga to'liq nusxalab qo'ying. Kerak bo'lsa uslublar bo'limidagi 3 ta shablonni o'zgartiring.

---

Men to'y taklifnomasi saytlari platformasi uchun shablonlar chizyapman. Har bir shablon bitta uzun, pastga suriladigan mobil sahifa. Mehmonlar havolani Telegram orqali oladi va telefonda ochadi, shuning uchun hamma narsa mobilga moslangan bo'lishi kerak.

## Format

- Har bir shablon uchun bitta artboard: kenglik 390px, balandlik erkin (odatda 5000–7000px). Butun sahifa bitta artboardda, bloklar ketma-ket.
- Desktop varianti chizilmaydi. Desktopda shu 430px ustun o'rtada turadi, yon tomonlar shablonning fon rangi yoki naqshi bilan to'ldiriladi. Har bir shablon uchun shu "yon fon" rangini artboard yonida kichik namuna sifatida ko'rsating.
- Qo'shimcha: har bir shablon uchun 1200×630 px "Telegram preview" kartochkasi (ismlar, sana, shablon uslubida).
- Real matn ishlating, lorem ipsum emas. Matnlar o'zbek lotin alifbosida. Apostrof uchun oddiy ' belgisini ishlating (to'y, o'zbek).
- Shriftlar faqat Google Fonts'dan va lotin kengaytmasi (Latin Extended) bo'lgan shriftlar, chunki oʻ, gʻ harflari kerak. Tavsiya: sarlavha uchun Cormorant Garamond, Playfair Display yoki Marcellus; kalligrafiya uchun Great Vibes, Pinyon Script yoki Alex Brush; matn uchun Manrope yoki Inter.

## Bloklar (tartib hamma shablonda bir xil, intro + 11 ta)

0. **Intro ekrani (intro).** Alohida artboard 390×844. Sahifa ochilganda birinchi ko'rinadigan yopiq holat: klassik shablonda yopiq konvert va ustida "N & M" wax seal muhri, gulli shablonda gullar orasidagi yopiq kartochka, qorong'i shablonda lace oval ichida "Ochish" tugmasi. Pastda "Ochish uchun bosing" yozuvi. Bu ekranni bosganda konvert ochilib muqovaga o'tadi va musiqa boshlanadi (animatsiya kodda yoziladi, siz faqat yopiq holatni chizing).
1. **Muqova.** To'liq ekran (390×844). Kichik yozuv "TO'Y KUNI", kuyov va kelin ismi katta kalligrafiyada, orasida "&", sana, pastda "Pastga suring" ishorasi. O'ng pastda dumaloq musiqa tugmasi (nota belgisi). Rasmli shablonda ismlar ostida kelin-kuyov rasmi ramkada.
2. **Salomlashuv.** "Hurmatli Ali aka," (shaxsiy murojaat satri, ba'zan bo'lmaydi), sarlavha "Aziz do'stlar va yaqinlar!", 3–4 qatorli matn.
3. **Sana.** Sarlavha "To'y sanasi", katta sana "12-oktabr, 2026", vaqt "18:00", ostida oy kalendari (to'y kuni belgilangan, dushanbadan boshlanadi), ostida sanoq: 4 ta katak — kun, soat, daqiqa, soniya.
4. **Kun dasturi.** Sarlavha, vertikal timeline: 5 ta band, har birida vaqt katta, nomi, ixtiyoriy izoh.
5. **Manzil.** Sarlavha, to'yxona rasmi yoki akvarel illyustratsiya, tadbir nomi va vaqti ("Nikoh to'yi · 18:00"), to'yxona nomi, manzil, "Xaritada ochish" tugmasi. Ikkita tadbir bo'lgan variantni ham ko'rsating (masalan "Kelin salom · 10:00" va "To'y · 18:00", ikki xil manzil).
6. **Muhim ma'lumot.** Sarlavha, 2–3 ta qisqa band: "Sovg'alar", "Bolalar", "Transport" kabi.
7. **Kiyim tarzi.** Sarlavha, 1–2 qator matn, 4–5 ta rang doirachasi.
8. **Galereya.** Sarlavha, 4–6 ta rasm (2 ustunli grid yoki gorizontal karusel).
9. **RSVP anketasi.** Sarlavha "Qatnashishingizni tasdiqlang", kichik yozuv "1-oktabrgacha javob bering", maydonlar: Ismingiz; 3 ta variant tugma/radio: "Albatta kelaman", "Kela olmayman", "Keyinroq aytaman"; "Necha kishi kelasiz?" raqam; "Izoh" matn; "Yuborish" tugmasi. Yuborilgandan keyingi holatni ham ko'rsating: "Rahmat! Javobingiz qabul qilindi."
10. **Kontaktlar.** Sarlavha, 2 ta kontakt: "Kuyov tomon" / "Kelin tomon", telefon tugmasi va Telegram tugmasi.
11. **Yakun.** "Sizni intiqlik bilan kutamiz!" kalligrafiyada, ostida "Hurmat bilan, Nodirbek va Malika".

Har bir blok alohida section bo'lsin va nomi bilan belgilansin (cover, greeting, date, schedule, venue, details, dresscode, gallery, rsvp, contacts, closing), chunki men buni kodga blok-blok o'tkazaman.

## Namuna ma'lumot (hamma shablonda bir xil)

- Kuyov: Nodirbek, Kelin: Malika
- Sana: 12-oktabr, 2026, yakshanba, 18:00
- To'yxona: "Navro'z" to'yxonasi, Toshkent, Yunusobod tumani, Amir Temur ko'chasi 108
- Ikkinchi tadbir: "Kelin salom", 10:00, Nodirbek uyi, Chilonzor 20-kvartal
- Dastur: 17:00 Mehmonlarni kutib olish · 18:00 Nikoh marosimi · 19:00 Ziyofat · 20:30 Tort kesish · 21:00 Raqs va musiqa
- Salomlashuv matni: "Hayotimizdagi eng baxtli kunda sizni oramizda ko'rishdan mamnun bo'lamiz. Sevgi, kulgu va unutilmas lahzalar bilan to'lgan bu kechani birga nishonlaylik."
- Kontakt: Kuyov tomon +998 90 123 45 67, Kelin tomon +998 91 234 56 78

## Shablon uslublari (3 ta)

**1. Klassik oltin (classic-gold).** Oq-krem qog'oz fon (#FBF8F1), oltin chiziqli ramka va burchak bezaklari, oltin monogram "N & M" muqovada, kelin-kuyov rasmi oltin ramkada (yuqorisi yarim doira), saroy yoki to'yxonaning oltin chiziqli illyustratsiyasi, qora Cormorant Garamond sarlavhalar, oltin kalligrafik so'zlar. O'zbek bozorida eng ko'p sotiladigan uslub. Yon fon: krem (#EFE7D6).

**2. Gulli akvarel (floral-watercolor).** Oq fon, burchaklarda akvarel gullar (oq atirgul, evkalipt barglari, och pushti), yashil-oltin urg'u ranglar, kalligrafik sarlavhalar (Great Vibes), yumshoq, havodor. Manzil bloki uchun akvarel bino illyustratsiyasi. Yon fon: och yashil-krem.

**3. Qorong'i elegant (dark-elegant).** To'q jigarrang yoki to'q yashil fon (#2B1D16 yoki #12261E), krem matn, oltin ingichka chiziqlar, muqovada lace (to'r) naqshli oval ramka ichida ismlar, bloklar krem "kartochka" bo'lib to'q fonda turadi, yuqori va pastki chetlari yumaloq. Kechki, hashamatli kayfiyat. Yon fon: to'q jigarrang.

## Illyustratsiya va animatsiya haqida

- Gul, bino, naqsh, muhr kabi illyustratsiyalar uchun placeholder qo'ying va qaysi joyga qanday asset kerakligini yozib qo'ying (masalan: "akvarel oq atirgul, chap yuqori burchak, 200×260"). Assetlar keyin alohida qo'shiladi.
- Animatsiya chizilmaydi, kodda yoziladi: konvert ochilishi, scroll'da bloklarning chiqishi, gullar parallaxi, countdown. Faqat statik holatlarni chizing.

## Muhim

- Barcha bloklar bir xil kenglik va ritmda bo'lsin, shunda kodga o'tkazganda umumiy komponentlar ishlaydi.
- Tugmalar va input'lar teginish uchun kamida 44px balandlikda.
- Kontrast: matn fon ustida aniq o'qilsin, ayniqsa kalligrafik shriftlar.
- Har bir shablonning rang palitrasini (fon, matn, urg'u, ikkinchi urg'u) va shrift juftligini artboard yonida yozib qo'ying.
