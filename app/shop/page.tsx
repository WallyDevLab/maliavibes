import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import SunFlare from "@/components/ui/SunFlare";

export const metadata: Metadata = {
  title: "Shop",
  description: "Merch, vinyl, and tickets from Malia. Opening soon.",
};

export default function ShopPage() {
  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <SunFlare size="hero" className="opacity-60" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Shop"
          title="Merch and vinyl are on the way"
          description="This section is being built on top of a real store, not a mock cart, so orders, shipping, and stock actually work on day one. In the meantime, here's where to go instead."
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/music">Listen to the music</Button>
          <Button href="/tours" variant="secondary">
            See tour dates
          </Button>
        </div>
        <p className="mt-10 max-w-xl text-sm text-parchment-muted">
          Want first access when the shop opens? Join the newsletter in the footer below.
        </p>
      </Container>
    </div>
  );
}
