import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PostCard from "@/components/news/PostCard";
import { posts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "News",
  description: "Release news, tour announcements, and behind the scenes updates from Malia.",
};

export default function NewsPage() {
  const sorted = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Updates"
          title="News"
          description="New releases, tour announcements, behind the scenes stories, and press."
        />
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
