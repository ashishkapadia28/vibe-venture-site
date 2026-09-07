import rawData from "./caseStudies.json";

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface StoryPoint {
  lead: string;
  text: string;
}

export interface StorySection {
  title: string;
  text: string;
  points: StoryPoint[];
}

export interface CaseStudy {
  slug: string;
  client: string;
  tag: string;
  title: string;
  description: string[];
  image: string;
  role: string;
  location: string;
  industry: string;
  timeline?: string;
  tech?: string[];
  gallery?: string[];
  overview: StorySection;
  challenge: StorySection;
  solution: StorySection;
  impact: string;
  metrics: CaseStudyMetric[];
}

/**
 * caseStudies.json is the actual data source — plain, serializable content
 * with no code in it, so it's a straightforward drop-in swap for a real
 * admin API response later (the same pattern used by services.json/ts).
 */
export const caseStudies: CaseStudy[] = rawData.caseStudies as CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
