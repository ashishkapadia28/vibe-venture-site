import { AnimatedSection } from "./AnimatedSection";
import Image from "next/image";

export function ClientLogos() {
  return (
    <section className="w-full py-16 md:py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            
            {/* Client Side */}
            <div className="flex flex-col items-center md:items-start gap-6">
              <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Our Trusted Clients</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-10">
                <div className="flex items-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500">
                  <Image src="/client_logo/Arpanex_Primary_Dark.svg" alt="Arpanex" width={160} height={64} className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="flex items-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500">
                  <Image src="/client_logo/Echovyn_Primary_logo.svg" alt="Echovyn" width={160} height={64} className="h-10 md:h-14 w-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Products Side */}
            <div className="flex flex-col items-center md:items-start gap-6 relative">
              {/* Vertical Divider for desktop */}
              <div className="hidden md:block absolute -left-12 lg:-left-16 top-0 bottom-0 w-px bg-border/80" />
              
              <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Our Products</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-10">
                <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500">
                  <Image src="/client_logo/Nyrly_Primary_logo.svg" alt="Nyrly" width={160} height={64} className="h-10 md:h-14 w-auto object-contain" />
                </div>
                <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500">
                  <Image src="/client_logo/VediqCare_Primary_logo.svg" alt="VediqCare" width={160} height={64} className="h-10 md:h-14 w-auto object-contain" />
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
