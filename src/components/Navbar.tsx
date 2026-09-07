"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, Gauge, ImageOff } from "lucide-react";
import { TbStethoscope } from "react-icons/tb";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const servicesItems = services.map((service) => ({
  icon: service.icon,
  name: service.name,
  href: `/${service.slug}`,
  subServices: service.subServices.map((sub) => ({
    icon: sub.icon,
    name: sub.name,
    href: `/${service.slug}/${sub.slug}`,
  })),
}));

const productsItems = [
  {
    icon: TbStethoscope,
    name: "VediqCare",
    href: "/products/vediqcare",
    image: null as string | null,
  },
];

const navItems = [
  { name: "About us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    megaMenu: {
      twoColumn: true as const,
      menuLabel: "Core Services",
      subLabel: "Services",
      items: servicesItems,
    }
  },
  {
    name: "Products",
    href: "/products",
    megaMenu: {
      imageColumn: true as const,
      menuLabel: "Products",
      items: productsItems,
    }
  },
  { name: "Case Studies", href: "/case-studies" },
  {
    name: "Tools",
    href: "/tools",
    dropdown: [
      { icon: Gauge, name: "Website Checker", href: "/tools/website-checker" },
    ],
  },
  { name: "Career", href: "/career" },
  { name: "Blogs", href: "/blogs" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState(servicesItems[0].name);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openMenuNow = (name: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(name);
  };

  const scheduleCloseMenu = () => {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/90 backdrop-blur-md py-6 border-b border-border/50"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity relative z-50">
          <Image src="/vibe_venture_logo.svg" alt="Vibe Venture Logo" width={160} height={48} className="object-contain w-40 h-12" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => (item.megaMenu || item.dropdown) && openMenuNow(item.name)}
              onMouseLeave={() => (item.megaMenu || item.dropdown) && scheduleCloseMenu()}
            >
              {item.megaMenu ? (
                <div className={cn("flex items-center gap-1 cursor-pointer text-[15px] font-semibold transition-colors py-2", isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary")}>
                  <Link href={item.href}>{item.name}</Link>
                  <ChevronDown size={16} className={cn("transition-transform duration-200 opacity-50", openMenu === item.name ? "rotate-180" : "")} />

                  {/* Desktop Dropdown Wrapper to bridge hover gap */}
                  <div className={cn(
                    "absolute top-[calc(100%-16px)] pt-6 -left-50 w-190 z-50",
                    openMenu === item.name ? "pointer-events-auto" : "pointer-events-none"
                  )}>
                    <div className={cn(
                      "w-full bg-background rounded-3xl border border-border/50 shadow-2xl transition-opacity duration-200 flex overflow-hidden relative",
                      openMenu === item.name ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="flex w-full relative z-10">
                        {/* Left: main list */}
                        <div className="w-70 shrink-0 bg-linear-to-br from-primary/5 via-background to-background p-4 border-r border-border/50">
                          <div className="px-3 pt-2 pb-3 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                            {item.megaMenu.menuLabel}
                          </div>
                          <div className="flex flex-col gap-1">
                            {item.megaMenu.items.map((menuItem) => {
                              const isActiveMenuItem = activeMenuItem === menuItem.name;
                              return (
                                <Link
                                  key={menuItem.name}
                                  href={menuItem.href}
                                  onMouseEnter={() => setActiveMenuItem(menuItem.name)}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors",
                                    isActiveMenuItem ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-secondary/50 hover:text-foreground"
                                  )}
                                >
                                  <menuItem.icon size={20} className={cn("shrink-0", isActiveMenuItem ? "text-primary" : "text-muted-foreground")} />
                                  <span className="flex-1 text-[14px] font-semibold">{menuItem.name}</span>
                                  <ChevronRight size={16} className={cn("shrink-0 transition-all", isActiveMenuItem ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1")} />
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: content for the active entry */}
                        <div className="flex-1 p-8 flex flex-col justify-start">
                          {(() => {
                            if (item.megaMenu.imageColumn) {
                              const active = item.megaMenu.items.find((s) => s.name === activeMenuItem) ?? item.megaMenu.items[0];
                              return (
                                <Link href={active.href} key={active.name} className="group/product block h-full">
                                  {active.image ? (
                                    <div className="relative w-full h-full min-h-56 rounded-2xl overflow-hidden border border-border/50">
                                      <Image src={active.image} alt={active.name} fill className="object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-full h-full min-h-56 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground group-hover/product:border-primary/40 group-hover/product:text-primary transition-colors">
                                      <ImageOff size={28} strokeWidth={1.5} />
                                      <span className="text-[13px] font-medium">Mockup coming soon</span>
                                    </div>
                                  )}
                                </Link>
                              );
                            }

                            const active = item.megaMenu.items.find((s) => s.name === activeMenuItem) ?? item.megaMenu.items[0];
                            return (
                              <div key={active.name}>
                                <div className="px-4 pb-3 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                                  {item.megaMenu.subLabel}
                                </div>
                                <div className="flex flex-col gap-1">
                                  {active.subServices.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      className="group/sub flex items-center justify-between px-4 py-3 rounded-xl border border-border/50 text-[14px] font-medium text-foreground/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
                                    >
                                      <span className="flex items-center gap-3">
                                        <sub.icon size={16} className="text-muted-foreground shrink-0 group-hover/sub:text-primary transition-colors" />
                                        {sub.name}
                                      </span>
                                      <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.dropdown ? (
                <div className={cn("flex items-center gap-1 cursor-pointer text-[15px] font-medium transition-colors py-2", isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary")}>
                  <Link href={item.href}>{item.name}</Link>
                  <ChevronDown size={16} className={cn("transition-transform duration-200 opacity-50", openMenu === item.name ? "rotate-180" : "")} />

                  <div className={cn(
                    "absolute top-[calc(100%-16px)] pt-6 left-0 w-64 z-50",
                    openMenu === item.name ? "pointer-events-auto" : "pointer-events-none"
                  )}>
                    <div className={cn(
                      "w-full bg-background rounded-2xl border border-border/50 shadow-2xl transition-opacity duration-200 overflow-hidden p-2",
                      openMenu === item.name ? "opacity-100" : "opacity-0"
                    )}>
                      {item.dropdown.map((toolItem) => (
                        <Link
                          key={toolItem.name}
                          href={toolItem.href}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors group/item"
                        >
                          <toolItem.icon size={18} strokeWidth={1.5} className="text-primary shrink-0" />
                          <span className="text-[14px] font-semibold text-foreground group-hover/item:text-primary transition-colors">{toolItem.name}</span>
                        </Link>
                      ))}
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
            Book a Call
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
                    activeDropdown === item.name ? "max-h-250 py-2 opacity-100" : "max-h-0 opacity-0"
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
              ) : item.dropdown ? (
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
                    activeDropdown === item.name ? "max-h-100 py-2 opacity-100" : "max-h-0 opacity-0"
                  )}>
                      {item.dropdown.map((toolItem) => (
                        <Link
                          key={toolItem.name}
                          href={toolItem.href}
                          className={cn("py-3 pl-4 flex items-center gap-3", pathname === toolItem.href ? "text-primary" : "text-muted-foreground")}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <toolItem.icon size={18} />
                          {toolItem.name}
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
            Book a Call
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}
