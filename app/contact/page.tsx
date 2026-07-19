import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Booking, management, and press contact for Malia, plus a general contact form.",
};

const CONTACT_CARDS = [
  {
    label: "Booking",
    description: "Show and festival booking inquiries.",
    email: "booking@maliamusic.com",
  },
  {
    label: "Management",
    description: "General management and partnership inquiries.",
    email: "management@maliamusic.com",
  },
  {
    label: "Press",
    description: "Interview requests and press assets.",
    email: "press@maliamusic.com",
  },
];

export default function ContactPage() {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact"
          description="For booking, management, and press, reach out directly below. For everything else, use the form."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CONTACT_CARDS.map((card) => (
            <div key={card.label} className="rounded-sm border border-parchment-muted/15 p-6">
              <h2 className="font-display text-xl text-parchment">{card.label}</h2>
              <p className="mt-2 text-sm text-parchment-muted">{card.description}</p>
              <a
                href={`mailto:${card.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-flare hover:underline"
              >
                <Mail size={14} aria-hidden="true" />
                {card.email}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-2xl">
          <h2 className="font-display text-2xl text-parchment">Send a message</h2>
          <p className="mt-2 text-parchment-muted">
            This form is a working draft. Phase 2 connects it to a real inbox.
          </p>
          <div className="mt-8">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
