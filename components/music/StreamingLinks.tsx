import { ExternalLink } from "lucide-react";
import type { StreamingLink } from "@/lib/types";

const PLATFORM_LABEL: Record<StreamingLink["platform"], string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  youtubeMusic: "YouTube Music",
  soundcloud: "SoundCloud",
  bandcamp: "Bandcamp",
};

export default function StreamingLinks({ links }: { links: StreamingLink[] }) {
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-parchment-muted/30 px-4 py-2 text-sm text-parchment hover:border-flare hover:text-flare transition-colors"
          >
            {PLATFORM_LABEL[link.platform]}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
