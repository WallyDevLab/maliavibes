import type { Metadata } from "next";
import { Fraunces, Instrument_Serif, Public_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://www.maliamusic.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Malia — Official Site",
    template: "%s — Malia",
  },
  description:
    "The official home of Malia. Music, tour dates, gallery, news, and merch from the If I'm Being Honest era and beyond.",
  openGraph: {
    title: "Malia — Official Site",
    description:
      "The official home of Malia. Music, tour dates, gallery, news, and merch.",
    url: siteUrl,
    siteName: "Malia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malia — Official Site",
    description: "The official home of Malia.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSerif.variable} ${publicSans.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-parchment antialiased">
        <a href="#main-content" className="skip-link bg-flare text-ink px-4 py-2 rounded font-body font-medium">
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
