import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { GridOverlay } from "@/components/GridOverlay";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibeventure.com"),
  title: "Vibe Venture | Digital Excellence",
  description: "Elevate your digital presence with Vibe Venture. We build premium, animated, and fast websites.",
  keywords: ["Vibe Venture", "Web Development", "Digital Agency", "Next.js", "Animations"],
  authors: [{ name: "Vibe Venture Team" }],
  openGraph: {
    title: "Vibe Venture | Digital Excellence",
    description: "Elevate your digital presence with Vibe Venture. We build premium, animated, and fast websites.",
    url: "https://vibeventure.com",
    siteName: "Vibe Venture",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vibe Venture Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans text-foreground bg-background">
        <SmoothScrolling>
          <GridOverlay />
          {children}
          <WhatsAppButton />
          <CookieConsent />
        </SmoothScrolling>
        <Analytics />
      </body>
    </html>
  );
}
