import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vibe Venture",
  description: "How Vibe Venture collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="privacy-policy">
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
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Privacy Policy</h1>
                <p className="text-muted-foreground text-sm mb-12">Last updated: August 19, 2026</p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 mb-12 text-sm text-foreground/80 leading-relaxed max-w-2xl">
                  <strong className="text-foreground">Draft placeholder.</strong> This page was generated as a structural placeholder so the site&apos;s footer and cookie banner have a real destination instead of a broken link. It has not been reviewed by a lawyer and should not be treated as your final policy — replace this content (or have it reviewed) before launch.
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="max-w-2xl space-y-10">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">1. Introduction</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Vibe Venture (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This policy explains what information we collect when you visit vibeventure.com, why we collect it, and how you can control it.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">2. Information We Collect</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We collect information you provide directly, such as your name, email address, company, and project details when you submit a contact inquiry or job application. We also collect limited technical information automatically — pages visited, device/browser type, and approximate location — through analytics tools, but only once you&apos;ve consented via the cookie banner.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">3. How We Use Information</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use the information we collect to respond to inquiries, evaluate job applications, operate and improve the site, and — where you&apos;ve opted in — measure marketing performance and site analytics.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">4. Cookies &amp; Tracking</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use strictly necessary cookies to run the site, and — only with your consent, managed through the cookie banner — analytics cookies (Google Analytics) and marketing cookies (Meta Pixel). See our{" "}
                    <a href="/cookies" className="text-primary hover:underline underline-offset-4">Cookie Policy</a> for details and how to change your preferences at any time.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">5. Third-Party Services</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use third-party services to operate the site and business, including hosting (Vercel), form/booking scheduling (Calendly), a database provider (Supabase), and — where enabled — analytics and advertising platforms. These providers process data under their own privacy policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">6. Data Security</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use reasonable technical and organizational measures to protect the information we hold. No method of transmission or storage is fully secure, so we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">7. Your Rights</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    You may request access to, correction of, or deletion of your personal information, and you may withdraw analytics/marketing consent at any time via the cookie banner. Contact us using the details below to exercise these rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">8. Contact Us</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Questions about this policy can be sent to{" "}
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
