"use client";

import { useMemo, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Search, UserRound, CalendarDays, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/data/blogs";

const PAGE_SIZE = 6;

export function BlogsListing({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))], [blogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchCategory = activeCategory === "All" || blog.category === activeCategory;
      const matchQuery = !q || blog.title.toLowerCase().includes(q) || blog.excerpt.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [blogs, query, activeCategory]);

  const visibleBlogs = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="pt-12 pb-24 bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        {/* Search + Categories */}
        <AnimatedSection className="mb-16 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto sm:min-w-105">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full bg-white border border-border/60 shadow-sm rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setVisibleCount(PAGE_SIZE); }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-white border border-border/60 text-foreground/70 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Blog grid */}
        {visibleBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBlogs.map((blog, i) => (
              <AnimatedSection key={blog.slug} delay={(i % PAGE_SIZE) * 0.06} className="h-full">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="card-hover group flex flex-col h-full bg-white rounded-2xl shadow-sm border border-border/50 p-3"
                >
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary/20">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-white/90 text-primary px-2.5 py-1 rounded-full">
                      {blog.category}
                    </span>
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
                      {blog.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary w-fit">
                      Read More
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-center py-16 px-6 bg-white rounded-2xl border border-dashed border-border/70">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              <Newspaper size={22} />
            </div>
            <p className="text-foreground/70 font-medium">No articles found.</p>
            <p className="text-muted-foreground text-sm max-w-sm">
              Try a different search term or category.
            </p>
          </div>
        )}

        {/* View More */}
        {hasMore && (
          <AnimatedSection delay={0.1} className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-[15px] transition-all duration-300 hover:bg-secondary/50 shadow-sm"
            >
              View More
            </button>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
