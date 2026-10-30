/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ServicesAndCalculator } from './components/ServicesAndCalculator';
import { ClientProofingSection } from './components/ClientProofingSection';
import { OwnerDashboardSection } from './components/OwnerDashboardSection';
import {
  INITIAL_BOOKINGS,
  INITIAL_PORTFOLIO_ITEMS,
  INITIAL_PROOFING_FRAMES,
} from './utils/seedData';
import type {
  BookingStatus,
  PortfolioCategory,
  PortfolioItem,
  ProofingFrame,
  StudioBooking,
} from './utils/studioLogic';

export default function App() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(
    INITIAL_PORTFOLIO_ITEMS
  );
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('All Works');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExifOnCards, setShowExifOnCards] = useState(true);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([
    'work-atelier-light',
    'work-wedding-boiserie',
  ]);
  const [activeLightboxItem, setActiveLightboxItem] =
    useState<PortfolioItem | null>(null);

  const [bookings, setBookings] = useState<StudioBooking[]>(INITIAL_BOOKINGS);
  const [proofingFrames, setProofingFrames] = useState<ProofingFrame[]>(
    INITIAL_PROOFING_FRAMES
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleShortlist = (id: string) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAttachToBooking = (item: PortfolioItem) => {
    if (!shortlistedIds.includes(item.id)) {
      setShortlistedIds((prev) => [...prev, item.id]);
    }
    setActiveLightboxItem(null);
    scrollToSection('commissions');
  };

  const handleBookingCreated = (newBooking: StudioBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    nextStatus: BookingStatus
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: nextStatus } : b))
    );
  };

  const handlePublishPortfolioItem = (newItem: PortfolioItem) => {
    setPortfolioItems((prev) => [newItem, ...prev]);
  };

  const handleToggleFrameSelect = (frameId: string) => {
    setProofingFrames((prev) =>
      prev.map((f) =>
        f.id === frameId ? { ...f, clientSelected: !f.clientSelected } : f
      )
    );
  };

  const handleUpdateFrameRating = (frameId: string, rating: number) => {
    setProofingFrames((prev) =>
      prev.map((f) => (f.id === frameId ? { ...f, rating } : f))
    );
  };

  const handleUpdateRetouchNote = (frameId: string, retouchNote: string) => {
    setProofingFrames((prev) =>
      prev.map((f) => (f.id === frameId ? { ...f, retouchNote } : f))
    );
  };

  const shortlistedItems = portfolioItems.filter((item) =>
    shortlistedIds.includes(item.id)
  );
  const pendingBookingsCount = bookings.filter(
    (b) => b.status === 'Pending Review'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      {/* Strict 3-Zone Top Bar */}
      <Navbar onNavigateToSection={scrollToSection} />

      <main className="flex-1">
        {/* Split-Screen Hero + 4-Column Proof Bar */}
        <HeroSection
          featuredWork={portfolioItems[0]}
          shortlistedCount={shortlistedIds.length}
          pendingBookingsCount={pendingBookingsCount}
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onOpenBookingCalculator={() => scrollToSection('commissions')}
          onInspectHeroLightbox={(item) => setActiveLightboxItem(item)}
          onJumpToOwnerPortal={() => scrollToSection('owner-studio')}
        />

        {/* Bento & Masonry Portfolio Exhibition Grid */}
        <PortfolioGallery
          items={portfolioItems}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          showExifOnCards={showExifOnCards}
          onToggleExifOnCards={() => setShowExifOnCards((prev) => !prev)}
          shortlistedIds={shortlistedIds}
          onToggleShortlist={handleToggleShortlist}
          activeLightboxItem={activeLightboxItem}
          onOpenLightbox={(item) => setActiveLightboxItem(item)}
          onCloseLightbox={() => setActiveLightboxItem(null)}
          onAttachToBooking={handleAttachToBooking}
        />

        {/* Attributable Client Testimonials Strip (Adjacent to Portfolio & Commissions) */}
        <section
          aria-label="Client Testimonials"
          className="py-14 bg-white border-b border-zinc-200/80"
        >
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="space-y-3">
              <p className="text-sm font-serif-display italic text-zinc-800 leading-relaxed">
                &ldquo;Before working with Lumière Atelier, our seasonal lookbooks
                required five days of heavy post-production. Their natural daylight
                cyclorama and live Capture One proofing delivered 28 publication-ready
                plates in 48 hours, increasing wholesale showroom orders by +38%.&rdquo;
              </p>
              <footer className="text-xs text-zinc-500">
                <strong className="font-semibold text-zinc-900">
                  Margaux Delacroix
                </strong>{' '}
                · Creative Director, Maison Delacroix Paris
              </footer>
            </blockquote>

            <blockquote className="space-y-3 md:border-l md:border-zinc-200/80 md:pl-8">
              <p className="text-sm font-serif-display italic text-zinc-800 leading-relaxed">
                &ldquo;Their technical tilt-shift perspective control and solar-path
                planning captured our Aarhus concrete pavilion with zero distortion.
                Three plates were selected for the cover dossier of Architectural
                Monograph Quarterly.&rdquo;
              </p>
              <footer className="text-xs text-zinc-500">
                <strong className="font-semibold text-zinc-900">
                  Søren Lindqvist
                </strong>{' '}
                · Principal Architect, Lindqvist &amp; Partners
              </footer>
            </blockquote>

            <blockquote className="space-y-3 md:border-l md:border-zinc-200/80 md:pl-8">
              <p className="text-sm font-serif-display italic text-zinc-800 leading-relaxed">
                &ldquo;The online contact sheet proofing room made selecting our wedding
                cotton-rag prints effortless across three time zones. Every print feels
                like a museum heirloom.&rdquo;
              </p>
              <footer className="text-xs text-zinc-500">
                <strong className="font-semibold text-zinc-900">
                  Camille &amp; Julien Moreau
                </strong>{' '}
                · Private Collectors, Place des Vosges
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Transparent Services, Pricing Calculator & Booking Form */}
        <ServicesAndCalculator
          shortlistedItems={shortlistedItems}
          onRemoveShortlisted={handleToggleShortlist}
          onBookingCreated={handleBookingCreated}
        />

        {/* Interactive Client Contact Sheet Proofing Room */}
        <ClientProofingSection
          frames={proofingFrames}
          onToggleFrameSelect={handleToggleFrameSelect}
          onUpdateFrameRating={handleUpdateFrameRating}
          onUpdateRetouchNote={handleUpdateRetouchNote}
        />

        {/* Studio Owner & Curator Management Portal */}
        <OwnerDashboardSection
          bookings={bookings}
          portfolioCount={portfolioItems.length}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onPublishPortfolioItem={handlePublishPortfolioItem}
        />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-white py-12 border-t border-zinc-200/80 text-xs text-zinc-500">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-base font-serif-display font-semibold text-zinc-950">
              Lumière Atelier — Fine Art &amp; Editorial Photography
            </p>
            <p>
              24 Rue de Turenne, 75003 Paris · 458 Broome St, New York · Minami-Aoyama,
              Tokyo
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('portfolio');
              }}
              className="hover:text-zinc-900 transition-colors"
            >
              Exhibition Archive
            </a>
            <a
              href="#commissions"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('commissions');
              }}
              className="hover:text-zinc-900 transition-colors"
            >
              Commission Calculator
            </a>
            <a
              href="#proofing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('proofing');
              }}
              className="hover:text-zinc-900 transition-colors"
            >
              Client Proofing
            </a>
            <a
              href="#owner-studio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('owner-studio');
              }}
              className="hover:text-zinc-900 transition-colors"
            >
              Owner Portal
            </a>
            <span>© 2026 Lumière Atelier</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
