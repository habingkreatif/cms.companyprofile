import type { Metadata } from "next";
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
  title: "Habs Konstruksi Karya - Jasa Konstruksi & Renovasi Profesional",
  description:
    "Habs Konstruksi Karya menyediakan jasa perencanaan, konstruksi, manajemen proyek, desain 2D/3D & RAB, make over interior & eksterior, kitchen set, atap & plafon anti bocor, dan instalasi MEP dengan garansi 6 bulan.",
  keywords: [
    "jasa konstruksi",
    "renovasi rumah",
    "kontraktor bangunan",
    "desain rumah 3D",
    "jasa kitchen set",
    "konstruksi profesional",
    "Habs Konstruksi Karya",
  ],
  authors: [{ name: "Habs Konstruksi Karya" }],
  metadataBase: new URL("https://habskonstruksikarya.site"),
  alternates: {
    canonical: "https://habskonstruksikarya.site",
  },
  openGraph: {
    title: "Habs Konstruksi Karya - Kontraktor & Jasa Renovasi Profesional",
    description:
      "Layanan konstruksi terbaik: perencanaan, desain 2D/3D, RAB, interior, kitchen set, renovasi, dan instalasi MEP dengan garansi 6 bulan.",
    url: "https://habskonstruksikarya.site",
    siteName: "Habs Konstruksi Karya",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/51.png",
        width: 800,
        height: 600,
        alt: "Jasa Konstruksi Profesional",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/51.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        {children}
      </body>
    </html>
  );
}
