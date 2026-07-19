import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Artwork from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedRelease } from "@/lib/data/releases";
import { formatReleaseDate } from "@/lib/format";

export default function FeaturedRelease() {
  const release = getFeaturedRelease();

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Featured release" title={release.title} />
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <Artwork
              palette={release.coverPalette}
              label={`${release.title} cover artwork`}
              className="rounded-sm shadow-2xl shadow-black/40"
            />
          </Reveal>
          <Reveal delayMs={120}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted">
              {formatReleaseDate(release.releaseDate)} &middot; {release.tracklist.length} tracks
            </p>
            <p className="mt-5 text-parchment/90 text-base md:text-lg leading-relaxed">
              {release.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`/music/${release.slug}`}>View album</Button>
              <Button href="/music" variant="secondary">
                All releases
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
