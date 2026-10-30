import React, { useState } from 'react';
import { Check, CheckCircle2, Clock, Copy, Plus, Share2 } from 'lucide-react';
import { PHOTO_PLATES, type PhotoPlateKey } from '../utils/photoPlates';
import {
  calculateStudioOwnerMetrics,
  type BookingStatus,
  type PortfolioCategory,
  type PortfolioItem,
  type StudioBooking,
} from '../utils/studioLogic';

interface OwnerDashboardSectionProps {
  bookings: StudioBooking[];
  portfolioCount: number;
  onUpdateBookingStatus: (bookingId: string, nextStatus: BookingStatus) => void;
  onPublishPortfolioItem: (newItem: PortfolioItem) => void;
}

const PUBLIC_SHARE_URL =
  'https://ais-pre-opmnupgb6fxlagmsfgozdu-661232155875.asia-southeast1.run.app';

const PLATE_OPTIONS: { key: PhotoPlateKey; label: string }[] = [
  { key: 'heroStudio', label: 'Alabaster Studio Daylight Portrait' },
  { key: 'fashionMonolith', label: 'Limestone Courtyard Fashion Study' },
  { key: 'architectureNordic', label: 'Nordic Concrete Pavilion Reflection' },
  { key: 'weddingEditorial', label: 'Parisian Boiserie Bridal Study' },
  { key: 'botanicalFragrance', label: 'Crystal Flacon & Plaster Caustics' },
  { key: 'coastalHorizon', label: 'Baltic Long-Exposure Seascape' },
  { key: 'ceramicSculpture', label: 'Cycladic Porcelain Vessels' },
];

