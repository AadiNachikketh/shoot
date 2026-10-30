import React, { useEffect } from 'react';
import {
  Bookmark,
  Check,
  Expand,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  filterPortfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from '../utils/studioLogic';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  selectedCategory: PortfolioCategory;
  onSelectCategory: (category: PortfolioCategory) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  showExifOnCards: boolean;
  onToggleExifOnCards: () => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
  activeLightboxItem: PortfolioItem | null;
  onOpenLightbox: (item: PortfolioItem) => void;
  onCloseLightbox: () => void;
  onAttachToBooking: (item: PortfolioItem) => void;
}

const CATEGORIES: PortfolioCategory[] = [
  'All Works',
  'Editorial & Fashion',
  'Architecture & Interior',
  'Weddings & Intimate',
  'Commercial Still Life',
];

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchQueryChange,
  showExifOnCards,
  onToggleExifOnCards,
  shortlistedIds,
  onToggleShortlist,
  activeLightboxItem,
  onOpenLightbox,
  onCloseLightbox,
  onAttachToBooking,
}) => {
  const filteredItems = filterPortfolioItems(
    items,
    selectedCategory,
    searchQuery
  );

  // Close lightbox on Escape key
  useEffect(() => {
    if (!activeLightboxItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem, onCloseLightbox]);

  return (
    <section
      id="portfolio"
      aria-label="Curated Photography Exhibition"
      className="scroll-mt-20 py-16 lg:py-24 bg-[#FAFAFA] border-b border-zinc-200/80"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-zinc-200/80">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span>01. Curated Exhibition &amp; Archive</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">
                Showing {filteredItems.length} of {items.length} Works
              </span>
            </div>
            <h2
              className="text-3xl lg:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Selected Monographs &amp; Commissioned Plates
            </h2>
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
              Every photograph is captured in natural daylight or sculpted studio
              strobes. Click any piece to inspect full-resolution optics and EXIF
              lighting notes, or bookmark works to attach a visual moodboard to your
              shoot inquiry.
            </p>
          </div>

          {/* Search & EXIF Toggle Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <label htmlFor="portfolio-search" className="sr-only">
                Search portfolio by title, camera, or city
              </label>
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="portfolio-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Search title, lens, city..."
                className="pl-9 pr-4 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 w-56 transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={onToggleExifOnCards}
              aria-pressed={showExifOnCards}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                showExifOnCards
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showExifOnCards ? 'EXIF Telemetry: On' : 'Show EXIF Data'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Category Segmented Filter Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter portfolio by photography discipline"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-200/60 rounded-xl"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-zinc-500 font-mono-tabular">
            <span>Moodboard Shortlist: {shortlistedIds.length} selected</span>
          </div>
        </div>

        {/* Dynamic Bento & Masonry Exhibition Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-4">
            <p className="text-lg font-serif-display font-medium text-zinc-900">
              No photographic plates match your current filter.
            </p>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Try clearing your search query or switching back to All Works to view the
              complete archive.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All Works');
                onSearchQueryChange('');
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reset Gallery Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {filteredItems.map((item) => {
              const isShortlisted = shortlistedIds.includes(item.id);
              const spanClass =
                item.featuredSpan === 'wide'
                  ? 'md:col-span-2'
                  : item.featuredSpan === 'tall'
                  ? 'lg:row-span-2'
                  : 'col-span-1';

              return (
                <article
                  key={item.id}
                  className={`group bg-white rounded-2xl border border-zinc-200/90 overflow-hidden flex flex-col justify-between transition-colors hover:border-zinc-400 ${spanClass}`}
                >
                  {/* Visual Plate Container: tall cards expand flex-1 so there is zero empty whitespace gap */}
                  <div
                    className={`relative w-full overflow-hidden bg-zinc-100 ${
                      item.featuredSpan === 'tall'
                        ? 'aspect-[3/4] lg:aspect-auto lg:flex-1 lg:min-h-[540px]'
                        : item.featuredSpan === 'wide'
                        ? 'aspect-[16/9] lg:h-[340px]'
                        : 'aspect-[4/3] lg:h-[280px]'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    {/* Top Right Quick Actions: Shortlist & Lightbox Inspect */}
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleShortlist(item.id)}
                        aria-label={
                          isShortlisted
                            ? `Remove ${item.title} from moodboard`
                            : `Add ${item.title} to moodboard`
                        }
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                          isShortlisted
                            ? 'bg-zinc-900 text-white'
                            : 'bg-white/90 text-zinc-900 hover:bg-white border border-zinc-200/80'
                        }`}
                      >
                        {isShortlisted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Shortlisted</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Shortlist</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenLightbox(item)}
                        aria-label={`Inspect ${item.title} in fullscreen lightbox`}
                        className="p-2 bg-white/90 hover:bg-white text-zinc-900 rounded-lg border border-zinc-200/80 backdrop-blur-md transition-colors cursor-pointer"
                      >
                        <Expand className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Optional EXIF Telemetry Strip on Image */}
                    {showExifOnCards && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-3.5 pt-8 text-[11px] text-zinc-100 font-mono-tabular">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span>{item.exif.camera}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.exif.focalLength}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.exif.aperture}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.exif.shutterSpeed}</span>
                          <span aria-hidden="true">·</span>
                          <span>ISO {item.exif.iso}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Gallery Plaque Caption (Zero-Pill Metadata, shrink-0 so tall cards stay tight) */}
                  <div className="p-5 shrink-0 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                        <span className="font-mono-tabular text-zinc-400">
                          {item.seriesCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-xl font-serif-display font-medium text-zinc-950">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono-tabular text-zinc-500 shrink-0">
                          {item.year}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {item.story}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 text-xs">
                      <span className="text-zinc-500 truncate">
                        Client: <strong className="font-medium text-zinc-800">{item.client}</strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => onOpenLightbox(item)}
                        className="font-medium text-zinc-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Inspect Plate &amp; EXIF
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-10 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-5xl w-full overflow-hidden border border-zinc-200 shadow-xl grid grid-cols-1 lg:grid-cols-12">
            {/* High-Resolution Plate Viewer */}
            <div className="lg:col-span-7 bg-zinc-100 flex items-center justify-center min-h-[340px] lg:min-h-[540px] relative">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-10 text-white text-xs font-mono-tabular">
                {activeLightboxItem.seriesCode} · {activeLightboxItem.aspectLabel}
              </div>
            </div>

            {/* Museum Monograph Details & Optical Metadata */}
            <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span>{activeLightboxItem.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeLightboxItem.year}</span>
                    </div>
                    <h3
                      id="lightbox-title"
                      className="text-2xl font-serif-display font-medium text-zinc-950"
                    >
                      {activeLightboxItem.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={onCloseLightbox}
                    aria-label="Close Lightbox"
                    className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {activeLightboxItem.story}
                </p>

                {/* Unboxed Clean Metadata Table */}
                <div className="border-t border-b border-zinc-200 py-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Commissioned Client</span>
                    <span className="font-medium text-zinc-900">
                      {activeLightboxItem.client}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Location</span>
                    <span className="font-medium text-zinc-900">
                      {activeLightboxItem.location}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono-tabular">
                    <span className="text-zinc-500">Camera Body</span>
                    <span className="font-medium text-zinc-900">
                      {activeLightboxItem.exif.camera}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono-tabular">
                    <span className="text-zinc-500">Lens Optics</span>
                    <span className="font-medium text-zinc-900">
                      {activeLightboxItem.exif.lens}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono-tabular">
                    <span className="text-zinc-500">Exposure Settings</span>
                    <span className="font-medium text-zinc-900">
                      {activeLightboxItem.exif.focalLength} ·{' '}
                      {activeLightboxItem.exif.aperture} ·{' '}
                      {activeLightboxItem.exif.shutterSpeed} · ISO{' '}
                      {activeLightboxItem.exif.iso}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-zinc-900">
                    Studio Lighting Architecture
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {activeLightboxItem.exif.lightingSetup}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onAttachToBooking(activeLightboxItem)}
                  className="flex-1 px-4 py-3 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Commission Similar Look (${activeLightboxItem.editionPriceUsd} Print)
                </button>
                <button
                  type="button"
                  onClick={onCloseLightbox}
                  className="px-4 py-3 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
