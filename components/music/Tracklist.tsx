"use client";

import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { formatDuration, formatTrackNumber } from "@/lib/format";
import type { Track } from "@/lib/types";

export default function Tracklist({ tracks }: { tracks: Track[] }) {
  const [openTrackId, setOpenTrackId] = useState<string | null>(null);

  return (
    <ol className="divide-y divide-parchment-muted/10 border-t border-b border-parchment-muted/10">
      {tracks.map((track, index) => {
        const isOpen = openTrackId === track.id;
        return (
          <li key={track.id}>
            <div className="flex items-center gap-4 py-4">
              <span className="w-6 shrink-0 font-mono text-sm text-parchment-muted">
                {formatTrackNumber(index)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-base text-parchment">
                  {track.title}
                  {track.featuring ? (
                    <span className="text-parchment-muted"> (feat. {track.featuring})</span>
                  ) : null}
                </p>
              </div>
              {track.previewUrl ? (
                <a
                  href={track.previewUrl}
                  className="hidden shrink-0 items-center gap-1 text-xs text-parchment-muted hover:text-flare sm:flex"
                >
                  <Play size={12} aria-hidden="true" />
                  Preview
                </a>
              ) : null}
              <span className="shrink-0 font-mono text-sm text-parchment-muted">
                {formatDuration(track.durationSeconds)}
              </span>
              {track.lyrics ? (
                <button
                  type="button"
                  onClick={() => setOpenTrackId(isOpen ? null : track.id)}
                  aria-expanded={isOpen}
                  aria-controls={`lyrics-${track.id}`}
                  className="shrink-0 text-parchment-muted hover:text-flare"
                >
                  <span className="sr-only">
                    {isOpen ? `Hide lyrics for ${track.title}` : `Show lyrics for ${track.title}`}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              ) : null}
            </div>
            {track.lyrics && isOpen ? (
              <div id={`lyrics-${track.id}`} className="pb-6 pl-10 pr-4">
                <p className="whitespace-pre-line text-sm leading-relaxed text-parchment-muted">
                  {track.lyrics}
                </p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
