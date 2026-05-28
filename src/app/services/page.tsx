import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/ServicesHero";
import { Features } from "@/components/Features";
import { ServicesProcess } from "@/components/ServicesProcess";
import { ServicesWhy } from "@/components/ServicesWhy";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Vibe Venture",
  description:
    "Explore our full range of digital services — web development, mobile apps, UI/UX design, digital marketing, analytics, and scalable infrastructure.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="services">
        <ServicesHero />
        <Features />
        <ServicesProcess />
        <ServicesWhy />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
