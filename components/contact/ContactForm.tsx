"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

type ContactType = "general" | "booking" | "press";

const TYPE_LABEL: Record<ContactType, string> = {
  general: "General inquiry",
  booking: "Booking inquiry",
  press: "Press inquiry",
};

function isContactType(value: string | null): value is ContactType {
  return value === "general" || value === "booking" || value === "press";
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");
  const initialType: ContactType = isContactType(requestedType) ? requestedType : "general";

  const [type, setType] = useState<ContactType>(initialType);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Phase 1 note: this form is not wired to a backend yet. Phase 2 should
    // post to a serverless route or a form service (for example Formspree)
    // rather than storing submissions as CMS content.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-flare/30 bg-ink-soft p-8">
        <h2 className="font-display text-2xl text-parchment">Message sent</h2>
        <p className="mt-3 text-parchment-muted">
          Thanks for reaching out. Expect a reply within a few business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted mb-3">
          What&rsquo;s this about
        </legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_LABEL) as ContactType[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              aria-pressed={type === option}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                type === option
                  ? "bg-flare text-ink"
                  : "border border-parchment-muted/30 text-parchment-muted hover:border-flare hover:text-flare"
              }`}
            >
              {TYPE_LABEL[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-parchment-muted mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-sm border border-parchment-muted/30 bg-transparent px-4 py-3 text-parchment focus:border-flare focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-parchment-muted mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-sm border border-parchment-muted/30 bg-transparent px-4 py-3 text-parchment focus:border-flare focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-parchment-muted mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-sm border border-parchment-muted/30 bg-transparent px-4 py-3 text-parchment focus:border-flare focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-flare px-6 py-3 text-sm font-semibold text-ink hover:bg-flare-soft transition-colors"
      >
        Send message
      </button>
    </form>
  );
}
