import Link from "next/link";
import Artwork from "@/components/ui/Artwork";
import { formatReleaseDate } from "@/lib/format";
import type { Release } from "@/lib/types";

const TYPE_LABEL: Record<Release["type"], string> = {
  album: "Album",
  ep: "EP",
  single: "Single",
  collaboration: "Collaboration",
};

export default function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link href={`/music/${release.slug}`} className="group block">
      <Artwork palette={release.coverPalette} label={release.title} className="rounded-sm" />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-parchment group-hover:text-flare transition-colors">
            {release.title}
          </h3>
          <p className="mt-1 text-sm text-parchment-muted">{formatReleaseDate(release.releaseDate)}</p>
        </div>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-parchment-muted border border-parchment-muted/30 rounded-full px-3 py-1">
          {TYPE_LABEL[release.type]}
        </span>
      </div>
    </Link>
  );
}
