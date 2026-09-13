"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import type { Job as Role } from "@/data/jobs";

// Custom Dropdown Component
function CustomDropdown({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group h-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-transparent px-4 py-3 outline-none cursor-pointer relative z-20 flex flex-col justify-center h-full border border-transparent rounded-lg hover:bg-foreground/5 transition-colors"
      >
        <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground mb-1">
          {label}
        </span>
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium text-foreground truncate pr-4">{value}</span>
          <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
        </div>
      </button>

      {/* Custom Dropdown Menu */}
      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-background border border-border/50 rounded-lg shadow-lg z-50 overflow-hidden backdrop-blur-xl transition-all duration-200 origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
          }`}
      >
        <ul className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition-all ${value === opt
                  ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary'
                  : 'text-foreground/80 hover:bg-secondary hover:text-foreground border-l-2 border-transparent'
                }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OpenPositions({ openRoles }: { openRoles: Role[] }) {
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // Reset pagination when filters change (adjusted during render, per React's
  // guidance for state that depends on other state — avoids an extra effect
  // pass, and this project's lint rules flag setState-in-effect here anyway).
  const [appliedFilters, setAppliedFilters] = useState([departmentFilter, experienceFilter, typeFilter]);
  if (appliedFilters[0] !== departmentFilter || appliedFilters[1] !== experienceFilter || appliedFilters[2] !== typeFilter) {
    setAppliedFilters([departmentFilter, experienceFilter, typeFilter]);
    setCurrentPage(1);
  }

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(openRoles.map((role) => role.department)))],
    [openRoles]
  );
  const experiences = ["All", "Fresher", "Mid-Level", "Experienced"];
  const types = ["All", "Full-Time", "Contract", "Internship"];

  const filteredRoles = useMemo(
    () =>
      openRoles.filter((role) => {
        const matchDept = departmentFilter === "All" || role.department === departmentFilter;
        const matchExp = experienceFilter === "All" || role.experience === experienceFilter;
        const matchType = typeFilter === "All" || role.type === typeFilter;
        return matchDept && matchExp && matchType;
      }),
    [openRoles, departmentFilter, experienceFilter, typeFilter]
  );

  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="open-roles" className="pb-24 pt-4 relative z-10 bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <AnimatedSection>
          <div className="flex flex-col mb-12">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
                Open Positions
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Ready to build? Check out our current openings. If you don&apos;t see a perfect fit, pitch us anyway.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-1 p-2 rounded-2xl relative bg-white border border-border/50 shadow-sm h-auto">
              <div className="absolute top-2 bottom-2 left-1/3 w-px bg-border/50 hidden md:block" />
              <div className="absolute top-2 bottom-2 left-2/3 w-px bg-border/50 hidden md:block" />

              <CustomDropdown
                label="Department"
                options={departments}
                value={departmentFilter}
                onChange={setDepartmentFilter}
              />

              <CustomDropdown
                label="Experience Level"
                options={experiences}
                value={experienceFilter}
                onChange={setExperienceFilter}
              />

              <CustomDropdown
                label="Job Type"
                options={types}
                value={typeFilter}
                onChange={setTypeFilter}
              />
            </div>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="flex flex-col gap-4 relative z-10 min-h-75">
            {paginatedRoles.length > 0 ? (
              paginatedRoles.map((role, index) => (
                <AnimatedSection
                  key={role.id}
                  delay={index * 0.08}
                  className="card-hover group p-6 md:p-8 bg-white rounded-2xl border border-border/50 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center w-full gap-6 md:gap-12">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-primary mb-1">
                          {role.department}
                        </span>
                        <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase text-primary ring-1 ring-inset ring-primary/20 mb-1">
                          {role.experience}
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {role.title}
                      </h3>
                    </div>

                    <div className="flex gap-6 items-center">
                      <div className="flex flex-col md:text-right gap-1">
                        <span className="text-sm font-medium text-foreground">
                          {role.location}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {role.type}
                        </span>
                      </div>

                      <div className="hidden md:block w-px h-10 bg-border/50 mx-4" />

                      <Link
                        href={`/career/${role.id}`}
                        className="px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-bold text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2 group/btn shrink-0 w-full md:w-auto"
                      >
                        Apply Now
                        <ArrowUpRight size={16} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              <div className="p-12 text-center relative flex flex-col items-center justify-center min-h-75">
                <p className="text-xl font-heading font-bold mb-2">
                  {openRoles.length === 0 ? "No Open Roles" : "No Matches Found"}
                </p>
                <p className="text-muted-foreground font-medium max-w-sm">
                  {openRoles.length === 0
                    ? "We don't have any open roles available at the moment. Please check back later."
                    : "We don't have any open roles matching these exact filters right now."}
                </p>
                {openRoles.length > 0 && (
                  <button
                    onClick={() => {
                      setDepartmentFilter("All");
                      setExperienceFilter("All");
                      setTypeFilter("All");
                    }}
                    className="mt-6 text-xs font-bold uppercase tracking-widest text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer relative z-20"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <AnimatedSection delay={0.2} className="flex justify-center items-center gap-4 mt-12 relative z-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight size={16} className="rotate-180" />
              </button>

              <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
                Page <span className="text-foreground">{currentPage}</span> of {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight size={16} />
              </button>
            </AnimatedSection>
          )}
        </div>

        <AnimatedSection delay={0.4} className="mt-16">
          <p className="text-muted-foreground mb-4">Don&apos;t see a perfect fit?</p>
          <a href="mailto:hello@vibeventure.in" className="inline-flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors border-b border-primary pb-1">
            Pitch Yourself Directly <ArrowRight size={16} />
          </a>
        </AnimatedSection>

      </div>
    </section>
  );
}
