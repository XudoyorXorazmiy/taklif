"use client";

import { useTransition } from "react";
import { deleteInvitation, duplicateInvitation, setStatus } from "@/app/admin/actions";

export function StatusBar({ id, status }: { id: string; status: "DRAFT" | "PUBLISHED" | "ARCHIVED" }) {
  const [pending, start] = useTransition();
  const btn = "rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50";
  return (
    <div className="flex items-center gap-2">
      <button disabled={pending} onClick={() => start(() => duplicateInvitation(id))} className={btn} title="Shu taklifnomadan nusxa olish">
        Nusxa olish
      </button>
      {status !== "PUBLISHED" && (
        <button disabled={pending} onClick={() => start(() => setStatus(id, "PUBLISHED"))} className={`${btn} border-emerald-600 bg-emerald-600 text-white`}>
          Nashr qilish
        </button>
      )}
      {status === "PUBLISHED" && (
        <button disabled={pending} onClick={() => start(() => setStatus(id, "DRAFT"))} className={btn}>
          Nashrdan olish
        </button>
      )}
      {status !== "ARCHIVED" && (
        <button disabled={pending} onClick={() => start(() => setStatus(id, "ARCHIVED"))} className={btn}>
          Arxivlash
        </button>
      )}
      <button
        disabled={pending}
        onClick={() => {
          if (confirm("Taklifnoma va barcha RSVP javoblari o'chiriladi. Davom etasizmi?")) start(() => deleteInvitation(id));
        }}
        className={`${btn} border-red-200 text-red-600`}
      >
        O'chirish
      </button>
    </div>
  );
}
