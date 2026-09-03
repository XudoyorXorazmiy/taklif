import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { prisma } from "@/lib/db";
import { getPublishedBySlug, isExpired, toTemplateData } from "@/lib/invitations";
import { formatDate, t } from "@/lib/i18n";
import { invitationUrl } from "@/lib/site";
import { getTemplateMeta, loadTemplate } from "@/templates/registry";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ m?: string; preview?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const inv = await getPublishedBySlug(slug);
  if (!inv) return { title: "Taklifnoma" };
  const title = `${inv.groomName} & ${inv.brideName}`;
  const description = `${inv.locale === "RU" ? "Приглашение на свадьбу" : "To'y taklifnomasi"} · ${formatDate(inv.eventAt, inv.locale)}`;
  const base = invitationUrl(slug);
  const og = inv.ogImage ?? `${base}/opengraph-image`;
  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: { title, description, images: [{ url: og, width: 1200, height: 630 }], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [og] },
    robots: { index: false, follow: false },
  };
}

export default async function InvitationPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { m, preview } = await searchParams;
  const inv = await getPublishedBySlug(slug);
  if (!inv) notFound();

  const labels = t(inv.locale);
  const isPreview = preview === "1";

  if (inv.status === "DRAFT" && !isPreview) notFound();
  if (isExpired(inv) && !isPreview) {
    return (
      <main className="grid min-h-dvh place-items-center p-8 text-center text-neutral-600">
        <p>{labels.expired}</p>
      </main>
    );
  }

  if (!isPreview) {
    after(async () => {
      await prisma.invitation.update({ where: { id: inv.id }, data: { views: { increment: 1 } } }).catch(() => {});
    });
  }

  const Template = await loadTemplate(inv.templateId);
  const meta = getTemplateMeta(inv.templateId);
  const data = toTemplateData(inv);

  return (
    <main data-template={meta?.id} style={{ background: meta?.frameColor }}>
      <Template data={data} guest={m?.trim() || undefined} preview={isPreview} />
    </main>
  );
}
