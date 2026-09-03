import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/i18n";
import { invitationUrl } from "@/lib/site";
import { getTemplateMeta } from "@/templates/registry";

const statusLabel = { DRAFT: "Qoralama", PUBLISHED: "Nashrda", ARCHIVED: "Arxiv" } as const;
const statusClass = {
  DRAFT: "bg-neutral-100 text-neutral-600",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  ARCHIVED: "bg-amber-100 text-amber-700",
} as const;

export default async function AdminHome() {
  await requireAdmin();
  const list = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { rsvps: true } } },
  });

  return (
    <>
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Taklifnomalar</h1>
        <p className="text-sm text-neutral-500">{list.length} ta</p>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-neutral-500">
          Hali taklifnoma yo'q. <Link href="/admin/new" className="underline">Birinchisini yarating</Link>.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3">Kelin-kuyov</th>
                <th className="px-4 py-3">Subdomen</th>
                <th className="px-4 py-3">Shablon</th>
                <th className="px-4 py-3">To'y sanasi</th>
                <th className="px-4 py-3">Holat</th>
                <th className="px-4 py-3 text-right">Ko'rish</th>
                <th className="px-4 py-3 text-right">RSVP</th>
                <th className="px-4 py-3">To'lov</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id} className="border-t hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/${i.id}`} className="font-medium hover:underline">
                      {i.groomName} & {i.brideName}
                    </Link>
                    {i.clientName && <div className="text-xs text-neutral-500">{i.clientName}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <a href={invitationUrl(i.slug)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {i.slug}
                    </a>
                  </td>
                  <td className="px-4 py-3">{getTemplateMeta(i.templateId)?.name ?? i.templateId}</td>
                  <td className="px-4 py-3">{formatDate(i.eventAt, "UZ")}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusClass[i.status]}`}>{statusLabel[i.status]}</span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{i.views}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    <Link href={`/admin/${i.id}/rsvps`} className="hover:underline">
                      {i._count.rsvps}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{i.paid ? "✅" : i.price ? `${i.price.toLocaleString("ru-RU")} so'm` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
