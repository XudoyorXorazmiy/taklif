"use client";

import { useTransition } from "react";
import { setTemplatePublished } from "@/app/admin/actions";

export function PublishToggle({ id, published }: { id: string; published: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setTemplatePublished(id, !published))}
      className={`rounded-full px-2.5 py-0.5 text-xs disabled:opacity-50 ${published ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}
    >
      {published ? "Ko'rinadi" : "Yashirin"}
    </button>
  );
}
