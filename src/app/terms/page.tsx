import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Vibe Venture",
  description: "The terms that govern your use of Vibe Venture's website.",
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
            <div>
              <AnimatedSection>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">Legal</p>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Terms of Service</h1>
                <p className="text-muted-foreground text-sm mb-12">Last updated: September 13, 2026</p>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="space-y-10">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">1. Acceptance of Terms</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of vibeventure.in (the &ldquo;Website&rdquo;), operated by Vibe Venture (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By using the Website, you agree to these Terms. If you do not agree, please do not use the Website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">2. About This Website</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    This Website provides information about Vibe Venture&apos;s design and development work, case studies, and blog content; a free automated Website Checker tool; job listings and an application form; and ways to contact us or book a call. These Terms govern your use of the Website itself.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">3. Eligibility</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    You must be at least 18 years old, or have the legal capacity to enter into a binding agreement under the laws that apply to you, to submit a job application, inquiry, or booking through this Website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">4. Acceptable Use</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    You agree not to use the Website to:
                  </p>
                  <ul className="space-y-2 text-foreground/70 leading-relaxed list-disc pl-5">
                    <li>violate any applicable law or regulation;</li>
                    <li>scrape, harvest, or systematically extract content or data from the Website without our written permission;</li>
                    <li>upload or transmit viruses, malware, or any other malicious code;</li>
                    <li>attempt to gain unauthorized access to the Website, its underlying systems, or any account;</li>
                    <li>impersonate any person or entity, or misrepresent your affiliation with one; or</li>
                    <li>submit spam, fraudulent, or abusive content through our forms.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">5. The Website Checker Tool</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Our Website Checker analyzes publicly available information about a URL you submit and generates an automated, informational score and set of suggestions. It is not a substitute for a professional technical or SEO audit, and we do not guarantee its accuracy or completeness. You confirm that you have the right to request an analysis of any URL you submit.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">6. Job Applications and Inquiries</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Submitting a job application or an inquiry through this Website does not guarantee a response, an interview, or any engagement with us. See our{" "}
                    <Link href="/privacy" className="text-primary hover:underline underline-offset-4">Privacy Policy</Link>{" "}
                    for how this information is handled, including current limitations of our systems.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">7. Client Engagements</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    These Terms govern use of the Website only. The scope, timeline, deliverables, pricing, and other terms of any actual project are agreed separately in a signed proposal or contract between Vibe Venture and the client, and that agreement governs wherever it conflicts with these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">8. Intellectual Property</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    All content on this Website — including text, graphics, logos, illustrations, and code — is the property of Vibe Venture or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from it without our written permission.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">9. Third-Party Links and Services</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    The Website links to or embeds third-party services, including a Calendly booking widget. We are not responsible for the content, accuracy, or availability of third-party services, which are governed by their own terms and privacy policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">10. Disclaimer of Warranties</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Website will be uninterrupted, error-free, or fully secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">11. Limitation of Liability</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    To the fullest extent permitted by law, Vibe Venture will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, revenue, or profits, arising out of or related to your use of the Website, even if we have been advised of the possibility of such damages. Our total liability for any claim arising from your use of the Website will not exceed the equivalent of ₹5,000 (five thousand Indian Rupees).
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">12. Indemnification</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    You agree to indemnify and hold Vibe Venture harmless from any claim, loss, or demand, including reasonable legal fees, arising out of your misuse of the Website or your violation of these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">13. Termination of Access</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We may restrict or terminate your access to the Website at any time, without notice, if we believe you have violated these Terms or used the Website in a way that could harm us or others.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">14. Governing Law and Jurisdiction</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    These Terms are governed by the laws of India. Subject to the informal resolution step below, the courts at Mehsana, Gujarat, India will have exclusive jurisdiction over any dispute arising out of or relating to these Terms. Before pursuing formal proceedings, both parties agree to first attempt to resolve any dispute informally by contacting the other in writing.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">15. Severability</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">16. Changes to These Terms</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">17. Contact Us</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Questions about these Terms can be sent to{" "}
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
