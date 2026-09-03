import { requireAdmin } from "@/lib/auth";
import { InvitationForm } from "@/components/admin/InvitationForm";

export default async function NewInvitation() {
  await requireAdmin();
  return (
    <>
      <h1 className="text-2xl font-semibold">Yangi taklifnoma</h1>
      <div className="mt-6">
        <InvitationForm />
      </div>
    </>
  );
}
