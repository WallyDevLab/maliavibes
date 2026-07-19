import Link from "next/link";
import Artwork from "@/components/ui/Artwork";
import { formatShortDate } from "@/lib/format";
import type { Post } from "@/lib/types";

const CATEGORY_LABEL: Record<Post["category"], string> = {
  release: "Release",
  tour: "Tour",
  behindTheScenes: "Behind the scenes",
  collaboration: "Collaboration",
  press: "Press",
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <Artwork
        palette={post.coverPalette}
        label={post.title}
        aspect="aspect-[4/3]"
        className="rounded-sm"
      />
      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-flare">
          {CATEGORY_LABEL[post.category]}
        </span>
        <span className="text-xs text-parchment-muted">{formatShortDate(post.publishedAt)}</span>
      </div>
      <h3 className="mt-2 font-display text-xl text-parchment group-hover:text-flare transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-parchment-muted line-clamp-2">{post.excerpt}</p>
    </Link>
  );
}
