/**
 * Edge (proxy.ts) va server tomonda birdek ishlaydigan cookie imzosi.
 * Bitta admin: cookie qiymati = HMAC-SHA256(AUTH_SECRET, "admin").
 */
export const ADMIN_COOKIE = "taklif_admin";

export async function adminToken(): Promise<string> {
  const secret = process.env.AUTH_SECRET ?? "";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("admin"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidAdminToken(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.AUTH_SECRET) return false;
  return token === (await adminToken());
}
