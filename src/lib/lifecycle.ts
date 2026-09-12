import "server-only";
import type { Invitation } from "./generated/prisma/client";

/** Sinov muddati: admin tasdiqlagandan keyin havola shuncha vaqt ochiq turadi */
export const TRIAL_HOURS = 2;
/** To'langandan keyin: to'ydan keyin yana shuncha kun ochiq turadi */
export const PAID_DAYS_AFTER_EVENT = 90;

type Lite = Pick<Invitation, "status" | "paid" | "expiresAt" | "eventAt">;

/** To'langanda muddat: to'y kuni + 90 kun */
export function paidExpiry(eventAt: Date): Date {
  return new Date(eventAt.getTime() + PAID_DAYS_AFTER_EVENT * 24 * 3600 * 1000);
}

/** Tasdiqlanganda muddat: hozirdan 2 soat */
export function trialExpiry(from: Date = new Date()): Date {
  return new Date(from.getTime() + TRIAL_HOURS * 3600 * 1000);
}

/** Havola hozir ochiqmi */
export function isLive(inv: Lite): boolean {
  if (inv.status !== "PUBLISHED") return false;
  return !inv.expiresAt || inv.expiresAt.getTime() > Date.now();
}

/** Muddati tugaganmi (nashrda edi, lekin vaqti o'tdi) */
export function isExpired(inv: Lite): boolean {
  if (inv.status === "ARCHIVED") return true;
  return !!inv.expiresAt && inv.expiresAt.getTime() <= Date.now();
}

/** Sinov kunida turibdimi (tasdiqlangan, lekin hali to'lanmagan) */
export function isTrial(inv: Lite): boolean {
  return inv.status === "PUBLISHED" && !inv.paid;
}

/** Sinov tugashiga qolgan vaqt, soatlarda (butunga yaxlitlangan) */
export function trialHoursLeft(inv: Lite): number | null {
  if (!isTrial(inv) || !inv.expiresAt) return null;
  const ms = inv.expiresAt.getTime() - Date.now();
  return ms <= 0 ? 0 : Math.ceil(ms / 3600000);
}
