import { useState, FormEvent } from 'react';
import { Calendar, MapPin, Ticket, ShieldAlert, CheckCircle2, ChevronDown, Clock, Archive, X } from 'lucide-react';
import { TourDate } from '../types';

interface ToursProps {
  tourDates: TourDate[];
}

export default function Tours({ tourDates }: ToursProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedShow, setSelectedShow] = useState<TourDate | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(2);
  const [ticketBookingSuccess, setTicketBookingSuccess] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  const upcomingShows = tourDates.filter(t => !t.isPast);
  const pastShows = tourDates.filter(t => t.isPast);

  const handleBookTicketsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) return;

    // Simulated booking success
    setTicketBookingSuccess(true);
  };

  const formatDateString = (dateStr: string) => {
    const d = new Date(dateStr);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`,
      month: months[d.getMonth()],
      year: d.getFullYear(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const activeShows = activeTab === 'upcoming' ? upcomingShows : pastShows;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12 animate-fade-in" id="tours-section">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-earth-gold">ON THE ROAD</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-linen uppercase tracking-wider">Tours & Events</h2>
        <div className="w-12 h-[1.5px] bg-earth-terracotta mx-auto" />
        <p className="max-w-xl mx-auto font-serif italic text-earth-linen-dark text-xs md:text-sm leading-relaxed opacity-80">
          "Sharing physical space and collective resonance. Catch MALIA performing acoustic-soul live in an intimate room near you."
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-earth-linen/10 pb-0.5 max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
            activeTab === 'upcoming' ? 'text-earth-gold font-bold' : 'text-earth-linen-dark hover:text-earth-linen'
          }`}
          id="tours-tab-upcoming"
        >
          <div className="flex items-center justify-center space-x-2">
            <Clock className="h-3.5 w-3.5" />
            <span>Upcoming</span>
          </div>
          {activeTab === 'upcoming' && (
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-earth-gold" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
            activeTab === 'past' ? 'text-earth-gold font-bold' : 'text-earth-linen-dark hover:text-earth-linen'
          }`}
          id="tours-tab-past"
        >
          <div className="flex items-center justify-center space-x-2">
            <Archive className="h-3.5 w-3.5" />
            <span>Archive</span>
          </div>
          {activeTab === 'past' && (
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-earth-gold" />
          )}
        </button>
      </div>

      {/* Tour Dates Table Grid */}
      <div className="space-y-4 max-w-5xl mx-auto">
        {activeShows.map((show) => {
          const dateDetails = formatDateString(show.date);

          return (
            <div
              key={show.id}
              className="bg-[#161412] border border-earth-linen/10 rounded-none p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-earth-terracotta transition-all duration-300 shadow-xl"
              id={`tour-row-${show.id}`}
            >
              {/* Date Column */}
              <div className="flex items-center space-x-5 self-start md:self-auto">
                <div className="bg-[#1A1816] border border-earth-linen/10 rounded-none p-3 text-center w-14 md:w-16 flex-shrink-0 shadow-md">
                  <span className="block text-[9px] font-mono tracking-widest text-earth-gold font-bold uppercase">
                    {dateDetails.month}
                  </span>
                  <span className="block font-serif text-xl md:text-2xl font-bold text-earth-linen leading-none py-1">
                    {dateDetails.day}
                  </span>
                  <span className="block text-[8px] font-mono text-earth-linen-dark">
                    {dateDetails.dayName}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-base md:text-lg font-bold text-earth-linen leading-tight">{show.venue}</h3>
                  <div className="flex items-center space-x-1.5 text-xs text-earth-linen-dark font-sans opacity-80">
                    <MapPin className="h-3.5 w-3.5 text-earth-terracotta" />
                    <span>
                      {show.city}, {show.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 border-t md:border-0 border-earth-linen/10 pt-4 md:pt-0">
                <div className="flex flex-col text-left md:text-right">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-earth-linen-dark">Status</span>
                  <span
                    className={`text-[10px] font-bold font-mono uppercase tracking-[0.15em] mt-1 ${
                      show.ticketStatus === 'available'
                        ? 'text-green-500'
                        : show.ticketStatus === 'low-stock'
                        ? 'text-earth-gold'
                        : 'text-earth-linen-dark'
                    }`}
                  >
                    {show.ticketStatus === 'available' && 'Tickets Available'}
                    {show.ticketStatus === 'low-stock' && 'Selling Out Fast'}
                    {show.ticketStatus === 'sold-out' && 'Sold Out'}
                    {show.isPast && 'Show Concluded'}
                  </span>
                </div>

                {!show.isPast && (
                  <button
                    onClick={() => {
                      if (show.ticketStatus !== 'sold-out') {
                        setBuyerName('');
                        setBuyerEmail('');
                        setTicketBookingSuccess(false);
                        setSelectedShow(show);
                      }
                    }}
                    disabled={show.ticketStatus === 'sold-out'}
                    className={`py-2.5 px-6 text-[10px] font-bold uppercase tracking-widest rounded-none border transition-all cursor-pointer ${
                      show.ticketStatus !== 'sold-out'
                        ? 'bg-earth-terracotta border-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark'
                        : 'bg-[#1A1816] border-earth-linen/10 text-earth-linen-dark cursor-not-allowed'
                    }`}
                    id={`tour-btn-buy-${show.id}`}
                  >
                    {show.ticketStatus === 'sold-out' ? 'Sold Out' : 'Buy Tickets'}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {activeShows.length === 0 && (
          <div className="text-center py-16 bg-[#161412] border border-earth-linen/10 rounded-none shadow-xl">
            <Calendar className="h-10 w-10 text-earth-linen-dark mx-auto mb-4" />
            <h4 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">No tour dates scheduled</h4>
            <p className="text-xs text-earth-linen-dark mt-1 opacity-80">We are currently planning her next itinerary. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Ticket Purchase Modal */}
      {selectedShow && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="ticket-buy-modal">
          <div className="bg-earth-moss border border-earth-moss-light max-w-md w-full rounded-lg overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-earth-moss-light/30 flex justify-between items-center bg-earth-moss-dark/40">
              <div className="flex items-center space-x-2">
                <Ticket className="h-5 w-5 text-earth-terracotta" />
                <span className="font-serif text-base font-bold text-earth-linen">Reserve Tickets</span>
              </div>
              <button
                onClick={() => setSelectedShow(null)}
                className="text-earth-linen-dark hover:text-earth-linen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!ticketBookingSuccess ? (
              <form onSubmit={handleBookTicketsSubmit} className="p-6 space-y-4">
                {/* Show Summary */}
                <div className="bg-earth-moss-dark border border-earth-moss-light/30 p-4 rounded text-xs space-y-1.5 font-sans">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-earth-gold">Performance Details</p>
                  <p className="font-serif text-sm font-bold text-earth-linen">{selectedShow.venue}</p>
                  <p className="text-earth-linen-dark">{selectedShow.city}, {selectedShow.country}</p>
                  <p className="text-earth-linen-dark font-mono text-[10px]">{selectedShow.date}</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g., Michael Scott"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-sm text-earth-linen focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="E.g., michael@dundermifflin.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-sm text-earth-linen focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Ticket Quantity</label>
                  <div className="flex items-center space-x-3 w-32 border border-earth-moss-light rounded bg-earth-moss-dark p-1">
                    <button
                      type="button"
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="flex-1 text-center font-mono hover:text-earth-gold font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-sm text-earth-linen">{ticketQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setTicketQuantity(Math.min(6, ticketQuantity + 1))}
                      className="flex-1 text-center font-mono hover:text-earth-gold font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="block text-[10px] font-mono text-earth-linen-dark">Maximum 6 tickets per order.</span>
                </div>

                <div className="pt-4 border-t border-earth-moss-light/20 flex justify-between items-center text-xs text-earth-linen-dark font-mono">
                  <span>Price per ticket</span>
                  <span className="text-earth-linen font-bold">$45.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-serif font-bold text-earth-linen">
                  <span>Subtotal</span>
                  <span>${(ticketQuantity * 45.00).toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-earth-terracotta hover:bg-earth-terracotta-light text-earth-linen font-sans font-bold text-sm tracking-widest uppercase rounded mt-4"
                >
                  Secure Reservation
                </button>
              </form>
            ) : (
              <div className="p-8 space-y-6 text-center">
                <CheckCircle2 className="h-14 w-14 text-earth-gold mx-auto animate-pulse" />
                <div className="space-y-2">
                  <h4 className="font-serif text-xl font-bold text-earth-linen uppercase tracking-wider">Tickets Confirmed!</h4>
                  <p className="text-sm text-earth-linen-dark leading-relaxed">
                    Hey {buyerName}, we reserved your {ticketQuantity} tickets for the performance at <strong className="text-earth-linen">{selectedShow.venue}</strong> on {selectedShow.date}.
                  </p>
                </div>

                <div className="bg-earth-moss-dark border border-earth-moss-light/35 p-4 rounded text-left space-y-1.5 font-mono text-xs">
                  <p className="text-earth-linen-dark uppercase">Booking Code</p>
                  <p className="text-earth-gold font-bold text-sm tracking-widest">MAL-{(100000 + Math.floor(Math.random() * 900000))}</p>
                  <p className="text-[10px] text-earth-linen-dark pt-1 border-t border-earth-moss-light/25">
                    Your digital passes will be delivered shortly to {buyerEmail}. Please show this code at doors.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedShow(null)}
                  className="px-6 py-2.5 bg-earth-moss border border-earth-moss-light hover:border-earth-gold text-earth-gold font-mono text-xs uppercase tracking-widest rounded"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
