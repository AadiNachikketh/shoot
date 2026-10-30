import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import {
  COMMISSION_PACKAGES,
  calculateCommissionQuote,
  validateBookingSubmission,
  type PackageId,
  type PortfolioItem,
  type QuoteConfiguration,
  type StudioBooking,
} from '../utils/studioLogic';

interface ServicesAndCalculatorProps {
  shortlistedItems: PortfolioItem[];
  onRemoveShortlisted: (id: string) => void;
  onBookingCreated: (newBooking: StudioBooking) => void;
}

export const ServicesAndCalculator: React.FC<ServicesAndCalculatorProps> = ({
  shortlistedItems,
  onRemoveShortlisted,
  onBookingCreated,
}) => {
  const [quoteConfig, setQuoteConfig] = useState<QuoteConfiguration>({
    packageId: 'editorial',
    totalHours: 4,
    includeArchivalPrints: false,
    includeRawTetherArchive: false,
    expressTurnaround48h: false,
    usageLicense: 'personal_editorial',
  });

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyOrPublication, setCompanyOrPublication] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-11-20');
  const [locationCity, setLocationCity] = useState('Paris Daylight Studio');
  const [projectNotes, setProjectNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>(
    {}
  );
  const [lastSubmittedBooking, setLastSubmittedBooking] =
    useState<StudioBooking | null>(null);

  const selectedPackage =
    COMMISSION_PACKAGES.find((p) => p.id === quoteConfig.packageId) ??
    COMMISSION_PACKAGES[0];
  const quoteBreakdown = calculateCommissionQuote(quoteConfig);

  const handleSelectPackage = (pkgId: PackageId) => {
    const targetPkg =
      COMMISSION_PACKAGES.find((p) => p.id === pkgId) ?? COMMISSION_PACKAGES[0];
    setQuoteConfig((prev) => ({
      ...prev,
      packageId: pkgId,
      totalHours: Math.max(targetPkg.includedHours, prev.totalHours),
    }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingSubmission({
      clientName,
      clientEmail,
      companyOrPublication,
      preferredDate,
      locationCity,
      projectNotes,
      quoteConfig,
      shortlistedWorkIds: shortlistedItems.map((i) => i.id),
    });

    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors({});
    const refNumber = Math.floor(860 + Math.random() * 130);
    const newBooking: StudioBooking = {
      id: `booking-${Date.now()}`,
      referenceCode: `LUM-2026-${refNumber}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      companyOrPublication:
        companyOrPublication.trim() || 'Private Commission',
      packageName: selectedPackage.name,
      preferredDate: preferredDate.trim(),
      locationCity: locationCity.trim(),
      totalQuoteUsd: quoteBreakdown.subtotalUsd,
      retainerDepositUsd: quoteBreakdown.retainerDepositUsd,
      status: 'Pending Review',
      shortlistedCount: shortlistedItems.length,
      projectNotes: projectNotes.trim(),
      createdAt: '2026-10-30',
    };

    onBookingCreated(newBooking);
    setLastSubmittedBooking(newBooking);
    setClientName('');
    setClientEmail('');
    setCompanyOrPublication('');
    setProjectNotes('');
  };

  return (
    <section
      id="commissions"
      aria-label="Services, Transparent Packages, and Commission Calculator"
      className="scroll-mt-20 py-16 lg:py-24 bg-white border-b border-zinc-200/80"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-16">
        {/* How the Studio Works: 3 Clear Editorial Pillars for Clients & Owners */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span>02. Production Architecture &amp; Pricing</span>
              <span aria-hidden="true">·</span>
              <span>Transparent Commission Rates</span>
            </div>
            <h2
              className="text-3xl lg:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              How Every Commission Unfolds — From First Moodboard to Archival Print
            </h2>
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
              We eliminate opaque agency markups. Both clients and our studio
              production desk share the exact same scope, lighting blueprint, and
              deliverable schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-zinc-200">
            <div className="space-y-2">
              <p className="text-xs font-mono-tabular text-zinc-400">
                01. Direction &amp; Lighting Pre-Visualisation
              </p>
              <h3 className="text-lg font-semibold text-zinc-900">
                Shortlist Plates &amp; Lock Sun-Path Schedule
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Select reference frames from our exhibition archive. Our producer maps
                natural daylight angles or Profoto studio modifiers 72 hours prior to
                call time.
              </p>
            </div>

            <div className="space-y-2 md:border-l md:border-zinc-200/80 md:pl-8">
              <p className="text-xs font-mono-tabular text-zinc-400">
                02. Tethered Medium-Format Capture
              </p>
              <h3 className="text-lg font-semibold text-zinc-900">
                Real-Time Client &amp; Art Director Review
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Every frame is captured at 100–150MP on Phase One or Hasselblad systems,
                streaming live to calibrated iPad Pro &amp; Eizo monitors on set.
              </p>
            </div>

            <div className="space-y-2 md:border-l md:border-zinc-200/80 md:pl-8">
              <p className="text-xs font-mono-tabular text-zinc-400">
                03. Online Proofing &amp; Museum Print Delivery
              </p>
              <h3 className="text-lg font-semibold text-zinc-900">
                48-Hour Contact Sheet &amp; 16-Bit Master Files
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Rate frames and leave retouching notes directly in our Client Proofing
                Room before receiving master TIFFs and signed Hahnemühle cotton prints.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Split: Package Selection & Live Quote Calculator + Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (7 cols): Interactive Package Cards & Scope Configurator */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-serif-display font-medium text-zinc-950">
                Step 1 — Select Commission Discipline
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMMISSION_PACKAGES.map((pkg) => {
                  const isSelected = quoteConfig.packageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => handleSelectPackage(pkg.id)}
                      className={`text-left p-5 rounded-2xl border transition-colors flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-[#FAFAFA] text-zinc-900 border-zinc-200/90 hover:border-zinc-400'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-base font-serif-display font-medium">
                            {pkg.name}
                          </span>
                          <span
                            className={`text-sm font-mono-tabular font-semibold shrink-0 ${
                              isSelected ? 'text-white' : 'text-zinc-900'
                            }`}
                          >
                            ${pkg.baseRateUsd.toLocaleString()}
                          </span>
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${
                            isSelected ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          {pkg.subtitle}
                        </p>
                      </div>

                      <div
                        className={`mt-4 pt-3 border-t text-[11px] font-mono-tabular flex items-center justify-between ${
                          isSelected
                            ? 'border-zinc-800 text-zinc-300'
                            : 'border-zinc-200 text-zinc-500'
                        }`}
                      >
                        <span>{pkg.includedHours} hrs included</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.includedRetouchedFrames} master plates</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.turnaroundDays}d delivery</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Included Deliverables for Selected Package */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-zinc-900">
                  Included in {selectedPackage.name}
                </h4>
                <span className="text-xs font-mono-tabular text-zinc-500">
                  +${selectedPackage.additionalHourRateUsd}/hr beyond{' '}
                  {selectedPackage.includedHours} hours
                </span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-700">
                {selectedPackage.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 2: Tailor Shoot Duration & Archival Add-Ons */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="shoot-hours-range"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Step 2 — Production Duration ({quoteConfig.totalHours} Hours on Set)
                  </label>
                  <span className="text-xs font-mono-tabular text-zinc-600">
                    Est. {quoteBreakdown.estimatedFrames} Retouched Plates
                  </span>
                </div>
                <input
                  id="shoot-hours-range"
                  type="range"
                  min={selectedPackage.includedHours}
                  max={14}
                  step={1}
                  value={quoteConfig.totalHours}
                  onChange={(e) =>
                    setQuoteConfig((prev) => ({
                      ...prev,
                      totalHours: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-zinc-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono-tabular text-zinc-400">
                  <span>{selectedPackage.includedHours}h (Base Package)</span>
                  <span>8h (Full Day)</span>
                  <span>14h (Extended Multi-Set)</span>
                </div>
              </div>

              {/* Production Add-Ons Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-zinc-200">
                <p className="text-xs font-semibold text-zinc-900">
                  Optional Production &amp; Archival Upgrades
                </p>

                <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={quoteConfig.includeArchivalPrints}
                      onChange={(e) =>
                        setQuoteConfig((prev) => ({
                          ...prev,
                          includeArchivalPrints: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 accent-zinc-900 rounded"
                    />
                    <span className="text-xs font-medium text-zinc-900">
                      Hahnemühle 310gsm Museum Folio Box (10 Signed Prints)
                    </span>
                  </div>
                  <span className="text-xs font-mono-tabular text-zinc-600 shrink-0">
                    +$650
                  </span>
                </label>

                <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={quoteConfig.includeRawTetherArchive}
                      onChange={(e) =>
                        setQuoteConfig((prev) => ({
                          ...prev,
                          includeRawTetherArchive: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 accent-zinc-900 rounded"
                    />
                    <span className="text-xs font-medium text-zinc-900">
                      Complete 16-Bit RAW Capture One SSD Drive Delivery
                    </span>
                  </div>
                  <span className="text-xs font-mono-tabular text-zinc-600 shrink-0">
                    +$480
                  </span>
                </label>

                <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={quoteConfig.expressTurnaround48h}
                      onChange={(e) =>
                        setQuoteConfig((prev) => ({
                          ...prev,
                          expressTurnaround48h: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 accent-zinc-900 rounded"
                    />
                    <span className="text-xs font-medium text-zinc-900">
                      Priority 48-Hour Master Color Grading Turnaround
                    </span>
                  </div>
                  <span className="text-xs font-mono-tabular text-zinc-600 shrink-0">
                    +$550
                  </span>
                </label>
              </div>

              {/* Usage Rights Selector */}
              <div className="space-y-2 pt-4 border-t border-zinc-200">
                <p className="text-xs font-semibold text-zinc-900">
                  Usage &amp; Exhibition Licensing Tier
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setQuoteConfig((prev) => ({
                        ...prev,
                        usageLicense: 'personal_editorial',
                      }))
                    }
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      quoteConfig.usageLicense === 'personal_editorial'
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-800 border-zinc-200'
                    }`}
                  >
                    <span className="block font-semibold">
                      Editorial, Press &amp; Private Archive
                    </span>
                    <span
                      className={`text-[11px] font-mono-tabular ${
                        quoteConfig.usageLicense === 'personal_editorial'
                          ? 'text-zinc-300'
                          : 'text-zinc-500'
                      }`}
                    >
                      Included in base fee
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setQuoteConfig((prev) => ({
                        ...prev,
                        usageLicense: 'global_commercial',
                      }))
                    }
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      quoteConfig.usageLicense === 'global_commercial'
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-800 border-zinc-200'
                    }`}
                  >
                    <span className="block font-semibold">
                      Global Commercial &amp; Paid Media Buyout
                    </span>
                    <span
                      className={`text-[11px] font-mono-tabular ${
                        quoteConfig.usageLicense === 'global_commercial'
                          ? 'text-zinc-300'
                          : 'text-zinc-500'
                      }`}
                    >
                      +$1,200 Worldwide Perpetual
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live Commission Estimate & Validated Booking Form */}
          <div className="lg:col-span-5 bg-[#FAFAFA] rounded-2xl border border-zinc-200/90 p-6 lg:p-8 space-y-6">
            <div className="pb-5 border-b border-zinc-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Live Commission Estimate</span>
                <span className="font-mono-tabular">35% Retainer Locks Date</span>
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-3xl lg:text-4xl font-serif-display font-semibold text-zinc-950 tabular-nums">
                    ${quoteBreakdown.subtotalUsd.toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Retainer due upon approval: $
                    {quoteBreakdown.retainerDepositUsd.toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-xs font-mono-tabular text-zinc-600">
                  <p>Base: ${quoteBreakdown.basePackageUsd.toLocaleString()}</p>
                  {quoteBreakdown.extraHoursCount > 0 && (
                    <p>
                      +{quoteBreakdown.extraHoursCount}h: $
                      {quoteBreakdown.extraHoursCostUsd.toLocaleString()}
                    </p>
                  )}
                  {quoteBreakdown.addOnsUsd + quoteBreakdown.licensingFeeUsd > 0 && (
                    <p>
                      Options: +$
                      {(
                        quoteBreakdown.addOnsUsd + quoteBreakdown.licensingFeeUsd
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Attached Moodboard Shortlist Preview (Clean Unboxed Editorial List) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900">
                  Attached Moodboard Plates ({shortlistedItems.length})
                </span>
                <span className="text-zinc-500">
                  {shortlistedItems.length === 0
                    ? 'Click "Shortlist" on any photo above'
                    : 'Included with brief'}
                </span>
              </div>
              {shortlistedItems.length > 0 && (
                <ul className="divide-y divide-zinc-200/80 border-t border-b border-zinc-200/80 text-xs">
                  {shortlistedItems.map((item, idx) => (
                    <li
                      key={item.id}
                      className="py-2 flex items-center justify-between gap-3 text-zinc-800"
                    >
                      <span className="truncate">
                        <span className="font-mono-tabular text-zinc-400 mr-2">
                          0{idx + 1}.
                        </span>
                        {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveShortlisted(item.id)}
                        aria-label={`Remove ${item.title} from brief`}
                        className="text-zinc-500 hover:text-zinc-950 underline underline-offset-2 shrink-0 cursor-pointer"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Booking Submission Confirmation Banner */}
            {lastSubmittedBooking && (
              <div
                role="status"
                className="p-4 rounded-xl bg-white border border-zinc-900 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between font-semibold text-zinc-950">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Commission Inquiry Registered</span>
                  </span>
                  <span className="font-mono-tabular">
                    {lastSubmittedBooking.referenceCode}
                  </span>
                </div>
                <p className="text-zinc-600">
                  Thank you, <strong>{lastSubmittedBooking.clientName}</strong>. Your{' '}
                  {lastSubmittedBooking.packageName} request ($
                  {lastSubmittedBooking.totalQuoteUsd.toLocaleString()}) is now live in
                  the Studio Portal below for owner confirmation.
                </p>
              </div>
            )}

            {/* Client Booking Inquiry Form */}
            <form onSubmit={handleSubmitBooking} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="booking-client-name"
                  className="block text-xs font-medium text-zinc-800 mb-1"
                >
                  Your Full Name *
                </label>
                <input
                  id="booking-client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Claire Moreau"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
                {validationErrors.clientName && (
                  <p className="mt-1 text-xs text-rose-600">
                    {validationErrors.clientName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="booking-client-email"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="booking-client-email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="claire@atelier.fr"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                  {validationErrors.clientEmail && (
                    <p className="mt-1 text-xs text-rose-600">
                      {validationErrors.clientEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-company"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Brand / Publication
                  </label>
                  <input
                    id="booking-company"
                    type="text"
                    value={companyOrPublication}
                    onChange={(e) => setCompanyOrPublication(e.target.value)}
                    placeholder="Maison Moreau / Private"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Target Shoot Date *
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 font-mono-tabular focus:outline-none focus:border-zinc-900"
                  />
                  {validationErrors.preferredDate && (
                    <p className="mt-1 text-xs text-rose-600">
                      {validationErrors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-city"
                    className="block text-xs font-medium text-zinc-800 mb-1"
                  >
                    Studio or Location City *
                  </label>
                  <input
                    id="booking-city"
                    type="text"
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    placeholder="Paris / New York / Tokyo"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                  {validationErrors.locationCity && (
                    <p className="mt-1 text-xs text-rose-600">
                      {validationErrors.locationCity}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-medium text-zinc-800 mb-1"
                >
                  Creative Direction &amp; Lighting Notes *
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Describe your collection, architectural space, or desired daylight aesthetic..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
                {validationErrors.projectNotes && (
                  <p className="mt-1 text-xs text-rose-600">
                    {validationErrors.projectNotes}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 text-xs font-semibold tracking-wide text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Reserve Commission Date (${quoteBreakdown.subtotalUsd.toLocaleString()}{' '}
                Estimate)
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
