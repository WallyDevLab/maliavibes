import Container from "@/components/ui/Container";
import SunFlare from "@/components/ui/SunFlare";
import Reveal from "@/components/ui/Reveal";

export default function PullQuote() {
  return (
    <section className="relative bg-ink-soft py-28 md:py-36">
      <SunFlare size="divider" className="mb-16" />
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-signature italic text-4xl leading-snug text-parchment md:text-5xl">
            &ldquo;Nothing goes on the record unless it&rsquo;s true.&rdquo;
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-parchment-muted">
            On writing If I&rsquo;m Being Honest
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
