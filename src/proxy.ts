import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/auth-edge";
import { ROOT_DOMAIN, RESERVED_SLUGS } from "@/lib/site";

/**
 * Host bo'yicha yo'naltirish (Next 16: middleware.ts o'rniga proxy.ts):
 *   taklif.site            → landing / katalog (o'z holicha)
 *   admin.taklif.site/*    → /admin/*
 *   nodir-malika.taklif.site/*  → /s/nodir-malika/*
 * Lokal: nodir-malika.localhost:3000 ham shunday ishlaydi.
 */
function subdomainOf(host: string): string | null {
  const h = host.split(":")[0].toLowerCase();
  const root = ROOT_DOMAIN.split(":")[0];
  if (h === root) return null;
  if (h.endsWith(`.${root}`)) return h.slice(0, -(root.length + 1));
  // lokal dev: *.localhost
  if (h.endsWith(".localhost")) return h.slice(0, -".localhost".length);
  return null;
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") ?? "";
  const sub = subdomainOf(host);

  // Admin himoyasi (qaysi hostdan kelmasin)
  const wantsAdmin =
    pathname.startsWith("/admin") || (sub === "admin" && !pathname.startsWith("/api"));
  if (wantsAdmin) {
    const isLogin = pathname.startsWith("/admin/login") || (sub === "admin" && pathname === "/login");
    const ok = await isValidAdminToken(req.cookies.get(ADMIN_COOKIE)?.value);
    if (!ok && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = sub === "admin" ? "/login" : "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (!sub || sub === "www") return NextResponse.next();

  const url = req.nextUrl.clone();
  if (sub === "admin") {
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
      url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (RESERVED_SLUGS.has(sub)) return NextResponse.next();

  // Taklifnoma subdomeni: API va ichki yo'llar tegilmaydi
  if (pathname.startsWith("/api") || pathname.startsWith("/s/")) return NextResponse.next();
  url.pathname = `/s/${sub}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
