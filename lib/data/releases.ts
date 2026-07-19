import type { Release } from "@/lib/types";

export const releases: Release[] = [
  {
    id: "rel-if-im-being-honest",
    slug: "if-im-being-honest",
    title: "If I'm Being Honest",
    type: "album",
    releaseDate: "2025-09-12",
    coverPalette: ["#3a3f2c", "#e3a857"],
    isFeatured: true,
    description:
      "An eleven-song account of a relationship ending in real time, written without the usual armor. Malia's debut full-length, produced almost entirely live to tape.",
    tracklist: [
      { id: "t1", title: "Ledger Lines", durationSeconds: 214 },
      { id: "t2", title: "Sun Through the Branches", durationSeconds: 251 },
      { id: "t3", title: "Denim and Regret", durationSeconds: 198 },
      { id: "t4", title: "Every Honest Thing", durationSeconds: 233 },
      { id: "t5", title: "Stool by the Window", durationSeconds: 187 },
      { id: "t6", title: "Say It Plain", durationSeconds: 205, featuring: "Theo Marsh" },
      { id: "t7", title: "Nothing Left to Perform", durationSeconds: 241 },
      { id: "t8", title: "Grass Stains", durationSeconds: 176 },
      { id: "t9", title: "Barefoot in July", durationSeconds: 222 },
      { id: "t10", title: "The Long Way Around", durationSeconds: 264 },
      { id: "t11", title: "If I'm Being Honest", durationSeconds: 289 },
    ],
    streamingLinks: [
      { platform: "spotify", url: "https://open.spotify.com/album/example" },
      { platform: "appleMusic", url: "https://music.apple.com/album/example" },
      { platform: "youtubeMusic", url: "https://music.youtube.com/playlist?list=example" },
      { platform: "bandcamp", url: "https://malia.bandcamp.com/album/if-im-being-honest" },
    ],
  },
  {
    id: "rel-self-titled-ep",
    slug: "malia-ep",
    title: "Malia",
    type: "ep",
    releaseDate: "2021-05-03",
    coverPalette: ["#201c15", "#a9a28e"],
    description:
      "The four song self-released EP that started it all, recorded in a spare bedroom with a single microphone.",
    tracklist: [
      { id: "e1", title: "Spare Room", durationSeconds: 192 },
      { id: "e2", title: "Borrowed Guitar", durationSeconds: 178 },
      { id: "e3", title: "Coffee Shop Closing", durationSeconds: 205 },
      { id: "e4", title: "Grandmother's Radio", durationSeconds: 233 },
    ],
    streamingLinks: [
      { platform: "spotify", url: "https://open.spotify.com/album/example-ep" },
      { platform: "bandcamp", url: "https://malia.bandcamp.com/album/malia-ep" },
    ],
  },
  {
    id: "rel-single-ledger-lines",
    slug: "ledger-lines",
    title: "Ledger Lines",
    type: "single",
    releaseDate: "2025-06-20",
    coverPalette: ["#3a3f2c", "#e3a857"],
    description: "The lead single from If I'm Being Honest, and the song that opened the record.",
    tracklist: [{ id: "s1", title: "Ledger Lines", durationSeconds: 214 }],
    streamingLinks: [
      { platform: "spotify", url: "https://open.spotify.com/track/example" },
      { platform: "appleMusic", url: "https://music.apple.com/song/example" },
    ],
  },
  {
    id: "rel-collab-slow-weather",
    slug: "slow-weather-with-theo-marsh",
    title: "Slow Weather (with Theo Marsh)",
    type: "collaboration",
    releaseDate: "2024-11-08",
    coverPalette: ["#4c6b85", "#f3eee1"],
    description:
      "A one-off collaboration written during a rained-out tour stop, released ahead of the album.",
    tracklist: [{ id: "c1", title: "Slow Weather", durationSeconds: 247, featuring: "Theo Marsh" }],
    streamingLinks: [
      { platform: "spotify", url: "https://open.spotify.com/track/example-collab" },
      { platform: "soundcloud", url: "https://soundcloud.com/malia/slow-weather" },
    ],
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((release) => release.slug === slug);
}

export function getFeaturedRelease(): Release {
  return releases.find((release) => release.isFeatured) ?? releases[0];
}
