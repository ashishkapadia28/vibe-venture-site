import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Context */}
          <div>
            <AnimatedSection>
              <div className="mb-12">
                <SectionHeader
                  badge="LET'S COLLABORATE"
                  title={<>Ready to Accelerate Your <span className="text-primary">Digital Growth?</span></>}
                  subtitle="Whether you need a high-converting website, a complex web application, or a complete digital overhaul, our team of experts is ready to partner with you. Fill out the form, and we'll get back to you within 24 hours with a strategic plan."
                />
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                    <Mail size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Email Us</h4>
                    <p className="text-muted-foreground text-sm">ashish@vibeventure.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                    <Phone size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Call Us</h4>
                    <p className="text-muted-foreground text-sm">+91 927 494 0383</p>
                    <p className="text-muted-foreground text-sm">Mon - Fri, 9am - 6pm (IST)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                    <MapPin size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Headquarters</h4>
                    <p className="text-muted-foreground text-sm">2, Somnath Complex, Somnath Road</p>
                    <p className="text-muted-foreground text-sm">Mahesana, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <AnimatedSection delay={0.2}>
              <div className="bg-white shadow-xl border border-border/50 p-8 md:p-10 rounded-2xl relative z-10">
                <ContactForm />
              </div>
              
              {/* Decorative elements behind form */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-[40px] z-0" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-[50px] z-0" />
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
