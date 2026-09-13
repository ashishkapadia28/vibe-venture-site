import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecondaryHero } from "@/components/SecondaryHero";
import { ServiceWhyUs } from "@/components/ServiceWhyUs";
import { ServiceAbout } from "@/components/ServiceAbout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Testimonials } from "@/components/Testimonials";
import { ServiceProcess } from "@/components/ServiceProcess";
import { BlogSection } from "@/components/BlogSection";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { ContactSection } from "@/components/ContactSection";
import { CTA } from "@/components/CTA";
import { services, getServiceBySlug } from "@/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1" id={service.slug}>
        <SecondaryHero
          eyebrow="Our Services"
          title={service.name}
          subtitle={service.description}
          ctas={[
            { text: "Get A Free Consultation", href: "/contact" },
            { text: "Explore All Services", href: "/#services", variant: "secondary" },
          ]}
        />

        <ServiceWhyUs name={service.name} whyPoints={service.whyPoints} />
        <ServiceAbout title={service.name} paragraphs={service.aboutContent} image={service.aboutImage} />

        {/* ─── SUB-SERVICES ─── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
            <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                {service.name} Services We Offer
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Explore our full range of {service.name} solutions, each tailored to a specific need.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((sub, i) => {
                const Icon = sub.icon;
                return (
                  <AnimatedSection key={sub.slug} delay={i * 0.06} className="h-full">
                    <Link
                      href={`/${service.slug}/${sub.slug}`}
                      className="card-hover group flex flex-col gap-3 p-6 h-full bg-white rounded-2xl shadow-sm border border-border/50"
                    >
                      {sub.image ? (
                        <div className="w-20 h-20 rounded-xl overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={sub.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
                          <Icon size={26} />
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-foreground tracking-tight">
                        {sub.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {sub.description}
                      </p>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <Testimonials />
        <ServiceProcess name={service.name} steps={service.process} />
        <BlogSection name={service.name} relatedBlogs={service.relatedBlogs} />
        <ServiceFAQ name={service.name} faqs={service.faqs} />
        <ContactSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
