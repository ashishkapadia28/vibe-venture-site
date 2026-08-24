import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AgencyIntro } from "@/components/AgencyIntro";
import { ClientLogos } from "@/components/ClientLogos";
import { ShopifyPartnerSection } from "@/components/ShopifyPartnerSection";
import { ProblemStatement } from "@/components/ProblemStatement";
import { Features } from "@/components/Features";
import { ServicesWhy } from "@/components/ServicesWhy";
import { CTA } from "@/components/CTA";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AgencyIntro />
        <ClientLogos />
        <ShopifyPartnerSection />
        <ProblemStatement />
        <Features />
        <ServicesWhy />
        <Testimonials />
        <ContactSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
