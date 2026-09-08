import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile-menu.css";
import "./pricing-layout.css";
import "./responsive-layout.css";

export const metadata: Metadata = {
  title: "CSR Fotografia — Imagens que posicionam",
  description: "Fotografia estratégica para empresas, profissionais e marcas em Joinville.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
