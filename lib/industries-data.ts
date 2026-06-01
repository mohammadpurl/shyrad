export type Material = {
  slug: string;
  title: string;
  description: string;
  image: string;
  specs?: string[];
};

export type Industry = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  icon: "layers" | "droplets" | "palette" | "utensils" | "scan" | "battery";
  materialSlugs: string[];
};

export const MATERIALS: Record<string, Material> = {
  "rare-earth-metals": {
    slug: "rare-earth-metals",
    title: "فلزات کمیاب خاکی",
    description:
      "فلزات کمیاب خاکی (REE) در صنایع پیشرفته سرامیک، شیشه و باطری برای بهبود خواص مغناطیسی، حرارتی و رنگ‌دهی کاربرد دارند. شایراد تجارت پارس این مواد را با آنالیز دقیق و گواهی کیفیت از تأمین‌کنندگان معتبر بین‌المللی وارد می‌کند.",
    image: "/images/Rare metals.png",
    specs: ["خلوص بالا", "گواهی آنالیز", "بسته‌بندی صنعتی"],
  },
  "cobalt-oxide": {
    slug: "cobalt-oxide",
    title: "اکسید کبالت",
    description:
      "اکسید کبالت یکی از مهم‌ترین رنگ‌دهنده‌ها و ماده اولیه در تولید لعاب، سرامیک و کاتالیست است. این ماده پایداری حرارتی و شدت رنگ آبی-سبز را در محصولات نهایی تضمین می‌کند.",
    image: "/images/Cobalt oxide.png",
    specs: ["درصد Co ثابت", "یکنواختی ذرات", "مناسب لعاب صنعتی"],
  },
  "alumina-oxide-gamma-metal": {
    slug: "alumina-oxide-gamma-metal",
    title: "اکسید آلومینا (گاما گرید - متال گرید)",
    description:
      "اکسید آلومینا با گریدهای گاما و متال برای افزایش سختی، مقاومت سایشی و پایداری حرارتی در بدنه سرامیک، لعاب و صنایع شیشه استفاده می‌شود.",
    image: "/images/Alumina oxide.png",
    specs: ["گاما گرید", "متال گرید", "دانسیته کنترل‌شده"],
  },
  "kaolin-akw": {
    slug: "kaolin-akw",
    title: "کائولن AKW",
    description:
      "کائولن AKW با خلوص بالا و دانه‌بندی استاندارد، برای بدنه کاشی، سرامیک و چینی بهداشتی انتخابی ایده‌آل است. این ماده پلاستیسیته و استحکام خمیر را بهبود می‌دهد.",
    image: "/images/Kaolin-AKW.png",
    specs: ["برند AKW", "خلوص بالا", "دانه‌بندی یکنواخت"],
  },
  "zirconium-silicate-micron": {
    slug: "zirconium-silicate-micron",
    title: "سیلیکات زیکونیوم (۱، ۴، ۵، ۴۵ میکرون)",
    description:
      "سیلیکات زیکونیوم با مش‌های ۱، ۴، ۵ و ۴۵ میکرون برای کنترل انقباض لعاب، کدورت و سفیدی در سرامیک و کاشی کاربرد دارد. انتخاب مش مناسب بر اساس نوع لعاب و خط تولید انجام می‌شود.",
    image: "/images/Zirconium silicate1.png",
    specs: ["مش ۱ میکرون", "مش ۴ میکرون", "مش ۵ میکرون", "مش ۴۵ میکرون"],
  },
  "kaolin-oka": {
    slug: "kaolin-oka",
    title: "کائولن OKA",
    description:
      "کائولن OKA یکی از پرکاربردترین مواد اولیه در صنایع سرامیک، بهداشتی و لعاب است. این محصول با کیفیت پایدار، برای تولید بدنه‌های با استحکام بالا توصیه می‌شود.",
    image: "/images/OKA.png",
    specs: ["برند OKA", "پلاستیسیته مناسب", "آلودگی کم"],
  },
  "zirconium-silicate-325": {
    slug: "zirconium-silicate-325",
    title: "سیلیکات زیکونیوم #325",
    description:
      "سیلیکات زیکونیوم مش ۳۲۵ برای لعاب‌های صنعتی، کاشی و ظروف چینی استفاده می‌شود. این ماده به بهبود پوشش‌دهی، سفیدی و مقاومت حرارتی لعاب کمک می‌کند.",
    image: "/images/Zirconium silicate.png",
    specs: ["مش #325", "سفیدی بالا", "پایداری حرارتی"],
  },
  "boric-acid": {
    slug: "boric-acid",
    title: "اسید بوریک",
    description:
      "اسید بوریک در تولید شیشه، لعاب و سرامیک به عنوان فلوکس و تأمین‌کننده بور عمل می‌کند. این ماده به کاهش نقطه ذوب و بهبود خواص شیمیایی محصول نهایی کمک می‌کند.",
    image: "/images/Boric acid.png",
    specs: ["خلوص صنعتی", "حل‌پذیری مناسب", "بسته‌بندی ایمن"],
  },
  "calcined-alumina-alpha": {
    slug: "calcined-alumina-alpha",
    title: "کلسایند آلومینا گرید آلفا",
    description:
      "کلسایند آلومینا گرید آلفا با ساختار بلورین پایدار، برای افزایش مقاومت مکانیکی و حرارتی در بدنه سرامیک و کاشی به کار می‌رود.",
    image: "/images/AlominaAlpha.png",
    specs: ["گرید آلفا", "کلساین شده", "دانسیته بالا"],
  },
  "cobalt-hydroxide": {
    slug: "cobalt-hydroxide",
    title: "هیدروکسید کبالت",
    description:
      "هیدروکسید کبالت ماده اولیه کلیدی در صنایع باطری، رنگ‌دهی سرامیک و تولید اکسید کبالت است. کیفیت و خلوص این ماده بر عملکرد کاتالیتیک و الکتروشیمیایی محصولات تأثیر مستقیم دارد.",
    image: "/images/Cobalt hydroxide.png",
    specs: ["خلوص Co بالا", "مناسب باطری", "یکنواخت"],
  },
  "titanium-oxide": {
    slug: "titanium-oxide",
    title: "اکسید تیتانیوم",
    description:
      "اکسید تیتانیوم (TiO₂) رنگدانه و ماده مؤثر در کدورت، پوشش‌دهی و پایداری UV لعاب‌های صنعتی است. در لعاب‌سازی برای سفیدی و مات‌کنندگی کاربرد گسترده دارد.",
    image: "/images/Titanium oxide.png",
    specs: ["Rutile/Anatase", "کدورت بالا", "پایداری UV"],
  },
  "tin-ingot": {
    slug: "tin-ingot",
    title: "شمش قلع",
    description:
      "شمش قلع با خلوص بالا برای صنایع باطری‌سازی، آلیاژسازی و کاربردهای الکترونیکی تأمین می‌شود. شایراد تجارت پارس استانداردهای بین‌المللی را در تأمین این فلز رعایت می‌کند.",
    image: "/images/Tin ingot.png",
    specs: ["خلوص ۹۹٪+", "شمش استاندارد", "مناسب باطری"],
  },
};

