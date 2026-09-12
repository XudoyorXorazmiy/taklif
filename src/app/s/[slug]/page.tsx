import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { prisma } from "@/lib/db";
import { getPublishedBySlug, isExpired, toTemplateData } from "@/lib/invitations";
import { formatDate, t } from "@/lib/i18n";
import { invitationUrl } from "@/lib/site";
import { ADMIN_TELEGRAM } from "@/lib/site-content";
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
  const meta = getTemplateMeta(inv.templateId);
  const isPreview = preview === "1";

  if (inv.status === "DRAFT" && !isPreview) notFound();
  if (isExpired(inv) && !isPreview) {
    return (
      <main className="grid min-h-dvh place-items-center px-6 py-12" style={{ background: meta?.frameColor ?? "#FAF8F3" }}>
        <div className="w-full max-w-sm rounded-3xl border border-black/10 bg-white/85 px-7 py-10 text-center shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur">
          <div className="font-cg text-[26px] font-medium leading-tight text-[#1E1A16]">{labels.expiredTitle}</div>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5B554D]">{labels.expiredText}</p>
          <a
            href={ADMIN_TELEGRAM}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1E1A16] px-6 text-sm font-semibold text-white transition hover:bg-[#B8973F]"
          >
            {labels.expiredCta}
          </a>
          <p className="mt-4 text-[13px] text-[#8A7A5A]">
            {inv.groomName} &amp; {inv.brideName} · {formatDate(inv.eventAt, inv.locale)}
          </p>
        </div>
      </main>
    );
  }

  if (!isPreview) {
    after(async () => {
      await prisma.invitation.update({ where: { id: inv.id }, data: { views: { increment: 1 } } }).catch(() => {});
    });
  }

  const Template = await loadTemplate(inv.templateId);
  const data = toTemplateData(inv);

  return (
    <main data-template={meta?.id} style={{ background: meta?.frameColor }}>
      <Template data={data} guest={m?.trim() || undefined} preview={isPreview} />
    </main>
  );
}
