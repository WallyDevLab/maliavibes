import Link from "next/link";
import { MapPin, Ticket } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { getUpcomingTourDates } from "@/lib/data/tours";
import { formatShortDate } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = {
  onSale: "Tickets on sale",
  limited: "Limited tickets",
  soldOut: "Sold out",
};

export default function TourTeaser() {
  const dates = getUpcomingTourDates().slice(0, 3);
  if (dates.length === 0) return null;

  return (
    <section className="bg-ink-soft py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="On the road" title="Upcoming shows">
          <Button href="/tours" variant="secondary">
            All tour dates
          </Button>
        </SectionHeading>

        <ul className="mt-12 divide-y divide-parchment-muted/10 border-t border-b border-parchment-muted/10">
          {dates.map((date, index) => (
            <Reveal key={date.id} delayMs={index * 80}>
              <li className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-flare w-28 shrink-0">
                    {formatShortDate(date.date)}
                  </span>
                  <div>
                    <p className="font-display text-xl text-parchment">{date.venue}</p>
                    <p className="flex items-center gap-1 text-sm text-parchment-muted">
                      <MapPin size={14} aria-hidden="true" />
                      {date.city}, {date.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:pl-6">
                  <span className="text-xs uppercase tracking-wide text-parchment-muted">
                    {STATUS_LABEL[date.status] ?? "Details"}
                  </span>
                  {date.ticketUrl && date.status !== "soldOut" ? (
                    <Button href={date.ticketUrl} external variant="secondary" className="!px-4 !py-2 text-xs">
                      <Ticket size={14} aria-hidden="true" />
                      Get tickets
                    </Button>
                  ) : (
                    <span className="rounded-full border border-parchment-muted/30 px-4 py-2 text-xs text-parchment-muted">
                      Sold out
                    </span>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-parchment-muted">
          Ticket links hand off to each show&rsquo;s official ticketing partner. Not seeing your
          city? <Link href="/contact?type=booking" className="text-flare hover:underline">Reach out about booking</Link>.
        </p>
      </Container>
    </section>
  );
}
