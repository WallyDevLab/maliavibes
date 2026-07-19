import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MusicListing from "@/components/music/MusicListing";
import { releases } from "@/lib/data/releases";

export const metadata: Metadata = {
  title: "Music",
  description: "Albums, EPs, singles, and collaborations from Malia.",
};

export default function MusicPage() {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Discography"
          title="Music"
          description="Every album, EP, single, and collaboration, newest first."
        />
        <div className="mt-12">
          <MusicListing releases={releases} />
        </div>
      </Container>
    </div>
  );
}
