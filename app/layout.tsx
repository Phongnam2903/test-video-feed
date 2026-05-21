import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Feed — Vertical Scroll",
  description:
    "A TikTok-style vertical video feed built with Next.js App Router and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white flex">
        {/* Navigation — renders sidebar on PC, bottom bar on mobile */}
        <Navigation />

        {/*
         * Main content area.
         * On desktop (md+) we shift the feed right by the sidebar width (w-20 = 80px)
         * so the feed content is not hidden behind the sidebar.
         */}
        <main className="flex-1 md:ml-20">{children}</main>
      </body>
    </html>
  );
}
