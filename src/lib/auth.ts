import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminToken, isValidAdminToken } from "./auth-edge";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return isValidAdminToken(store.get(ADMIN_COOKIE)?.value);
}

/** Server action / sahifa ichida majburiy admin tekshiruvi */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function loginAdmin(password: string): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, await adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
