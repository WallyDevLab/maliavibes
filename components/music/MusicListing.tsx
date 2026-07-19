"use client";

import { useMemo, useState } from "react";
import ReleaseCard from "@/components/music/ReleaseCard";
import type { Release, ReleaseType } from "@/lib/types";

const FILTERS: { value: ReleaseType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "album", label: "Albums" },
  { value: "ep", label: "EPs" },
  { value: "single", label: "Singles" },
  { value: "collaboration", label: "Collaborations" },
];

export default function MusicListing({ releases }: { releases: Release[] }) {
  const [filter, setFilter] = useState<ReleaseType | "all">("all");

  const sorted = useMemo(
    () => [...releases].sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1)),
    [releases]
  );

  const filtered = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((release) => release.type === filter)),
    [sorted, filter]
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter releases by type"
        className="flex flex-wrap gap-2"
      >
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
        <p className="mt-16 text-parchment-muted">
          Nothing in this category yet. Check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      )}
    </div>
  );
}
