import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Artwork from "@/components/ui/Artwork";
import Reveal from "@/components/ui/Reveal";
import { artist } from "@/lib/data/artist";

export const metadata: Metadata = {
  title: "About",
  description: `The story of ${artist.name}: musical journey, influences, and milestones.`,
};

export default function AboutPage() {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:items-start">
          <Reveal>
            <Artwork
              palette={["#3a3f2c", "#e3a857"]}
              label={`${artist.name}, portrait`}
              aspect="aspect-[4/5]"
              className="rounded-sm shadow-2xl shadow-black/40"
            />
          </Reveal>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-flare mb-3">About</p>
            <h1 className="font-display text-4xl text-parchment md:text-5xl">{artist.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-parchment/90">{artist.shortBio}</p>

            <div className="mt-8 space-y-5 max-w-2xl">
              {artist.longBio.map((paragraph, index) => (
                <p key={index} className="text-parchment-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl text-parchment">Influences</h2>
            <ul className="mt-5 space-y-3">
              {artist.influences.map((influence) => (
                <li key={influence} className="text-parchment-muted">
                  {influence}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={100}>
            <h2 className="font-display text-2xl text-parchment">Awards & recognition</h2>
            <ul className="mt-5 space-y-3">
              {artist.awards.map((award) => (
                <li key={award} className="text-parchment-muted">
                  {award}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-2xl text-parchment">Career milestones</h2>
          <ol className="mt-8 border-l border-parchment-muted/20">
            {artist.milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delayMs={index * 80}>
                <li className="relative pb-10 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-flare" />
                  <span className="font-mono text-sm text-flare">{milestone.year}</span>
                  <h3 className="mt-1 font-display text-xl text-parchment">{milestone.title}</h3>
                  <p className="mt-1 max-w-xl text-parchment-muted">{milestone.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
}
