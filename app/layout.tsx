import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SiteSchemas } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sayradtejarat.com"),
  title: {
    default: "شایراد تجارت پارس | تأمین مواد اولیه صنعتی",
    template: "%s | شایراد تجارت پارس",
  },
  description:
    "تأمین مواد اولیه صنعتی برای کاشی و سرامیک، شیشه، لعاب‌سازی، چینی بهداشتی و باطری‌سازی. بیش از ۳۰ سال تجربه، واردات مستقیم از آلمان، ایتالیا، اسپانیا، چین و ترکیه.",
  keywords: [
    "مواد اولیه صنعتی",
    "سیلیکات زیرکونیوم",
    "اکسید کبالت",
    "کائولن AKW",
    "اکسید آلومینا",
    "مواد اولیه کاشی",
    "مواد اولیه سرامیک",
    "مواد اولیه لعاب",
    "تأمین مواد اولیه ایران",
    "شایراد تجارت",
    "واردات مواد اولیه",
  ],
  authors: [{ name: "شایراد تجارت پارس", url: "https://sayradtejarat.com" }],
  creator: "شایراد تجارت پارس",
  icons: {
    icon: SITE.favicon,
    shortcut: SITE.favicon,
    apple: SITE.favicon,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://sayradtejarat.com",
    siteName: "شایراد تجارت پارس",
    title: "شایراد تجارت پارس | تأمین مواد اولیه صنعتی",
    description:
      "واردات مستقیم مواد اولیه صنعتی از معتبرترین تأمین‌کنندگان جهانی برای صنایع کاشی، شیشه، لعاب، چینی و باطری.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "شایراد تجارت پارس - تأمین مواد اولیه صنعتی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شایراد تجارت پارس | تأمین مواد اولیه صنعتی",
    description:
      "واردات مستقیم مواد اولیه صنعتی از معتبرترین تأمین‌کنندگان جهانی.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://sayradtejarat.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-background font-sans text-text-dark antialiased">
        <SiteSchemas />
        <Header />
        <main className="flex-1 pb-28 xl:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
