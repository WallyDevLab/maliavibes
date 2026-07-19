/**
 * Stand-in artwork for covers, gallery tiles, and post images until real
 * photography is dropped in. Renders a two-color gradient derived from the
 * content's own palette field, so swapping in a real next/image later is a
 * one-line change per usage rather than a redesign.
 */
export default function Artwork({
  palette,
  label,
  aspect = "aspect-square",
  className = "",
}: {
  palette: [string, string];
  label?: string;
  aspect?: string;
  className?: string;
}) {
  const [from, to] = palette;
  return (
    <div
      className={`relative overflow-hidden ${aspect} ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 15% 15%, ${to}55 0%, transparent 55%), linear-gradient(160deg, ${from} 0%, ${to}99 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {label ? (
        <span className="sr-only">{label}</span>
      ) : null}
    </div>
  );
}
