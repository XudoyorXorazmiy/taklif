"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** ms, ketma-ket chiqish uchun */
  delay?: number;
  as?: "div" | "section" | "li";
  id?: string;
}

/**
 * Element ekranga kirganda yumshoq chiqadi (fade + slide).
 * CSS: globals.css dagi .reveal / .reveal.in
 */
export function Reveal({ children, className = "", delay = 0, as = "div", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    // @ts-expect-error — dinamik teg, ref turi umumiy
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
