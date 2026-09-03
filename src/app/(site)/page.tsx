import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { TELEGRAM_URL, features, homeFaq, plans, reviews, steps } from "@/lib/site-content";
import { Faq } from "@/components/site/Faq";
import { PhoneCover, PhoneFrame, PhoneScreen } from "@/components/site/Phone";
import { TemplateCard } from "@/components/site/TemplateCard";
import { Ticker } from "@/components/site/Ticker";
import { BtnPrimary, BtnSecondary, Container, Cta, Dot, Eyebrow, H2, IconCircle } from "@/components/site/Ui";

export const revalidate = 60;

export default async function Home() {
  const all = await getCatalog();
  const hero = [all.find((t) => t.id === "floral-watercolor") ?? all[1], all.find((t) => t.id === "classic-gold") ?? all[0], all.find((t) => t.id === "dark-elegant") ?? all[2]].filter(Boolean);
  const [left, center, right] = hero;
  const featurePhone = center ?? all[0];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-8 pb-10 pt-14 lg:grid-cols-[1fr_560px] lg:gap-[60px] lg:pb-20 lg:pt-24">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:gap-7 lg:text-left">
            <Eyebrow>Onlayn to'y taklifnomasi</Eyebrow>
            <h1 className="m-0 font-cg text-[38px] font-medium leading-[1.1] [text-wrap:balance] lg:text-[64px] lg:leading-[1.08] lg:tracking-[-.01em]">
              Mehmonlaringizga havola yuboring, ular telefonda ochib, kelishini tasdiqlasin
            </h1>
            <p className="m-0 max-w-[520px] text-[15px] leading-[1.6] text-[#5B554D] lg:text-lg lg:leading-[1.65]">Shablonni tanlang, ma'lumotlarni yuboring. 1 kun ichida kelin-kuyov.taklif.site havolasi tayyor.</p>
            <div className="flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row lg:gap-3.5">
              <BtnPrimary href="/shablonlar" className="h-[50px] text-sm lg:h-[52px] lg:px-8 lg:text-[15px]">Shablonlarni ko'rish</BtnPrimary>
              <BtnSecondary href={`/t/${center?.id ?? "classic-gold"}`} external className="h-[50px] text-sm lg:h-[52px] lg:px-8 lg:text-[15px]">Demo'ni ochish</BtnSecondary>
            </div>
            <div className="hidden items-center gap-3.5 text-sm font-medium text-[#8A7A5A] lg:mt-2 lg:flex">
              <span>300+ to'y</span><Dot /><span>3 til</span><Dot /><span>1 kunda tayyor</span>
            </div>
          </div>

          {/* telefonlar yelpig'ichi */}
          <div className="relative mx-auto mt-4 h-[380px] w-[350px] lg:mt-0 lg:h-[600px] lg:w-full">
            {left && (
              <div className="absolute left-0 top-10 origin-bottom -rotate-9 lg:top-[70px]">
                <PhoneFrame scale={0.36} className="lg:hidden"><PhoneCover item={left} /></PhoneFrame>
                <PhoneFrame scale={0.58} className="hidden lg:block"><PhoneCover item={left} /></PhoneFrame>
              </div>
            )}
            {right && (
              <div className="absolute right-0 top-10 origin-bottom rotate-9 lg:top-[70px]">
                <PhoneFrame scale={0.36} className="lg:hidden"><PhoneCover item={right} /></PhoneFrame>
                <PhoneFrame scale={0.58} className="hidden lg:block"><PhoneCover item={right} /></PhoneFrame>
              </div>
            )}
            {center && (
              <div className="absolute left-1/2 top-2.5 -translate-x-1/2 lg:top-5">
                <PhoneFrame scale={0.4} className="lg:hidden"><PhoneCover item={center} /></PhoneFrame>
                <PhoneFrame scale={0.62} className="hidden lg:block"><PhoneCover item={center} /></PhoneFrame>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[13px] font-medium text-[#8A7A5A] lg:hidden">
            <span>300+ to'y</span><Dot /><span>3 til</span><Dot /><span>1 kunda tayyor</span>
          </div>
        </Container>
      </section>

      <Ticker />

      {/* how-it-works */}
      <section id="how" className="scroll-mt-20">
        <Container className="py-16 lg:py-28">
          <div className="mb-7 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Qanday ishlaydi</Eyebrow>
              <H2 className="mt-3 lg:mt-4">4 qadam</H2>
            </div>
            <div className="max-w-[380px] text-base leading-[1.6] text-[#5B554D]">Dizayn, kod, hosting — hammasi bizda. Sizdan faqat ma'lumot.</div>
          </div>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-4 lg:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex items-center gap-5 rounded-[20px] border border-[#E2D6B8] bg-white px-6 py-[22px] lg:min-h-[220px] lg:flex-col lg:items-start lg:justify-between lg:rounded-3xl lg:px-7 lg:py-8">
                <div className="w-11 font-cg text-[40px] leading-none text-[#B8973F] lg:w-auto lg:text-[56px]">{s.n}</div>
                <div className="text-[15px] font-medium leading-[1.4] lg:text-lg">{s.t}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* catalog */}
      <section>
        <Container className="pb-16 lg:pb-28">
          <div className="mb-7 text-center lg:mb-14">
            <Eyebrow>Katalog</Eyebrow>
            <H2 className="mt-3 lg:mt-4">Shablonlar</H2>
            <p className="mx-auto mt-2.5 max-w-[520px] text-sm leading-[1.6] text-[#5B554D] lg:mt-3.5 lg:text-[17px]">Har biri 11 blokdan iborat, sizning ma'lumotingiz bilan to'ldiriladi</p>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-7">
            {all.slice(0, 3).map((t) => (
              <TemplateCard key={t.id} item={t} showDesc />
            ))}
          </div>
          <div className="mt-8 text-center lg:mt-10">
            <Link href="/shablonlar" className="border-b border-[#B8973F] pb-1 text-[15px] font-medium hover:text-[#B8973F] lg:text-base">Barcha shablonlar →</Link>
          </div>
        </Container>
      </section>

      {/* features */}
      <section className="border-y border-[#E2D6B8] bg-white">
        <Container className="flex flex-col gap-8 py-16 lg:grid lg:grid-cols-[480px_1fr] lg:items-center lg:gap-24 lg:py-28">
          <div className="lg:order-2 lg:hidden">
            <Eyebrow>Nimalar kiradi</Eyebrow>
            <H2 className="mt-3">Bitta havolada butun to'y</H2>
          </div>
          <div className="flex h-[360px] justify-center overflow-hidden rounded-[20px] bg-[#F5EEDF] lg:h-[620px] lg:items-center lg:rounded-3xl">
            <div className="mt-10 lg:mt-20">
              <PhoneFrame scale={0.55} className="lg:hidden">{featurePhone ? <PhoneScreen screen="rsvp" /> : null}</PhoneFrame>
              <PhoneFrame scale={0.7} className="hidden lg:block"><PhoneScreen screen="rsvp" /></PhoneFrame>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:gap-10">
            <div className="hidden lg:block">
              <Eyebrow>Nimalar kiradi</Eyebrow>
              <H2 className="mt-4">Bitta havolada butun to'y</H2>
            </div>
            <div className="flex flex-col gap-[22px] lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-7">
              {features.map((f) => (
                <div key={f.t} className="flex items-start gap-3.5 lg:gap-4">
                  <IconCircle d={f.icon} />
                  <div>
                    <div className="text-base font-medium leading-[1.35] lg:text-[17px]">{f.t}</div>
                    <div className="mt-1 text-[13px] leading-[1.5] text-[#8A7A5A] lg:text-sm lg:leading-[1.55]">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* pricing */}
      <section id="pricing" className="scroll-mt-20">
        <Container className="py-16 lg:py-28">
          <div className="mb-7 text-center lg:mb-14">
            <Eyebrow>Narxlar</Eyebrow>
            <H2 className="mt-3 lg:mt-4">Tariflar</H2>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative flex flex-col gap-[22px] rounded-3xl border bg-white px-6 py-8 lg:gap-7 lg:px-9 lg:py-10 ${p.hot ? "border-[#B8973F]" : "border-[#E2D6B8]"}`}>
                {p.hot && <div className="absolute -top-[13px] left-6 flex h-[26px] items-center rounded-full bg-[#B8973F] px-3 text-[10px] font-semibold uppercase tracking-[.1em] text-white lg:-top-3.5 lg:left-9 lg:h-7 lg:px-3.5 lg:text-[11px]">Eng ko'p tanlanadi</div>}
                <div>
                  <div className="font-cg text-2xl font-medium leading-[1.1] lg:text-[26px]">{p.name}</div>
                  <div className="mt-2.5 flex items-baseline gap-2 lg:mt-3.5">
                    <span className="font-cg text-[38px] font-medium leading-none lg:text-[44px]">{p.price}</span>
                    <span className="text-[13px] font-medium text-[#8A7A5A] lg:text-sm">{p.unit}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 lg:gap-3">
                  {p.items.map((it) => (
                    <div key={it} className="flex items-start gap-3 text-sm leading-[1.5] text-[#4A423A] lg:text-[15px]">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#B8973F]" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-medium tracking-[.06em] text-[#8A7A5A] lg:text-[13px]">{p.time}</div>
                <BtnPrimary href={TELEGRAM_URL} external className="h-[50px] text-sm">Buyurtma berish</BtnPrimary>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-[13px] text-[#8A7A5A] lg:mt-7 lg:text-sm">Sayt to'ydan keyin 3 oy ochiq turadi</div>
        </Container>
      </section>

      {/* reviews */}
      <section>
        <Container className="pb-16 lg:pb-28">
          <div className="mb-6 lg:mb-12">
            <Eyebrow>Mijozlar fikri</Eyebrow>
            <H2 className="mt-3 lg:mt-4">300 dan ortiq to'y</H2>
          </div>
          <div className="flex flex-col gap-3.5 lg:grid lg:grid-cols-3 lg:gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="flex flex-col gap-3.5 rounded-[20px] border border-[#E2D6B8] bg-white p-6 lg:gap-[18px] lg:rounded-3xl lg:p-8">
                <div className="text-sm tracking-[.2em] text-[#B8973F] lg:text-base">★★★★★</div>
                <p className="m-0 flex-1 font-cg text-xl font-medium italic leading-[1.4] lg:text-[22px]">{r.text}</p>
                <div className="text-[13px] font-medium lg:text-sm">
                  <span>{r.name}</span>
                  <span className="text-[#8A7A5A]"> · {r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* faq */}
      <section id="faq" className="scroll-mt-20">
        <Container className="flex flex-col gap-6 pb-16 lg:grid lg:grid-cols-[400px_1fr] lg:gap-24 lg:pb-28">
          <div>
            <Eyebrow>Savollar</Eyebrow>
            <H2 className="mt-3 lg:mt-4">Ko'p beriladigan savollar</H2>
            <p className="mt-3 hidden text-base leading-[1.6] text-[#5B554D] lg:mt-[18px] lg:block">Javob topa olmadingizmi? Telegram'da yozing — 10 daqiqada javob beramiz.</p>
          </div>
          <Faq items={homeFaq} />
        </Container>
      </section>

      <Cta />
    </>
  );
}
