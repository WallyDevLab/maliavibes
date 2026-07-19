"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

export default function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 text-parchment hover:text-flare p-2"
      >
        <X size={28} aria-hidden="true" />
        <span className="sr-only">Close</span>
      </button>

      <div
        className="w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        {item.youtubeId ? (
          <div className="aspect-video w-full overflow-hidden rounded-sm bg-ink-soft">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
              title={item.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className="aspect-[4/3] w-full rounded-sm"
            style={{
              backgroundImage: `linear-gradient(160deg, ${item.palette[0]} 0%, ${item.palette[1]}99 100%)`,
            }}
            role="img"
            aria-label={item.title}
          />
        )}
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-display text-xl text-parchment">{item.title}</p>
            {item.caption ? <p className="text-sm text-parchment-muted">{item.caption}</p> : null}
          </div>
          {item.credit ? (
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-parchment-muted">
              {item.credit}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
