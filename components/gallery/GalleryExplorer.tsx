"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import Artwork from "@/components/ui/Artwork";
import Lightbox from "@/components/gallery/Lightbox";
import type { GalleryItem, GalleryMediaType } from "@/lib/types";

const FILTERS: { value: GalleryMediaType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "photo", label: "Photos" },
  { value: "video", label: "Music videos" },
  { value: "live", label: "Live" },
  { value: "behindTheScenes", label: "Behind the scenes" },
];

export default function GalleryExplorer({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryMediaType | "all">("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.mediaType === filter)),
    [items, filter]
  );

  return (
    <div>
      <div role="group" aria-label="Filter gallery by media type" className="flex flex-wrap gap-2">
        {FILTERS.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-body transition-colors ${
                active
                  ? "bg-flare text-ink"
                  : "border border-parchment-muted/30 text-parchment-muted hover:border-flare hover:text-flare"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-parchment-muted">Nothing here yet, try a different filter.</p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItem(item)}
              className="group relative mb-4 block w-full break-inside-avoid text-left"
            >
              <Artwork
                palette={item.palette}
                label={item.title}
                aspect={item.mediaType === "video" ? "aspect-video" : "aspect-[4/5]"}
                className="rounded-sm transition-transform duration-300 group-hover:scale-[1.015]"
              />
              {item.mediaType === "video" ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/70 text-parchment group-hover:bg-flare group-hover:text-ink transition-colors">
                    <Play size={18} aria-hidden="true" />
                  </span>
                </span>
              ) : null}
              <span className="mt-2 block truncate text-sm text-parchment-muted group-hover:text-flare transition-colors">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {activeItem ? <Lightbox item={activeItem} onClose={() => setActiveItem(null)} /> : null}
    </div>
  );
}
