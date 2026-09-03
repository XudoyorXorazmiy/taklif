import { Container, Eyebrow } from "@/components/site/Ui";
import { PHONE, TELEGRAM_URL } from "@/lib/site-content";

export const metadata = { title: "Ommaviy oferta" };

const sections: [string, string][] = [
  ["1. Umumiy qoidalar", "Ushbu oferta taklif.site (keyingi o'rinlarda — Ijrochi) tomonidan onlayn to'y taklifnomasi saytini tayyorlash xizmatini ko'rsatish shartlarini belgilaydi. Buyurtma berish orqali Buyurtmachi ushbu shartlarga rozilik bildiradi."],
  ["2. Xizmat mazmuni", "Ijrochi Buyurtmachi tanlagan shablon asosida, Buyurtmachi yuborgan ma'lumotlar (ismlar, sana, manzil, matnlar, rasmlar) bilan to'ldirilgan taklifnoma saytini tayyorlaydi va kelin-kuyov.taklif.site ko'rinishidagi havolani taqdim etadi."],
  ["3. Muddat", "Standart va Premium tariflarda sayt to'liq ma'lumot olingandan keyin 1 ish kuni ichida tayyorlanadi. Individual tarifda muddat kelishiladi (odatda 5 ish kuni)."],
  ["4. To'lov", "Narx tanlangan tarifga muvofiq belgilanadi. To'lov Click, Payme yoki karta o'tkazmasi orqali amalga oshiriladi: 50% buyurtma tasdiqlanganda, 50% sayt tayyor bo'lganda."],
  ["5. O'zgartirishlar", "To'y sanasigacha matn va rasmlardagi o'zgartirishlar bepul kiritiladi. Shablonni almashtirish yangi buyurtma hisoblanadi."],
  ["6. Saytning ishlash muddati", "Taklifnoma sayti to'y sanasidan keyin 3 oy davomida ochiq turadi. Buyurtmachi xohishiga ko'ra muddat uzaytirilishi mumkin."],
  ["7. Ma'lumotlar", "Buyurtmachi yuborgan rasm va ma'lumotlar faqat taklifnoma saytini tayyorlash uchun ishlatiladi va uchinchi shaxslarga berilmaydi. Mehmonlar RSVP orqali kiritgan ma'lumotlar faqat Buyurtmachiga taqdim etiladi."],
  ["8. Javobgarlik", "Ijrochi saytning texnik ishlashi uchun javobgar. Buyurtmachi yuborgan ma'lumotlarning to'g'riligi uchun Buyurtmachi javobgar."],
];

export default function Oferta() {
  return (
    <Container className="max-w-[860px] py-12 lg:py-20">
      <Eyebrow>Hujjat</Eyebrow>
      <h1 className="m-0 mt-3 font-cg text-[40px] font-medium leading-[1.1] lg:text-[56px]">Ommaviy oferta</h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-[#5B554D] lg:text-base">Onlayn to'y taklifnomasi saytini tayyorlash xizmatini ko'rsatish shartnomasi.</p>
      <div className="mt-10 flex flex-col gap-8">
        {sections.map(([h, t]) => (
          <section key={h}>
            <h2 className="m-0 font-cg text-2xl font-medium leading-[1.2] lg:text-[26px]">{h}</h2>
            <p className="m-0 mt-2.5 text-[15px] leading-[1.7] text-[#4A423A]">{t}</p>
          </section>
        ))}
        <section>
          <h2 className="m-0 font-cg text-2xl font-medium leading-[1.2] lg:text-[26px]">9. Aloqa</h2>
          <p className="m-0 mt-2.5 text-[15px] leading-[1.7] text-[#4A423A]">
            Telegram: <a href={TELEGRAM_URL} className="border-b border-[#B8973F]">{TELEGRAM_URL.replace("https://", "")}</a> · Telefon: {PHONE}
          </p>
        </section>
      </div>
    </Container>
  );
}
