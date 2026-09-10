import rawData from "./cookieConsent.json";

export interface CookieItem {
  name: string;
  provider: string;
  purpose: string;
}

export interface CookieCategory {
  key: string;
  title: string;
  description: string;
  alwaysActive: boolean;
  cookies?: CookieItem[];
}

export interface CookieBanner {
  title: string;
  description: string;
  learnMoreLabel: string;
  learnMoreHref: string;
}

export interface CookieModal {
  title: string;
  description: string;
}

/**
 * cookieConsent.json is the actual data source — banner copy, modal copy,
 * and the list of cookie categories are all plain content here, so adding,
 * removing, or renaming a category (or editing any wording) needs no code
 * change (same drop-in-for-a-future-admin-API pattern used across this
 * project).
 */
export const cookieBanner: CookieBanner = rawData.banner;
export const cookieModal: CookieModal = rawData.modal;
export const cookieCategories: CookieCategory[] = rawData.categories;
