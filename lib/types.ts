/**
 * Shared content types for the site.
 *
 * These shapes are deliberately written to mirror what a Directus collection
 * would return (flat fields, an `id`, a `slug`, ISO date strings). Phase 1
 * reads this data from the static files in lib/data. Phase 2 swaps those
 * files for calls to a Directus SDK client with no change to the components
 * that consume these types, since the shape stays the same.
 */

export type ReleaseType = "album" | "ep" | "single" | "collaboration";

export interface Track {
  id: string;
  title: string;
  durationSeconds: number;
  lyrics?: string;
  previewUrl?: string;
  featuring?: string;
}

export interface StreamingLink {
  platform: "spotify" | "appleMusic" | "youtubeMusic" | "soundcloud" | "bandcamp";
  url: string;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  type: ReleaseType;
  releaseDate: string;
  coverPalette: [string, string];
  description: string;
  tracklist: Track[];
  streamingLinks: StreamingLink[];
  isFeatured?: boolean;
}

export type GalleryMediaType = "photo" | "video" | "live" | "behindTheScenes";

export interface GalleryItem {
  id: string;
  title: string;
  mediaType: GalleryMediaType;
  palette: [string, string];
  youtubeId?: string;
  caption?: string;
  credit?: string;
}

export type TourDateStatus = "onSale" | "soldOut" | "limited" | "completed" | "cancelled";

export interface TourDate {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  status: TourDateStatus;
  ticketUrl?: string;
  supportingActs?: string[];
  isPast?: boolean;
}

export type PostCategory = "release" | "tour" | "behindTheScenes" | "collaboration" | "press";

export interface Post {
  id: string;
  slug: string;
  title: string;
  category: PostCategory;
  publishedAt: string;
  excerpt: string;
  body: string[];
  coverPalette: [string, string];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ArtistBio {
  name: string;
  tagline: string;
  shortBio: string;
  longBio: string[];
  influences: string[];
  milestones: Milestone[];
  awards: string[];
}

export type SocialPlatform =
  | "spotify"
  | "appleMusic"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "x";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  handle: string;
}
