import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-flare text-ink hover:bg-flare-soft focus-visible:bg-flare-soft",
  secondary:
    "border border-parchment-muted/40 text-parchment hover:border-flare hover:text-flare",
  ghost: "text-parchment hover:text-flare underline decoration-parchment-muted/50 underline-offset-4",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold tracking-wide transition-colors duration-200 ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
