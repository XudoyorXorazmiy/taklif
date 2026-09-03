"use client";

import { useTransition } from "react";
import { duplicateInvitation } from "@/app/admin/actions";

export function DuplicateButton({ id, className }: { id: string; className?: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => duplicateInvitation(id))}
      title="Nusxa olish (qoralama sifatida)"
      className={className ?? "rounded-lg border px-2 py-1 text-xs hover:bg-neutral-50 disabled:opacity-50"}
    >
      {pending ? "…" : "Nusxa"}
    </button>
  );
}
