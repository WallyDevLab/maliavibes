import Hero from "@/components/home/Hero";
import FeaturedRelease from "@/components/home/FeaturedRelease";
import TourTeaser from "@/components/home/TourTeaser";
import GalleryPreview from "@/components/home/GalleryPreview";
import PullQuote from "@/components/home/PullQuote";
import NewsPreview from "@/components/home/NewsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedRelease />
      <TourTeaser />
      <GalleryPreview />
      <PullQuote />
      <NewsPreview />
    </>
  );
}
