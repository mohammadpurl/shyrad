import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import {
  getAllIndustrySlugs,
  getAllMaterialPaths,
} from "@/lib/industries-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/industries",
    "/products",
    "/global-supply",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const industryPages = getAllIndustrySlugs().map((slug) => ({
    url: `${SITE.url}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const materialPages = getAllMaterialPaths().map(({ industry, material }) => ({
    url: `${SITE.url}/industries/${industry}/${material}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...industryPages, ...materialPages, ...blogPages];
}
