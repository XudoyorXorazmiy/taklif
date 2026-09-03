import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog, getCatalogItem } from "@/lib/catalog";
import { TELEGRAM_URL, categoryLabel, defaultIncludes, formatPrice, steps, templateFaq } from "@/lib/site-content";
import { BlocksCarousel } from "@/components/site/BlocksCarousel";
import { Faq } from "@/components/site/Faq";
import { PhoneCover, PhoneFrame } from "@/components/site/Phone";
import { TemplateViewer } from "@/components/site/TemplateViewer";
import { BtnPrimary, BtnSecondary, Container, Cta, Dot, Eyebrow, H2, IconCircle } from "@/components/site/Ui";

export const revalidate = 60;
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = await getCatalogItem(id);
  return { title: t?.name ?? "Shablon", description: t?.description, openGraph: { images: [`/t/${id}/opengraph-image`] } };
}

export default async function TemplatePage({ params }: Props) {
  const { id } = await params;
  const t = await getCatalogItem(id);
  if (!t || !t.published) notFound();
  const related = (await getCatalog()).filter((o) => o.id !== id).slice(0, 3);
  const includes = t.features.length ? t.features.map((f, i) => ({ t: f, icon: defaultIncludes[i % defaultIncludes.length].icon })) : defaultIncludes;
  const order = `${TELEGRAM_URL}?text=${encodeURIComponent(`Assalomu alaykum! "${t.name}" shablonida taklifnoma buyurtma qilmoqchiman.`)}`;

  return (
    <>
      <Container className="flex gap-2 pt-5 font-mr text-xs font-medium text-[#8A7A5A] lg:pt-7 lg:text-[13px]">
        <Link href="/shablonlar" className="hover:text-[#B8973F]">Katalog</Link>
        <span>→</span>
        <span className="text-[#1E1A16]">{t.name}</span>
      </Container>

      {/* product */}
      <Container className="flex flex-col gap-5 pb-14 pt-6 lg:grid lg:grid-cols-[560px_1fr] lg:items-start lg:gap-24 lg:pb-28 lg:pt-10">
        <div className="lg:hidden">
          <Eyebrow>{categoryLabel(t.category)}</Eyebrow>
          <h1 className="m-0 mt-3 font-cg text-[44px] font-medium leading-[1.05]">{t.name}</h1>
        </div>
        <TemplateViewer item={t} />
        <div className="flex flex-col gap-5 lg:gap-7 lg:pt-3">
          <div className="hidden lg:block">
            <Eyebrow>{categoryLabel(t.category)}</Eyebrow>
            <h1 className="m-0 mt-7 font-cg text-[64px] font-medium leading-[1.05] tracking-[-.01em]">{t.name}</h1>
          </div>
          <p className="m-0 text-[15px] leading-[1.65] text-[#5B554D] lg:text-[17px] lg:leading-[1.7]">{t.body || t.description}</p>
          <div className="flex items-baseline gap-2 border-t border-[#E2D6B8] pt-4 lg:gap-2.5 lg:pt-2">
            <span className="font-cg text-[42px] font-medium leading-none lg:text-[52px]">{t.price != null ? t.price.toLocaleString("ru-RU") : "Narx so'rang"}</span>
            {t.price != null && <span className="text-sm font-medium text-[#8A7A5A] lg:text-base">so'm · Premium tarif</span>}
          </div>
          <div className="flex flex-col gap-2.5 lg:max-w-[420px] lg:gap-3">
            <BtnPrimary href={order} external className="h-[52px] text-sm lg:h-14 lg:text-[15px]">Shu dizaynda buyurtma berish</BtnPrimary>
            <BtnSecondary href={`/t/${t.id}`} external className="h-[52px] text-sm lg:h-14 lg:text-[15px]">Demo'ni to'liq ochish</BtnSecondary>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-[#8A7A5A] lg:gap-3.5 lg:text-sm">
            <span>Tayyor bo'lish: 1 kun</span><Dot /><span>O'zbek va rus tili</span><Dot /><span>Cheksiz mehmon</span>
          </div>
        </div>
      </Container>

      {/* includes */}
      <section className="border-y border-[#E2D6B8] bg-white">
        <Container className="py-14 lg:py-24">
          <H2 className="mb-5 text-[32px] lg:mb-12 lg:text-[44px]">Taklifnomaga nimalar kiradi</H2>
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-5">
            {includes.map((f) => (
              <div key={f.t} className="flex items-center gap-3.5 border-b border-[#E2D6B8] py-3.5 lg:gap-4 lg:py-[18px]">
                <IconCircle d={f.icon} className="h-10 w-10 lg:h-11 lg:w-11" />
                <div className="text-[15px] font-medium leading-[1.35] lg:text-[17px]">{f.t}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <BlocksCarousel item={t} />

      {/* how-it-works */}
      <Container className="pb-14 lg:pb-24">
        <H2 className="mb-5 text-[32px] lg:mb-10 lg:text-[44px]">Qanday ishlaydi</H2>
        <div className="flex flex-col gap-3.5 lg:grid lg:grid-cols-4 lg:gap-6">
          {steps.map((s) => (
            <div key={s.n} className="flex items-start gap-4 border-t border-[#B8973F] pt-3.5 lg:gap-[18px] lg:pt-5">
              <div className="font-cg text-[30px] leading-none text-[#B8973F] lg:text-4xl">{s.n}</div>
              <div className="text-[15px] font-medium leading-[1.45] lg:text-base">{s.t}</div>
            </div>
          ))}
        </div>
      </Container>

      {/* faq */}
      <Container className="flex flex-col gap-3 pb-14 lg:grid lg:grid-cols-[400px_1fr] lg:gap-24 lg:pb-24">
        <H2 className="text-[32px] lg:text-[44px]">Savollar</H2>
        <Faq items={templateFaq} />
      </Container>

      {/* related */}
      {related.length > 0 && (
        <Container className="pb-14 lg:pb-28">
          <div className="mb-5 flex items-baseline justify-between lg:mb-10 lg:items-end">
            <H2 className="text-[32px] lg:text-[44px]">Boshqa dizaynlar</H2>
            <Link href="/shablonlar" className="border-b border-[#B8973F] pb-1 text-[13px] font-medium hover:text-[#B8973F] lg:text-[15px]">
              <span className="lg:hidden">Barchasi →</span>
              <span className="hidden lg:inline">Barcha shablonlar →</span>
            </Link>
          </div>
          <div className="flex flex-col gap-3.5 lg:grid lg:grid-cols-3 lg:gap-7">
            {related.map((c) => (
              <Link key={c.id} href={`/shablonlar/${c.id}`} className="flex items-center gap-4 rounded-[20px] border border-[#E2D6B8] bg-white p-3.5 transition hover:shadow-[0_20px_50px_rgba(30,26,22,.1)] lg:flex-col lg:items-stretch lg:gap-[18px] lg:rounded-3xl lg:p-5">
                <div className="flex h-[150px] w-[110px] flex-none justify-center overflow-hidden rounded-xl bg-[#F5EEDF] pt-2 lg:h-[340px] lg:w-auto lg:items-end lg:rounded-2xl lg:pt-0">
                  <PhoneFrame scale={0.24} className="lg:hidden"><PhoneCover item={c} /></PhoneFrame>
                  <PhoneFrame scale={0.55} className="hidden lg:block lg:-mb-40"><PhoneCover item={c} /></PhoneFrame>
                </div>
                <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:justify-between lg:px-1.5">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B8973F] lg:text-[11px]">{categoryLabel(c.category)}</div>
                    <div className="mt-1 font-cg text-2xl font-medium leading-[1.1] lg:mt-1.5 lg:text-[26px]">{c.name}</div>
                  </div>
                  <div className="font-cg text-base font-medium text-[#5B554D] lg:text-lg lg:text-[#1E1A16]">{formatPrice(c.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <Cta />
    </>
  );
}
