import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Facebook, Twitter, Disc, CheckCircle2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<'booking' | 'press' | 'management' | 'general'>('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Newsletter fields
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitSuccess(true);
        setSuccessMessage(resData.message);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error("Message submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16 animate-fade-in" id="contact-section">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-earth-gold">CORRESPONDENCE</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-linen uppercase tracking-wider">Contact & Connect</h2>
        <div className="w-12 h-[1.5px] bg-earth-terracotta mx-auto" />
        <p className="max-w-xl mx-auto font-serif italic text-earth-linen-dark text-xs md:text-sm leading-relaxed opacity-80">
          "For bookings, press features, creative collaborations, or general inquiries, please let us know your story."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contacts & Social Links & Newsletter */}
        <div className="lg:col-span-5 space-y-8">
          {/* Direct Contacts Block */}
          <div className="bg-[#161412] border border-earth-linen/10 rounded-none p-6 space-y-6 shadow-xl">
            <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">Representation</h3>
            <div className="space-y-4 text-xs md:text-sm text-earth-linen-dark">
              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-earth-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-earth-gold">Management</p>
                  <p className="font-sans font-semibold text-earth-linen mt-0.5">manger@maliavibes.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-earth-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-earth-gold">Booking Inquiries</p>
                  <p className="font-sans font-semibold text-earth-linen mt-0.5">bookings@maliavibes.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-earth-linen-dark flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-earth-gold">Press Relations</p>
                  <p className="font-sans font-semibold text-earth-linen mt-0.5">press@maliavibes.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="bg-[#161412] border border-earth-linen/10 rounded-none p-6 space-y-4 shadow-xl">
            <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">The Community</h3>
            <p className="text-xs text-earth-linen-dark leading-relaxed opacity-80">
              Sign up for the official newsletter. Receive intimate journaling updates, exclusive album pre-releases, and concert ticket presale access code.
            </p>

            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  required
                  type="email"
                  placeholder="Your Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-xs text-earth-linen focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark font-mono text-xs uppercase tracking-widest rounded-none transition-colors cursor-pointer font-bold"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="bg-[#1A1816] border border-earth-linen/10 p-3.5 rounded-none flex items-center space-x-2 animate-fade-in">
                <CheckCircle2 className="h-5 w-5 text-earth-gold" />
                <span className="text-xs font-mono text-earth-linen">Subscribed with love! Check your inbox soon.</span>
              </div>
            )}
          </div>

          {/* Social Platforms Panel */}
          <div className="bg-[#161412] border border-earth-linen/10 rounded-none p-6 space-y-5 shadow-xl">
            <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">Social Channels</h3>

            {/* Highly prominent Linktree connect button */}
            <a
              href={SOCIAL_LINKS.linktree}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full p-4 bg-[#1A1816] hover:bg-[#22201E] border border-earth-linen/10 hover:border-earth-gold transition-all duration-300 group cursor-pointer"
              title="Official Linktree"
            >
              <div className="flex items-center space-x-3.5">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <div className="text-left">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-earth-gold font-bold">Official Linktree</p>
                  <p className="font-sans text-[11px] text-earth-linen-dark group-hover:text-earth-linen mt-0.5">linktr.ee/MALIA_</p>
                </div>
              </div>
              <span className="text-earth-linen-dark group-hover:text-earth-gold font-mono text-[10px] tracking-widest uppercase font-bold flex items-center space-x-1">
                <span>VISIT</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#1A1816] border border-earth-linen/10 rounded-none hover:text-earth-terracotta hover:border-earth-terracotta transition-all text-earth-linen"
                title="Spotify"
              >
                <Disc className="h-5 w-5 text-green-500 animate-spin-slow" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#1A1816] border border-earth-linen/10 rounded-none hover:text-earth-terracotta hover:border-earth-terracotta transition-all text-earth-linen"
                title="Instagram"
              >
                <Instagram className="h-5 w-5 text-[#E1306C]" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#1A1816] border border-earth-linen/10 rounded-none hover:text-earth-terracotta hover:border-earth-terracotta transition-all text-earth-linen"
                title="YouTube"
              >
                <Youtube className="h-5 w-5 text-[#FF0000]" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#1A1816] border border-earth-linen/10 rounded-none hover:text-earth-terracotta hover:border-earth-terracotta transition-all text-earth-linen"
                title="Facebook"
              >
                <Facebook className="h-5 w-5 text-[#1877F2]" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#1A1816] border border-earth-linen/10 rounded-none hover:text-earth-terracotta hover:border-earth-terracotta transition-all text-earth-linen"
                title="Twitter / X"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: General / Booking Contact Form */}
        <div className="lg:col-span-7 bg-[#161412] border border-earth-linen/10 rounded-none p-6 md:p-8 shadow-xl">
          <h3 className="font-serif text-xl font-bold text-earth-linen uppercase tracking-wider mb-6 pb-2 border-b border-earth-linen/10">
            Write a Message
          </h3>

          {!submitSuccess ? (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Inquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as any)}
                  className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                >
                  <option value="general">General Inquiries</option>
                  <option value="booking">Booking / Concert Inquiry</option>
                  <option value="press">Press / Media Coverage</option>
                  <option value="management">Management Cooperation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Your Message</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Share details regarding your inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark font-sans font-bold text-xs tracking-[0.2em] uppercase rounded-none flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-6 animate-fade-in">
              <CheckCircle2 className="h-16 w-16 text-earth-gold mx-auto animate-bounce" />
              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="font-serif text-2xl font-bold text-earth-linen uppercase tracking-wider">Message Delivered</h4>
                <p className="text-sm text-earth-linen-dark leading-relaxed opacity-90">
                  {successMessage}
                </p>
              </div>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-5 py-2.5 bg-[#1A1816] border border-earth-linen/10 hover:border-earth-terracotta text-earth-gold font-mono text-xs uppercase tracking-widest rounded-none cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
