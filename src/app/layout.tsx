import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Base",
  description: "Dashboard with Nunito font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.className}`}>
      <head>
        <link rel="icon" href="./icons/favicon.ico.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
