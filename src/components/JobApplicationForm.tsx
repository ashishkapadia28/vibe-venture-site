"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CheckCircle2, Loader2, UploadCloud, FileText, X } from "lucide-react";
import type { Job } from "@/data/jobs";

const inputClass = "w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50";
const labelClass = "text-sm font-semibold text-foreground/90";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
// Window.turnstile's type is already declared globally in ContactForm.tsx.

function FileUploadField({
  label,
  file,
  onChange,
  requiredError,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  requiredError?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sizeError, setSizeError] = useState('');

  // Validated in JS, not via the `required` attribute — this input stays
  // `hidden` behind a styled button, and a hidden control can never receive
  // focus, so the browser can't show its native validation bubble on it.
  const handleFileChange = (selected: File | null) => {
    if (selected && selected.size > MAX_FILE_SIZE_BYTES) {
      setSizeError('File is too large — 5MB max.');
      onChange(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setSizeError('');
    onChange(selected);
  };

  const errorMessage = sizeError || requiredError;

  return (
    <div className="space-y-2">
      <label className={labelClass}>
        {label} <span className="text-primary">*</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
      />
      {file ? (
        <div className="flex items-center justify-between gap-3 bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileText size={18} className="text-primary shrink-0" />
            <span className="text-sm text-foreground/90 truncate">{file.name}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSizeError('');
              onChange(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full flex flex-col items-center justify-center gap-2 border border-dashed rounded-xl px-4 py-6 text-center transition-all ${
            errorMessage ? "border-red-300 bg-red-50/50" : "border-border/60 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <UploadCloud size={22} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground/80">Click to upload {label.toLowerCase()}</span>
          <span className="text-xs text-muted-foreground">PDF only, max 5MB</span>
        </button>
      )}
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
}

export function JobApplicationForm({ job }: { job: Job }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', linkedin: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  const [coverLetterError, setCoverLetterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [experienceType, setExperienceType] = useState<'Fresher' | 'Experienced'>('Fresher');
  const [expYears, setExpYears] = useState('');
  const [expMonths, setExpMonths] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
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

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const missingResume = !resume;
    const missingCoverLetter = !coverLetter;
    setResumeError(missingResume ? 'Resume is required.' : '');
    setCoverLetterError(missingCoverLetter ? 'Cover letter is required.' : '');
    if (missingResume || missingCoverLetter) return;

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError('Please complete the verification check.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('job_id', job.id);
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('linkedin', formData.linkedin);
      payload.append('experience', experienceType === 'Fresher' ? 'Fresher' : `${expYears || '0'} Years, ${expMonths || '0'} Months`);
      if (resume) payload.append('resume', resume);
      if (coverLetter) payload.append('cover_letter', coverLetter);
      if (turnstileToken) payload.append('turnstileToken', turnstileToken);

      const res = await fetch(`/api/applications`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
        <h4 className="text-2xl font-heading font-bold">Application Received!</h4>
        <p className="text-muted-foreground text-sm max-w-sm">
          Thank you for applying to {job.title}. Our team will review your application and get back to you shortly.
        </p>
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
      <form onSubmit={handleApplySubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClass}>
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            required
            minLength={2}
            pattern="^[a-zA-Z\s]+$"
            title="Only letters and spaces are allowed"
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            required
            type="email"
            pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClass}>
            LinkedIn Profile
          </label>
          <input
            type="url"
            pattern="https?://.*"
            value={formData.linkedin}
            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
            className={inputClass}
            placeholder="https://linkedin.com/in/janedoe"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>
            Phone Number <span className="text-primary">*</span>
          </label>
          <input
            required
            type="tel"
            minLength={8}
            maxLength={15}
            pattern="^[0-9\s\-\(\)]{8,15}$"
            title="Please enter a valid phone number (e.g. 234-567-8900)"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
            placeholder="(234) 567-8900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass}>
          Experience Level <span className="text-primary">*</span>
        </label>
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            onClick={() => setExperienceType('Fresher')}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl border shadow-sm transition-all ${experienceType === 'Fresher' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border/60 text-muted-foreground hover:border-primary/40'}`}
          >
            Fresher
          </button>
          <button
            type="button"
            onClick={() => setExperienceType('Experienced')}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl border shadow-sm transition-all ${experienceType === 'Experienced' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border/60 text-muted-foreground hover:border-primary/40'}`}
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
                className={`${inputClass} pr-16`}
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
                className={`${inputClass} pr-20`}
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pointer-events-none">
                Months
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadField
          label="Resume"
          file={resume}
          onChange={(file) => { setResume(file); if (file) setResumeError(''); }}
          requiredError={resumeError}
        />
        <FileUploadField
          label="Cover Letter"
          file={coverLetter}
          onChange={(file) => { setCoverLetter(file); if (file) setCoverLetterError(''); }}
          requiredError={coverLetterError}
        />
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-4 rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 mt-4 text-base shadow-lg shadow-primary/20 hover:shadow-sm hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting this application, you agree to our privacy policy.
      </p>
      </form>
    </>
  );
}
