# Claude Design uchun prompt — taklif.site asosiy sayti

Quyidagi matnni Claude Design'ga to'liq nusxalab qo'ying. Shablon dizaynlari bilan bir xil uslubda bo'lishi uchun "Taklif Shablonlari" loyihasining o'zida yangi fayl sifatida chizdiring.

---

Men to'y taklifnoma saytlari platformasi taklif.site uchun asosiy (mijoz ko'radigan) saytni chizyapman. Mijoz saytga kiradi, shablonlar katalogini ko'radi, yoqqanini tanlab Telegram orqali buyurtma beradi. Sayt o'zi taklifnoma yasamaydi, buyurtmani biz qo'lda bajaramiz. Shuning uchun saytning asosiy vazifasi: ishonch uyg'otish, shablonlarni chiroyli ko'rsatish va "Buyurtma berish" tugmasiga olib kelish.

Uslub: shablonlardagi kabi nozik, "premium qog'oz" his. Fon issiq oq (#FAF8F3), matn to'q qora-jigarrang (#1E1A16), urg'u oltin (#B8973F), ikkinchi urg'u (#8A7A5A), chiziqlar (#E2D6B8). Sarlavha shrifti Cormorant Garamond 500, matn Manrope 400/500, bitta kalligrafik so'z uchun Pinyon Script. Tugmalar: asosiy — to'q fon (#1E1A16) oq matn, to'liq yumaloq (radius 999); ikkilamchi — oltin chiziqli. Rasm ramkalari radius 24. Ko'p bo'sh joy, katta sarlavhalar. Emoji ishlatilmasin.

## Format

- Uchta sahifa, har biri ikki artboard: desktop 1440px kenglik va mobil 390px kenglik. Balandlik erkin.
- Real matn, lorem ipsum emas. Til: o'zbek lotin, apostrof uchun oddiy ' belgisi.
- Shablon rasmlari uchun telefon ramkasi (390×844 ekran, qora ramka, radius 40) ishlating; ichiga 3 ta mavjud shablonning muqova ekranini qo'ying: "Klassik oltin" (krem fon, oltin monogram, Pinyon Script ismlar), "Gulli akvarel" (oq fon, akvarel gullar, Great Vibes ismlar), "Qorong'i elegant" (to'q jigarrang fon, oltin oval, Alex Brush ismlar). Namuna ismlar: Nodirbek & Malika, 12-oktabr 2026.
- Bloklarni nomlang (hero, how-it-works, catalog, features, pricing, faq, cta, footer), chunki kodga blok-blok o'tkazaman.

## 1-sahifa: Asosiy sahifa (home)

1. **Header.** Chapda "taklif.site" logotip (Cormorant, oltin nuqta bilan), o'rtada menyu: Shablonlar, Qanday ishlaydi, Narxlar, Savollar; o'ngda "Buyurtma berish" tugmasi (Telegram'ga olib boradi). Mobilda burger menyu.
2. **Hero.** Chapda kichik yozuv "ONLAYN TO'Y TAKLIFNOMASI", sarlavha "Mehmonlaringizga havola yuboring, ular telefonda ochib, kelishini tasdiqlasin", ost matn "Shablonni tanlang, ma'lumotlarni yuboring. 1 kun ichida kelin-kuyov.taklif.site havolasi tayyor.", ikkita tugma: "Shablonlarni ko'rish" (asosiy) va "Demo'ni ochish" (ikkilamchi). O'ngda 3 ta telefon ramkasi yelpig'ich bo'lib turadi (o'rtadagisi oldinda), ichida 3 shablon muqovasi. Telefonlar ostida kichik ishonch satri: "300+ to'y · 3 til · 1 kunda tayyor".
3. **Ticker (yugurma satr).** Ingichka oltin chiziqlar orasida takrorlanuvchi matn: "Dam olish kunlarisiz ishlaymiz · 1 kunda tayyor · Cheksiz mehmon · Telegram'da qo'llab-quvvatlash".
4. **Qanday ishlaydi (how-it-works).** Sarlavha "4 qadam". 4 ta karta gorizontal: 01 Shablonni tanlang; 02 Ismlar, sana, manzilni Telegram'ga yuboring; 03 Biz saytni yasab, havolani beramiz; 04 Havolani mehmonlarga yuboring, javoblarni kuzating. Har kartada raqam Cormorant'da katta, oltin.
5. **Katalog qismi (catalog).** Sarlavha "Shablonlar", ost yozuv "Har biri 11 blokdan iborat, sizning ma'lumotingiz bilan to'ldiriladi". 3 ustunli grid, har karta: telefon ramkasida muqova, shablon nomi, kategoriya (kichik, oltin), qisqa tavsif, narx ("450 000 so'm"), ikkita tugma: "Demo" (ikkilamchi) va "Buyurtma" (asosiy). Bir kartada "Yangi" belgisi. Pastda "Barcha shablonlar →" havolasi.
6. **Nimalar kiradi (features).** 2 ustun: chapda telefon ramkasida shablonning RSVP bloki, o'ngda 6 ta band ikonkalar bilan: Konvert ochilish animatsiyasi; Fon musiqasi; Sanoq va kalendar; Xarita havolasi; RSVP — mehmonlar bir bosishda javob beradi; Har mehmonga shaxsiy murojaat ("Hurmatli Ali aka"). Ikonkalar ingichka chiziqli, oltin.
7. **Narxlar (pricing).** Sarlavha "Tariflar". 3 ta karta: "Standart" 299 000 so'm — tayyor shablon, matn va rasm almashtirish, 1 kun; "Premium" 450 000 so'm (belgilangan, "Eng ko'p tanlanadi") — Standart + fon musiqasi, galereya, 2 tadbir, shaxsiy havolalar, rus tili; "Individual" 900 000 so'mdan — noldan dizayn, 5 kun. Har kartada "Buyurtma berish" tugmasi. Ostida kichik izoh: "Sayt to'ydan keyin 3 oy ochiq turadi".
8. **Mijozlar fikri (reviews).** 3 ta karta: mijoz ismi, shahar, 2-3 qatorli fikr, 5 yulduz oltin chiziqli. Namuna: "Dilnoza, Toshkent — Mehmonlar havolani ochib hayron qolishdi, hammasi telefonda chiroyli chiqdi."
9. **Savollar (faq).** Akkordeon, 6 savol: Taklifnoma qancha vaqt ochiq turadi? Mehmonlar javobini qayerda ko'raman? Matnni keyin o'zgartira olamanmi? Havolani qanday ulashaman? Rus tilida bo'ladimi? To'lov qanday?
10. **Yakuniy CTA (cta).** Krem (#F5EEDF) blokda katta kalligrafik so'z "Boshlaymizmi?" (Pinyon Script, oltin), ostida "Shablon nomi, ismlar va sanani Telegram'ga yozing, qolganini biz qilamiz", tugma "Telegram'da yozish".
11. **Footer.** Logotip, qisqa tavsif, ustunlar: Sayt (Shablonlar, Narxlar, Savollar), Aloqa (Telegram, Instagram, telefon), pastda "© 2026 taklif.site" va "Ommaviy oferta".

## 2-sahifa: Katalog (catalog page)

1. Header (bir xil).
2. Sahifa boshi: kichik yozuv "KATALOG", sarlavha "Taklifnoma shablonlari", ost matn "Har bir shablonni telefonda demo sifatida ochib ko'ring".
3. Filtr qatori: chip tugmalar — Barchasi, Klassik, Gulli, Qorong'i, Milliy, Minimal; o'ngda saralash "Mashhur / Yangi / Narx".
4. Grid: 3 ustun desktopda, 2 ustun mobilda. Karta: telefon ramkasida muqova (hover'da ozgina ko'tariladi), nomi, kategoriya, narx, "Demo" va "Buyurtma" tugmalari. Bittasida "Yangi", bittasida "Mashhur" belgisi. 9 ta karta chizing (3 shablon 3 martadan, nomlarini o'zgartirib: Klassik oltin, Gulli akvarel, Qorong'i elegant, Milliy naqsh, Minimal oq, Bog' kechasi, Oltin arka, Pushti bahor, Zumrad).
5. Pastda "Sizga mos shablon topilmadimi? Individual dizayn buyurtma qiling" bloki, tugma bilan.
6. Footer.

## 3-sahifa: Shablon ichki sahifasi (template page)

1. Header, ostida "Katalog → Klassik oltin" yo'l ko'rsatkichi.
2. Asosiy qism 2 ustun: chapda katta telefon ramkasida shablon (uning ostida "Telefonga teging, demo jonli ochiladi" yozuvi va 4 ta kichik ekran rasmi: muqova, sana, dastur, RSVP); o'ngda: kategoriya (oltin, kichik), sarlavha "Klassik oltin", tavsif 3 qator, narx "450 000 so'm" katta, ikkita tugma: "Shu dizaynda buyurtma berish" (asosiy) va "Demo'ni to'liq ochish" (ikkilamchi), ostida ishonch satri "Tayyor bo'lish: 1 kun · O'zbek va rus tili · Cheksiz mehmon".
3. "Taklifnomaga nimalar kiradi" — 2 ustunli ro'yxat, 8 band, chiziqli ikonkalar: Konvert ochilish animatsiyasi, Fon musiqasi, Sana va kalendar, Sanoq, Kun dasturi, Manzil va xarita, RSVP anketasi, Shaxsiy murojaat.
4. "Bloklar" — gorizontal karusel: 11 blokning ekran rasmlari telefon ramkasida (muqova, salomlashuv, sana, dastur, manzil, ma'lumot, kiyim tarzi, galereya, RSVP, kontaktlar, yakun), har birining ostida nomi.
5. "Qanday ishlaydi" — 4 qadam qisqa (asosiy sahifadagidek, ixchamroq).
6. "Savollar" — 4 ta.
7. "Boshqa dizaynlar" — 3 ta karta.
8. Yakuniy CTA va footer.

## Muhim

- Header va footer uchala sahifada bir xil.
- Telefon ramkasi komponenti bir xil bo'lsin, ichidagi rasm almashadi.
- Tugmalar kamida 48px balandlikda. Mobilda hamma grid 1-2 ustunga tushadi.
- Rang palitrasi va shrift juftligini artboard yonida yozib qo'ying.
