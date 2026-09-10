import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecondaryHero } from "@/components/SecondaryHero";
import { BlogsListing } from "@/components/BlogsListing";
import { CTA } from "@/components/CTA";
import { blogs } from "@/data/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Vibe Venture",
  description: "Lessons, guides, and behind-the-scenes notes from the Vibe Venture team on web development, design, and AI.",
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="blogs">
        <SecondaryHero
          eyebrow="Insights"
          title="The Vibe Venture Journal"
          subtitle="Lessons, guides, and behind-the-scenes notes from our work building web, app, and AI products."
        />

        <BlogsListing blogs={blogs} />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
