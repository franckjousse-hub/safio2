import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotySAFE — Sortez l'esprit tranquille",
  description: "Plateforme de notation de sécurité pour les bars et établissements de nuit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full bg-ss-bg text-ss-text font-[var(--font-dm)]">
        {children}
      </body>
    </html>
  );
}
