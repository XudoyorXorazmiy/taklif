import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getCatalogItem } from "@/lib/catalog";
import { TemplateForm } from "@/components/admin/TemplateForm";

export default async function EditTemplate({ params }: PageProps<"/admin/templates/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const t = await getCatalogItem(id);
  if (!t) notFound();
  return (
    <>
      <Link href="/admin/templates" className="text-sm text-neutral-500 hover:underline">
        ← Shablonlar katalogi
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t.name}</h1>
        <div className="flex gap-3 text-sm">
          <a href={`/t/${t.id}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Demo
          </a>
          <a href={`/shablonlar/${t.id}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Katalog sahifasi
          </a>
        </div>
      </div>
      <div className="mt-6">
        <TemplateForm
          id={t.id}
          initial={{
            name: t.name,
            description: t.description,
            body: t.body,
            category: t.category,
            price: t.price,
            thumbnail: t.thumbnail,
            screens: t.screens,
            features: t.features,
            published: t.published,
            badge: t.badge,
            sortOrder: t.sortOrder,
          }}
        />
      </div>
    </>
  );
}
