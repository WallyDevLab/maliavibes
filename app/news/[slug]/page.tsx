import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Artwork from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import { posts, getPostBySlug } from "@/lib/data/posts";
import { formatReleaseDate } from "@/lib/format";

type Params = Promise<{ slug: string }>;

const CATEGORY_LABEL: Record<string, string> = {
  release: "Release",
  tour: "Tour",
  behindTheScenes: "Behind the scenes",
  collaboration: "Collaboration",
  press: "Press",
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="py-24 md:py-32">
      <Container className="max-w-3xl">
        <Button href="/news" variant="ghost" className="!px-0 !py-0">
          &larr; All news
        </Button>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-flare">
          {CATEGORY_LABEL[post.category]} &middot; {formatReleaseDate(post.publishedAt)}
        </p>
        <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">{post.title}</h1>

        <Artwork
          palette={post.coverPalette}
          label={post.title}
          aspect="aspect-[16/9]"
          className="mt-10 rounded-sm"
        />

        <div className="mt-10 space-y-6">
          {post.body.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-parchment/90">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </article>
  );
}
