import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manos de Vida - Artesanía y Tradición",
    template: "%s | Manos de Vida"
  },
  description: "Descubre productos únicos hechos a mano por artesanos de la tercera edad. Calidad, tradición y amor en cada pieza.",
  keywords: ["artesanía", "adulto mayor", "hecho a mano", "perú", "tejidos", "regalos"],
  authors: [{ name: "Seniors Shop Team" }],
  creator: "Seniors Shop",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://seniors-shop.com",
    title: "Manos de Vida - Artesanía y Tradición",
    description: "Apoyando el talento artesanal de nuestros mayores.",
    siteName: "Manos de Vida",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public folder ideally
        width: 1200,
        height: 630,
        alt: "Manos de Vida - Artesanía con Amor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manos de Vida - Artesanía y Tradición",
    description: "Apoyando el talento artesanal de nuestros mayores.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" theme='light' />
      </body>
    </html>
  );
}
