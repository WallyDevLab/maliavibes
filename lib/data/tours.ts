import type { TourDate } from "@/lib/types";

export const tourDates: TourDate[] = [
  {
    id: "td1",
    date: "2026-09-04",
    venue: "The Fillmore",
    city: "San Francisco",
    country: "United States",
    status: "onSale",
    ticketUrl: "https://www.bandsintown.com/",
    supportingActs: ["Theo Marsh"],
  },
  {
    id: "td2",
    date: "2026-09-09",
    venue: "The Wiltern",
    city: "Los Angeles",
    country: "United States",
    status: "limited",
    ticketUrl: "https://www.bandsintown.com/",
  },
  {
    id: "td3",
    date: "2026-09-16",
    venue: "Metro",
    city: "Chicago",
    country: "United States",
    status: "onSale",
    ticketUrl: "https://www.bandsintown.com/",
  },
  {
    id: "td4",
    date: "2026-09-22",
    venue: "Music Hall of Williamsburg",
    city: "New York",
    country: "United States",
    status: "soldOut",
  },
  {
    id: "td5",
    date: "2026-10-11",
    venue: "The Garage",
    city: "London",
    country: "United Kingdom",
    status: "onSale",
    ticketUrl: "https://www.bandsintown.com/",
  },
  {
    id: "td6",
    date: "2026-10-16",
    venue: "Bitterzoet",
    city: "Amsterdam",
    country: "Netherlands",
    status: "onSale",
    ticketUrl: "https://www.bandsintown.com/",
  },
  {
    id: "td7",
    date: "2025-11-14",
    venue: "The Independent",
    city: "San Francisco",
    country: "United States",
    status: "completed",
    isPast: true,
  },
  {
    id: "td8",
    date: "2025-10-02",
    venue: "Mercury Lounge",
    city: "New York",
    country: "United States",
    status: "completed",
    isPast: true,
  },
  {
    id: "td9",
    date: "2025-09-18",
    venue: "Schubas Tavern",
    city: "Chicago",
    country: "United States",
    status: "completed",
    isPast: true,
  },
];

export function getUpcomingTourDates() {
  return tourDates.filter((date) => !date.isPast);
}

export function getPastTourDates() {
  return tourDates.filter((date) => date.isPast);
}
