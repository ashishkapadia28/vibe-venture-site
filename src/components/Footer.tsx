import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

// SVG Icons components for cleaner JSX
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground/70 pt-24 pb-32 relative z-10 overflow-hidden font-sans rounded-t-[3rem] mt-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">

          {/* Left Column */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                <Image src="/vibe_venture_logo.svg" alt="Vibe Venture" width={224} height={68} className="object-contain brightness-0 invert w-56 h-16" />
              </Link>

              <p className="text-[13px] text-[#768493] leading-relaxed max-w-xs">
                We build premium, high-performance digital products — websites, apps, and platforms engineered for speed, scale, and results.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-[#768493] shrink-0 mt-0.5" />
                <span className="text-[13px] text-[#768493] leading-relaxed">
                  2, Somnath Complex,<br />
                  Somnath Road,<br />
                  Mehsana 1, Gujarat, India 384001
                </span>
              </div>
              <a href="tel:+919274940383" className="flex items-center gap-3 hover:text-white transition-colors group w-fit">
                <Phone size={16} strokeWidth={1.5} className="text-[#768493] shrink-0 group-hover:text-white transition-colors" />
                <span className="text-[13px] text-[#768493] group-hover:text-white transition-colors">+91 927 494 0383</span>
              </a>
              <a href="mailto:hello@vibeventure.in" className="flex items-center gap-3 hover:text-white transition-colors group w-fit">
                <Mail size={16} strokeWidth={1.5} className="text-[#768493] shrink-0 group-hover:text-white transition-colors" />
                <span className="text-[13px] text-[#768493] group-hover:text-white transition-colors">hello@vibeventure.in</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-[8px] border border-[#2a2f36] flex items-center justify-center hover:bg-[#1a1d21] hover:text-white transition-all text-white">
                <LinkedinIcon />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-[8px] border border-[#2a2f36] flex items-center justify-center hover:bg-[#1a1d21] hover:text-white transition-all text-white">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-[8px] border border-[#2a2f36] flex items-center justify-center hover:bg-[#1a1d21] hover:text-white transition-all text-white">
                <XIcon />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-[8px] border border-[#2a2f36] flex items-center justify-center hover:bg-[#1a1d21] hover:text-white transition-all text-white">
                <YoutubeIcon />
              </a>
            </div>


          </div>

          {/* Right Columns */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-6 pt-2">
            {/* Company Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Company</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/about" className="text-[13px] hover:text-white transition-colors">About us</Link></li>
                <li><Link href="/products" className="text-[13px] hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/case-studies" className="text-[13px] hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/tools" className="text-[13px] hover:text-white transition-colors">Tools</Link></li>
                <li><Link href="/career" className="text-[13px] hover:text-white transition-colors">Career</Link></li>
                <li><Link href="/blogs" className="text-[13px] hover:text-white transition-colors">Blogs</Link></li>
              </ul>
            </div>

            {/* Services Column A */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Services</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">Web Development</Link></li>
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">App Development</Link></li>
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">UI/UX Design</Link></li>
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">AI Solutions</Link></li>
              </ul>
            </div>

            {/* Services Column B */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6 md:invisible md:h-0 md:mb-0">More Services</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">Software Development</Link></li>
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">E-commerce Solutions</Link></li>
                <li><Link href="/services" className="text-[13px] hover:text-white transition-colors">Branding & Creative</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Legal</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/privacy" className="text-[13px] hover:text-white transition-colors">Privacy policy</Link></li>
                <li><Link href="/terms" className="text-[13px] hover:text-white transition-colors">Terms of service</Link></li>
                <li><Link href="/cookies" className="text-[13px] hover:text-white transition-colors">Cookie policy</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Giant Watermark Background */}
      <div className="absolute bottom-[-2%] left-0 w-full pointer-events-none select-none overflow-hidden flex justify-center z-0 opacity-10 px-8 md:px-16 lg:px-24 xl:px-32">
        <span
          className="text-[13vw] font-black tracking-tighter text-transparent whitespace-nowrap w-full text-center"
          style={{
            WebkitTextStroke: "1.5px #ffffff",
            lineHeight: "0.9"
          }}
        >
          Vibe Venture
        </span>
      </div>
    </footer>
  );
}
