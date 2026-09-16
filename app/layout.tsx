import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import "./globals.css";

const display = Red_Hat_Display({ subsets: ["latin-ext"], variable: "--font-display" });
const body = Red_Hat_Text({ subsets: ["latin-ext"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Tutanak — Toplantıyı sen dinle, notu Tutanak tutsun",
  description:
    "Toplantı ses kaydını yükle; transkript, özet, kararlar ve kişiye atanmış aksiyonlar dakikalar içinde hazır.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
