import type { GalleryItem } from "@/lib/types";

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "If I'm Being Honest, cover session",
    mediaType: "photo",
    palette: ["#3a3f2c", "#e3a857"],
    caption: "From the album cover shoot, golden hour, out past the tree line.",
    credit: "Photography by Nadia Reyes",
  },
  {
    id: "g2",
    title: "Ledger Lines, official video",
    mediaType: "video",
    palette: ["#201c15", "#e3a857"],
    youtubeId: "dQw4w9WgXcQ",
    caption: "Official music video for \"Ledger Lines.\"",
  },
  {
    id: "g3",
    title: "Live at the Fillmore",
    mediaType: "live",
    palette: ["#16140f", "#c98a3e"],
    caption: "Opening night of the If I'm Being Honest run.",
    credit: "Photography by Marcus Webb",
  },
  {
    id: "g4",
    title: "Studio, take fourteen",
    mediaType: "behindTheScenes",
    palette: ["#2a251b", "#a9a28e"],
    caption: "Recording \"Say It Plain\" live to tape with Theo Marsh.",
  },
  {
    id: "g5",
    title: "Denim and Regret, live session",
    mediaType: "video",
    palette: ["#4c6b85", "#f3eee1"],
    youtubeId: "dQw4w9WgXcQ",
    caption: "Stripped-down live session, recorded in one take.",
  },
  {
    id: "g6",
    title: "Soundcheck, Chicago",
    mediaType: "behindTheScenes",
    palette: ["#201c15", "#545c42"],
    caption: "Afternoon soundcheck before the Chicago show.",
  },
  {
    id: "g7",
    title: "Portrait, spring 2026",
    mediaType: "photo",
    palette: ["#3a3f2c", "#f3eee1"],
    credit: "Photography by Nadia Reyes",
  },
  {
    id: "g8",
    title: "Crowd, Austin",
    mediaType: "live",
    palette: ["#16140f", "#e3a857"],
    caption: "The room singing back \"If I'm Being Honest\" in Austin.",
    credit: "Photography by Marcus Webb",
  },
  {
    id: "g9",
    title: "Slow Weather, behind the scenes",
    mediaType: "behindTheScenes",
    palette: ["#4c6b85", "#a9a28e"],
    caption: "Writing session with Theo Marsh, rained-out tour stop.",
  },
];

export function getGalleryItemsByType(type: string) {
  if (type === "all") return galleryItems;
  return galleryItems.filter((item) => item.mediaType === type);
}
