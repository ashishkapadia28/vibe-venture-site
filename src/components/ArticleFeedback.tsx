"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, X, CheckCircle2, Loader2, Heart, Frown, Wrench, LifeBuoy } from "lucide-react";

type Vote = "like" | "dislike" | null;

interface StoredFeedback {
  vote: Vote;
  likes: number;
  dislikes: number;
}

function loadFeedback(slug: string): StoredFeedback {
  if (typeof window === "undefined") return { vote: null, likes: 0, dislikes: 0 };
  try {
    const raw = window.localStorage.getItem(`blog-feedback:${slug}`);
    if (!raw) return { vote: null, likes: 0, dislikes: 0 };
    return JSON.parse(raw);
  } catch {
    return { vote: null, likes: 0, dislikes: 0 };
  }
}

function saveFeedback(slug: string, data: StoredFeedback) {
  try {
    window.localStorage.setItem(`blog-feedback:${slug}`, JSON.stringify(data));
  } catch {
    // localStorage unavailable — feedback just won't persist across reloads
  }
}

function saveFeedbackDetails(slug: string, vote: "like" | "dislike", answers: Record<string, string>) {
  try {
    window.localStorage.setItem(`blog-feedback-details:${slug}`, JSON.stringify({ vote, answers, at: new Date().toISOString() }));
  } catch {
    // localStorage unavailable — details just won't persist
  }
}

const copy = {
  like: {
    icon: Heart,
    iconClass: "bg-green-100 text-green-600",
    title: "Glad You Liked It!",
    subtitle: "Takes 30 seconds — every answer shapes what we write next. Skip anything you'd rather not answer.",
    q1: { icon: Heart, label: "What did you like about it?", placeholder: "e.g. the practical tips, the writing style, the examples..." },
    q2: { icon: Wrench, label: "What would you like to see improved?", placeholder: "e.g. more real examples, a deeper dive on a section..." },
    q3: { icon: LifeBuoy, label: "How can we help you further?", placeholder: "e.g. a free consultation, a custom guide for your project..." },
  },
  dislike: {
    icon: Frown,
    iconClass: "bg-red-100 text-red-600",
    title: "Thanks for Being Honest",
    subtitle: "Your feedback genuinely helps us fix it. Skip anything you'd rather not answer.",
    q1: { icon: Frown, label: "What didn't you like about it?", placeholder: "e.g. felt too basic, missing something, hard to follow..." },
    q2: { icon: Wrench, label: "What would you like to see improved?", placeholder: "e.g. more real examples, a deeper dive on a section..." },
    q3: { icon: LifeBuoy, label: "How can we help you further?", placeholder: "e.g. a free consultation, a custom guide for your project..." },
  },
};

function FeedbackModal({ type, onClose, onSubmit }: { type: "like" | "dislike"; onClose: () => void; onSubmit: (answers: Record<string, string>) => void }) {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const text = copy[type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ q1, q2, q3 });
      setSubmitting(false);
      setDone(true);
    }, 400);
  };

  const HeaderIcon = text.icon;
  const questions = [
    { key: "q1", value: q1, set: setQ1, ...text.q1 },
    { key: "q2", value: q2, set: setQ2, ...text.q2 },
    { key: "q3", value: q3, set: setQ3, ...text.q3 },
  ];

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-background border border-border/60 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="p-8">
          {done ? (
            <>
              <div className="flex justify-end mb-2">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-white text-foreground/60 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-500">
                <CheckCircle2 size={48} className="text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold mb-2">You&apos;re Awesome, Thank You!</h3>
                <p className="text-muted-foreground text-sm max-w-sm">We read every response — this genuinely shapes what we build and write next.</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${text.iconClass}`}>
                  <HeaderIcon size={20} />
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-white text-foreground/60 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <h3 className="text-xl font-heading font-bold mb-1.5">{text.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{text.subtitle}</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {questions.map((q) => {
                  const QIcon = q.icon;
                  return (
                    <div key={q.key} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                        <QIcon size={15} className="text-primary shrink-0" />
                        {q.label}
                        <span className="text-xs font-normal text-muted-foreground/70">(optional)</span>
                      </label>
                      <textarea
                        value={q.value}
                        onChange={(e) => q.set(e.target.value)}
                        rows={2}
                        placeholder={q.placeholder}
                        className="w-full bg-white border border-border/60 shadow-sm rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-muted-foreground/40"
                      />
                    </div>
                  );
                })}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : "Share My Thoughts"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArticleFeedback({ slug }: { slug: string }) {
  const [feedback, setFeedback] = useState<StoredFeedback>({ vote: null, likes: 0, dislikes: 0 });
  const [hydrated, setHydrated] = useState(false);
  const [burst, setBurst] = useState<"like" | "dislike" | null>(null);
  const [modalType, setModalType] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    // Reads localStorage, which doesn't exist during SSR — this has to run
    // post-mount, not during render, so the server/client markup still matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeedback(loadFeedback(slug));
    setHydrated(true);
  }, [slug]);

  const handleVote = (choice: "like" | "dislike") => {
    const wasSameVote = feedback.vote === choice;

    setFeedback((prev) => {
      let { likes, dislikes, vote } = prev;

      if (vote === choice) {
        if (choice === "like") likes -= 1; else dislikes -= 1;
        vote = null;
      } else {
        if (vote === "like") likes -= 1;
        if (vote === "dislike") dislikes -= 1;
        if (choice === "like") likes += 1; else dislikes += 1;
        vote = choice;
      }

      const next = { vote, likes: Math.max(0, likes), dislikes: Math.max(0, dislikes) };
      saveFeedback(slug, next);
      return next;
    });

    if (!wasSameVote) {
      setBurst(choice);
      setTimeout(() => setBurst(null), 600);
      setModalType(choice);
    }
  };

  if (!hydrated) return null;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-10 p-6 rounded-2xl bg-white border border-border/50 shadow-sm">
        <p className="text-sm font-semibold text-foreground">Was this article helpful?</p>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            {burst === "like" && (
              <span className="absolute inset-0 rounded-full bg-green-300 animate-ping pointer-events-none" />
            )}
            <motion.button
              onClick={() => handleVote("like")}
              whileTap={{ scale: 0.9 }}
              animate={burst === "like" ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                feedback.vote === "like" ? "bg-green-100 text-green-700" : "bg-white border border-border/60 text-foreground/70 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <ThumbsUp size={15} />
              Like{feedback.likes > 0 ? ` (${feedback.likes})` : ""}
            </motion.button>
          </div>

          <div className="relative">
            {burst === "dislike" && (
              <span className="absolute inset-0 rounded-full bg-red-300 animate-ping pointer-events-none" />
            )}
            <motion.button
              onClick={() => handleVote("dislike")}
              whileTap={{ scale: 0.9 }}
              animate={burst === "dislike" ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                feedback.vote === "dislike" ? "bg-red-100 text-red-700" : "bg-white border border-border/60 text-foreground/70 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              <ThumbsDown size={15} />
              Dislike{feedback.dislikes > 0 ? ` (${feedback.dislikes})` : ""}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalType && (
          <FeedbackModal
            type={modalType}
            onClose={() => setModalType(null)}
            onSubmit={(answers) => saveFeedbackDetails(slug, modalType, answers)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
