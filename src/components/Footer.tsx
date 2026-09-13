import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { brandDescription, contact, socials, companyLinks, serviceColumns, legalLinks } from "@/data/footer";

export function Footer() {
  const [servicesColumnA, servicesColumnB] = serviceColumns;

  return (
    <footer className="bg-secondary text-secondary-foreground/70 pt-24 pb-32 relative z-10 overflow-hidden font-sans rounded-t-[3rem] mt-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">

          {/* Left Column */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                <Image src="/vibe_venture_logo.svg" alt="Vibe Venture" width={224} height={64} className="object-contain brightness-0 invert w-56 h-16" />
              </Link>

              <p className="text-[13px] text-[#768493] leading-relaxed max-w-xs">
                {brandDescription}
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-[#768493] shrink-0 mt-0.5" />
                <span className="text-[13px] text-[#768493] leading-relaxed">
                  {contact.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </div>
              <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-white transition-colors group w-fit">
                <Phone size={16} strokeWidth={1.5} className="text-[#768493] shrink-0 group-hover:text-white transition-colors" />
                <span className="text-[13px] text-[#768493] group-hover:text-white transition-colors">{contact.phone}</span>
              </a>
              <a href={contact.emailHref} className="flex items-center gap-3 hover:text-white transition-colors group w-fit">
                <Mail size={16} strokeWidth={1.5} className="text-[#768493] shrink-0 group-hover:text-white transition-colors" />
                <span className="text-[13px] text-[#768493] group-hover:text-white transition-colors">{contact.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-lg border border-[#2a2f36] flex items-center justify-center hover:bg-[#1a1d21] hover:text-white transition-all text-white"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-6 pt-2">
            {/* Company Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Company</h4>
              <ul className="space-y-3.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column A */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Services</h4>
              <ul className="space-y-3.5">
                {servicesColumnA.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column B */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6 md:invisible md:h-0 md:mb-0">More Services</h4>
              <ul className="space-y-3.5">
                {servicesColumnB.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-6">Legal</h4>
              <ul className="space-y-3.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
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
