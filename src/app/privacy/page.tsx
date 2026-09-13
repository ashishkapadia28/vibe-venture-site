import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
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
            <div>
              <AnimatedSection>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">Legal</p>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Privacy Policy</h1>
                <p className="text-muted-foreground text-sm mb-12">Last updated: September 13, 2026</p>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="space-y-10">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">1. Introduction</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Vibe Venture (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website at vibeventure.in. This policy explains what information we collect when you visit or interact with this website, why we collect it, how we use and protect it, and the choices available to you.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">2. Who We Are</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Vibe Venture is a web, app, and AI development studio. You can reach us at{" "}
                    <a href="mailto:hello@vibeventure.in" className="text-primary hover:underline underline-offset-4">hello@vibeventure.in</a>{" "}
                    or at 2, Somnath Complex, Somnath Road, Mehsana, Gujarat, India 384001.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">3. Information You Provide Directly</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We collect information you choose to give us through the following features:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Contact and project inquiries</span> — when you use a contact form on this site, we collect your name, email address, phone number, company name, website (if provided), and the details of your project or enquiry.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Job applications</span> — when you apply for a role, we collect your name, email address, phone number, LinkedIn profile (if provided), experience details, and the resume and cover letter files you upload.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Cookie preferences</span> — when you make a choice in our cookie banner, we record that decision together with your IP address, browser/device information, and the time of your choice, so we can maintain a record of consent.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Website Checker tool</span> — the website address you submit for analysis, and, only if you request an emailed copy of your results, the email address you provide for that purpose.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Scheduling a call</span> — our booking calendar is provided by Calendly. Information you enter there (such as your name, email, and selected time) is collected by Calendly directly and is governed by Calendly&apos;s own privacy policy, not this one.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">4. How We Handle Job Applications and Inquiries</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    When you submit a job application or a contact/project inquiry, the information is sent to our internal systems for review. These systems are still being built out, so we cannot yet guarantee that every submission is successfully received, stored, or responded to. If you do not hear back from us within a reasonable time, please follow up directly at{" "}
                    <a href="mailto:hello@vibeventure.in" className="text-primary hover:underline underline-offset-4">hello@vibeventure.in</a>{" "}
                    so we don&apos;t miss you.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">5. Information Collected Automatically</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Separately from what you submit directly, we (and our service providers) automatically collect limited information as you browse:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Cookies and local storage</span> — used to remember your cookie preferences and, where you&apos;ve consented, for analytics or marketing purposes. See our{" "}
                      <Link href="/cookies" className="text-primary hover:underline underline-offset-4">Cookie Policy</Link> for the full list.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Anonymous performance data</span> — we use Vercel Speed Insights to measure page-load performance across visitors in aggregate. This does not identify you personally.
                    </li>
                    <li className="text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground">Bot protection</span> — our contact form uses Cloudflare Turnstile to help distinguish real visitors from automated bots. Cloudflare processes limited technical data (such as your IP address) for this purpose, under Cloudflare&apos;s own privacy policy.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">6. How We Use Information</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use the information described above to: respond to inquiries and evaluate job applications; operate, secure, and improve this website; maintain a record of your cookie consent choices; and, only where you&apos;ve opted in via the cookie banner, measure site analytics and marketing performance.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">7. Third-Party Service Providers</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We rely on the following third-party providers to operate this website. Each processes data under its own privacy policy, which we encourage you to review:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-foreground/70 leading-relaxed"><span className="font-semibold text-foreground">Vercel</span> — website hosting and performance monitoring.</li>
                    <li className="text-foreground/70 leading-relaxed"><span className="font-semibold text-foreground">Supabase</span> — database storage, including our cookie-consent records.</li>
                    <li className="text-foreground/70 leading-relaxed"><span className="font-semibold text-foreground">Calendly</span> — call scheduling on our Contact page.</li>
                    <li className="text-foreground/70 leading-relaxed"><span className="font-semibold text-foreground">Cloudflare</span> — bot protection (Turnstile) on our contact form.</li>
                    <li className="text-foreground/70 leading-relaxed"><span className="font-semibold text-foreground">Google Analytics and Meta Pixel</span> — where active, and only after you&apos;ve consented via the cookie banner, used to measure site traffic and marketing performance.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">8. Data Sharing and Disclosure</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We do not sell your personal information. We share it only with the service providers listed above, to the extent necessary for them to perform their function, or where required by applicable law.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">9. Data Retention</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We retain personal information only for as long as reasonably necessary for the purposes described in this policy, or as required by applicable law. Cookie-consent records are kept as evidence of your consent choice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">10. Data Security</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use reasonable technical and organizational measures — including encrypted (HTTPS) connections — to protect the information we hold. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">11. Your Rights</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    You may request access to, correction of, or deletion of the personal information we hold about you, and you may withdraw analytics or marketing consent at any time via the cookie banner. To exercise these rights, contact us at{" "}
                    <a href="mailto:hello@vibeventure.in" className="text-primary hover:underline underline-offset-4">hello@vibeventure.in</a>. We will respond within a reasonable time.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">12. Children&apos;s Privacy</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    This website is not directed at children, and we do not knowingly collect personal information from anyone under the age of 18. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">13. International Visitors</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    This website can be accessed from anywhere in the world. Depending on where our hosting and service providers operate their servers, your information may be processed in a country other than your own.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">14. Changes to This Policy</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of the site after changes are posted constitutes acceptance of the revised policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">15. Governing Law and Jurisdiction</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    This policy is governed by the laws of India, without regard to conflict-of-law principles. Courts at Mehsana, Gujarat, India will have exclusive jurisdiction over any dispute arising out of or relating to this policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">16. Contact Us</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Questions about this policy can be sent to{" "}
                    <a href="mailto:hello@vibeventure.in" className="text-primary hover:underline underline-offset-4">hello@vibeventure.in</a>.
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
