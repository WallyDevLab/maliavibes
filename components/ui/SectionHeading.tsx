import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      <div className="flex w-full items-end justify-between gap-6">
        <div className={align === "center" ? "w-full" : ""}>
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-flare mb-3">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-4xl md:text-5xl font-medium text-parchment text-balance">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-parchment-muted text-base md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="hidden md:block shrink-0">{children}</div> : null}
      </div>
    </div>
  );
}
