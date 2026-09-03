import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/generated/prisma/client";
import { defaultContent } from "../src/lib/content";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const content = defaultContent();
  content.venues = [
    {
      title: "Nikoh to'yi",
      time: "18:00",
      name: "Navro'z to'yxonasi",
      address: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi 108",
      mapUrl: "https://yandex.uz/maps/-/CDqZ5Q~A",
      image: "",
    },
  ];
  content.blocks.contacts = true;
  content.contacts = [{ name: "Kuyov tomon", phone: "+998901234567", telegram: "" }];
  content.rsvp.deadline = "1-oktabrgacha javob bering";

  await prisma.invitation.upsert({
    where: { slug: "test" },
    update: {},
    create: {
      slug: "nodirbek-malika",
      templateId: "classic-gold",
      status: "PUBLISHED",
      locale: "UZ",
      groomName: "Nodirbek",
      brideName: "Malika",
      eventAt: new Date("2026-10-12T18:00:00+05:00"),
      content,
      clientName: "Test mijoz",
      paid: true,
    },
  });
  console.log("Seed: nodirbek-malika");
}

main().finally(() => prisma.$disconnect());