export const INDUSTRIES_DATA: Industry[] = [
  {
    slug: "ceramic-tile",
    title: "صنعت کاشی و سرامیک",
    shortTitle: "کاشی و سرامیک",
    description:
      "تأمین مواد اولیه تخصصی برای خطوط تولید کاشی و سرامیک با استانداردهای صادراتی.",
    image: "/images/tile.png",
    icon: "layers",
    materialSlugs: [
      "rare-earth-metals",
      "cobalt-oxide",
      "alumina-oxide-gamma-metal",
      "kaolin-akw",
      "zirconium-silicate-micron",
      "kaolin-oka",
      "zirconium-silicate-325",
      "boric-acid",
      "calcined-alumina-alpha",
    ],
  },
  {
    slug: "sanitary-ware",
    title: "صنایع چینی بهداشتی",
    shortTitle: "چینی بهداشتی",
    description:
      "مواد اولیه با کیفیت برای تولید سرویس‌های بهداشتی و چینی با درجه ممتاز.",
    image: "/images/Sanitary ware.png",
    icon: "droplets",
    materialSlugs: [
      "rare-earth-metals",
      "cobalt-hydroxide",
      "cobalt-oxide",
      "kaolin-oka",
      "zirconium-silicate-325",
    ],
  },
  {
    slug: "glaze",
    title: "صنعت لعاب‌سازی",
    shortTitle: "لعاب",
    description:
      "لعاب‌ها، رنگدانه‌ها و افزودنی‌های تخصصی برای پوشش‌دهی سرامیک و شیشه.",
    image: "/images/Glazing.png",
    icon: "palette",
    materialSlugs: [
      "rare-earth-metals",
      "cobalt-oxide",
      "titanium-oxide",
      "kaolin-oka",
      "kaolin-akw",
      "zirconium-silicate-325",
      "boric-acid",
    ],
  },
  {
    slug: "tableware",
    title: "صنایع چینی ظروف و بلور",
    shortTitle: "ظروف و بلور",
    description:
      "مواد اولیه برای تولید ظروف چینی، بلور و محصولات با کیفیت صادراتی.",
    image: "/images/Crystal.png",
    icon: "utensils",
    materialSlugs: [
      "rare-earth-metals",
      "cobalt-oxide",
      "cobalt-hydroxide",
      "kaolin-oka",
      "zirconium-silicate-325",
    ],
  },
  {
    slug: "glass",
    title: "صنعت شیشه",
    shortTitle: "شیشه",
    description:
      "سیلیس، فلوکس‌ها و مواد کمکی برای خطوط تولید شیشه مسطح و ظرف.",
    image: "/images/Glass.png",
    icon: "scan",
    materialSlugs: [
      "rare-earth-metals",
      "cobalt-hydroxide",
      "cobalt-oxide",
      "kaolin-oka",
      "boric-acid",
      "alumina-oxide-gamma-metal",
    ],
  },
  {
    slug: "battery",
    title: "صنایع باطری‌سازی",
    shortTitle: "باطری",
    description:
      "مواد اولیه تخصصی برای صنایع باطری‌سازی و ذخیره‌سازی انرژی.",
    image: "/images/Rare metals.png",
    icon: "battery",
    materialSlugs: [
      "rare-earth-metals",
      "cobalt-hydroxide",
      "cobalt-oxide",
      "tin-ingot",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES_DATA.find((i) => i.slug === slug);
}

export function getMaterialBySlug(slug: string): Material | undefined {
  return MATERIALS[slug];
}

export function getIndustryMaterials(slug: string): Material[] {
  const industry = getIndustryBySlug(slug);
  if (!industry) return [];
  return industry.materialSlugs
    .map((s) => MATERIALS[s])
    .filter((m): m is Material => Boolean(m));
}

export function getAllIndustrySlugs(): string[] {
  return INDUSTRIES_DATA.map((i) => i.slug);
}

export function getAllMaterialPaths(): { industry: string; material: string }[] {
  return INDUSTRIES_DATA.flatMap((industry) =>
    industry.materialSlugs.map((material) => ({
      industry: industry.slug,
      material,
    }))
  );
}

export function isMaterialInIndustry(
  industrySlug: string,
  materialSlug: string
): boolean {
  const industry = getIndustryBySlug(industrySlug);
  return industry?.materialSlugs.includes(materialSlug) ?? false;
}

export function getMaterialPageHref(materialSlug: string): string | undefined {
  for (const industry of INDUSTRIES_DATA) {
    if (industry.materialSlugs.includes(materialSlug)) {
      return `/industries/${industry.slug}/${materialSlug}`;
    }
  }
  return undefined;
}

export function getMarqueeMaterials(): { title: string; href: string }[] {
  return Object.values(MATERIALS).map((material) => ({
    title: material.title,
    href: getMaterialPageHref(material.slug) ?? `/industries`,
  }));
}

// Re-export for backward compatibility with constants
export const INDUSTRIES = INDUSTRIES_DATA.map(
  ({ materialSlugs: _, ...rest }) => rest
);
