import type { ComponentType } from "react";
import type { TemplateMeta, TemplateProps } from "./types";

/**
 * Shablonlar ro'yxati. Yangi shablon qo'shish:
 *   1. src/templates/<id>/index.tsx — default export komponent
 *   2. public/templates/<id>.jpg — katalog rasmi
 *   3. shu ro'yxatga meta va loader qo'shish
 */
export const templates: TemplateMeta[] = [
  {
    id: "classic-gold",
    name: "Klassik oltin",
    category: "classic",
    description: "Oq-krem qog'oz fon, oltin ramka va monogram, Pinyon Script kalligrafiya.",
    thumbnail: "/templates/classic-gold.jpg",
    frameColor: "#EFE7D6",
    og: { bg: "#FBF8F1", text: "#1E1A16", accent: "#B8973F", muted: "#8A7A5A", script: "pinyon", serif: "cormorant", frame: "square" },
  },
  {
    id: "floral-watercolor",
    name: "Gulli akvarel",
    category: "floral",
    description: "Oq fon, akvarel gullar, yashil-oltin urg'u, Great Vibes kalligrafiya.",
    thumbnail: "/templates/floral-watercolor.jpg",
    frameColor: "#EEF0E6",
    og: { bg: "#FFFFFF", text: "#3B3A36", accent: "#C2A36B", muted: "#7A8C6E", script: "vibes", serif: "cormorant", frame: "none" },
  },
  {
    id: "dark-elegant",
    name: "Qorong'i elegant",
    category: "dark",
    description: "To'q jigarrang fon, krem kartochkalar, oltin chiziqlar, Alex Brush kalligrafiya.",
    thumbnail: "/templates/dark-elegant.jpg",
    frameColor: "#1F150F",
    og: { bg: "#2B1D16", text: "#F1E6D2", accent: "#C9A961", muted: "rgba(241,230,210,.55)", script: "alex", serif: "marcellus", frame: "oval" },
  },
];

const loaders: Record<string, () => Promise<{ default: ComponentType<TemplateProps> }>> = {
  "classic-gold": () => import("./classic-gold"),
  "floral-watercolor": () => import("./floral-watercolor"),
  "dark-elegant": () => import("./dark-elegant"),
};

export function getTemplateMeta(id: string): TemplateMeta | undefined {
  return templates.find((t) => t.id === id);
}

export async function loadTemplate(id: string): Promise<ComponentType<TemplateProps>> {
  const loader = loaders[id] ?? loaders["classic-gold"];
  return (await loader()).default;
}
