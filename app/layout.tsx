import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Montserrat, Poppins, Archivo_Black, Oi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const playfair = Archivo_Black({
//   variable: "--font-archivo-black",
//   subsets: ["latin"],
//   weight: ["400"],
// });
// const playfair = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });
const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qori - Salsas Artesanales Gourmet",
    template: "%s | Qori"
  },
  description: "Salsas artesanales premium elaboradas con ingredientes seleccionados y recetas tradicionales. Descubre el sabor de oro en cada gota.",
  keywords: ["salsas", "gourmet", "artesanal", "ají", "picante", "recetas tradicionales", "qori", "sabor peruano"],
  authors: [{ name: "Qori Team" }],
  creator: "Qori",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://seniors-shop.com", // update later if needed
    title: "Qori - Salsas Artesanales Gourmet",
    description: "Salsas artesanales premium elaboradas con ingredientes seleccionados.",
    siteName: "Qori",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qori - Salsas Gourmet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qori - Salsas Artesanales Gourmet",
    description: "Salsas artesanales premium elaboradas con ingredientes seleccionados.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${montserrat.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
