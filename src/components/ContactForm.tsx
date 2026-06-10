"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Turnstile } from '@marsidev/react-turnstile';

function CustomSelect({ id, label, options, value, onChange, placeholder }: any) {
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

  const selectedOption = options.find((opt: any) => opt.value === value);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground/90">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-background border border-dashed border-border/80 rounded-md px-4 py-3 flex items-center justify-between focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm ${!value ? "text-muted-foreground/50" : "text-foreground/80"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown size={16} className={`transition-transform duration-200 text-muted-foreground ${isOpen ? "rotate-180" : ""}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-background border border-dashed border-border/80 rounded-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden py-1 max-h-60 overflow-y-auto left-0 top-full">
            {options.map((opt: any) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === opt.value ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-secondary/50 hover:text-foreground"}`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Hidden input for form submission if needed */}
      <input type="hidden" name={id} value={value} />
    </div>
  );
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  
  // State for custom selects
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const form = e.currentTarget;
      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
      const email = (form.elements.namedItem('email') as HTMLInputElement).value;
      const country = (form.elements.namedItem('country') as HTMLInputElement).value;
      const project_info = (form.elements.namedItem('project_info') as HTMLTextAreaElement).value;

      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001';
      const res = await fetch(`${adminUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          country: country || null,
          industry: industry || null,
          service: service || null,
          project_info,
          cf_turnstile_response: turnstileToken
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-full space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 size={32} />
        </div>
        <h4 className="text-2xl font-heading font-bold">Inquiry Sent!</h4>
        <p className="text-muted-foreground text-sm max-w-sm">
          Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
        </p>
        <button 
          onClick={() => {
            setIsSuccess(false);
            setIndustry("");
            setService("");
          }}
          className="mt-6 text-primary text-sm font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const industryOptions = [
    { value: "technology", label: "Technology & SaaS" },
    { value: "ecommerce", label: "E-Commerce & Retail" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance & Fintech" },
    { value: "realestate", label: "Real Estate" },
    { value: "other", label: "Other" }
  ];

  const serviceOptions = [
    { value: "web", label: "Web & Software Development" },
    { value: "mobile", label: "Mobile App Development" },
    { value: "uiux", label: "UI/UX Design" },
    { value: "marketing", label: "Digital Marketing & SEO" },
    { value: "consulting", label: "IT Consulting" },
    { value: "fullstack", label: "Full-Stack Solution" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-foreground/90">Full Name <span className="text-primary">*</span></label>
          <input type="text" id="name" required className="w-full bg-background border border-dashed border-border/80 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground/90">Work Email <span className="text-primary">*</span></label>
          <input type="email" id="email" required className="w-full bg-background border border-dashed border-border/80 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50" placeholder="john@company.com" />
        </div>
      </div>

      {/* Country & Industry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-semibold text-foreground/90">Country</label>
          <input type="text" id="country" className="w-full bg-background border border-dashed border-border/80 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50" placeholder="United States" />
        </div>
        
        <CustomSelect 
          id="industry"
          label="Industry"
          placeholder="Select Industry"
          options={industryOptions}
          value={industry}
          onChange={setIndustry}
        />
      </div>

      {/* Services Needed */}
      <CustomSelect 
        id="services"
        label="Services Needed"
        placeholder="Select Primary Service"
        options={serviceOptions}
        value={service}
        onChange={setService}
      />

      {/* Project Info */}
      <div className="space-y-2">
        <label htmlFor="project_info" className="text-sm font-semibold text-foreground/90">Project Details <span className="text-primary">*</span></label>
        <textarea id="project_info" required rows={4} className="w-full bg-background border border-dashed border-border/80 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none placeholder:text-muted-foreground/50" placeholder="Tell us about your project goals, timeline, and budget..."></textarea>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {errorMsg}
        </div>
      )}

      {/* Turnstile Widget */}
      <div className="flex justify-center">
        <Turnstile 
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""} 
          onSuccess={(token) => setTurnstileToken(token)} 
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting || !turnstileToken}
        className="w-full bg-primary text-primary-foreground py-4 rounded-md font-semibold transition-all duration-300 hover:bg-primary/90 mt-4 text-base border border-primary hover:shadow-[0_0_20px_rgba(4,173,127,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  );
}
