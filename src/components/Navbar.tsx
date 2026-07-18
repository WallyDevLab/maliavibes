import { useState } from 'react';
import { ShoppingBag, Menu, X, Disc, Shield, User, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onOpenAICompanion: () => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  cartCount,
  onOpenCart,
  isAdmin,
  setIsAdmin,
  onOpenAICompanion
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'shop', label: 'Shop' },
    { id: 'tour', label: 'Tour Dates' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-earth-moss/90 backdrop-blur-md border-b border-earth-moss-light px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Artist Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 text-left group"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-full border border-earth-terracotta flex items-center justify-center transition-all group-hover:border-earth-gold">
            <span className="text-xs font-bold text-earth-linen group-hover:text-earth-gold">M</span>
          </div>
          <div>
            <span className="font-sans text-sm tracking-[0.4em] uppercase font-light text-earth-linen block leading-none">
              Malia
            </span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-earth-gold uppercase block mt-1 font-medium">
              Vibes
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans text-[10px] tracking-[0.3em] uppercase font-medium transition-all relative py-1 ${
                activeSection === item.id
                  ? 'text-earth-gold'
                  : 'text-earth-linen-dark hover:text-earth-linen'
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-earth-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          {/* AI companion button */}
          <button
            onClick={onOpenAICompanion}
            className="p-2 text-earth-linen-dark hover:text-earth-gold transition-colors relative"
            title="Malia's AI Vibe Guide"
            id="nav-btn-ai"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-earth-terracotta rounded-full animate-ping" />
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="p-2 text-earth-linen-dark hover:text-earth-linen transition-colors relative"
            id="nav-btn-cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-earth-terracotta text-earth-linen text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Gateway Toggle */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`p-2 rounded-full transition-all border ${
              isAdmin
                ? 'bg-earth-terracotta/20 border-earth-terracotta text-earth-terracotta'
                : 'border-transparent text-earth-linen-dark hover:text-earth-linen hover:bg-earth-moss-light'
            }`}
            title={isAdmin ? "Exit Artist Dashboard" : "Artist Administrator Portal"}
            id="nav-btn-admin"
          >
            <Shield className="h-5 w-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-earth-linen hover:text-earth-gold transition-colors"
            id="nav-btn-mobile-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-earth-moss border-t border-earth-moss-light py-4 animate-fade-in rounded-lg">
          <div className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-sans text-sm font-semibold tracking-widest uppercase py-2 border-b border-earth-moss-light/30 ${
                  activeSection === item.id ? 'text-earth-gold pl-2 border-l-2 border-earth-gold' : 'text-earth-linen-dark'
                }`}
                id={`nav-item-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
