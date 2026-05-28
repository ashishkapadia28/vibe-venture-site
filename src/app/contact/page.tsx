import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Vibe Venture",
  description: "Get in touch with Vibe Venture to start your next digital project.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background relative z-10 overflow-hidden">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 px-3 py-1 mb-6 border border-dashed border-primary/40 bg-primary/5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                  <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
                    Let's Connect
                  </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-heading font-bold mb-6 tracking-tight leading-[1.1]">
                Start Your <br />
                <span className="text-primary">Digital Transformation</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6">
                Whether you have a fully fleshed out project or just an idea, our team is ready to help you build something exceptional.
              </p>
            </AnimatedSection>
          </div>

          {/* Quick Contact Info Row */}
          <div className="relative mb-16">
            <div className="absolute -top-6 -left-12 -right-12 h-[1.5px] dashed-x opacity-50 hidden md:block" />
            <div className="absolute -bottom-6 -left-12 -right-12 h-[1.5px] dashed-x opacity-50 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-dashed border-border/80 md:border-none">
              
              <div className="p-8 border-b md:border-b-0 md:border-r border-dashed border-border/80 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-primary/5 border border-dashed border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 rounded-md">
                  <Mail size={20} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Email Us</h4>
                <a href="mailto:hello@vibeventure.com" className="text-muted-foreground hover:text-primary transition-colors">hello@vibeventure.in</a>
              </div>
              
              <div className="p-8 border-b md:border-b-0 md:border-r border-dashed border-border/80 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-primary/5 border border-dashed border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 rounded-md">
                  <Phone size={20} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Call Us</h4>
                <a href="tel:+910000000000" className="text-muted-foreground hover:text-primary transition-colors">+91 63 5238 0624</a>
              </div>
              
              <div className="p-8 border-b md:border-b-0 lg:border-r border-dashed border-border/80 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-primary/5 border border-dashed border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 rounded-md">
                  <MapPin size={20} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Headquarters</h4>
                <span className="text-muted-foreground">Tech City, Innovation Blvd<br />New Delhi, India</span>
              </div>
              
              <div className="p-8 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-primary/5 border border-dashed border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 rounded-md">
                  <Clock size={20} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Working Hours</h4>
                <span className="text-muted-foreground">Mon - Fri: 9AM - 6PM<br />Sat - Sun: Closed</span>
              </div>

            </div>
          </div>

          {/* Main Interaction Area: Centered Form */}
          <div className="relative max-w-4xl mx-auto">
            {/* Top Structural Line */}
            <div className="absolute top-0 -left-12 -right-12 h-[1.5px] dashed-x opacity-50 hidden md:block" />
            
            <div className="border border-dashed border-border/80 bg-secondary/10 relative overflow-hidden">
              
              {/* Subtle accent blur behind the form */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="p-8 md:p-12 lg:p-16 relative z-10">
                <AnimatedSection delay={0.1}>
                  <div className="mb-12 text-center max-w-xl mx-auto">
                    <h3 className="text-3xl font-heading font-bold mb-4">Project Inquiry</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">Fill out the details below to tell us about your requirements. Our expert team will review it and get back to you within 24 hours.</p>
                  </div>
                  
                  <div className="max-w-3xl mx-auto bg-background p-6 md:p-10 border border-dashed border-border/80 shadow-sm rounded-xl">
                    <ContactForm />
                  </div>
                </AnimatedSection>
              </div>
            </div>
            
            {/* Bottom Structural Line */}
            <div className="absolute bottom-0 -left-12 -right-12 h-[1.5px] dashed-x opacity-50 hidden md:block" />
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
