"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

function CustomSelect({ id, label, options, value, onChange, placeholder, required }: CustomSelectProps) {
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

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground/90">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 flex items-center justify-between focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm ${!value ? "text-muted-foreground/50" : "text-foreground/80"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown size={16} className={`transition-transform duration-200 text-muted-foreground ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-background border border-border/60 rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto left-0 top-full">
            {options.map((opt) => (
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
      <input type="hidden" name={id} value={value} required={required} />
    </div>
  );
}

function CheckboxField({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
      <button
        type="button"
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
          checked ? "bg-primary border-primary" : "bg-background border-border/60 group-hover:border-primary/40"
        }`}
      >
        {checked && <Check size={13} className="text-primary-foreground" strokeWidth={3} />}
      </button>
      <span className="text-sm text-foreground/70 leading-relaxed">{children}</span>
    </label>
  );
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: "light" | "dark"; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const lookingForOptions = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "ai", label: "AI Automation" },
  { value: "ecommerce", label: "Ecommerce Development" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "branding", label: "Branding & Creative" },
  { value: "other", label: "Something Else" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [lookingFor, setLookingFor] = useState("");
  const [ndaRequired, setNdaRequired] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  useEffect(() => {
    if (!turnstileReady || !TURNSTILE_SITE_KEY || !turnstileRef.current || !window.turnstile) return;
    window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
    });
  }, [turnstileReady]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!agreedTerms) {
      setErrorMsg("Please agree to the Terms and Conditions and Privacy Policy.");
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMsg("Please complete the verification check.");
      return;
    }

    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value;
      const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const mobile = (form.elements.namedItem("mobile") as HTMLInputElement).value;
      const website = (form.elements.namedItem("website") as HTMLInputElement).value;
      const company = (form.elements.namedItem("company") as HTMLInputElement).value;
      const project_info = (form.elements.namedItem("project_info") as HTMLTextAreaElement).value;

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          mobile: mobile || null,
          website: website || null,
          company,
          looking_for: lookingFor || null,
          nda_required: ndaRequired,
          project_info,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-full space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="text-primary flex items-center justify-center mb-4">
          <CheckCircle2 size={48} />
        </div>
        <h4 className="text-2xl font-heading font-bold">Message Sent!</h4>
        <p className="text-muted-foreground text-sm max-w-sm">
          Thanks for reaching out. Our team will review your project details and get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setLookingFor("");
            setNdaRequired(false);
            setAgreedTerms(false);
          }}
          className="mt-6 text-primary text-sm font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-semibold text-foreground/90">
              First name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              required
              pattern="[A-Za-z\s]+"
              title="Letters only — no numbers or special characters"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, "");
              }}
              className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50"
              placeholder="Jane"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-semibold text-foreground/90">
              Last name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              required
              pattern="[A-Za-z\s]+"
              title="Letters only — no numbers or special characters"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, "");
              }}
              className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground/90">
              Email address <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50"
              placeholder="jane@company.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="mobile" className="text-sm font-semibold text-foreground/90">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              inputMode="numeric"
              pattern="[0-9]+"
              title="Numbers only"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
              }}
              className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50"
              placeholder="9274940383"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-semibold text-foreground/90">
              Website URL
            </label>
            <input
              type="url"
              id="website"
              className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50"
              placeholder="https://yourcompany.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-foreground/90">
              Company Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="company"
              required
              className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50"
              placeholder="Acme Inc."
            />
          </div>
        </div>

        <CustomSelect
          id="looking_for"
          label="What are you looking for?"
          placeholder="Select an option"
          options={lookingForOptions}
          value={lookingFor}
          onChange={setLookingFor}
          required
        />

        <div className="space-y-2">
          <label htmlFor="project_info" className="text-sm font-semibold text-foreground/90">
            Tell us about your project <span className="text-primary">*</span>
          </label>
          <textarea
            id="project_info"
            required
            rows={4}
            className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none placeholder:text-muted-foreground/50"
            placeholder="Tell us about your project goals, timeline, and budget..."
          />
        </div>

        <div className="space-y-3 pt-2">
          <CheckboxField id="nda" checked={ndaRequired} onChange={setNdaRequired}>
            I require an NDA before sharing project details.
          </CheckboxField>
          <CheckboxField id="terms" checked={agreedTerms} onChange={setAgreedTerms}>
            By submitting this form, I agree to the{" "}
            <Link href="/terms" className="text-primary font-medium hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary font-medium hover:underline">
              Privacy Policy
            </Link>
            .
          </CheckboxField>
        </div>

        {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

        {errorMsg && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground py-4 rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 mt-4 text-base shadow-lg shadow-primary/20 hover:shadow-sm hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}
