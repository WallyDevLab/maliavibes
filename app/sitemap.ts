import type { MetadataRoute } from "next";
import { releases } from "@/lib/data/releases";
import { posts } from "@/lib/data/posts";

const siteUrl = "https://www.maliamusic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/music",
    "/gallery",
    "/tours",
    "/about",
    "/news",
    "/shop",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const releaseRoutes = releases.map((release) => ({
    url: `${siteUrl}/music/${release.slug}`,
    lastModified: release.releaseDate,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [...staticRoutes, ...releaseRoutes, ...postRoutes];
}
