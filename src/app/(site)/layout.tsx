import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#FAF8F3] font-mr text-[#1E1A16]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
