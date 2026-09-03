"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  /** Intro ochilganda avtomatik boshlash uchun tashqi signal */
  autoplayOn?: boolean;
  /** Shablon dumaloq tugma uslubini beradi (44px, urg'u rang) */
  className?: string;
}

export function MusicButton({ src, autoplayOn, className }: Props) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoplayOn) return;
    ref.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, [autoplayOn]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
        className={`${className ?? "fixed bottom-9 right-8 z-50 grid h-11 w-11 place-items-center rounded-full bg-black text-white shadow-lg"} ${playing ? "music-playing" : "music-paused"}`}
      >
        <span className="font-serif text-xl leading-none">♪</span>
      </button>
    </>
  );
}
