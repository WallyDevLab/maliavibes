import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TourDateRow from "@/components/tours/TourDateRow";
import { getUpcomingTourDates, getPastTourDates } from "@/lib/data/tours";

export const metadata: Metadata = {
  title: "Tours & Events",
  description: "Upcoming shows and past tour dates for Malia.",
};

export default function ToursPage() {
  const upcoming = getUpcomingTourDates();
  const past = getPastTourDates();

  return (
    <div className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Live"
          title="Tours & events"
          description="Ticket links hand off to each show's official ticketing partner. Not seeing your city? Reach out about booking."
        />

        <div className="mt-12">
          {upcoming.length === 0 ? (
            <p className="text-parchment-muted">
              No shows on the books right now. Join the newsletter to hear about the next tour first.
            </p>
          ) : (
            <ul className="divide-y divide-parchment-muted/10 border-t border-b border-parchment-muted/10">
              {upcoming.map((date) => (
                <TourDateRow key={date.id} date={date} />
              ))}
            </ul>
          )}
        </div>

        {past.length > 0 ? (
          <div className="mt-24">
            <h2 className="font-display text-2xl text-parchment">Past shows</h2>
            <ul className="mt-6 divide-y divide-parchment-muted/10 border-t border-b border-parchment-muted/10 opacity-70">
              {past.map((date) => (
                <TourDateRow key={date.id} date={date} />
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
