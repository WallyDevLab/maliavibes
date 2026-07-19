import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Artwork from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Tracklist from "@/components/music/Tracklist";
import StreamingLinks from "@/components/music/StreamingLinks";
import { releases, getReleaseBySlug } from "@/lib/data/releases";
import { formatReleaseDate } from "@/lib/format";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};
  return {
    title: release.title,
    description: release.description,
    openGraph: { title: release.title, description: release.description },
  };
}

export default async function ReleasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) notFound();

  return (
    <div className="py-24 md:py-32">
      <Container>
        <Button href="/music" variant="ghost" className="!px-0 !py-0">
          &larr; All releases
        </Button>

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,22rem)_1fr]">
          <div>
            <Artwork
              palette={release.coverPalette}
              label={`${release.title} cover artwork`}
              className="rounded-sm shadow-2xl shadow-black/40"
            />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted">
              Released {formatReleaseDate(release.releaseDate)}
            </p>
            <div className="mt-6">
              <StreamingLinks links={release.streamingLinks} />
            </div>
          </div>

          <div>
            <h1 className="font-display text-4xl text-parchment md:text-5xl">{release.title}</h1>
            <p className="mt-4 max-w-2xl text-parchment/90 leading-relaxed">{release.description}</p>

            <h2 className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted">
              Tracklist
            </h2>
            <div className="mt-4">
              <Tracklist tracks={release.tracklist} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
