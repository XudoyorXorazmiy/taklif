/**
 * Telegram webhook'ni o'rnatadi. Bir marta ishlatiladi:
 *   TELEGRAM_BOT_TOKEN=... TELEGRAM_WEBHOOK_SECRET=... node scripts/set-webhook.mjs
 * Ixtiyoriy: BASE_URL (default https://taklif.site)
 */
const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const base = process.env.BASE_URL ?? "https://taklif.site";
if (!token || !secret) {
  console.error("TELEGRAM_BOT_TOKEN va TELEGRAM_WEBHOOK_SECRET kerak");
  process.exit(1);
}
const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    url: `${base}/api/telegram`,
    secret_token: secret,
    allowed_updates: ["message", "callback_query"],
    drop_pending_updates: true,
  }),
});
const json = await res.json();
console.log(json.ok ? `webhook o'rnatildi: ${base}/api/telegram` : `xato: ${json.description}`);
