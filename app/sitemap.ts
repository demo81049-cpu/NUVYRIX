import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const publicPages = [
  { path: "/", priority: 1 },
  { path: "/kolkata-web-development", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/portfolio", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
