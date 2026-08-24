import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ManagePreferencesButton } from "@/components/ManagePreferencesButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Vibe Venture",
  description: "What cookies Vibe Venture uses and how to manage your preferences.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="cookie-policy">
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
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Cookie Policy</h1>
                <p className="text-muted-foreground text-sm mb-12">Last updated: August 19, 2026</p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 mb-12 text-sm text-foreground/80 leading-relaxed max-w-2xl">
                  <strong className="text-foreground">Draft placeholder.</strong> This page was generated as a structural placeholder so the cookie banner and footer have a real destination instead of a broken link. It has not been reviewed by a lawyer and should not be treated as your final policy — replace this content (or have it reviewed) before launch.
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="max-w-2xl space-y-10">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">1. What Are Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Cookies are small text files stored on your device that let a website remember your preferences and recognize you on return visits.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">2. How We Use Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We group cookies into three categories, matching the choices in our cookie banner:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Strictly Necessary</span> — required for the site to function (e.g. remembering your cookie preference itself). These cannot be switched off.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Analytics</span> — Google Analytics, used to understand traffic and improve the site. Only loaded if you opt in.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Marketing</span> — Meta Pixel, used to measure and improve ad performance. Only loaded if you opt in.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">3. Managing Your Preferences</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    You can change your cookie choices at any time — this resets your saved preference so the cookie banner appears again on your next page load.
                  </p>
                  <ManagePreferencesButton />
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">4. Third-Party Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Where enabled, Google Analytics and Meta Pixel may set their own cookies subject to Google&apos;s and Meta&apos;s respective privacy policies. We don&apos;t control these third-party cookies directly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">5. Contact Us</h2>
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
