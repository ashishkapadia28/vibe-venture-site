"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, UploadCloud, FileText, X } from "lucide-react";
import type { Job } from "@/data/jobs";

const inputClass = "w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-muted-foreground/50";
const labelClass = "text-sm font-semibold text-foreground/90";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function FileUploadField({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState('');

  const handleFileChange = (selected: File | null) => {
    if (selected && selected.size > MAX_FILE_SIZE_BYTES) {
      setFileError('File is too large — 5MB max.');
      onChange(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setFileError('');
    onChange(selected);
  };

  return (
    <div className="space-y-2">
      <label className={labelClass}>
        {label} <span className="text-primary">*</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        required
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
              setFileError('');
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
          className="w-full flex flex-col items-center justify-center gap-2 border border-dashed border-border/60 rounded-xl px-4 py-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <UploadCloud size={22} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground/80">Click to upload {label.toLowerCase()}</span>
          <span className="text-xs text-muted-foreground">PDF only, max 5MB</span>
        </button>
      )}
      {fileError && <p className="text-xs text-red-600">{fileError}</p>}
    </div>
  );
}

export function JobApplicationForm({ job }: { job: Job }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', linkedin: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const [experienceType, setExperienceType] = useState<'Fresher' | 'Experienced'>('Fresher');
  const [expYears, setExpYears] = useState('');
  const [expMonths, setExpMonths] = useState('');

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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

      const res = await fetch(`/api/applications`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to submit application");

      const data = await res.json();
      setTrackingId(data.trackingId || '');
      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
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
        {trackingId && (
          <div className="flex flex-col items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-xl px-6 py-4">
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Your Application ID</span>
            <span className="text-lg font-heading font-bold text-primary">{trackingId}</span>
            <span className="text-xs text-muted-foreground">Save this to track your application status.</span>
          </div>
        )}
      </div>
    );
  }

  return (
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
            pattern="^[0-9\s\-()]{8,15}$"
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
        <FileUploadField label="Resume" file={resume} onChange={setResume} />
        <FileUploadField label="Cover Letter" file={coverLetter} onChange={setCoverLetter} />
      </div>

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
  );
}
