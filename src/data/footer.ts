import type { ComponentType } from "react";
import rawData from "./footer.json";
import { navItems } from "./navbar";
import { services } from "./services";
import { footerIcons } from "./footerIcons";
import { resolveIcon } from "./resolveIcon";

type IconComponent = ComponentType;

export interface FooterContact {
  addressLines: string[];
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  name: string;
  href: string;
  Icon: IconComponent;
}

interface RawSocial {
  name: string;
  icon: string;
  href: string;
  enabled: boolean;
}

/**
 * footer.json holds the footer's own copy (brand blurb, contact details,
 * socials, legal links) — plain, serializable content with no code in it,
 * the same drop-in-for-a-future-admin-API pattern used across this project.
 * The link columns below are instead derived live from navbar.ts/services.ts
 * so the footer can never drift out of sync with what's actually enabled.
 */
export const brandDescription: string = rawData.brandDescription;
export const contact: FooterContact = rawData.contact;
export const legalLinks: FooterLink[] = rawData.legalLinks;

export const socials: FooterSocial[] = (rawData.socials as RawSocial[])
  .filter((social) => social.enabled)
  .map((social) => ({
    name: social.name,
    href: social.href,
    Icon: resolveIcon(footerIcons, social.icon, "footer.json", "footerIcons.tsx"),
  }));

/**
 * Mirrors navbar.json's enabled top-level tabs (minus "Services", which
 * gets its own two columns below) — disabling a tab in the navbar (e.g.
 * Products) hides it from the footer automatically too.
 */
export const companyLinks: FooterLink[] = navItems
  .filter((item) => item.key !== "services")
  .map((item) => ({ label: item.label, href: item.href }));

/**
 * Split services.json's service list into two columns so the footer always
 * lists every current service — adding or removing one in services.json
 * needs no footer edit.
 */
const midpoint = Math.ceil(services.length / 2);
export const serviceColumns: [FooterLink[], FooterLink[]] = [
  services.slice(0, midpoint).map((service) => ({ label: service.name, href: `/${service.slug}` })),
  services.slice(midpoint).map((service) => ({ label: service.name, href: `/${service.slug}` })),
];
