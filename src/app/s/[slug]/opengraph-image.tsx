import { getPublishedBySlug } from "@/lib/invitations";
import { parseContent } from "@/lib/content";
import { formatDateDots, formatTime } from "@/lib/i18n";
import { OG_SIZE, renderOg } from "@/lib/og-render";
import { ROOT_DOMAIN } from "@/lib/site";
import { getTemplateMeta, templates } from "@/templates/registry";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inv = await getPublishedBySlug(slug);
  const meta = getTemplateMeta(inv?.templateId ?? "") ?? templates[0];
  const locale = inv?.locale ?? "UZ";
  const hero = inv ? parseContent(inv.content).hero : null;
  const title = hero?.title.trim() ?? "";
  return renderOg({
    meta,
    locale,
    groom: title || (inv?.groomName ?? "Taklifnoma"),
    bride: title ? "" : (inv?.brideName ?? ""),
    dateLine: inv ? `${formatDateDots(inv.eventAt, locale)}${hero?.showTime ? ` · ${formatTime(inv.eventAt)}` : ""}` : "",
    footer: `${slug}.${ROOT_DOMAIN}`,
  });
}
