"use client";

import { useState } from "react";
import { formatDayMonth, type Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/generated/prisma/client";

export interface RsvpUi {
  form: string;
  label: string;
  input: string;
  option: string;
  optionActive: string;
  dot: string;
  dotActive: string;
  dotInner: string;
  stepper: string;
  stepperBtn: string;
  stepperVal: string;
  button: string;
  sent: string;
  sentIcon: string;
  sentTitle: string;
  sentText: string;
  error?: string;
}

interface Props {
  invitationId: string;
  guest?: string;
  askGuests: boolean;
  askNote: boolean;
  /** Admin kiritgan rahmat matni; bo'sh bo'lsa standart */
  thanks?: string;
  eventDate: Date;
  locale: Locale;
  labels: Dict;
  preview?: boolean;
  ui: RsvpUi;
}

type Att = "YES" | "NO" | "MAYBE";

export function RsvpForm({ invitationId, guest, askGuests, askNote, thanks, eventDate, locale, labels, preview, ui }: Props) {
  const [name, setName] = useState(guest ?? "");
  const [attending, setAttending] = useState<Att>("YES");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (preview) return setState("done");
    setState("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ invitationId, name, attending, guests: attending === "NO" ? 1 : guests, note, invitedAs: guest ?? null }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    const text = thanks?.trim() || `${labels.thanksText}\n${labels.seeYou.replace("{date}", formatDayMonth(eventDate, locale))}`;
    return (
      <div className={ui.sent}>
        <div className={ui.sentIcon}>✓</div>
        <div className={ui.sentTitle}>{labels.thanksTitle}</div>
        <div className={`${ui.sentText} whitespace-pre-line`}>{text}</div>
      </div>
    );
  }

  const options: [Att, string][] = [
    ["YES", labels.rsvpYes],
    ["NO", labels.rsvpNo],
    ["MAYBE", labels.rsvpMaybe],
  ];

  return (
    <form onSubmit={submit} className={ui.form}>
      <label className="flex flex-col gap-1.5">
        <span className={ui.label}>{labels.rsvpName}</span>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={labels.rsvpNamePlaceholder} className={ui.input} />
      </label>

      <div className="flex flex-col gap-2" role="radiogroup">
        {options.map(([v, l]) => {
          const on = attending === v;
          return (
            <button type="button" key={v} role="radio" aria-checked={on} onClick={() => setAttending(v)} className={on ? ui.optionActive : ui.option}>
              <span className={on ? ui.dotActive : ui.dot}>{on && <span className={ui.dotInner} />}</span>
              {l}
            </button>
          );
        })}
      </div>

      {askGuests && attending !== "NO" && (
        <label className="flex flex-col gap-1.5">
          <span className={ui.label}>{labels.rsvpGuests}</span>
          <div className={ui.stepper}>
            <button type="button" aria-label="−" onClick={() => setGuests((g) => Math.max(1, g - 1))} className={`${ui.stepperBtn} border-r`}>
              −
            </button>
            <div className={ui.stepperVal}>{guests}</div>
            <button type="button" aria-label="+" onClick={() => setGuests((g) => Math.min(20, g + 1))} className={`${ui.stepperBtn} border-l`}>
              +
            </button>
          </div>
        </label>
      )}

      {askNote && (
        <label className="flex flex-col gap-1.5">
          <span className={ui.label}>{labels.rsvpNote}</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={labels.rsvpNotePlaceholder} className={`${ui.input} h-[84px] resize-none py-3`} />
        </label>
      )}

      {state === "error" && <p className={ui.error ?? "text-sm text-red-700"}>{labels.rsvpError}</p>}

      <button type="submit" disabled={state === "sending"} className={ui.button}>
        {state === "sending" ? labels.rsvpSending : labels.rsvpSend}
      </button>
    </form>
  );
}
