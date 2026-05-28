import Link from "next/link";
import Image from "next/image";

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
    <footer className="bg-[#0b0c10] text-[#a0aab2] py-20 relative z-3 overflow-hidden font-sans border-t border-border/10">
      {/* Dark grey dashed lines matching container boundaries */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 h-full">
          <div className="relative w-full h-full">
            <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[2px]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='1.5' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0.75' y1='0' x2='0.75' y2='16' stroke='%23313131' stroke-width='1.5' stroke-dasharray='8, 8' /%3E%3C/svg%3E\")", backgroundRepeat: "repeat-y" }} />
            <div className="absolute -right-4 md:-right-8 top-0 bottom-0 w-[2px]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='1.5' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0.75' y1='0' x2='0.75' y2='16' stroke='%23313131' stroke-width='1.5' stroke-dasharray='8, 8' /%3E%3C/svg%3E\")", backgroundRepeat: "repeat-y" }} />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Left Column */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <Link href="/" className="flex items-center mb-1 hover:opacity-90 transition-opacity">
              <Image src="/vibe_venture_logo.svg" alt="Vibe Venture" width={160} height={48} className="object-contain brightness-0 invert" />
            </Link>
            
            <p className="text-[13px] font-medium text-[#768493] mb-1 tracking-wide">
              © {new Date().getFullYear()} Vibe Venture, Inc.
            </p>
            
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
          <div className="w-full lg:w-[55%] grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-8 pt-2">
            {/* Product Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Quick Links</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/services/web" className="text-[13px] hover:text-white transition-colors">Web Development</Link></li>
                <li><Link href="/services/mobile" className="text-[13px] hover:text-white transition-colors">Mobile Apps</Link></li>
                <li><Link href="/services/design" className="text-[13px] hover:text-white transition-colors">UI/UX Design</Link></li>
                <li><Link href="/services/marketing" className="text-[13px] hover:text-white transition-colors">Digital Marketing</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Resources</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/contact" className="text-[13px] hover:text-white transition-colors">Contact us</Link></li>
                <li><Link href="/about" className="text-[13px] hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-[13px] hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/career" className="text-[13px] hover:text-white transition-colors">Career</Link></li>
                <li><Link href="/industry" className="text-[13px] hover:text-white transition-colors">Industries</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Company</h4>
              <ul className="space-y-[14px]">
                <li><Link href="/career" className="text-[13px] hover:text-white transition-colors">Career</Link></li>
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
