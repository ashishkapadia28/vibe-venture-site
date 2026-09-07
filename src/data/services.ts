import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import rawData from "./services.json";
import { serviceIcons } from "./serviceIcons";
import { whyIcons } from "./whyIcons";

export interface SubService {
  slug: string;
  name: string;
  icon: IconType;
  description: string;
  features: string[];
  image: string | null;
}

export interface WhyPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface BlogRef {
  title: string;
  slug: string;
  image: string | null;
  author: string;
  date: string;
  description: string;
}

export interface ServiceSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Service {
  slug: string;
  name: string;
  icon: IconType;
  description: string;
  aboutContent: string[];
  aboutImage: string | null;
  whyPoints: WhyPoint[];
  faqs: FAQItem[];
  process: ProcessStep[];
  relatedBlogs: BlogRef[];
  seo: ServiceSEO;
  subServices: SubService[];
}

interface RawSubService {
  slug: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  image: string | null;
}

interface RawWhyPoint {
  title: string;
  description: string;
  icon: string;
}

interface RawService {
  slug: string;
  name: string;
  icon: string;
  description: string;
  aboutContent: string[];
  aboutImage: string | null;
  whyPoints: RawWhyPoint[];
  faqs: FAQItem[];
  process: ProcessStep[];
  relatedBlogs: BlogRef[];
  seo: ServiceSEO;
  subServices: RawSubService[];
}

function resolveIcon(name: string): IconType {
  const icon = serviceIcons[name];
  if (!icon) {
    throw new Error(`Unknown service icon "${name}" in services.json — add it to serviceIcons.ts`);
  }
  return icon;
}

function resolveWhyIcon(name: string): LucideIcon {
  const icon = whyIcons[name];
  if (!icon) {
    throw new Error(`Unknown "why" icon "${name}" in services.json — add it to whyIcons.ts`);
  }
  return icon;
}

/**
 * services.json is the actual data source (names, descriptions, features,
 * SEO metadata, etc.) — plain, serializable content with no code in it, so
 * it's a straightforward drop-in swap for a real CMS/admin API response
 * later. This module just resolves each icon name string to its React
 * component and re-exports the same shape every consumer (Navbar,
 * ServicesList, the service page templates, sitemap) already relies on.
 */
export const services: Service[] = (rawData.services as RawService[]).map((service) => ({
  ...service,
  icon: resolveIcon(service.icon),
  whyPoints: service.whyPoints.map((point) => ({
    ...point,
    icon: resolveWhyIcon(point.icon),
  })),
  subServices: service.subServices.map((sub) => ({
    ...sub,
    icon: resolveIcon(sub.icon),
  })),
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getSubServiceBySlug(
  serviceSlug: string,
  subSlug: string
): { service: Service; subService: SubService } | undefined {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return undefined;
  const subService = service.subServices.find((s) => s.slug === subSlug);
  if (!subService) return undefined;
  return { service, subService };
}

export function getSubServiceWhyPoints(subServiceName: string): WhyPoint[] {
  return [
    {
      title: "Senior specialists, not juniors",
      description: `Dedicated senior engineers work on your ${subServiceName} project from day one — no learning on your dime.`,
      icon: whyIcons.Users,
    },
    {
      title: "Built around your business",
      description: `No generic templates — every ${subServiceName} solution is engineered around your specific requirements and goals.`,
      icon: whyIcons.Target,
    },
    {
      title: "Transparent process",
      description: `Regular updates, clear timelines, and direct access to the team building your ${subServiceName} solution.`,
      icon: whyIcons.ShieldCheck,
    },
  ];
}

export function getSubServiceFAQs(subServiceName: string): FAQItem[] {
  return [
    {
      question: `How long does a ${subServiceName} project take?`,
      answer: `Timelines vary by scope, but most ${subServiceName} projects run 4-10 weeks. We'll give you a firm estimate after a short discovery call.`,
    },
    {
      question: `What's included in ${subServiceName} pricing?`,
      answer: `Every quote covers design, development, testing, and launch support — no hidden fees for "extras" that should be standard.`,
    },
    {
      question: `Do you offer post-launch support for ${subServiceName}?`,
      answer: `Yes — every project includes a warranty period for fixes, plus optional retainers for ongoing updates and new features.`,
    },
    {
      question: "Can you work with our existing team?",
      answer:
        "Absolutely. We regularly work alongside in-house teams, slotting in wherever we add the most value — from full ownership to targeted support.",
    },
  ];
}
