"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ImageOff, ArrowRight } from "lucide-react";
import { navItems } from "@/data/navbar";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeImageItem, setActiveImageItem] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openMenuNow = (key: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(key);
  };

  const scheduleCloseMenu = () => {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname ? pathname.startsWith(href) : false;
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/90 backdrop-blur-md py-6 border-b border-border/50"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity relative z-50">
            <Image src="/vibe_venture_logo.svg" alt="Vibe Venture Logo" width={160} height={48} className="object-contain w-40 h-12" priority />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8 flex-1 justify-center whitespace-nowrap">
          {navItems.map((item) => (
            <div
              key={item.key}
              className="relative group"
              onMouseEnter={() => (item.megaMenu || item.dropdown) && openMenuNow(item.key)}
              onMouseLeave={() => (item.megaMenu || item.dropdown) && scheduleCloseMenu()}
            >
              {item.megaMenu ? (
                <div className={cn("flex items-center gap-1 cursor-pointer text-[15px] font-semibold transition-colors py-2", isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary")}>
                  <Link href={item.href}>{item.label}</Link>
                  <ChevronDown size={16} className={cn("transition-transform duration-200 opacity-50", openMenu === item.key ? "rotate-180" : "")} />

                  {/* Desktop Dropdown Wrapper to bridge hover gap */}
                  <div className={cn(
                    "absolute top-[calc(100%-16px)] pt-6 -left-50 z-50",
                    item.megaMenu.type === "categories" ? "w-220" : "w-190",
                    openMenu === item.key ? "pointer-events-auto" : "pointer-events-none"
                  )}>
                    <div className={cn(
                      "w-full bg-background rounded-3xl border border-border/50 shadow-2xl transition-opacity duration-200 overflow-hidden relative",
                      openMenu === item.key ? "opacity-100" : "opacity-0"
                    )}>
                      {item.megaMenu.type === "categories" ? (
                        <div className="flex gap-10 p-8 relative z-10">
                          {item.megaMenu.categories.map((category) => {
                            const CategoryIcon = category.icon;
                            return (
                              <div key={category.label} className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/50">
                                  <CategoryIcon size={18} className="text-primary shrink-0" />
                                  <span className="text-[14px] font-bold text-foreground">{category.label}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  {category.items.map((menuItem) => (
                                    <Link
                                      key={menuItem.name}
                                      href={menuItem.href}
                                      className="text-[14px] font-medium text-foreground/70 hover:text-primary transition-colors py-2"
                                    >
                                      {menuItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (() => {
                        const imageMenu = item.megaMenu;
                        const active = imageMenu.items.find((s) => s.name === activeImageItem) ?? imageMenu.items[0];
                        return (
                          <div className="flex w-full relative z-10">
                            {/* Left: main list */}
                            <div className="w-70 shrink-0 bg-linear-to-br from-primary/5 via-background to-background p-4 border-r border-border/50">
                              <div className="px-3 pt-2 pb-3 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                                {imageMenu.menuLabel}
                              </div>
                              <div className="flex flex-col gap-1">
                                {imageMenu.items.map((menuItem) => {
                                  const isActiveMenuItem = active.name === menuItem.name;
                                  const MenuIcon = menuItem.icon;
                                  return (
                                    <Link
                                      key={menuItem.name}
                                      href={menuItem.href}
                                      onMouseEnter={() => setActiveImageItem(menuItem.name)}
                                      className={cn(
                                        "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors",
                                        isActiveMenuItem ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-secondary/50 hover:text-foreground"
                                      )}
                                    >
                                      <MenuIcon size={20} className={cn("shrink-0", isActiveMenuItem ? "text-primary" : "text-muted-foreground")} />
                                      <span className="flex-1 text-[14px] font-semibold">{menuItem.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right: image preview for the active entry */}
                            <div className="flex-1 p-8 flex flex-col justify-start">
                              <Link href={active.href} key={active.name} className="group/product block h-full">
                                {active.image ? (
                                  <div className="relative w-full h-full min-h-56 rounded-2xl overflow-hidden border border-border/50">
                                    <Image src={active.image} alt={active.name} fill className="object-cover" sizes="320px" />
                                  </div>
                                ) : (
                                  <div className="w-full h-full min-h-56 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground group-hover/product:border-primary/40 group-hover/product:text-primary transition-colors">
                                    <ImageOff size={28} strokeWidth={1.5} />
                                    <span className="text-[13px] font-medium">Mockup coming soon</span>
                                  </div>
                                )}
                              </Link>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : item.dropdown ? (
                <div className={cn("flex items-center gap-1 cursor-pointer text-[15px] font-medium transition-colors py-2", isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary")}>
                  <Link href={item.href}>{item.label}</Link>
                  <ChevronDown size={16} className={cn("transition-transform duration-200 opacity-50", openMenu === item.key ? "rotate-180" : "")} />

                  <div className={cn(
                    "absolute top-[calc(100%-16px)] pt-6 left-0 w-64 z-50",
                    openMenu === item.key ? "pointer-events-auto" : "pointer-events-none"
                  )}>
                    <div className={cn(
                      "w-full bg-background rounded-2xl border border-border/50 shadow-2xl transition-opacity duration-200 overflow-hidden p-2",
                      openMenu === item.key ? "opacity-100" : "opacity-0"
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
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden xl:flex flex-1 justify-end">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center gap-1.5 group"
          >
            Book a Call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="xl:hidden p-2 text-foreground relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
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
            <div key={item.key} className="flex flex-col">
              {item.megaMenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={cn("flex items-center justify-between py-3 text-lg font-medium border-b border-border/50", isActive(item.href) ? "text-primary" : "")}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={20} className={cn("transition-transform duration-200", activeDropdown === item.key ? "rotate-180" : "")} />
                  </button>
                  <div className={cn(
                    "flex flex-col overflow-hidden transition-all duration-300",
                    activeDropdown === item.key ? "max-h-250 py-2 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    {item.megaMenu.type === "categories" ? (
                      item.megaMenu.categories.map((category) => (
                        <div key={category.label} className="flex flex-col mb-2">
                          <span className="pt-3 pb-1 pl-4 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                            {category.label}
                          </span>
                          {category.items.map((menuItem) => (
                            <Link
                              key={menuItem.name}
                              href={menuItem.href}
                              className={cn("py-3 pl-4 flex items-center gap-3", pathname === menuItem.href ? "text-primary" : "text-muted-foreground")}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <menuItem.icon size={18} />
                              {menuItem.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      item.megaMenu.items.map((menuItem) => (
                        <Link
                          key={menuItem.name}
                          href={menuItem.href}
                          className={cn("py-3 pl-4 flex items-center gap-3", pathname === menuItem.href ? "text-primary" : "text-muted-foreground")}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <menuItem.icon size={18} />
                          {menuItem.name}
                        </Link>
                      ))
                    )}
                  </div>
                </>
              ) : item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={cn("flex items-center justify-between py-3 text-lg font-medium border-b border-border/50", isActive(item.href) ? "text-primary" : "")}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={20} className={cn("transition-transform duration-200", activeDropdown === item.key ? "rotate-180" : "")} />
                  </button>
                  <div className={cn(
                    "flex flex-col overflow-hidden transition-all duration-300",
                    activeDropdown === item.key ? "max-h-100 py-2 opacity-100" : "max-h-0 opacity-0"
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
                  {item.label}
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
