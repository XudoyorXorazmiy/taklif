import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getCatalogAll } from "@/lib/catalog";
import { PublishToggle } from "@/components/admin/PublishToggle";

export default async function AdminTemplates() {
  await requireAdmin();
  const items = await getCatalogAll();
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Shablonlar katalogi</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Shablon kodi <code>src/templates/</code> da. Bu yerda katalogdagi nom, rasm, narx va matnlar tahrirlanadi.
          </p>
        </div>
        <p className="text-sm text-neutral-500">{items.length} ta</p>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Shablon</th>
              <th className="px-4 py-3">Kategoriya</th>
              <th className="px-4 py-3">Narx</th>
              <th className="px-4 py-3">Rasm</th>
              <th className="px-4 py-3 text-right">Tartib</th>
              <th className="px-4 py-3">Katalogda</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-t hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/templates/${t.id}`} className="font-medium hover:underline">
                    {t.name}
                  </Link>
                  <div className="text-xs text-neutral-500">{t.id}{t.badge ? ` · ${t.badge}` : ""}</div>
                </td>
                <td className="px-4 py-3">{t.category}</td>
                <td className="px-4 py-3">{t.price != null ? `${t.price.toLocaleString("ru-RU")} so'm` : "—"}</td>
                <td className="px-4 py-3">
                  {t.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.thumbnail} alt="" className="h-12 w-8 rounded object-cover" />
                  ) : (
                    <span className="inline-block h-12 w-8 rounded" style={{ background: t.meta.frameColor }} />
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{t.sortOrder}</td>
                <td className="px-4 py-3">
                  <PublishToggle id={t.id} published={t.published} />
                </td>
                <td className="px-4 py-3 text-right">
                  <a href={`/t/${t.id}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    Demo
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
