import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { BlogContentRenderer } from "@/components/BlogContentRenderer";
import { ShareButtons } from "@/components/ShareButtons";
import { blogs, blogSettings, getBlogBySlug } from "@/data/blogs";
import { ArrowLeft, CalendarDays, ArrowRight, Tag, Code2, PenTool, Users, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Skipped entirely (not even fetched) on any blog whose feedback flag is off.
const ArticleFeedback = dynamic(() => import("@/components/ArticleFeedback").then((m) => m.ArticleFeedback));

const BASE_URL = "https://vibeventure.com";

const highlightIcons: Record<string, typeof Code2> = { Code2, PenTool, Users, Layers };

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Blog | Vibe Venture" };

  return {
    title: `${blog.title} | Vibe Venture`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image, width: 1200, height: 630, alt: blog.title }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  const moreBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="blog-post">
        {/* ─── HERO IMAGE ─── */}
        <section className="pt-28 pb-2">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-border/50">
              <Image src={blog.image} alt={blog.title} fill priority className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/40" />

              <div className="absolute top-6 left-6">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white/90 hover:text-white transition-colors bg-black/30 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <ArrowLeft size={16} />
                  Back to Blogs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TITLE / EXCERPT / META ─── */}
        <section className="pt-10 pb-4">
          <div className="container mx-auto px-8 md:px-20 lg:px-28 xl:px-42">
            <AnimatedSection>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-[1.15] tracking-tight text-foreground">
                {blog.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                {blog.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays size={15} />
                  Last updated {blog.date}
                </span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── ARTICLE + FOUNDERSIDEBAR ─── */}
        <section className="pt-10 pb-24">
          <div className="container mx-auto px-8 md:px-20 lg:px-28 xl:px-42">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Article */}
              <div className="lg:col-span-8">
                <AnimatedSection>
                  <BlogContentRenderer blocks={blog.content} />
                </AnimatedSection>
                {blogSettings.articleFeedbackEnabled && <ArticleFeedback slug={blog.slug} />}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                  <AnimatedSection delay={0.1}>
                    <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-secondary/40">
                          <Image src={blog.authorPhoto} alt={blog.author} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{blog.author}</p>
                          <p className="text-xs text-muted-foreground">{blog.authorRole}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed mb-5">{blog.authorBio}</p>

                      <div className="flex flex-col gap-2.5 mb-6">
                        {blog.authorHighlights.map((highlight, i) => {
                          const Icon = highlightIcons[highlight.icon] ?? Users;
                          return (
                            <div key={i} className="flex items-center gap-2.5">
                              <Icon size={15} className="text-primary shrink-0" />
                              <span className="text-sm text-foreground/70">{highlight.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-5 border-t border-border/50">
                        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Category</p>
                        <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                          {blog.category}
                        </span>
                      </div>

                      <div className="pt-5 mt-5 border-t border-border/50">
                        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 bg-white border border-border/60 rounded-full px-3 py-1.5"
                            >
                              <Tag size={11} className="text-muted-foreground" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-5 mt-5 border-t border-border/50">
                        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">Share</p>
                        <ShareButtons url={`${BASE_URL}/blogs/${blog.slug}`} title={blog.title} />
                      </div>

                      <div className="pt-5 mt-5 border-t border-border/50">
                        <Link
                          href="/contact"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90"
                        >
                          Talk to Our Team
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ─── MORE ARTICLES ─── */}
        {moreBlogs.length > 0 && (
          <section className="pb-24 bg-background">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
              <AnimatedSection className="mb-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">More Articles</h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {moreBlogs.map((related, i) => (
                  <AnimatedSection key={related.slug} delay={i * 0.06} className="h-full">
                    <Link
                      href={`/blogs/${related.slug}`}
                      className="card-hover group flex flex-col h-full bg-white rounded-2xl shadow-sm border border-border/50 p-3"
                    >
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary/20">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-4">
                        <h3 className="text-base font-semibold text-foreground tracking-tight mb-2 leading-snug">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                          {related.excerpt}
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
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}
