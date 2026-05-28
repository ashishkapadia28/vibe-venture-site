"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, Building2, ShoppingCart, Users, GraduationCap, Landmark, MoreHorizontal, ArrowUpRight, Laptop, Smartphone, PenTool, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { 
    name: "Services", 
    href: "/services",
    megaMenu: {
      leftPanel: {
        icon: Laptop,
        title: "Digital\nServices",
        description: "End-to-end digital solutions to build, grow, and scale your business.",
        badge: "Premium Quality",
        buttonText: "All Services",
        buttonHref: "/services",
      },
      items: [
        { icon: Laptop, name: "Web Development", description: "Custom, responsive websites built for speed and conversions.", href: "/services/web", coverImage: "/covers/web-dev.png" },
        { icon: Smartphone, name: "Mobile Apps", description: "Native and cross-platform applications for iOS and Android.", href: "/services/mobile", coverImage: "/covers/mobile-app.png" },
        { icon: PenTool, name: "UI/UX Design", description: "User-centric designs that deliver engaging digital experiences.", href: "/services/design", coverImage: "/covers/ui-ux.png" },
        { icon: Megaphone, name: "Digital Marketing", description: "Data-driven strategies to increase your brand's reach and visibility.", href: "/services/marketing", coverImage: "/covers/digital-marketing.png" },
      ]
    }
  },
  { 
    name: "Industry", 
    href: "/industry",
    megaMenu: {
      leftPanel: {
        icon: Building2,
        title: "Business &\nServices",
        description: "Helping businesses scale with performance-driven marketing strategies.",
        badge: "8+ Industries",
        buttonText: "Explore Solutions",
        buttonHref: "/industry",
      },
      items: [
        { icon: ShoppingCart, name: "E-commerce", description: "Drive more sales with data-backed campaigns and conversion optimization.", href: "/industry/ecommerce", coverImage: "/covers/ecommerce.png" },
        { icon: Users, name: "Healthcare", description: "Reach more patients and build trust with targeted digital strategies.", href: "/industry/healthcare", coverImage: "/covers/healthcare.png" },
        { icon: GraduationCap, name: "Education", description: "Generate quality leads and increase enrollments with performance marketing.", href: "/industry/education", coverImage: "/covers/education.png" },
        { icon: Landmark, name: "Finance", description: "Build credibility and acquire high-value leads with result-oriented campaigns.", href: "/industry/finance", coverImage: "/covers/finance.png" },
        { icon: MoreHorizontal, name: "And Many More", description: "From real estate to SaaS, we help every industry grow digitally.", href: "/industry/all", coverImage: "/covers/other-industries.png" },
      ]
    }
  },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Career", href: "/career" },
  { name: "Contact us", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredMenuItemName, setHoveredMenuItemName] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname ? pathname.startsWith(href) : false;
  };

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 dashed-x bg-background/80 backdrop-blur-md py-6"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity relative z-50">
          <Image src="/vibe_venture_logo.svg" alt="Vibe Venture Logo" width={160} height={48} className="object-contain" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.megaMenu ? (
                <div className={cn("flex items-center gap-1 cursor-pointer text-[15px] font-medium transition-colors py-2", isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary")}>
                  <Link href={item.href}>{item.name}</Link>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  
                  {/* Desktop Dropdown Wrapper to bridge hover gap */}
                  <div className="absolute top-[calc(100%-16px)] pt-[24px] left-[-200px] w-[760px] pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className={cn(
                      "w-full bg-background rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0 flex overflow-hidden relative"
                    )}
                    onMouseLeave={() => setHoveredMenuItemName(null)}
                    >
                      {/* ALWAYS ON TOP BORDERS */}
                      <div className="absolute inset-0 dashed-box pointer-events-none z-60" />
                      <div className="absolute inset-y-0 left-[280px] w-[1.5px] dashed-y pointer-events-none z-60" />
                      
                      <div className="flex w-full relative z-10">
                        {/* Left Panel */}
                        <div className="w-[280px] bg-linear-to-br from-primary/10 via-background to-background relative overflow-hidden group/leftpane">
                          {(() => {
                            const hoveredItemData = item.megaMenu.items.find((i) => i.name === hoveredMenuItemName);
                            const currentCoverImage = hoveredItemData && 'coverImage' in hoveredItemData ? hoveredItemData.coverImage as string : null;
                            return (
                              <>
                                {/* Default Content (Hidden if image hovered) */}
                                <div className={cn("p-8 flex flex-col justify-between h-full transition-opacity duration-300", currentCoverImage ? "opacity-0 invisible" : "opacity-100 visible")}>
                                  {/* Optional decorative blobs */}
                                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                                  
                                  <div className="relative z-10 flex flex-col items-start">
                                    <div className="w-14 h-14 bg-background rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 border border-border/50">
                                      <item.megaMenu.leftPanel.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 whitespace-pre-line text-foreground">
                                      {item.megaMenu.leftPanel.title}
                                    </h3>
                                    <p className="text-[13px] text-muted-foreground mb-6 leading-relaxed">
                                      {item.megaMenu.leftPanel.description}
                                    </p>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/50 text-xs font-medium text-foreground mb-8 shadow-sm">
                                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                      {item.megaMenu.leftPanel.badge}
                                    </div>
                                  </div>
                                  
                                  <Link href={item.megaMenu.leftPanel.buttonHref} className="relative z-10 inline-flex items-center justify-between px-5 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors group/btn">
                                    {item.megaMenu.leftPanel.buttonText}
                                    <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                  </Link>
                                </div>

                                {/* Hover Image Overlay */}
                                {currentCoverImage && hoveredItemData && (
                                  <div className="absolute inset-0 w-full h-full animate-in fade-in zoom-in-95 duration-300 z-20">
                                    <Image src={currentCoverImage} alt={hoveredItemData.name} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                      <h3 className="text-white text-xl font-semibold mb-2 leading-tight">{hoveredItemData.name}</h3>
                                      <p className="text-white/80 text-xs line-clamp-2 mb-4">{hoveredItemData.description}</p>
                                      <Link href={hoveredItemData.href} className="text-white text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                                        Explore <ArrowRight size={14} />
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>

                        {/* Right Panel Items */}
                        <div className="flex-1 p-6 flex flex-col justify-center relative" onMouseLeave={() => setHoveredMenuItemName(null)}>
                          {item.megaMenu.items.map((dropItem, idx) => (
                            <div key={dropItem.name} className={cn("relative group/item", idx !== item.megaMenu.items.length - 1 ? "mb-1" : "")}>
                              <Link 
                                href={dropItem.href}
                                className="flex items-start gap-4 p-3 hover:bg-secondary/40 rounded-xl transition-colors relative z-10"
                                onMouseEnter={() => setHoveredMenuItemName(dropItem.name)}
                              >
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                                  <dropItem.icon size={20} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <h4 className="text-[15px] font-semibold text-foreground mb-0.5 group-hover/item:text-primary transition-colors">{dropItem.name}</h4>
                                  <p className="text-[13px] text-muted-foreground leading-relaxed">{dropItem.description}</p>
                                </div>
                                <ArrowRight size={16} className="text-primary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all self-center mr-2" />
                              </Link>
                              {/* Horizontal Item Divider Always on Top */}
                              {idx !== item.megaMenu.items.length - 1 && (
                                <div className="absolute -bottom-0.5 left-16 right-4 h-[1.5px] dashed-x pointer-events-none z-60" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-[15px] font-medium transition-colors py-2 block",
                    isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 ml-4 flex items-center gap-1.5 group"
          >
            Get Free Quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="xl:hidden p-2 text-foreground relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "xl:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 flex flex-col shadow-xl overflow-hidden",
        mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 border-transparent"
      )}>
        <div className="p-6 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              {item.megaMenu ? (
                <>
                  <button 
                    onClick={() => toggleDropdown(item.name)}
                    className={cn("flex items-center justify-between py-3 text-lg font-medium border-b border-border/50", isActive(item.href) ? "text-primary" : "")}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={20} className={cn("transition-transform duration-200", activeDropdown === item.name ? "rotate-180" : "")} />
                  </button>
                  <div className={cn(
                    "flex flex-col overflow-hidden transition-all duration-300",
                    activeDropdown === item.name ? "max-h-[1000px] py-2 opacity-100" : "max-h-0 opacity-0"
                  )}>
                      {item.megaMenu.items.map((dropItem) => (
                        <Link 
                          key={dropItem.name} 
                          href={dropItem.href}
                          className={cn("py-3 pl-4 flex items-center gap-3", pathname === dropItem.href ? "text-primary" : "text-muted-foreground")}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <dropItem.icon size={18} />
                          {dropItem.name}
                        </Link>
                      ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn("py-3 text-lg font-medium border-b border-border/50", isActive(item.href) ? "text-primary" : "")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-6 px-6 py-4 rounded-full bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Free Quote
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}
