"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <main className="grid flex-1 place-items-center">
      <form action={action} className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold">Admin kirish</h1>
        <input
          name="password"
          type="password"
          autoFocus
          placeholder="Parol"
          className="mt-6 w-full rounded-lg border px-4 py-2.5"
        />
        {state?.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
        <button disabled={pending} className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-white disabled:opacity-60">
          {pending ? "Tekshirilmoqda…" : "Kirish"}
        </button>
      </form>
    </main>
  );
}
