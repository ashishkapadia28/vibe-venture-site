import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Vibe Venture",
  description: "The terms that govern your use of Vibe Venture's website and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="terms-of-service">
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-4xl">
              <AnimatedSection>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">Legal</p>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Terms of Service</h1>
                <p className="text-muted-foreground text-sm mb-12">Last updated: August 19, 2026</p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 mb-12 text-sm text-foreground/80 leading-relaxed max-w-2xl">
                  <strong className="text-foreground">Draft placeholder.</strong> This page was generated as a structural placeholder so the site&apos;s footer has a real destination instead of a broken link. It has not been reviewed by a lawyer and should not be treated as your final terms — replace this content (or have it reviewed) before launch.
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="max-w-2xl space-y-10">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">1. Agreement to Terms</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    By accessing vibeventure.com or engaging Vibe Venture for services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site or our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">2. Use of the Website</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">3. Services &amp; Engagements</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Details of any specific project — scope, timeline, deliverables, and pricing — are agreed separately in a signed proposal or contract between Vibe Venture and the client. These Terms govern use of the website itself, not the terms of any individual client engagement, which take precedence where they conflict.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">4. Intellectual Property</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    All content on this website — text, graphics, logos, and code — is the property of Vibe Venture or its licensors and is protected by applicable intellectual property laws, unless otherwise agreed in a client contract.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">5. Limitation of Liability</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Vibe Venture provides this website on an &ldquo;as is&rdquo; basis and makes no warranties as to its availability or accuracy. To the fullest extent permitted by law, Vibe Venture is not liable for any indirect or consequential loss arising from your use of the site.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">6. Changes to These Terms</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We may update these Terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">7. Contact Us</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Questions about these Terms can be sent to{" "}
                    <a href="mailto:ashish@vibeventure.in" className="text-primary hover:underline underline-offset-4">ashish@vibeventure.in</a>.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
