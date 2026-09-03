import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sampleInvitation } from "@/lib/sample";
import { getTemplateMeta, loadTemplate } from "@/templates/registry";

type Props = { params: Promise<{ templateId: string }>; searchParams: Promise<{ lang?: string; intro?: string; spec?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { templateId } = await params;
  const meta = getTemplateMeta(templateId);
  return { title: meta ? `${meta.name} — demo` : "Demo", robots: { index: false } };
}

/** Katalogdagi "Demo'ni ochish" — shablon namuna ma'lumot bilan */
export default async function TemplateDemo({ params, searchParams }: Props) {
  const { templateId } = await params;
  const { lang, intro, spec } = await searchParams;
  const meta = getTemplateMeta(templateId);
  if (!meta) notFound();
  const Template = await loadTemplate(templateId);
  const data = sampleInvitation(lang === "ru" ? "RU" : "UZ");
  if (intro === "0") data.content.hero.intro = false;
  return (
    <main data-template={meta.id} style={{ background: meta.frameColor }}>
      <Template data={data} preview slots={spec === "1"} />
    </main>
  );
}
