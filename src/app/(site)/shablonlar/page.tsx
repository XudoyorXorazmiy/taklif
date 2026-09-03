import { getCatalog } from "@/lib/catalog";
import { TELEGRAM_URL } from "@/lib/site-content";
import { CatalogGrid } from "@/components/site/CatalogGrid";
import { BtnPrimary, Container, Eyebrow } from "@/components/site/Ui";

export const revalidate = 60;
export const metadata = { title: "Shablonlar", description: "To'y taklifnoma shablonlari katalogi. Har birini telefonda demo sifatida ochib ko'ring." };

export default async function Catalog() {
  const items = await getCatalog();
  return (
    <>
      <Container className="flex flex-col gap-3 pb-6 pt-12 lg:gap-[18px] lg:pb-12 lg:pt-[88px]">
        <Eyebrow>Katalog</Eyebrow>
        <h1 className="m-0 font-cg text-[40px] font-medium leading-[1.1] lg:text-[64px] lg:leading-[1.08] lg:tracking-[-.01em]">Taklifnoma shablonlari</h1>
        <p className="m-0 text-[15px] leading-[1.6] text-[#5B554D] lg:text-lg">Har bir shablonni telefonda demo sifatida ochib ko'ring</p>
      </Container>
      <Container className="pb-14 lg:pb-24">
        <CatalogGrid items={items} />
      </Container>
      <Container className="pb-16 lg:pb-28">
        <div className="relative flex flex-col gap-4 rounded-[28px] bg-[#F5EEDF] px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[32px] lg:px-20 lg:py-[72px]">
          <div className="pointer-events-none absolute inset-3 rounded-[18px] border border-[#E2D6B8] lg:inset-5 lg:rounded-[20px]" />
          <div>
            <h2 className="m-0 font-cg text-[30px] font-medium leading-[1.15] lg:text-[40px]">Sizga mos shablon topilmadimi?</h2>
            <p className="m-0 mt-2 text-sm leading-[1.6] text-[#5B554D] lg:mt-3 lg:text-[17px]">Individual dizayn buyurtma qiling — noldan, sizning to'yingiz uchun. 5 kun, 900 000 so'mdan.</p>
          </div>
          <BtnPrimary href={TELEGRAM_URL} external className="relative h-[50px] flex-none text-sm lg:h-[52px] lg:px-9 lg:text-[15px]">Individual dizayn</BtnPrimary>
        </div>
      </Container>
    </>
  );
}
