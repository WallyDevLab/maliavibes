import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryExplorer from "@/components/gallery/GalleryExplorer";
import { galleryItems } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from Malia: music videos, live shows, and behind the scenes.",
};

export default function GalleryPage() {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Visuals"
          title="Gallery"
          description="Music videos, live performances, tour photos, and behind the scenes moments."
        />
        <div className="mt-12">
          <GalleryExplorer items={galleryItems} />
        </div>
      </Container>
    </div>
  );
}
