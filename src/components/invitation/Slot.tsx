import type { CSSProperties } from "react";

interface Props {
  /** Rasm URL. Bo'lsa <img> chiqadi */
  src?: string | null;
  /** Demo/preview'da bo'sh joy dizayndagidek shtrix chiziq bilan ko'rsatiladi */
  preview?: boolean;
  label: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  alt?: string;
}

/**
 * Rasm yoki illyustratsiya joyi. Nashr qilingan sahifada rasm bo'lmasa hech narsa chiqmaydi,
 * demo'da esa dizayndagi "asset spetsifikatsiyasi" ko'rinadi.
 */
export function Slot({ src, preview, label, className = "", imgClassName = "", style, alt = "" }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`${className} ${imgClassName} object-cover`} style={style} />;
  }
  if (!preview) return null;
  return (
    <div className={`${className} slot-ph flex items-center justify-center p-3 text-center`} style={style}>
      <span className="font-mr text-[10px]/[1.4] font-medium">{label}</span>
    </div>
  );
}
