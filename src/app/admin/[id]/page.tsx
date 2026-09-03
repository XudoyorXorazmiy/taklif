import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseContent } from "@/lib/content";
import { invitationUrl } from "@/lib/site";
import { InvitationForm } from "@/components/admin/InvitationForm";
import { StatusBar } from "@/components/admin/StatusBar";
import { GuestLinks } from "@/components/admin/GuestLinks";
import { CopyButton } from "@/components/admin/CopyButton";

function toLocalInput(d: Date | null): string | null {
  if (!d) return null;
  // Toshkent vaqtida "YYYY-MM-DDTHH:mm"
  const t = new Date(d.getTime() + 5 * 3600 * 1000);
  return t.toISOString().slice(0, 16);
}

export default async function EditInvitation({ params }: PageProps<"/admin/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const inv = await prisma.invitation.findUnique({ where: { id }, include: { _count: { select: { rsvps: true } } } });
  if (!inv) notFound();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {inv.groomName} & {inv.brideName}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            <a href={invitationUrl(inv.slug)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              {invitationUrl(inv.slug)}
            </a>{" "}
            <CopyButton value={invitationUrl(inv.slug)} />
            {" · "}
            <a href={`${invitationUrl(inv.slug)}?preview=1`} target="_blank" rel="noreferrer" className="hover:underline">
              Preview
            </a>
            {" · "}
            <Link href={`/admin/${inv.id}/rsvps`} className="hover:underline">
              RSVP: {inv._count.rsvps}
            </Link>
            {" · "}Ko'rishlar: {inv.views}
          </p>
        </div>
        <StatusBar id={inv.id} status={inv.status} />
      </div>

      <div className="mt-6">
        <GuestLinks baseUrl={invitationUrl(inv.slug)} />
      </div>

      <div className="mt-6">
        <InvitationForm
          id={inv.id}
          initial={{
            slug: inv.slug,
            templateId: inv.templateId,
            locale: inv.locale,
            groomName: inv.groomName,
            brideName: inv.brideName,
            eventAt: toLocalInput(inv.eventAt)!,
            coverImage: inv.coverImage,
            gallery: inv.gallery,
            music: inv.music,
            ogImage: inv.ogImage,
            clientName: inv.clientName,
            clientPhone: inv.clientPhone,
            price: inv.price,
            paid: inv.paid,
            note: inv.note,
            expiresAt: toLocalInput(inv.expiresAt),
            content: parseContent(inv.content),
          }}
        />
      </div>
    </>
  );
}
