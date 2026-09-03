import { formatDateDots, formatTime } from "@/lib/i18n";
import { OG_SIZE, renderOg } from "@/lib/og-render";
import { sampleInvitation } from "@/lib/sample";
import { ROOT_DOMAIN } from "@/lib/site";
import { getTemplateMeta, templates } from "@/templates/registry";

export const size = OG_SIZE;
export const contentType = "image/png";

/** Katalog demo'si uchun preview (namuna ma'lumot) */
export default async function OgImage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const meta = getTemplateMeta(templateId) ?? templates[0];
  const d = sampleInvitation("UZ");
  return renderOg({
    meta,
    locale: "UZ",
    groom: d.groomName,
    bride: d.brideName,
    dateLine: `${formatDateDots(d.eventAt, "UZ")} · ${formatTime(d.eventAt)}`,
    footer: `${d.slug}.${ROOT_DOMAIN}`,
  });
}
