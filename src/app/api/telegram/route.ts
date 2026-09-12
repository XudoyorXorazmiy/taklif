import { NextResponse } from "next/server";
import { handleUpdate, type TgUpdate } from "@/lib/bot/handler";
import { botConfigured } from "@/lib/telegram";

/** Telegram webhook. Har bir xabar shu yerga keladi. */
export async function POST(req: Request) {
  if (!botConfigured()) return NextResponse.json({ ok: true });

  // Telegram har so'rovga maxfiy sarlavha qo'shadi - boshqa hech kim yozolmasin
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ ok: true });
  }

  // Telegram 200 kutadi; xato bo'lsa ham qayta yubormasin
  try {
    await handleUpdate(update);
  } catch (e) {
    console.error("bot", (e as Error).message);
  }
  return NextResponse.json({ ok: true });
}
