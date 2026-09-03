import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BtnPrimary, BtnSecondary, Container } from "@/components/site/Ui";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#FAF8F3] font-mr text-[#1E1A16]">
      <Header />
      <main className="flex-1">
    <Container className="flex flex-col items-center py-24 text-center lg:py-40">
      <div className="font-ps text-[72px] leading-none text-[#B8973F] lg:text-[110px]">404</div>
      <h1 className="m-0 mt-6 font-cg text-[32px] font-medium leading-[1.1] lg:text-[44px]">Sahifa topilmadi</h1>
      <p className="m-0 mt-3 max-w-[420px] text-[15px] leading-[1.6] text-[#5B554D] lg:text-base">Havola eskirgan yoki noto'g'ri yozilgan bo'lishi mumkin.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <BtnPrimary href="/" className="h-12 px-7 text-sm">Asosiy sahifa</BtnPrimary>
        <BtnSecondary href="/shablonlar" className="h-12 px-7 text-sm">Shablonlar</BtnSecondary>
      </div>
    </Container>
      </main>
      <Footer />
    </div>
  );
}
