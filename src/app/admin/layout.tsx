import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { logoutAction } from "./actions";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const authed = await isAdmin();
  return (
    <div className="flex min-h-dvh flex-col bg-neutral-50 text-neutral-900">
      {authed && (
        <header className="border-b bg-white">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/admin" className="font-semibold">
              taklif.site · Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-neutral-600 hover:text-neutral-900">
                Taklifnomalar
              </Link>
              <Link href="/admin/templates" className="text-neutral-600 hover:text-neutral-900">
                Shablonlar
              </Link>
              <Link href="/admin/new" className="rounded-lg bg-neutral-900 px-3 py-1.5 text-white">
                + Yangi taklifnoma
              </Link>
              <form action={logoutAction}>
                <button className="text-neutral-500 hover:text-neutral-900">Chiqish</button>
              </form>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