export const OwnerDashboardSection: React.FC<OwnerDashboardSectionProps> = ({
  bookings,
  portfolioCount,
  onUpdateBookingStatus,
  onPublishPortfolioItem,
}) => {
  const metrics = calculateStudioOwnerMetrics(bookings, portfolioCount);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // State for Owner's "Publish New Artwork to Portfolio" form
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newLocation, setNewLocation] = useState('Paris · 3e Arrondissement');
  const [newCategory, setNewCategory] =
    useState<Exclude<PortfolioCategory, 'All Works'>>('Editorial & Fashion');
  const [selectedPlate, setSelectedPlate] =
    useState<PhotoPlateKey>('ceramicSculpture');
  const [newPrice, setNewPrice] = useState('1500');
  const [publishError, setPublishError] = useState('');
  const [publishSuccess, setPublishSuccess] = useState('');

  const handleCopyPublicUrl = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PUBLIC_SHARE_URL);
      }
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 3000);
    } catch {
      setCopiedShareLink(true);
    }
  };

  const handlePublishArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim().length < 3 || newClient.trim().length < 2) {
      setPublishError(
        'Please enter both an artwork title (min 3 chars) and commissioned client.'
      );
      setPublishSuccess('');
      return;
    }

    setPublishError('');
    const nextNumber = String(portfolioCount + 1).padStart(2, '0');
    const createdItem: PortfolioItem = {
      id: `work-custom-${Date.now()}`,
      title: newTitle.trim(),
      seriesCode: `SERIES ${nextNumber}`,
      category: newCategory,
      location: newLocation.trim() || 'Paris Studio',
      year: 2026,
      client: newClient.trim(),
      featuredSpan: 'standard',
      imageUrl: PHOTO_PLATES[selectedPlate],
      aspectLabel: '4:3 Medium Format Plate',
      story: `Newly curated monograph plate commissioned by ${newClient.trim()}, photographed in natural architectural light.`,
      exif: {
        camera: 'Hasselblad X2D 100C',
        lens: 'XCD 55V f/2.5',
        focalLength: '55mm',
        aperture: 'f/4.0',
        shutterSpeed: '1/500s',
        iso: 64,
        lightingSetup: 'Natural daylight + sculpted negative fill',
      },
      editionPriceUsd: Number(newPrice) || 1500,
    };

    onPublishPortfolioItem(createdItem);
    setPublishSuccess(
      `"${createdItem.title}" has been published to the live Portfolio Exhibition above.`
    );
    setNewTitle('');
    setNewClient('');
  };

  return (
    <section
      id="owner-studio"
      aria-label="Studio Owner and Curator Management Portal"
      className="scroll-mt-20 py-16 lg:py-24 bg-white border-b border-zinc-200/80"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span>04. Studio Owner &amp; Curator Desk</span>
              <span aria-hidden="true">·</span>
              <span>Production &amp; Revenue Overview</span>
            </div>
            <h2
              className="text-3xl lg:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Studio Owner Command Center — Bookings, Retainers &amp; Live Curation
            </h2>
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
              Designed so the studio owner can immediately review incoming client
              inquiries, advance shoot statuses from Pending Review to Confirmed, and
              publish new exhibition plates to the gallery.
            </p>
          </div>

          <div className="text-xs font-mono-tabular text-zinc-500">
            <span>Active Studio Season: Autumn / Winter 2026</span>
          </div>
        </div>

        {/* Public Discord & Client Share Link Bar (Prevents Sharing Private ais-dev URL) */}
        <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
              <Share2 className="w-3.5 h-3.5 text-zinc-700" />
              <span>Public Discord &amp; Client Share Link (OpenGraph Ready)</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              When sharing on Discord or with clients, always use the public{' '}
              <code className="font-mono-tabular text-zinc-900">ais-pre</code> URL
              below (the private <code className="font-mono-tabular">ais-dev</code>{' '}
              preview URL requires your personal login cookie and appears blank to
              other people).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <input
              type="text"
              readOnly
              aria-label="Public Share URL for Discord"
              value={PUBLIC_SHARE_URL}
              className="px-3.5 py-2 text-xs font-mono-tabular bg-white border border-zinc-200 rounded-lg text-zinc-800 w-full sm:w-80 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyPublicUrl}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              {copiedShareLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Public Link</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Discord Share URL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4-Column Owner Financial & Pipeline KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90">
            <p className="text-xs text-zinc-500">Total Commission Pipeline</p>
            <p className="mt-2 text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              ${metrics.totalPipelineUsd.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-zinc-500 font-mono-tabular">
              Across {metrics.totalBookings} active bookings · Avg $
              {metrics.avgCommissionUsd.toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90">
            <p className="text-xs text-zinc-500">Confirmed Shoot Revenue</p>
            <p className="mt-2 text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              ${metrics.confirmedRevenueUsd.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-zinc-500 font-mono-tabular">
              Retainers collected: ${metrics.totalRetainersUsd.toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90">
            <p className="text-xs text-zinc-500">Inquiries Pending Owner Review</p>
            <p className="mt-2 text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              {metrics.pendingReviewCount}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {metrics.confirmedCount} shoots locked on calendar
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90">
            <p className="text-xs text-zinc-500">Published Exhibition Plates</p>
            <p className="mt-2 text-3xl font-serif-display font-semibold text-zinc-950 tabular-nums">
              {metrics.portfolioCount} Works
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Live in public portfolio archive
            </p>
          </div>
        </div>

        {/* Two-Column Owner Workspace: Booking Queue (7 cols) + Publish New Plate Form (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (7 cols): Incoming Commission Ledger */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif-display font-medium text-zinc-950">
                Commission Bookings &amp; Retainer Queue
              </h3>
              <span className="text-xs text-zinc-500 font-mono-tabular">
                Click status actions to update live ledger
              </span>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono-tabular">
                        <span className="font-semibold text-zinc-900">
                          {booking.referenceCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Shoot Date: {booking.preferredDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{booking.locationCity}</span>
                      </div>
                      <h4 className="text-lg font-serif-display font-medium text-zinc-950">
                        {booking.clientName} — {booking.companyOrPublication}
                      </h4>
                      <p className="text-xs text-zinc-500">
                        {booking.packageName} · {booking.shortlistedCount} moodboard
                        reference(s) attached
                      </p>
                    </div>

                    <div className="text-right font-mono-tabular">
                      <p className="text-base font-semibold text-zinc-950">
                        ${booking.totalQuoteUsd.toLocaleString()}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Retainer: ${booking.retainerDepositUsd.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed border-t border-zinc-200/80 pt-3">
                    {booking.projectNotes}
                  </p>

                  {/* Status Indicator (With Icon + Text for Accessibility) & Owner Transitions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="inline-flex items-center gap-1.5 font-medium text-zinc-800">
                      {booking.status === 'Pending Review' ? (
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      )}
                      <span>Status: {booking.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {(['Pending Review', 'Confirmed', 'Completed'] as BookingStatus[]).map(
                        (statusOption) => (
                          <button
                            key={statusOption}
                            type="button"
                            onClick={() =>
                              onUpdateBookingStatus(booking.id, statusOption)
                            }
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                              booking.status === statusOption
                                ? 'bg-zinc-900 text-white'
                                : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                            }`}
                          >
                            {statusOption}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Publish New Artwork Plate to Public Portfolio */}
          <div className="lg:col-span-5 bg-[#FAFAFA] rounded-2xl border border-zinc-200/90 p-6 lg:p-8 space-y-5">
            <div className="space-y-1.5 border-b border-zinc-200 pb-4">
              <h3 className="text-xl font-serif-display font-medium text-zinc-950">
                Curator Tool — Publish Plate to Gallery
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Add a newly completed commission directly to the public Portfolio
                Exhibition grid above.
              </p>
            </div>

            {publishError && (
              <p className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {publishError}
              </p>
            )}
            {publishSuccess && (
              <p
                role="status"
                className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800"
              >
                {publishSuccess}
              </p>
            )}

            <form onSubmit={handlePublishArtwork} className="space-y-4">
              <div>
                <label
                  htmlFor="owner-work-title"
                  className="block text-xs font-medium text-zinc-800 mb-1"
                >
                  Artwork Plate Title *
                </label>
                <input
                  id="owner-work-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Travertine Sun Study VII"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="owner-work-client"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Commissioned Client *
                  </label>
                  <input
                    id="owner-work-client"
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="e.g. Architectural Digest"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="owner-work-location"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="owner-work-location"
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="owner-work-category"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Exhibition Category
                  </label>
                  <select
                    id="owner-work-category"
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(
                        e.target.value as Exclude<PortfolioCategory, 'All Works'>
                      )
                    }
                    className="w-full px-3 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                  >
                    <option value="Editorial & Fashion">Editorial &amp; Fashion</option>
                    <option value="Architecture & Interior">
                      Architecture &amp; Interior
                    </option>
                    <option value="Weddings & Intimate">
                      Weddings &amp; Intimate
                    </option>
                    <option value="Commercial Still Life">
                      Commercial Still Life
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="owner-work-price"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Archival Print Price (USD)
                  </label>
                  <input
                    id="owner-work-price"
                    type="number"
                    min={400}
                    step={50}
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 font-mono-tabular focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="owner-plate-select"
                  className="block text-xs font-medium text-zinc-800 mb-1"
                >
                  Select Tethered Master Negative
                </label>
                <select
                  id="owner-plate-select"
                  value={selectedPlate}
                  onChange={(e) =>
                    setSelectedPlate(e.target.value as PhotoPlateKey)
                  }
                  className="w-full px-3 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                >
                  {PLATE_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Artwork to Exhibition Grid</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
