import React, { useState } from 'react';
import { ArrowUpRight, Camera, Eye, Sliders } from 'lucide-react';
import type { PortfolioItem } from '../utils/studioLogic';

interface HeroSectionProps {
  featuredWork: PortfolioItem;
  shortlistedCount: number;
  pendingBookingsCount: number;
  onExplorePortfolio: () => void;
  onOpenBookingCalculator: () => void;
  onInspectHeroLightbox: (item: PortfolioItem) => void;
  onJumpToOwnerPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredWork,
  shortlistedCount,
  pendingBookingsCount,
  onExplorePortfolio,
  onOpenBookingCalculator,
  onInspectHeroLightbox,
  onJumpToOwnerPortal,
}) => {
  const [showTechnicalOverlay, setShowTechnicalOverlay] = useState(false);

  return (
    <section
      id="top"
      aria-label="Studio Introduction"
      className="bg-white border-b border-zinc-200/80"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-10 pb-12 lg:py-16">
        {/* Split-Screen Hero: Left Typographic Hierarchy, Right Matching-Height Visual Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column (7 cols): Clear Purpose for Customers & Studio Owner */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-6">
              {/* Unboxed clean metadata kicker with typographic separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
                <span>Daylight Photography Studio & Print Archive</span>
                <span aria-hidden="true">·</span>
                <span>Paris</span>
                <span aria-hidden="true">/</span>
                <span>New York</span>
                <span aria-hidden="true">/</span>
                <span>Tokyo</span>
              </div>

              <h1
                className="font-serif-display font-medium tracking-tight text-zinc-950 leading-[1.06]"
                style={{
                  fontSize: 'clamp(2.5rem, 4.2vw, 4.1rem)',
                  textWrap: 'balance',
                }}
              >
                Sculpting natural light into timeless editorial &amp; architectural monographs.
              </h1>

              <p className="text-base lg:text-[17px] text-zinc-600 leading-relaxed max-w-[62ch]">
                Lumière Atelier is a full-service fine-art photography house.{' '}
                <strong className="font-semibold text-zinc-900">
                  For clients &amp; art directors:
                </strong>{' '}
                explore our curated works, build a visual moodboard, calculate instant
                commission pricing, and proof contact sheets online.{' '}
                <strong className="font-semibold text-zinc-900">
                  For the studio owner:
                </strong>{' '}
                manage live booking retainers, review client print selects, and publish
                new plates in one unified white-gallery workspace.
              </p>

              {/* Clear Role Orientation Guide (Unboxed editorial list, zero pills) */}
              <div className="pt-2 pb-1 border-t border-b border-zinc-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="py-2">
                  <p className="text-xs font-medium text-zinc-400">
                    01. For Clients &amp; Brands
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">
                    Browse EXIF-verified galleries, shortlist reference shots, and lock in
                    transparent shoot packages.
                  </p>
                </div>
                <div className="py-2 sm:border-l sm:border-zinc-200/80 sm:pl-5">
                  <p className="text-xs font-medium text-zinc-400">
                    02. For the Studio Owner
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">
                    Track incoming commission retainers, approve client contact sheets,
                    and curate the live exhibition grid.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary CTA + Secondary Action */}
            <div className="pt-8 space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBookingCalculator}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Calculate Quote &amp; Book Shoot</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="px-5 py-3.5 text-sm font-medium text-zinc-800 bg-zinc-100/80 hover:bg-zinc-200/70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore Selected Works
                </button>

                <button
                  type="button"
                  onClick={onJumpToOwnerPortal}
                  className="px-3 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-950 underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Open Owner Desk ({pendingBookingsCount} pending)
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono-tabular">
                <span>100MP Medium Format Capture</span>
                <span aria-hidden="true">·</span>
                <span>48-Hour Contact Sheet Delivery</span>
                <span aria-hidden="true">·</span>
                <span>Shortlisted Moodboard: {shortlistedCount} works</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Matching-Height Flagship Photograph Container */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[420px] lg:h-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/90 group">
              <img
                src={featuredWork.imageUrl}
                alt={featuredWork.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
              />

              {/* Top Controls Bar on Image (Functional Interactive Buttons) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowTechnicalOverlay((prev) => !prev)}
                  className="px-3.5 py-2 text-xs font-medium bg-white/92 backdrop-blur-md text-zinc-900 rounded-lg border border-zinc-200/80 hover:bg-white transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5 text-zinc-700" />
                  <span>
                    {showTechnicalOverlay ? 'Hide Lighting Diagram' : 'Inspect EXIF & Lighting'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onInspectHeroLightbox(featuredWork)}
                  className="px-3.5 py-2 text-xs font-medium bg-zinc-900/90 backdrop-blur-md text-white rounded-lg hover:bg-zinc-900 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Full Plate</span>
                </button>
              </div>

              {/* Conditional Technical EXIF & Studio Lighting Breakdown Overlay */}
              {showTechnicalOverlay && (
                <div className="absolute inset-x-4 top-16 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-zinc-200 text-xs text-zinc-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                    <span className="font-semibold text-zinc-950">
                      Optical &amp; Lighting Telemetry — {featuredWork.seriesCode}
                    </span>
                    <span className="font-mono-tabular text-zinc-500">
                      {featuredWork.aspectLabel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-mono-tabular">
                    <div>
                      <span className="block text-[11px] text-zinc-400">Camera System</span>
                      <span className="font-medium text-zinc-900">{featuredWork.exif.camera}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-zinc-400">Optical Lens</span>
                      <span className="font-medium text-zinc-900">{featuredWork.exif.lens}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-zinc-400">Exposure</span>
                      <span className="font-medium text-zinc-900">
                        {featuredWork.exif.aperture} · {featuredWork.exif.shutterSpeed}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-zinc-400">Sensitivity</span>
                      <span className="font-medium text-zinc-900">ISO {featuredWork.exif.iso}</span>
                    </div>
                  </div>
                  <p className="text-zinc-600 pt-1 border-t border-zinc-100">
                    <strong className="text-zinc-900">Lighting Diagram:</strong>{' '}
                    {featuredWork.exif.lightingSetup}
                  </p>
                </div>
              )}

              {/* Measured Scrim for Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-6 pt-16 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-200 font-mono-tabular">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{featuredWork.exif.camera}</span>
                      <span aria-hidden="true">·</span>
                      <span>{featuredWork.exif.focalLength}</span>
                      <span aria-hidden="true">·</span>
                      <span>{featuredWork.exif.aperture}</span>
                    </div>
                    <h2 className="text-xl font-serif-display font-medium text-white">
                      {featuredWork.title}
                    </h2>
                    <p className="text-xs text-zinc-200">
                      Commissioned by {featuredWork.client} · {featuredWork.location}
                    </p>
                  </div>
                  <span className="text-xs font-mono-tabular text-zinc-200 shrink-0">
                    Archival Print ${featuredWork.editionPriceUsd.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof & Studio Metrics Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-zinc-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-2xl lg:text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              148 Commissions
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Delivered across fashion houses, architectural monographs &amp; private collectors
              (2021–2026)
            </p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              150 Megapixels
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              16-bit Phase One XF &amp; Hasselblad X2D medium format digital and 120 film capture
            </p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              48-Hour Proofing
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Color-calibrated online contact sheets ready for client &amp; art director selection
            </p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              200-Year Archival
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Museum-grade pigment prints on 310gsm Hahnemühle cotton rag with signed certificate
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Editorial Marquee Ribbon Divider */}
      <div className="overflow-hidden border-t border-zinc-200/80 bg-[#FAFAFA] py-3 text-xs tracking-wide text-zinc-500 select-none">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <span>editorial &amp; high-fashion campaigns</span>
          <span aria-hidden="true">·</span>
          <span>architectural &amp; spatial monographs</span>
          <span aria-hidden="true">·</span>
          <span>fine-art weddings &amp; private portraits</span>
          <span aria-hidden="true">·</span>
          <span>luxury fragrance &amp; still-life studies</span>
          <span aria-hidden="true">·</span>
          <span>tethered capture one studio workflow</span>
          <span aria-hidden="true">·</span>
          <span>museum-grade cotton rag printmaking</span>
          <span aria-hidden="true">·</span>
          <span>editorial &amp; high-fashion campaigns</span>
          <span aria-hidden="true">·</span>
          <span>architectural &amp; spatial monographs</span>
          <span aria-hidden="true">·</span>
          <span>fine-art weddings &amp; private portraits</span>
          <span aria-hidden="true">·</span>
          <span>luxury fragrance &amp; still-life studies</span>
          <span aria-hidden="true">·</span>
          <span>tethered capture one studio workflow</span>
          <span aria-hidden="true">·</span>
          <span>museum-grade cotton rag printmaking</span>
        </div>
      </div>
    </section>
  );
};
