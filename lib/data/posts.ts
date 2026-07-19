import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    id: "p1",
    slug: "on-writing-if-im-being-honest",
    title: "On writing If I'm Being Honest",
    category: "release",
    publishedAt: "2025-09-10",
    excerpt: "Some notes on the rule that shaped the whole record: nothing goes on unless it's true.",
    body: [
      "I wrote most of this record in the back of a van, which sounds more romantic than it was. Mostly it was cold, and quiet, and exactly what I needed.",
      "The rule was simple and it never changed. If a line felt like something I'd say to sound good rather than something I'd actually say, it got cut. That killed a lot of good lines. It also made the ones that stayed mean something.",
      "Thank you for listening to it the way it was meant to be heard, start to finish, in one sitting, with nowhere else to be.",
    ],
    coverPalette: ["#3a3f2c", "#e3a857"],
  },
  {
    id: "p2",
    slug: "first-headline-tour-announced",
    title: "First headline tour, announced",
    category: "tour",
    publishedAt: "2026-06-02",
    excerpt: "Nine cities across North America and Europe, starting in September.",
    body: [
      "This is the tour I've been holding onto news about for months, and I'm glad I finally get to say it out loud: I'm heading out on my first headline run this fall.",
      "Tickets go on sale in phases, city by city. Newsletter subscribers get first access, twenty four hours ahead of the general on sale.",
    ],
    coverPalette: ["#4c6b85", "#f3eee1"],
  },
  {
    id: "p3",
    slug: "recording-slow-weather",
    title: "How \"Slow Weather\" happened",
    category: "collaboration",
    publishedAt: "2024-11-06",
    excerpt: "A rained-out tour stop, a borrowed studio, and one very fast afternoon with Theo Marsh.",
    body: [
      "We had a show cancelled because of weather, which is usually just a bad night. Instead we ended up in a studio down the street with nothing to do but write.",
      "\"Slow Weather\" came out of that afternoon almost exactly as you hear it now. We kept the rough edges on purpose.",
    ],
    coverPalette: ["#4c6b85", "#a9a28e"],
  },
  {
    id: "p4",
    slug: "behind-the-cover-shoot",
    title: "Behind the cover shoot",
    category: "behindTheScenes",
    publishedAt: "2025-08-15",
    excerpt: "The stool, the tree line, and a single hour of usable light.",
    body: [
      "We shot the cover in one evening, chasing a very specific hour of light through a stand of trees behind the studio.",
      "The stool wasn't a prop originally, it was just what was sitting outside. It ended up being the whole shot.",
    ],
    coverPalette: ["#3a3f2c", "#e3a857"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
