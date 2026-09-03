"use client";

import { useState } from "react";

export function CopyButton({ value, label = "Nusxalash" }: { value: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="rounded-lg border px-2 py-1 text-xs hover:bg-neutral-50"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
    >
      {ok ? "Nusxalandi ✓" : label}
    </button>
  );
}
