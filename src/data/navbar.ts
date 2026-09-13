import type { ComponentType } from "react";
import rawData from "./navbar.json";
import { services } from "./services";
import { navIcons } from "./navIcons";
import { resolveIcon } from "./resolveIcon";

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

export interface NavCategoryItem {
  name: string;
  href: string;
  icon: IconComponent;
}

export interface NavCategory {
  label: string;
  icon: IconComponent;
  items: NavCategoryItem[];
}

export interface NavImageItem {
  name: string;
  href: string;
  icon: IconComponent;
  image: string | null;
}

export type NavMegaMenu =
  | { type: "categories"; categories: NavCategory[] }
  | { type: "imageList"; menuLabel: string; items: NavImageItem[] };

export interface NavDropdownItem {
  name: string;
  href: string;
  icon: IconComponent;
}

export interface NavItem {
  key: string;
  label: string;
  href: string;
  megaMenu?: NavMegaMenu;
  dropdown?: NavDropdownItem[];
}

interface RawCategoryItem {
  serviceSlug: string;
  subServiceSlug?: string;
  labelOverride?: string;
}

interface RawCategory {
  label: string;
  icon: string;
  items: RawCategoryItem[];
}

interface RawImageItem {
  name: string;
  href: string;
  icon: string;
  image: string | null;
}

interface RawDropdownItem {
  name: string;
  href: string;
  icon: string;
}

interface RawNavItem {
  key: string;
  label: string;
  href: string;
  enabled: boolean;
  megaMenu?:
    | { type: "categories"; categories: RawCategory[] }
    | { type: "imageList"; menuLabel: string; items: RawImageItem[] };
  dropdown?: RawDropdownItem[];
}

function resolveCategoryItem(item: RawCategoryItem): NavCategoryItem {
  const service = services.find((s) => s.slug === item.serviceSlug);
  if (!service) {
    throw new Error(`Unknown service slug "${item.serviceSlug}" in navbar.json`);
  }

  if (item.subServiceSlug) {
    const subService = service.subServices.find((s) => s.slug === item.subServiceSlug);
    if (!subService) {
      throw new Error(`Unknown sub-service slug "${item.subServiceSlug}" under "${item.serviceSlug}" in navbar.json`);
    }
    return {
      name: item.labelOverride ?? subService.name,
      href: `/${service.slug}/${subService.slug}`,
      icon: subService.icon,
    };
  }

  return {
    name: item.labelOverride ?? service.name,
    href: `/${service.slug}`,
    icon: service.icon,
  };
}

/**
 * navbar.json is the actual data source — plain, serializable content with
 * no code in it, so it's a straightforward drop-in swap for a real admin
 * API response later (the same pattern used by services.json/ts). Which
 * item is visible, its order in the menu, and mega-menu grouping are all
 * controlled here — toggle `enabled` to hide/show a tab without deleting it.
 */
export const navItems: NavItem[] = (rawData.navItems as RawNavItem[])
  .filter((item) => item.enabled)
  .map((item) => {
    const resolved: NavItem = {
      key: item.key,
      label: item.label,
      href: item.href,
    };

    if (item.megaMenu) {
      if (item.megaMenu.type === "categories") {
        resolved.megaMenu = {
          type: "categories",
          categories: item.megaMenu.categories.map((category) => ({
            label: category.label,
            icon: resolveIcon(navIcons, category.icon, "navbar.json", "navIcons.ts"),
            items: category.items.map(resolveCategoryItem),
          })),
        };
      } else {
        resolved.megaMenu = {
          type: "imageList",
          menuLabel: item.megaMenu.menuLabel,
          items: item.megaMenu.items.map((menuItem) => ({
            name: menuItem.name,
            href: menuItem.href,
            icon: resolveIcon(navIcons, menuItem.icon, "navbar.json", "navIcons.ts"),
            image: menuItem.image,
          })),
        };
      }
    }

    if (item.dropdown) {
      resolved.dropdown = item.dropdown.map((dropItem) => ({
        name: dropItem.name,
        href: dropItem.href,
        icon: resolveIcon(navIcons, dropItem.icon, "navbar.json", "navIcons.ts"),
      }));
    }

    return resolved;
  });
