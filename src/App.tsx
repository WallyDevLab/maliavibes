import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Music from './components/Music';
import Gallery from './components/Gallery';
import Shop from './components/Shop';
import Tours from './components/Tours';
import About from './components/About';
import Contact from './components/Contact';
import AICompanion from './components/AICompanion';
import AudioPlayer from './components/AudioPlayer';
import Admin from './components/Admin';

import {
  INITIAL_ALBUMS,
  INITIAL_PRODUCTS,
  INITIAL_TOURS,
  GALLERY_ITEMS,
  BIOGRAPHY_DATA
} from './data';
import { Song, Album, Product, CartItem, TourDate } from './types';
import { Disc, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAICompanionOpen, setIsAICompanionOpen] = useState<boolean>(false);

  // Dynamic CMS States synchronized with localStorage
  const [tourDates, setTourDates] = useState<TourDate[]>(() => {
    const local = localStorage.getItem('malia_tour_dates');
    return local ? JSON.parse(local) : INITIAL_TOURS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('malia_products');
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });

  // E-commerce Cart States
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('malia_cart');
    return local ? JSON.parse(local) : [];
  });

  // Persistent Player States (defaults to her signature first track)
  const defaultAlbum = INITIAL_ALBUMS[0];
  const defaultSong = defaultAlbum.tracks[0];

  const [currentSong, setCurrentSong] = useState<Song | null>(() => {
    const local = localStorage.getItem('malia_current_song');
    return local ? JSON.parse(local) : defaultSong;
  });

  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(() => {
    const local = localStorage.getItem('malia_current_album');
    return local ? JSON.parse(local) : defaultAlbum;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('malia_tour_dates', JSON.stringify(tourDates));
  }, [tourDates]);

  useEffect(() => {
    localStorage.setItem('malia_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('malia_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem('malia_current_song', JSON.stringify(currentSong));
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentAlbum) {
      localStorage.setItem('malia_current_album', JSON.stringify(currentAlbum));
    }
  }, [currentAlbum]);

  // Player action handlers
  const handlePlayTrack = (track: Song, album: Album) => {
    setCurrentSong(track);
    setCurrentAlbum(album);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (!currentSong || !currentAlbum) return;
    const tracks = currentAlbum.tracks;
    const currentIdx = tracks.findIndex((t) => t.id === currentSong.id);
    if (currentIdx !== -1 && currentIdx < tracks.length - 1) {
      setCurrentSong(tracks[currentIdx + 1]);
    } else {
      // Loop back to start or play next album
      setCurrentSong(tracks[0]);
    }
    setIsPlaying(true);
  };

  const handlePreviousTrack = () => {
    if (!currentSong || !currentAlbum) return;
    const tracks = currentAlbum.tracks;
    const currentIdx = tracks.findIndex((t) => t.id === currentSong.id);
    if (currentIdx !== -1 && currentIdx > 0) {
      setCurrentSong(tracks[currentIdx - 1]);
    } else {
      // Loop to end
      setCurrentSong(tracks[tracks.length - 1]);
    }
    setIsPlaying(true);
  };

  // Cart action handlers
  const handleAddToCart = (product: Product, size?: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx !== -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      return [...prevCart, { product, quantity: 1, selectedSize: size }];
    });
  };

  const handleUpdateCartQty = (productId: string, qty: number, size?: string) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render Section Logic
  const renderContent = () => {
    if (isAdminMode) {
      return (
        <Admin
          tourDates={tourDates}
          setTourDates={setTourDates}
          products={products}
          setProducts={setProducts}
        />
      );
    }

    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-16">
            <Hero
              onNavigate={setActiveSection}
              latestAlbum={INITIAL_ALBUMS[0]}
              onPlayTrack={handlePlayTrack}
            />

            {/* Live Highlight snippet section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="bg-[#161412] border border-earth-linen/10 rounded-none p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-earth-gold uppercase tracking-[0.3em] block">FEATURED SHOW</span>
                  <h3 className="font-serif text-3xl font-bold text-earth-linen uppercase leading-tight tracking-wide">
                    Live at The Roxy Theatre
                  </h3>
                  <p className="text-sm text-earth-linen-dark leading-relaxed opacity-80">
                    Opening night of the If I'm Being Honest Autumn Tour in Los Angeles. Experience the songs in their purest acoustic arrangements, accompanied by rich candlelight and sweet vocal harmonies.
                  </p>
                  <button
                    onClick={() => setActiveSection('tour')}
                    className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-earth-terracotta hover:text-earth-linen transition-colors font-sans cursor-pointer"
                  >
                    <span>View tour map</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative rounded-none overflow-hidden shadow-2xl aspect-video border border-earth-linen/10">
                  <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80"
                    alt="Roxy Theatre Live"
                    className="w-full h-full object-cover filter brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-moss-dark via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'music':
        return (
          <Music
            albums={INITIAL_ALBUMS}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayTrack={handlePlayTrack}
            onPlayPause={handlePlayPause}
          />
        );
      case 'gallery':
        return <Gallery items={GALLERY_ITEMS} />;
      case 'shop':
        return (
          <Shop
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        );
      case 'tour':
        return <Tours tourDates={tourDates} />;
      case 'about':
        return <About bioData={BIOGRAPHY_DATA} />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Hero
            onNavigate={setActiveSection}
            latestAlbum={INITIAL_ALBUMS[0]}
            onPlayTrack={handlePlayTrack}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-earth-moss-dark selection:bg-earth-terracotta selection:text-earth-linen pb-28 md:pb-24">
      {/* Background Soft Flare Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[650px] bg-gradient-to-b from-earth-terracotta/5 to-transparent pointer-events-none z-0" />

      {/* Admin Gateway Alert Header */}
      {isAdminMode && (
        <div className="bg-earth-terracotta text-earth-linen py-2 px-4 text-center text-xs font-mono font-bold flex items-center justify-center space-x-2 relative z-50">
          <ShieldAlert className="h-4 w-4 animate-pulse" />
          <span>You are currently in Administrator Mode. Any changes will save to the local catalog live.</span>
          <button
            onClick={() => setIsAdminMode(false)}
            className="underline ml-4 text-[10px] uppercase hover:text-earth-gold transition-colors"
          >
            Exit Dashboard
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={(sec) => {
          setIsAdminMode(false);
          setActiveSection(sec);
        }}
        cartCount={cartCount}
        onOpenCart={() => {
          setIsAdminMode(false);
          setActiveSection('shop');
        }}
        isAdmin={isAdminMode}
        setIsAdmin={setIsAdminMode}
        onOpenAICompanion={() => setIsAICompanionOpen(true)}
      />

      {/* Main Screen Render */}
      <main className="flex-grow z-10 relative">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-earth-moss-dark border-t border-earth-moss-light/30 py-12 mt-16 text-earth-linen-dark z-10 relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand / Logo */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Disc className="h-5 w-5 text-earth-terracotta" />
              <span className="font-serif text-lg font-bold tracking-widest text-earth-linen uppercase">
                Malia
              </span>
            </div>
            <p className="text-xs text-earth-linen-dark leading-relaxed max-w-sm">
              An independent singer, songwriter, and guitarist creating sweet, intimate alternative soul and organic guitar-led R&B sanctuaries.
            </p>
          </div>

          {/* Col 2: Shortcuts */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-earth-gold">Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => { setIsAdminMode(false); setActiveSection('home'); }} className="text-left hover:text-earth-linen transition-colors">Home</button>
              <button onClick={() => { setIsAdminMode(false); setActiveSection('music'); }} className="text-left hover:text-earth-linen transition-colors">Music</button>
              <button onClick={() => { setIsAdminMode(false); setActiveSection('gallery'); }} className="text-left hover:text-earth-linen transition-colors">Gallery</button>
              <button onClick={() => { setIsAdminMode(false); setActiveSection('shop'); }} className="text-left hover:text-earth-linen transition-colors">Shop</button>
              <button onClick={() => { setIsAdminMode(false); setActiveSection('tour'); }} className="text-left hover:text-earth-linen transition-colors">Tour Dates</button>
              <button onClick={() => { setIsAdminMode(false); setActiveSection('about'); }} className="text-left hover:text-earth-linen transition-colors">Biography</button>
              <a
                href="https://linktr.ee/MALIA_?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnpW0tNrP08sV0TfO5nE992SzIvGLJ5VN6pEnWHxQ819SMRoU0xUdvRoH7QHk_aem_n8R6SKMYV2ubqnf43pTAdg"
                target="_blank"
                rel="noreferrer"
                className="text-left hover:text-earth-gold text-earth-gold/95 transition-colors font-bold uppercase tracking-wider text-[10px] col-span-2 mt-1"
              >
                Official Linktree ↗
              </a>
            </div>
          </div>

          {/* Col 3: Copyright / Legal */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-earth-gold">Inquiries</h4>
            <p className="leading-relaxed text-earth-linen-dark">
              General / booking channels: <br />
              <strong className="text-earth-linen">bookings@maliavibes.com</strong>
            </p>
            <p className="pt-2 text-[10px] font-mono tracking-wider opacity-75">
              © {new Date().getFullYear()} MALIA VIBES. ALL RIGHTS RESERVED. <br />
              CRAFTED FOR FANS WITH LOVE.
            </p>
          </div>
        </div>
      </footer>

      {/* Persistent Floating Audio Player */}
      <AudioPlayer
        currentSong={currentSong}
        currentAlbum={currentAlbum}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={handleNextTrack}
        onPrevious={handlePreviousTrack}
      />

      {/* AI Companion Slide Panel */}
      <AICompanion
        isOpen={isAICompanionOpen}
        onClose={() => setIsAICompanionOpen(false)}
      />
    </div>
  );
}
