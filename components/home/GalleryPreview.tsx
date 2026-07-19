import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Artwork from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { galleryItems } from "@/lib/data/gallery";

export default function GalleryPreview() {
  const items = galleryItems.slice(0, 4);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="In pictures" title="Gallery">
          <Button href="/gallery" variant="secondary">
            View full gallery
          </Button>
        </SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 70}>
              <Artwork
                palette={item.palette}
                label={item.title}
                className="rounded-sm transition-transform duration-300 hover:scale-[1.02]"
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 md:hidden">
          <Button href="/gallery" variant="secondary" className="w-full">
            View full gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
