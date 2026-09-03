"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { MusicButton } from "./MusicButton";

interface Props {
  /** Yopiq holat (konvert, muhr). Bosilganda ochiladi. Bo'lmasa intro ko'rsatilmaydi. */
  intro?: ReactNode;
  /** Intro'ni ko'rsatish (admin sozlamasi) */
  showIntro?: boolean;
  music?: string | null;
  musicClassName?: string;
  children: ReactNode;
}

/**
 * Taklifnoma qobig'i: intro ekrani → ochilish animatsiyasi → sahifa + musiqa.
 * Intro yopiq paytda sahifa scroll qilinmaydi.
 */
export function InvitationShell({ intro, showIntro = true, music, musicClassName, children }: Props) {
  const hasIntro = !!intro && showIntro;
  const [phase, setPhase] = useState<"closed" | "opening" | "open">(hasIntro ? "closed" : "open");

  const open = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 900);
  }, [phase]);

  // Sahifa ochilgach #hash bo'lsa shu blokka o'tish (katalogdagi "Sana / Dastur / RSVP" tugmalari)
  useEffect(() => {
    if (phase !== "open" || !window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    el?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [phase]);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "open" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  return (
    <>
      {phase !== "open" && (
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
          className={`intro-gate fixed inset-0 z-[60] cursor-pointer ${phase === "opening" ? "intro-opening" : ""}`}
        >
          {intro}
        </div>
      )}
      <div className={phase === "open" ? "page-in" : "invisible"} aria-hidden={phase !== "open"}>
        {children}
      </div>
      {music && <MusicButton src={music} autoplayOn={phase === "open" && hasIntro} className={musicClassName} />}
    </>
  );
}
