import { MapPin, Ticket } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatShortDate } from "@/lib/format";
import type { TourDate } from "@/lib/types";

const STATUS_STYLE: Record<TourDate["status"], string> = {
  onSale: "text-flare border-flare/40",
  limited: "text-parchment border-parchment-muted/40",
  soldOut: "text-parchment-muted border-parchment-muted/20",
  completed: "text-parchment-muted border-parchment-muted/20",
  cancelled: "text-parchment-muted border-parchment-muted/20",
};

const STATUS_LABEL: Record<TourDate["status"], string> = {
  onSale: "Tickets on sale",
  limited: "Limited tickets",
  soldOut: "Sold out",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function TourDateRow({ date }: { date: TourDate }) {
  const canBuy = date.ticketUrl && date.status !== "soldOut" && !date.isPast;

  return (
    <li className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-baseline gap-6">
        <span className="w-28 shrink-0 font-mono text-sm text-parchment-muted">
          {formatShortDate(date.date)}
        </span>
        <div>
          <p className="font-display text-xl text-parchment">{date.venue}</p>
          <p className="flex items-center gap-1 text-sm text-parchment-muted">
            <MapPin size={14} aria-hidden="true" />
            {date.city}, {date.country}
          </p>
          {date.supportingActs && date.supportingActs.length > 0 ? (
            <p className="mt-1 text-xs text-parchment-muted">
              With {date.supportingActs.join(", ")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-4 sm:pl-6">
        <span
          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${STATUS_STYLE[date.status]}`}
        >
          {STATUS_LABEL[date.status]}
        </span>
        {canBuy ? (
          <Button href={date.ticketUrl as string} external variant="secondary" className="!px-4 !py-2 text-xs">
            <Ticket size={14} aria-hidden="true" />
            Get tickets
          </Button>
        ) : null}
      </div>
    </li>
  );
}
