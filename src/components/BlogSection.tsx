import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { Newspaper, ArrowRight, UserRound, CalendarDays } from "lucide-react";
import type { BlogRef } from "@/data/services";

export function BlogSection({ name, relatedBlogs = [] }: { name: string; relatedBlogs?: BlogRef[] }) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="relative mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="INSIGHTS"
              title="The Vibe Venture Journal"
              subtitle={`Lessons, guides, and behind-the-scenes notes from our ${name} work.`}
              className="mx-auto text-center items-center"
            />
          </AnimatedSection>
        </div>

        {relatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedBlogs.map((blog, i) => (
              <AnimatedSection key={blog.slug} delay={i * 0.06} className="h-full">
                <div className="card-hover group flex flex-col h-full bg-white rounded-2xl shadow-sm border border-border/50 p-3">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary/20">
                    {blog.image && (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <UserRound size={13} />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {blog.date}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground tracking-tight mb-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                      {blog.description}
                    </p>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group/link w-fit"
                    >
                      Read More
                      <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col items-center justify-center gap-3 text-center py-16 px-6 bg-white rounded-2xl border border-dashed border-border/70">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Newspaper size={22} />
              </div>
              <p className="text-foreground/70 font-medium">
                Articles on {name} are coming soon.
              </p>
              <p className="text-muted-foreground text-sm max-w-sm">
                We&apos;re building out our blog — check back for guides, case studies, and insights on this topic.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
