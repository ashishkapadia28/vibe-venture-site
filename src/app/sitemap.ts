import type { MetadataRoute } from "next";

const BASE_URL = "https://vibeventure.com";

interface CaseStudyRecord {
  id: number | string;
  slug?: string;
  updated_at?: string;
}

async function getCaseStudySlugs(): Promise<CaseStudyRecord[]> {
  try {
    const adminApiUrl = process.env.ADMIN_API_URL || "http://localhost:3001";
    const res = await fetch(`${adminApiUrl}/api/case-studies?is_published=true`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/industry`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/career`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudies = await getCaseStudySlugs();
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/case-studies/${study.slug || study.id}`,
    lastModified: study.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
