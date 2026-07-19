import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { socialLinks } from "@/lib/data/social";

const FOOTER_LINKS = [
  { href: "/music", label: "Music" },
  { href: "/gallery", label: "Gallery" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/shop", label: "Shop" },
];

const CONTACT_LINKS = [
  { href: "/contact?type=booking", label: "Booking inquiries" },
  { href: "/contact?type=press", label: "Press inquiries" },
  { href: "/contact?type=general", label: "General contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-parchment-muted/10 bg-ink-soft">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-signature italic text-3xl text-parchment">Malia</p>
            <p className="mt-4 max-w-sm text-sm text-parchment-muted">
              Songs written like diary entries, produced like they mean it. Join the
              newsletter for tour presales and new music first.
            </p>
            <form className="mt-6 flex max-w-sm gap-2" aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-parchment-muted/30 bg-transparent px-4 py-2 text-sm text-parchment placeholder:text-parchment-muted/60 focus:border-flare focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-flare px-5 py-2 text-sm font-semibold text-ink hover:bg-flare-soft transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted mb-4">
              Explore
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-parchment/85 hover:text-flare transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-parchment-muted mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-parchment/85 hover:text-flare transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-parchment-muted/10 pt-8">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-parchment-muted hover:text-flare transition-colors"
            >
              {link.label}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs text-parchment-muted/70">
          &copy; {new Date().getFullYear()} Malia. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
