import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dance Classes in Hayes | Bollywood & South Indian | Kids & Adults",
  description:
    "Looking for dance classes in Hayes? Join Bollywood and South Indian dance classes for kids and adults in Hayes & Harlington, West London. Register your interest today.",
  keywords: [
    "dance classes Hayes",
    "Bollywood dance Hayes",
    "kids dance classes Hayes",
    "South Indian dance Hayes",
    "dance classes Harlington",
    "West London dance classes",
  ],
  metadataBase: new URL("https://hayesdanceclass.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dance Classes in Hayes | Kids & Adults",
    description: "Bollywood & South Indian dance classes in Hayes & Harlington, West London.",
    url: "https://hayesdanceclass.co.uk",
    siteName: "Hayes Dance Class",
    images: [
      {
        url: "/images/hero-dance-comic.webp",
        width: 1200,
        height: 630,
        alt: "Dance classes in Hayes",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dance Classes in Hayes",
    description: "Kids & adults dance classes in Hayes & Harlington.",
    images: ["/images/hero-dance-comic.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://hayesdanceclass.co.uk" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
