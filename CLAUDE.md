# Taklif.site

To'y taklifnoma saytlari platformasi. Faqat admin (egasi) sayt yaratadi, mijoz `kelin-kuyov.taklif.site` havolasini oladi.

## Stack
Next.js 16 (App Router, `proxy.ts`), TypeScript, Tailwind v4, Prisma 7 + `@prisma/adapter-pg` (Railway Postgres), Vercel Blob, Vercel hosting (wildcard `*.taklif.site`).

## Yo'naltirish (src/proxy.ts)
- `taklif.site` → landing/katalog (`src/app/page.tsx`)
- `admin.taklif.site/*` yoki `taklif.site/admin/*` → admin
- `<slug>.taklif.site/*` → `/s/<slug>/*` (rewrite). Lokal: `<slug>.localhost:3000`
- `?m=Ali+aka` — shaxsiy murojaat, `?preview=1` — DRAFT'ni ko'rish

## Ma'lumot modeli
- `prisma/schema.prisma`: `Invitation` (slug, templateId, status, locale, ismlar, eventAt, `content` JSON, media, mijoz/to'lov) va `Rsvp`.
- `src/lib/content.ts`: `content` JSON'ning zod sxemasi. Bloklar: greeting, date, countdown, schedule, venues (bir nechta tadbir), details, dressCode, gallery, rsvp, contacts, closing. Har biri `blocks.*` bilan yoqiladi.

## Shablonlar
- `src/templates/registry.ts` — ro'yxat va lazy import. Yangi shablon: `src/templates/<id>/index.tsx` (default export, `TemplateProps`), `public/templates/<id>.jpg`, registry'ga meta.
- Umumiy qismlar `src/components/invitation/`: InvitationShell (intro → ochilish → sahifa + musiqa), Reveal (scroll animatsiya), Countdown, Calendar, RsvpForm (uslub `ui` klasslari bilan shablondan keladi), MusicButton, Slot (rasm yoki preview'da shtrixli asset joyi), Frame (desktopda 430px ustun, yon fon).
- Shriftlar `src/templates/fonts.ts` (next/font), utilities `font-cg` Cormorant, `font-ps` Pinyon, `font-gv` Great Vibes, `font-ab` Alex Brush, `font-mc` Marcellus, `font-mr` Manrope.
- Uchta shablon Claude Design'dagi `docs/design/Taklif Shablonlari.dc.html` dan 1:1: classic-gold, floral-watercolor, dark-elegant. Illyustratsiya assetlari (akvarel gullar, lace oval, oltin naqsh) hali yo'q — Slot preview'da spetsifikatsiyani ko'rsatadi, nashrda bo'sh.
- OG/Telegram preview: `src/lib/og-render.tsx` (shablon `meta.og` palitrasi, Google Fonts TTF `src/lib/og-fonts.ts`). Marshrutlar: `/s/[slug]/opengraph-image`, `/t/[templateId]/opengraph-image`.
- Yorliqlar `src/lib/i18n.ts` (UZ/RU). Mazmun admin kiritgan tilda.
- Shablon dizaynlari Claude Design'da chiziladi (docs/design-prompt.md), keyin kodga 1:1 o'tkaziladi.

## Shablon katalogi (admin boshqaradi)
- `Template` jadvali (`prisma/schema.prisma`) — nom, tavsif, kategoriya, narx, katalog rasmi, ekranlar, "nimalar kiradi", nashr/yashirin, tartib. Shablon kodi qo'shilmaydi, faqat katalogdagi ko'rinishi.
- `src/lib/catalog.ts` — registry ∪ DB (DB bo'lmasa registry). Landing `/`, katalog `/shablonlar`, ichki sahifa `/shablonlar/[id]` shundan o'qiydi.
- Admin: `/admin/templates` ro'yxat va nashr tugmasi, `/admin/templates/[id]` forma.
- Ommaviy sayt `src/app/(site)/` (layout: Header+Footer): `/` asosiy, `/shablonlar` katalog (filtr/saralash client), `/shablonlar/[id]` shablon sahifasi (jonli iframe demo + blok mockuplari). Dizayn manbasi `docs/design/Asosiy sahifa|Katalog|Shablon sahifasi|PhoneCover.dc.html`, 1:1 kodlangan.
- Sayt komponentlari `src/components/site/`: Phone (PhoneFrame 406×860 scale bilan, PhoneCover shablon muqovasi, PhoneScreen blok ekranlari), TemplateCard, CatalogGrid, TemplateViewer, BlocksCarousel, Faq, Ticker, Ui (Eyebrow/H2/Container/Btn/Cta). Matnlar `src/lib/site-content.ts` (TELEGRAM_URL, PHONE env'dan).
- Demo `/t/[id]?intro=0#date` — intro'siz, blokka sakrash (shablon section id'lari: cover…closing).

## Admin
Bitta parol (`ADMIN_PASSWORD`), HMAC cookie (`src/lib/auth-edge.ts`). Sahifalar: `/admin` ro'yxat, `/admin/new`, `/admin/[id]`, `/admin/[id]/rsvps`. Server action'lar `src/app/admin/actions.ts`.

## Buyruqlar
`npm run dev` · `npm run db:push` · `npm run db:seed` · `npm run typecheck` · `npm run build`
Vaqt: admin Toshkent (UTC+5) vaqtida kiritadi, bazada UTC.
