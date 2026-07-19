import SunFlare from "@/components/ui/SunFlare";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { artist } from "@/lib/data/artist";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
      <SunFlare size="hero" />
      <Container className="relative z-10 pb-20 pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-flare mb-6">
          Out now &middot; If I&rsquo;m Being Honest
        </p>
        <h1 className="font-signature italic text-6xl leading-[0.95] text-parchment sm:text-7xl md:text-8xl">
          {artist.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-parchment/85 md:text-xl text-balance">
          {artist.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/music">Listen Now</Button>
          <Button href="/tours" variant="secondary">
            Upcoming Tour
          </Button>
          <Button href="/shop" variant="ghost">
            Shop
          </Button>
        </div>
      </Container>
    </section>
  );
}
