import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Artwork from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { posts } from "@/lib/data/posts";
import { formatShortDate } from "@/lib/format";

export default function NewsPreview() {
  const latest = [...posts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 3);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Latest" title="News and updates">
          <Button href="/news" variant="secondary">
            All updates
          </Button>
        </SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {latest.map((post, index) => (
            <Reveal key={post.id} delayMs={index * 90}>
              <Link href={`/news/${post.slug}`} className="group block">
                <Artwork
                  palette={post.coverPalette}
                  label={post.title}
                  aspect="aspect-[4/3]"
                  className="rounded-sm"
                />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted">
                  {formatShortDate(post.publishedAt)}
                </p>
                <h3 className="mt-2 font-display text-xl text-parchment group-hover:text-flare transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-parchment-muted line-clamp-2">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
