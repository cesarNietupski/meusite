import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSR Fotografia — Imagens que posicionam",
  description: "Fotografia estratégica para empresas, profissionais e marcas em Joinville.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
