# taklif.site

Onlayn to'y taklifnomalari platformasi. Tuzilma va qoidalar: [CLAUDE.md](CLAUDE.md).

## Lokal ishga tushirish

```bash
cp .env.example .env   # DATABASE_URL, ADMIN_PASSWORD, AUTH_SECRET
npm install
npm run db:push
npm run db:seed        # nodirbek-malika namunasi
npm run dev            # http://localhost:3000
```

Subdomen lokalda: `http://nodirbek-malika.localhost:3000`, admin: `http://localhost:3000/admin`.

## Deploy (Vercel + Railway)

1. Railway'da Postgres yarating, `DATABASE_URL` ni oling.
2. Vercel'da loyiha yarating, env'lar: `DATABASE_URL`, `NEXT_PUBLIC_ROOT_DOMAIN=taklif.site`, `ADMIN_PASSWORD`, `AUTH_SECRET` (`openssl rand -hex 32`), `BLOB_READ_WRITE_TOKEN` (Vercel Storage → Blob).
3. Domains: `taklif.site` va `*.taklif.site` (wildcard) ni loyihaga qo'shing. DNS'da:
   - `A @ 76.76.21.21` (yoki Vercel ko'rsatgan qiymat)
   - `CNAME * cname.vercel-dns.com`
   Wildcard uchun Vercel domen nameserverini yoki DNS'da TXT tasdiqni so'raydi.
4. Birinchi deploydan keyin `npx prisma db push` ni Railway URL bilan lokal ishga tushiring (yoki Vercel build'da `prisma migrate deploy`).

## Yangi shablon qo'shish

1. `src/templates/<id>/index.tsx` — `TemplateProps` oladigan default export.
2. `src/templates/registry.ts` — meta va loader.
3. `public/templates/<id>.jpg` — katalog rasmi.
4. `http://localhost:3000/t/<id>` — namuna ma'lumot bilan demo.
