import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecondaryHero } from "@/components/SecondaryHero";
import { ServiceWhyUs } from "@/components/ServiceWhyUs";
import { ServiceAbout } from "@/components/ServiceAbout";
import { ServiceProcess } from "@/components/ServiceProcess";
import { BlogSection } from "@/components/BlogSection";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { ContactSection } from "@/components/ContactSection";
import { CTA } from "@/components/CTA";
import {
  services,
  getSubServiceBySlug,
  getSubServiceWhyPoints,
  getSubServiceFAQs,
} from "@/data/services";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.flatMap((service) =>
    service.subServices.map((sub) => ({
      service: service.slug,
      subservice: sub.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; subservice: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, subservice: subSlug } = await params;
  const result = getSubServiceBySlug(serviceSlug, subSlug);
  if (!result) return {};

  return {
    title: `${result.subService.name} ${result.service.name} | Vibe Venture`,
    description: result.subService.description,
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ service: string; subservice: string }>;
}) {
  const { service: serviceSlug, subservice: subSlug } = await params;
  const result = getSubServiceBySlug(serviceSlug, subSlug);
  if (!result) notFound();

  const { service, subService } = result;

  return (
    <>
      <Navbar />
      <main className="flex-1" id={subService.slug}>
        <SecondaryHero
          eyebrow={service.name}
          title={subService.name}
          subtitle={subService.description}
          ctas={[
            { text: "Get A Free Consultation", href: "/contact" },
            { text: `Back to ${service.name}`, href: `/${service.slug}`, variant: "secondary" },
          ]}
        />

        <ServiceWhyUs name={subService.name} whyPoints={getSubServiceWhyPoints(subService.name)} />

        <ServiceAbout
          title={subService.name}
          paragraphs={[
            `${subService.name} is one of our core ${service.name} services.`,
          ]}
          image={subService.image ?? service.aboutImage}
        />

        <ServiceProcess name={service.name} steps={service.process} />
        <BlogSection name={subService.name} relatedBlogs={service.relatedBlogs} />
        <ServiceFAQ name={subService.name} faqs={getSubServiceFAQs(subService.name)} />
        <ContactSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
