/**
 * Applies a brief fade-and-lift on every route change. Deliberately a plain
 * CSS animation rather than a JS animation library, kept to one motion
 * pattern used consistently, and neutralized by the prefers-reduced-motion
 * override in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
