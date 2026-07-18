import { Calendar, Play, ShoppingBag, Music, Disc } from 'lucide-react';
import { Album, Song } from '../types';

interface HeroProps {
  onNavigate: (section: string) => void;
  latestAlbum: Album;
  onPlayTrack: (track: Song, album: Album) => void;
}

export default function Hero({ onNavigate, latestAlbum, onPlayTrack }: HeroProps) {
  const handleListenNow = () => {
    if (latestAlbum.tracks.length > 0) {
      onPlayTrack(latestAlbum.tracks[0], latestAlbum);
    }
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" id="hero-section">
      {/* Background Image with Dark Vignette and Sunlit Orange/Terracotta Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/malia_hero_banner_1784336198067.jpg"
          alt="Malia"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Soft sun flare glowing top-right and warm terracotta bottom-left */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-radial from-earth-terracotta/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-earth-moss-dark via-earth-moss-dark/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Col: Artist Taglines & Navigation CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-earth-gold block">
              Independent Alternative R&B / Soul
            </span>
            <h1 className="font-serif text-[64px] md:text-[90px] lg:text-[110px] leading-[0.85] font-bold tracking-tighter text-earth-linen-light mb-6">
              Malia<br/><span className="text-earth-terracotta">Vibes</span>
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-earth-linen-dark max-w-md leading-relaxed opacity-80">
              "Weaving sweet guitar loops, silky vocal stacks, and pure organic soul landscapes."
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => onNavigate('tour')}
              className="px-8 py-4 border border-earth-terracotta text-[10px] uppercase tracking-[0.3em] font-bold text-earth-terracotta hover:bg-earth-terracotta hover:text-earth-moss-dark transition-colors duration-300 flex items-center space-x-2.5 rounded-none cursor-pointer"
              id="hero-cta-tour"
            >
              <Calendar className="h-4 w-4" />
              <span>Tour Dates</span>
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 border border-earth-linen/20 text-earth-linen hover:border-earth-linen hover:bg-earth-linen/5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 flex items-center space-x-2.5 rounded-none cursor-pointer"
              id="hero-cta-shop"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Shop Merch</span>
            </button>
          </div>

          {/* Core Streaming platforms shortcuts */}
          <div className="flex items-center space-x-6 pt-6 border-t border-earth-linen/10 w-full justify-center lg:justify-start">
            <span className="text-[10px] font-mono text-earth-linen-dark uppercase tracking-[0.2em]">Listen On</span>
            <a
              href="https://open.spotify.com/artist/5o6oaYrumOkkzsOmwZXJv6"
              target="_blank"
              rel="noreferrer"
              className="text-earth-terracotta hover:text-earth-linen transition-colors text-[10px] font-bold uppercase tracking-wider"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/malia/1202271922"
              target="_blank"
              rel="noreferrer"
              className="text-earth-linen-dark hover:text-earth-terracotta transition-colors text-[10px] font-bold uppercase tracking-wider"
            >
              Apple Music
            </a>
            <a
              href="https://www.youtube.com/user/maliavibes"
              target="_blank"
              rel="noreferrer"
              className="text-earth-linen-dark hover:text-earth-terracotta transition-colors text-[10px] font-bold uppercase tracking-wider"
            >
              YouTube
            </a>
            <a
              href="https://linktr.ee/MALIA_?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnpW0tNrP08sV0TfO5nE992SzIvGLJ5VN6pEnWHxQ819SMRoU0xUdvRoH7QHk_aem_n8R6SKMYV2ubqnf43pTAdg"
              target="_blank"
              rel="noreferrer"
              className="text-earth-gold hover:text-earth-linen transition-colors text-[10px] font-bold uppercase tracking-wider"
            >
              Linktree
            </a>
          </div>
        </div>

        {/* Right Col: Featured Release Card */}
        <div className="lg:col-span-5 flex justify-center animate-fade-in delay-150">
          <div className="bg-[#1A1816] border border-earth-linen/10 p-6 max-w-sm w-full shadow-2xl relative group rounded-none">
            {/* Dots background overlay effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[length:10px_10px] rounded-none"></div>

            <div className="relative mb-6 overflow-hidden rounded-none shadow-lg">
              <img
                src={latestAlbum.coverUrl}
                alt={latestAlbum.title}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-earth-moss-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={handleListenNow}
                  className="p-4 bg-earth-linen text-earth-moss-dark rounded-none shadow-xl hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="h-6 w-6 fill-current pl-0.5 text-earth-terracotta" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-earth-terracotta/10 border border-earth-terracotta/20 text-[9px] font-mono tracking-widest text-earth-terracotta uppercase">
                  New Release
                </span>
                <span className="text-[10px] font-mono text-earth-linen-dark tracking-wider">
                  {latestAlbum.releaseDate}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-earth-linen">
                {latestAlbum.title}
              </h3>
              <p className="font-sans text-xs text-earth-linen-dark leading-relaxed opacity-80">
                {latestAlbum.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-earth-linen/10">
                <button
                  onClick={handleListenNow}
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-[#2A2623] hover:bg-[#C1876B] hover:text-black text-[10px] font-bold text-earth-linen uppercase tracking-widest rounded-none transition-colors duration-300 border border-transparent cursor-pointer"
                >
                  <Music className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-earth-terracotta hover:bg-[#D9A288] text-[10px] font-bold text-earth-moss-dark uppercase tracking-widest rounded-none transition-colors duration-300 cursor-pointer"
                >
                  <Disc className="h-3.5 w-3.5" />
                  <span>Get Vinyl</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
