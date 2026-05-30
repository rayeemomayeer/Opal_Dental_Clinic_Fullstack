import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import { SplashScreen } from "@/components/site/splash-screen";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const playfairSans = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Opal Dental Clinic & Implant Centre",
  description:
    "Advanced care for a perfect smile — digitally guided implants, full-mouth rehabilitation, and premium dental treatment.",
  metadataBase: new URL("https://opaldental.example"),
  openGraph: {
    title: "Opal Dental Clinic & Implant Centre",
    description: "Advanced care for a perfect smile.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <SplashScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
