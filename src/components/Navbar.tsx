import React from 'react';

interface NavbarProps {
  onNavigateToSection: (sectionId: string) => void;
}

/**
 * Strict 3-Zone Top Bar Contract:
 * [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
 */
export const Navbar: React.FC<NavbarProps> = ({ onNavigateToSection }) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200/80">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-2xl font-semibold tracking-tight text-zinc-900 font-serif-display whitespace-nowrap shrink-0"
      >
        Lumière Atelier
      </a>

      {/* Zone 2: 4 concise single-line text navigation links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600"
      >
        <a
          href="#portfolio"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection('portfolio');
          }}
          className="hover:text-zinc-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Portfolio
        </a>
        <a
          href="#commissions"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection('commissions');
          }}
          className="hover:text-zinc-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Commissions
        </a>
        <a
          href="#proofing"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection('proofing');
          }}
          className="hover:text-zinc-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Client Proofing
        </a>
        <a
          href="#owner-studio"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection('owner-studio');
          }}
          className="hover:text-zinc-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Studio Portal
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={() => onNavigateToSection('commissions')}
          className="px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Book a Session
        </button>
      </div>
    </header>
  );
};
