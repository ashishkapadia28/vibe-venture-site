"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied — silently ignore, button just won't confirm
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    { icon: FaXTwitter, label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { icon: FaLinkedin, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { icon: FaWhatsapp, label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 text-foreground/70 hover:border-primary/40 hover:text-primary transition-colors"
        >
          <link.icon size={15} />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 text-foreground/70 hover:border-primary/40 hover:text-primary transition-colors"
      >
        {copied ? <Check size={15} className="text-primary" /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
