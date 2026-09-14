import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ManagePreferencesButton } from "@/components/ManagePreferencesButton";
import { cookieCategories } from "@/data/cookieConsent";
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
        <section className="relative pt-42 pb-24 overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div>
              <AnimatedSection>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">Legal</p>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Cookie Policy</h1>
                <p className="text-muted-foreground text-sm mb-12">Last updated: September 13, 2026</p>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="space-y-10">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">1. What Are Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Cookies are small text files stored on your device that let a website remember your preferences and recognize you on return visits. Some of the items described below are technically stored using your browser&apos;s local storage rather than a traditional cookie — we cover both here together, since they serve the same purpose and the same controls apply to each.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">2. How We Use Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed mb-6">
                    We group cookies into three categories, matching the choices in our cookie banner. Only Strictly Necessary items are set automatically — Analytics and Marketing cookies are set only if you opt in.
                  </p>
                  <div className="space-y-8">
                    {cookieCategories.map((category) => (
                      <div key={category.key}>
                        <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2.5">
                          {category.title}
                          {category.alwaysActive && (
                            <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">Always Active</span>
                          )}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed mb-4">{category.description}</p>
                        {category.cookies && category.cookies.length > 0 && (
                          <div className="overflow-x-auto rounded-2xl border border-border/50">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-secondary/30">
                                  <th className="text-left font-bold text-[11px] tracking-widest uppercase text-muted-foreground px-4 py-3 whitespace-nowrap">Cookie</th>
                                  <th className="text-left font-bold text-[11px] tracking-widest uppercase text-muted-foreground px-4 py-3 whitespace-nowrap">Provider</th>
                                  <th className="text-left font-bold text-[11px] tracking-widest uppercase text-muted-foreground px-4 py-3">Purpose</th>
                                </tr>
                              </thead>
                              <tbody>
                                {category.cookies.map((cookie, i) => (
                                  <tr key={cookie.name} className={i % 2 === 1 ? "bg-secondary/15" : undefined}>
                                    <td className="px-4 py-3 font-mono text-foreground/80 whitespace-nowrap align-top">{cookie.name}</td>
                                    <td className="px-4 py-3 text-foreground/80 whitespace-nowrap align-top">{cookie.provider}</td>
                                    <td className="px-4 py-3 text-muted-foreground align-top">{cookie.purpose}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">3. Other Browser Storage</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Our blog articles include a Like/Dislike feature. If you use it, your reaction is saved in your browser&apos;s local storage on your own device so the page remembers it on your next visit. This is not sent to any advertising or analytics network, is not linked to your identity, and is not gated behind the cookie banner since it serves no tracking purpose.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">4. Third-Party Cookies</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Where enabled and consented to, Google Analytics and Meta Pixel may set their own cookies subject to Google&apos;s and Meta&apos;s respective privacy policies. Separately, the Calendly booking widget on our Contact page may set its own cookies when it loads, governed by Calendly&apos;s own cookie and privacy policy. We don&apos;t control third-party cookies directly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">5. Browser Settings</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    You can control or delete cookies through your browser settings. Please note that disabling cookies may affect how our Site functions.
                  </p>
                  <p className="text-foreground/70 leading-relaxed mb-2">Instructions for common browsers:</p>
                  <ul className="space-y-2 text-foreground/70 leading-relaxed list-disc pl-5">
                    <li><span className="font-semibold text-foreground">Google Chrome:</span> Settings → Privacy and Security → Cookies and other site data</li>
                    <li><span className="font-semibold text-foreground">Mozilla Firefox:</span> Settings → Privacy &amp; Security → Cookies and Site Data</li>
                    <li><span className="font-semibold text-foreground">Safari:</span> Preferences → Privacy → Manage Website Data</li>
                    <li><span className="font-semibold text-foreground">Microsoft Edge:</span> Settings → Cookies and site permissions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">6. Do Not Track Signals</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Some browsers offer a &ldquo;Do Not Track&rdquo; (DNT) signal. There is currently no common industry standard for how websites should respond to DNT, so our Site does not currently respond to it. You can still control Analytics and Marketing cookies directly through our cookie banner or your browser settings as described above.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">7. What We Do Not Do</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    To be clear about the limits of what happens on this Site: we do not build cross-site behavioral advertising profiles, we do not participate in third-party ad exchanges or sell data to data brokers, and we do not share your data with social media platforms beyond the standard Meta Pixel functionality described above — and only if you&apos;ve consented to Marketing cookies. Google Analytics and Meta Pixel are only ever loaded after you opt in via the cookie banner, and only if we have actually activated them on our end; where they aren&apos;t active, no data is sent to those platforms at all.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">8. Managing Your Preferences</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    You can change your cookie choices at any time using the button below — this reopens the preference panel so you can update Analytics and Marketing cookies without waiting for the banner to reappear.
                  </p>
                  <ManagePreferencesButton />
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">9. Changes to This Policy</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We may update this policy from time to time, including as we add or remove cookies. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold mb-3">10. Contact Us</h2>
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
