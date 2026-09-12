import "server-only";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const API = `https://api.telegram.org/bot${TOKEN}`;

export const botConfigured = () => TOKEN.length > 0;

export interface InlineButton {
  text: string;
  data: string;
}

async function call<T = unknown>(method: string, body: unknown): Promise<T | null> {
  if (!TOKEN) return null;
  try {
    const res = await fetch(`${API}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as { ok: boolean; result?: T; description?: string };
    if (!json.ok) console.error("telegram", method, json.description);
    return json.result ?? null;
  } catch (e) {
    console.error("telegram", method, (e as Error).message);
    return null;
  }
}

/** Matn yuborish. Tugmalar berilsa, ular ustun bo'lib chiqadi. */
export function sendMessage(chatId: bigint | number | string, text: string, buttons?: InlineButton[][]) {
  return call("sendMessage", {
    chat_id: String(chatId),
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...(buttons?.length
      ? { reply_markup: { inline_keyboard: buttons.map((row) => row.map((b) => ({ text: b.text, callback_data: b.data }))) } }
      : {}),
  });
}

/** Tugma bosilganda "soat" belgisini o'chirish */
export function answerCallback(id: string, text?: string) {
  return call("answerCallbackQuery", { callback_query_id: id, ...(text ? { text } : {}) });
}

/** Fayl yo'lini olish (rasm yuklab olish uchun) */
export async function getFilePath(fileId: string): Promise<string | null> {
  const r = await call<{ file_path?: string }>("getFile", { file_id: fileId });
  return r?.file_path ?? null;
}

/** Telegram'dan faylni yuklab olish */
export async function downloadFile(filePath: string): Promise<Buffer | null> {
  try {
    const res = await fetch(`https://api.telegram.org/file/bot${TOKEN}/${filePath}`);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

/** Webhook'ni o'rnatish (bir marta, qo'lda chaqiriladi) */
export function setWebhook(url: string, secret: string) {
  return call("setWebhook", { url, secret_token: secret, allowed_updates: ["message", "callback_query"] });
}

/** Adminga xabar (TELEGRAM_ADMIN_CHAT_ID berilgan bo'lsa) */
export function notifyAdmin(text: string, buttons?: InlineButton[][]) {
  const id = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!id) return Promise.resolve(null);
  return sendMessage(id, text, buttons);
}
