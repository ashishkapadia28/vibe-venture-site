import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import { CheckCircle2 } from "lucide-react";

export function ServiceAbout({
  title,
  paragraphs,
  features,
  image,
}: {
  title: string;
  paragraphs: string[];
  features?: string[];
  image?: string | null;
}) {
  const hasFeatures = features && features.length > 0;
  const hasSideContent = hasFeatures || !!image;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <AnimatedSection className={hasSideContent ? "lg:col-span-6" : "lg:col-span-12 max-w-3xl"}>
            <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
              About Service
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">About {title}</h2>
            <div className="space-y-4 mb-8">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-9 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20"
            >
              Get Free Consultation
            </Link>
          </AnimatedSection>

          {hasSideContent && (
            <AnimatedSection delay={0.1} className="lg:col-span-6 h-full flex flex-col gap-6">
              {image && (
                <div className="relative w-full flex-1 min-h-121 rounded-3xl overflow-hidden bg-white border border-border/60 shadow-sm">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain p-10"
                  />
                </div>
              )}

              {hasFeatures && (
                <div>
                  <h3 className="text-lg font-heading font-bold mb-4">What&apos;s Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-white rounded-xl border border-border/50 shadow-sm p-4"
                      >
                        <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
