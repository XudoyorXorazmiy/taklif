import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const att = { YES: "Keladi", NO: "Kelmaydi", MAYBE: "Noaniq" } as const;

export default async function Rsvps({ params }: PageProps<"/admin/[id]/rsvps">) {
  await requireAdmin();
  const { id } = await params;
  const inv = await prisma.invitation.findUnique({
    where: { id },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });
  if (!inv) notFound();

  const yes = inv.rsvps.filter((r) => r.attending === "YES");
  const total = yes.reduce((s, r) => s + r.guests, 0);

  return (
    <>
      <Link href={`/admin/${id}`} className="text-sm text-neutral-500 hover:underline">
        ← {inv.groomName} & {inv.brideName}
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">Mehmonlar javobi</h1>
      <div className="mt-4 flex gap-6 text-sm">
        <span>Jami javob: <b>{inv.rsvps.length}</b></span>
        <span>Keladi: <b>{yes.length}</b> ({total} kishi)</span>
        <span>Kelmaydi: <b>{inv.rsvps.filter((r) => r.attending === "NO").length}</b></span>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Ism</th>
              <th className="px-4 py-3">Javob</th>
              <th className="px-4 py-3 text-right">Kishi</th>
              <th className="px-4 py-3">Izoh</th>
              <th className="px-4 py-3">Kim orqali</th>
              <th className="px-4 py-3">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            {inv.rsvps.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3">{att[r.attending]}</td>
                <td className="px-4 py-3 text-right">{r.attending === "NO" ? "—" : r.guests}</td>
                <td className="px-4 py-3 text-neutral-600">{r.note ?? ""}</td>
                <td className="px-4 py-3 text-neutral-500">{r.invitedAs ?? ""}</td>
                <td className="px-4 py-3 text-neutral-500">{r.createdAt.toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}</td>
              </tr>
            ))}
            {inv.rsvps.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">Hali javob yo'q</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
