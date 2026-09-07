import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WebsiteChecker } from "@/components/WebsiteChecker";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Checker | Vibe Venture",
  description: "Get a free, instant analysis of your website's performance, SEO, and mobile-friendliness — powered by Vibe Venture.",
};

export default function WebsiteCheckerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="website-checker">
        <WebsiteChecker />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
