import {
  INDUSTRIES_DATA,
  getIndustryMaterials,
  type Industry,
} from "./industries-data";

export type HeroIndustryMaterial = {
  slug: string;
  title: string;
  href: string;
};

export type HeroIndustry = {
  slug: string;
  name: string;
  shortTitle: string;
  product: string;
  description: string;
  image: string;
  icon: Industry["icon"];
  href: string;
  materials: HeroIndustryMaterial[];
};

/** Orbital display order in IndustriesHero (clockwise from top) */
export const HERO_INDUSTRY_SLUG_ORDER = [
  "glass",
  "glaze",
  "sanitary-ware",
  "tableware",
  "battery",
  "ceramic-tile",
] as const;

function buildHeroIndustry(slug: string): HeroIndustry | undefined {
  const industry = INDUSTRIES_DATA.find((i) => i.slug === slug);
  if (!industry) return undefined;

  const materials = getIndustryMaterials(slug).map((material) => ({
    slug: material.slug,
    title: material.title,
    href: `/industries/${slug}/${material.slug}`,
  }));

  return {
    slug: industry.slug,
    name: industry.title,
    shortTitle: industry.shortTitle,
    product: `مواد اولیه ${industry.shortTitle}`,
    description: industry.description,
    image: industry.image,
    icon: industry.icon,
    href: `/industries/${slug}`,
    materials,
  };
}

export function getHeroIndustries(): HeroIndustry[] {
  return HERO_INDUSTRY_SLUG_ORDER.map((slug) => buildHeroIndustry(slug)).filter(
    (industry): industry is HeroIndustry => Boolean(industry)
  );
}

export function getHeroIndustryBySlug(slug: string): HeroIndustry | undefined {
  return buildHeroIndustry(slug);
}

export const HERO_INDUSTRIES = getHeroIndustries();

export const HERO_UNIQUE_MATERIAL_COUNT = new Set(
  HERO_INDUSTRIES.flatMap((industry) =>
    industry.materials.map((material) => material.slug)
  )
).size;
