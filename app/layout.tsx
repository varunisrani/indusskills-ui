import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { ThemeScript } from "./components/theme-script";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "IndusSkills · Local-first Agent Skills registry for India Stack",
  description:
    "Search and install Agent Skills without sending your credentials anywhere. Curated for Bhashini, ONDC, UPI, DigiLocker.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <div className="grain-bg" aria-hidden="true" />
        <div className="app-root">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
