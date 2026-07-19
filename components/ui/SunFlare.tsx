/**
 * The site's signature visual motif: a soft warm light flare, standing in
 * for the backlit tree canopy in the source photography. Reused as a full
 * ambient wash in the hero, and as a small glow divider between sections.
 */
export default function SunFlare({
  size = "hero",
  className = "",
}: {
  size?: "hero" | "divider";
  className?: string;
}) {
  if (size === "divider") {
    return (
      <div
        aria-hidden="true"
        className={`relative mx-auto h-px w-full max-w-4xl ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-parchment-muted/25 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flare/25 blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="animate-flare-drift absolute -top-1/4 right-[10%] h-[42rem] w-[42rem] rounded-full bg-flare/20 blur-[110px]" />
      <div className="absolute bottom-[-10%] left-[5%] h-[30rem] w-[30rem] rounded-full bg-moss/30 blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/60 to-ink" />
    </div>
  );
}
