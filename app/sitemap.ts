import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: CONFIG.siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
