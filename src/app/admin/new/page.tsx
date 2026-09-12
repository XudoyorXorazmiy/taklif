import { requireAdmin } from "@/lib/auth";
import { getTracks } from "@/lib/tracks";
import { InvitationForm } from "@/components/admin/InvitationForm";

export default async function NewInvitation() {
  await requireAdmin();
  const tracks = await getTracks();
  return (
    <>
      <h1 className="text-2xl font-semibold">Yangi taklifnoma</h1>
      <div className="mt-6">
        <InvitationForm tracks={tracks} />
      </div>
    </>
  );
}
