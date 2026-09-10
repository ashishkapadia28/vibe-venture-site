import rawData from "./blogs.json";

export interface BlogParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BlogHeadingBlock {
  type: "heading";
  text: string;
}

export interface BlogImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface BlogChartBlock {
  type: "chart";
  title?: string;
  data: { label: string; value: number }[];
}

export interface BlogCalloutBlock {
  type: "callout";
  icon: string;
  text: string;
}

export type BlogContentBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogImageBlock
  | BlogTableBlock
  | BlogChartBlock
  | BlogCalloutBlock;

export interface AuthorHighlight {
  icon: string;
  text: string;
}

export interface BlogSettings {
  articleFeedbackEnabled: boolean;
}

export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  authorRole: string;
  authorPhoto: string;
  authorBio: string;
  authorHighlights: AuthorHighlight[];
  date: string;
  readTime: string;
  content: BlogContentBlock[];
}

/**
 * blogs.json is the actual data source — plain, serializable content with
 * no code in it, so it's a straightforward drop-in swap for a real admin
 * API response later (the same pattern used by services.json/ts).
 */
export const blogs: Blog[] = rawData.blogs as Blog[];

/**
 * Feature toggle for the entire like/dislike + feedback-popup block on
 * article pages — flip to false (from the future admin panel) to hide it
 * everywhere without touching component code.
 */
export const blogSettings: BlogSettings = rawData.settings as BlogSettings;

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}
