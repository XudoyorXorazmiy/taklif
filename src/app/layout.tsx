import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/templates/fonts";

export const metadata: Metadata = {
  title: { default: "taklif.site — onlayn to'y taklifnomalari", template: "%s · taklif.site" },
  description: "Onlayn to'y taklifnomalari. Havola yuboring — mehmonlar telefonda ochib, kelishini tasdiqlaydi.",
  metadataBase: new URL("https://taklif.site"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
