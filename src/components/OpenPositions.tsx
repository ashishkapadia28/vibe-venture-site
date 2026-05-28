"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowUpRight, ArrowRight, ChevronDown, X, Loader2, CheckCircle } from "lucide-react";

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
        className={`absolute top-full left-0 right-0 mt-2 bg-background border border-border/50 rounded-lg shadow-lg z-50 overflow-hidden backdrop-blur-xl transition-all duration-200 origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
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
              className={`px-4 py-3 text-sm cursor-pointer transition-all ${
                value === opt 
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

export function OpenPositions({ openRoles }: { openRoles: any[] }) {
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Application Modal States
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', linkedin: '', experience: '', cover_letter: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [experienceType, setExperienceType] = useState<'Fresher' | 'Experienced'>('Fresher');
  const [expYears, setExpYears] = useState('');
  const [expMonths, setExpMonths] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  useEffect(() => {
    setMounted(true);
  }, []);

  const ITEMS_PER_PAGE = 10;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [departmentFilter, experienceFilter, typeFilter]);

  const departments = ["All", ...Array.from(new Set(openRoles.map((role) => role.department)))];
  const experiences = ["All", "Fresher", "Mid-Level", "Experienced"];
  const types = ["All", "Full-Time", "Contract", "Internship"];

  const filteredRoles = openRoles.filter((role) => {
    const matchDept = departmentFilter === "All" || role.department === departmentFilter;
    const matchExp = experienceFilter === "All" || role.experience === experienceFilter;
    const matchType = typeFilter === "All" || role.type === typeFilter;
    return matchDept && matchExp && matchType;
  });

  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: selectedJob.id,
          ...formData,
          phone: `${countryCode} ${formData.phone}`,
          experience: experienceType === 'Fresher' ? 'Fresher' : `${expYears || '0'} Years, ${expMonths || '0'} Months`
        })
      });

      if (!res.ok) throw new Error("Failed to submit application");
      
      setIsSuccess(true);
      setTimeout(() => {
        setSelectedJob(null);
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', linkedin: '', experience: '', cover_letter: '' });
        setExperienceType('Fresher');
        setExpYears('');
        setExpMonths('');
        setCountryCode('+91');
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Ready to build? Check out our current openings. If you don't see a perfect fit, pitch us anyway.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 border border-border p-2 rounded-xl relative bg-secondary/20 h-auto">
              <div className="absolute top-2 bottom-2 left-1/3 w-[1px] bg-border/50 hidden md:block" />
              <div className="absolute top-2 bottom-2 left-2/3 w-[1px] bg-border/50 hidden md:block" />

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
          {/* Top border of the list */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top z-20 pointer-events-none" />
          
          <div className="flex flex-col relative z-10 min-h-[300px]">
            {paginatedRoles.length > 0 ? (
              paginatedRoles.map((role, index) => (
                <AnimatedSection 
                  key={role.id} 
                  delay={index * 0.1}
                  className="p-8 group bg-background relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Bottom dashed border for each row */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
                  
                  {/* Left and Right boundaries for the whole container */}
                  <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left z-20 pointer-events-none opacity-0 md:opacity-100" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 pointer-events-none opacity-0 md:opacity-100" />

                  {/* Subtle Hover Gradient */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center w-full gap-6 md:gap-12">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-primary mb-1">
                          {role.department}
                        </span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground border border-border/50 px-2 py-[2px] rounded-sm mb-1 bg-secondary/50">
                          {role.experience}
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
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
                      
                      <div className="hidden md:block w-[1px] h-10 bg-border/50 mx-4" />

                      <button 
                        onClick={() => setSelectedJob(role)}
                        className="px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-bold text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2 group/btn shrink-0 w-full md:w-auto"
                      >
                        Apply Now
                        <ArrowUpRight size={16} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : openRoles.length === 0 ? (
              <div className="p-12 text-center relative flex flex-col items-center justify-center min-h-[300px]">
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left z-20 pointer-events-none opacity-0 md:opacity-100" />
                <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 pointer-events-none opacity-0 md:opacity-100" />
                
                <p className="text-xl font-heading font-bold mb-2">No Open Roles</p>
                <p className="text-muted-foreground font-medium max-w-sm">
                  We don't have any open roles available at the moment. Please check back later.
                </p>
              </div>
            ) : (
              <div className="p-12 text-center relative flex flex-col items-center justify-center min-h-[300px]">
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left z-20 pointer-events-none opacity-0 md:opacity-100" />
                <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 pointer-events-none opacity-0 md:opacity-100" />
                
                <p className="text-xl font-heading font-bold mb-2">No Matches Found</p>
                <p className="text-muted-foreground font-medium max-w-sm">
                  We don't have any open roles matching these exact filters right now.
                </p>
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
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <AnimatedSection delay={0.2} className="flex justify-center items-center gap-4 mt-12 relative z-10">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
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
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight size={16} />
              </button>
            </AnimatedSection>
          )}
        </div>
        
        <AnimatedSection delay={0.4} className="mt-16">
          <p className="text-muted-foreground mb-4">Don't see a perfect fit?</p>
          <a href="mailto:careers@vibeventure.com" className="inline-flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors border-b border-primary pb-1">
            Pitch Yourself Directly <ArrowRight size={16} />
          </a>
        </AnimatedSection>
        
      </div>

      {mounted && selectedJob && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background border border-border/60 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col">  
            {/* Header Area */}
            <div className="bg-secondary/40 border-b border-border/50 p-6 md:p-8 relative">
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-all p-2 bg-background/80 hover:bg-background rounded-full shadow-sm border border-border/50 z-10"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {selectedJob.department}
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground border border-border/50 px-2.5 py-1 rounded-full bg-background">
                  {selectedJob.location}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground pr-8">
                Apply for {selectedJob.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                We're excited to see what you can bring to the team. Let's get started.
              </p>
            </div>
        
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]" />
                  </div>
                  <h3 className="text-3xl font-bold font-heading mb-3">Application Received!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for applying to {selectedJob.title}. Our team will review your application and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="flex flex-col gap-6">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
                      {error}
                    </div>
                  )}

                  {/* Two-Column Row for Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-primary transition-colors">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input 
                        required 
                        minLength={2} 
                        pattern="^[a-zA-Z\s]+$"
                        title="Only letters and spaces are allowed"
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all placeholder:text-muted-foreground/50" 
                        placeholder="Jane Doe" 
                      />
                    </div>
                    <div className="group">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-primary transition-colors">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input 
                        required 
                        type="email" 
                        pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                        title="Please enter a valid email address"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all placeholder:text-muted-foreground/50" 
                        placeholder="jane@example.com" 
                      />
                    </div>
                  </div>

                  {/* Two-Column Row for LinkedIn and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-primary transition-colors">
                        LinkedIn Profile <span className="text-red-400">*</span>
                      </label>
                      <input 
                        required 
                        type="url" 
                        pattern="https?://.*" 
                        value={formData.linkedin} 
                        onChange={e => setFormData({...formData, linkedin: e.target.value})} 
                        className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all placeholder:text-muted-foreground/50" 
                        placeholder="https://linkedin.com/in/janedoe" 
                      />
                    </div>
                    <div className="group">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-primary transition-colors">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="bg-secondary/30 border border-border/50 rounded-xl px-3 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all shrink-0 cursor-pointer"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>
                        <input 
                          required 
                          type="tel" 
                          minLength={8} 
                          maxLength={15}
                          pattern="^[0-9\s\-()]{8,15}$"
                          title="Please enter a valid phone number (e.g. 234-567-8900)"
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                          className="flex-1 min-w-0 bg-secondary/30 border border-border/50 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all placeholder:text-muted-foreground/50" 
                          placeholder="(234) 567-8900" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block group-focus-within:text-primary transition-colors">
                      Experience Level <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-4 mb-3">
                      <button 
                        type="button"
                        onClick={() => setExperienceType('Fresher')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-all ${experienceType === 'Fresher' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50'}`}
                      >
                        Fresher
                      </button>
                      <button 
                        type="button"
                        onClick={() => setExperienceType('Experienced')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-all ${experienceType === 'Experienced' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50'}`}
                      >
                        Experienced
                      </button>
                    </div>
                    {experienceType === 'Experienced' && (
                      <div className="flex gap-4 animate-in fade-in slide-in-from-top-2">
                        <div className="flex-1 relative">
                          <input 
                            required 
                            type="number" 
                            min="0"
                            max="50"
                            value={expYears} 
                            onChange={e => setExpYears(e.target.value)} 
                            className="w-full bg-secondary/30 border border-border/50 rounded-xl pl-4 pr-16 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all placeholder:text-muted-foreground/50" 
                            placeholder="0" 
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pointer-events-none">
                            Years
                          </span>
                        </div>
                        <div className="flex-1 relative">
                          <input 
                            required 
                            type="number" 
                            min="0"
                            max="11"
                            value={expMonths} 
                            onChange={e => setExpMonths(e.target.value)} 
                            className="w-full bg-secondary/30 border border-border/50 rounded-xl pl-4 pr-20 py-3.5 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all placeholder:text-muted-foreground/50" 
                            placeholder="0" 
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pointer-events-none">
                            Months
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-primary transition-colors">
                      Cover Letter <span className="text-red-400">*</span>
                    </label>
                    <textarea 
                      required
                      value={formData.cover_letter} 
                      onChange={e => setFormData({...formData, cover_letter: e.target.value})} 
                      className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-4 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all h-32 resize-none custom-scrollbar placeholder:text-muted-foreground/50" 
                      placeholder="Tell us why you'd be a great fit for this role..." 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 hover:shadow-[0_4px_20px_rgba(var(--primary),0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0 flex justify-center items-center gap-2 group/btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <ArrowUpRight size={18} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 opacity-70 group-hover/btn:opacity-100" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-muted-foreground mt-4">
                      By submitting this application, you agree to our privacy policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
