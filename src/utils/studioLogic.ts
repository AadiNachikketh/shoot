/**
 * Pure Domain & Business Logic for Lumière Atelier Photography Platform
 * Decoupled from React UI for fast, deterministic unit testing via node:test.
 */

export type PortfolioCategory =
  | 'All Works'
  | 'Editorial & Fashion'
  | 'Architecture & Interior'
  | 'Weddings & Intimate'
  | 'Commercial Still Life';

export interface ExifMetadata {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  lightingSetup: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  seriesCode: string;
  category: Exclude<PortfolioCategory, 'All Works'>;
  location: string;
  year: number;
  client: string;
  featuredSpan: 'wide' | 'tall' | 'standard';
  imageUrl: string;
  aspectLabel: string;
  story: string;
  exif: ExifMetadata;
  editionPriceUsd: number;
}

export type PackageId = 'editorial' | 'wedding' | 'architectural' | 'commercial';

export interface CommissionPackage {
  id: PackageId;
  name: string;
  subtitle: string;
  baseRateUsd: number;
  includedHours: number;
  additionalHourRateUsd: number;
  includedRetouchedFrames: number;
  turnaroundDays: number;
  deliverables: string[];
}

export interface QuoteConfiguration {
  packageId: PackageId;
  totalHours: number;
  includeArchivalPrints: boolean;
  includeRawTetherArchive: boolean;
  expressTurnaround48h: boolean;
  usageLicense: 'personal_editorial' | 'global_commercial';
}

export interface QuoteBreakdown {
  basePackageUsd: number;
  extraHoursCount: number;
  extraHoursCostUsd: number;
  addOnsUsd: number;
  licensingFeeUsd: number;
  subtotalUsd: number;
  retainerDepositUsd: number;
  estimatedFrames: number;
}

export interface BookingSubmissionInput {
  clientName: string;
  clientEmail: string;
  companyOrPublication: string;
  preferredDate: string;
  locationCity: string;
  projectNotes: string;
  quoteConfig: QuoteConfiguration;
  shortlistedWorkIds: string[];
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export type BookingStatus = 'Pending Review' | 'Confirmed' | 'Completed';

export interface StudioBooking {
  id: string;
  referenceCode: string;
  clientName: string;
  clientEmail: string;
  companyOrPublication: string;
  packageName: string;
  preferredDate: string;
  locationCity: string;
  totalQuoteUsd: number;
  retainerDepositUsd: number;
  status: BookingStatus;
  shortlistedCount: number;
  projectNotes: string;
  createdAt: string;
}

export interface ProofingFrame {
  id: string;
  frameNumber: string;
  title: string;
  imageUrl: string;
  exifSummary: string;
  photographerPick: boolean;
  clientSelected: boolean;
  rating: number; // 1 to 5
  retouchNote: string;
}

export const COMMISSION_PACKAGES: CommissionPackage[] = [
  {
    id: 'editorial',
    name: 'Editorial & Fashion Campaign',
    subtitle: 'For magazines, fashion houses, and lookbook monographs',
    baseRateUsd: 2400,
    includedHours: 4,
    additionalHourRateUsd: 350,
    includedRetouchedFrames: 24,
    turnaroundDays: 5,
    deliverables: [
      'Tethered Capture One studio or location session',
      '24 master 16-bit TIFF & web-ready editorial plates',
      'Custom color profile & silver-halide grain matching',
      'Private online contact sheet for art director selection',
    ],
  },
  {
    id: 'architectural',
    name: 'Architecture & Spatial Monograph',
    subtitle: 'For architects, interior designers, and hospitality spaces',
    baseRateUsd: 2900,
    includedHours: 6,
    additionalHourRateUsd: 320,
    includedRetouchedFrames: 20,
    turnaroundDays: 7,
    deliverables: [
      'Full sun-path daylight & twilight architectural capture',
      'Technical tilt-shift perspective control on medium format',
      '20 hand-blended architectural plates with natural shadow fidelity',
      'Editorial publication & architect portfolio licensing',
    ],
  },
  {
    id: 'wedding',
    name: 'Fine-Art Wedding & Elopement',
    subtitle: 'For intimate celebrations documented with editorial poise',
    baseRateUsd: 4200,
    includedHours: 8,
    additionalHourRateUsd: 400,
    includedRetouchedFrames: 90,
    turnaroundDays: 14,
    deliverables: [
      'Lead photographer + dedicated lighting & film assistant',
      '90 curated editorial portraits + 400+ documentary story frames',
      'Private client proofing room for family & print selection',
      'Hand-bound linen archival box with 12 cotton rag prints',
    ],
  },
  {
    id: 'commercial',
    name: 'Luxury Product & Still Life',
    subtitle: 'For fragrance, horology, ceramics, and botanical objects',
    baseRateUsd: 1950,
    includedHours: 4,
    additionalHourRateUsd: 300,
    includedRetouchedFrames: 15,
    turnaroundDays: 4,
    deliverables: [
      'Bespoke travertine, plaster, and natural caustic set styling',
      'Focus-stacked 100MP medium format macro capture',
      '15 ultra-clean commercial campaign plates with clipping paths',
      '48-hour live contact sheet proofing access',
    ],
  },
];

/**
 * Filter portfolio items by category and free-text search query.
 */
export function filterPortfolioItems(
  items: PortfolioItem[],
  category: PortfolioCategory,
  searchQuery: string
): PortfolioItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      category === 'All Works' || item.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      item.title,
      item.seriesCode,
      item.category,
      item.location,
      item.client,
      item.exif.camera,
      item.exif.lens,
      item.story,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Deterministically calculate commission quote breakdown from configuration.
 */
export function calculateCommissionQuote(
  config: QuoteConfiguration,
  packages: CommissionPackage[] = COMMISSION_PACKAGES
): QuoteBreakdown {
  const pkg =
    packages.find((p) => p.id === config.packageId) ?? packages[0];

  const clampedHours = Math.max(pkg.includedHours, Math.min(16, config.totalHours));
  const extraHoursCount = Math.max(0, clampedHours - pkg.includedHours);
  const extraHoursCostUsd = extraHoursCount * pkg.additionalHourRateUsd;

  let addOnsUsd = 0;
  if (config.includeArchivalPrints) addOnsUsd += 650;
  if (config.includeRawTetherArchive) addOnsUsd += 480;
  if (config.expressTurnaround48h) addOnsUsd += 550;

  const licensingFeeUsd =
    config.usageLicense === 'global_commercial' ? 1200 : 0;

  const subtotalUsd =
    pkg.baseRateUsd + extraHoursCostUsd + addOnsUsd + licensingFeeUsd;
  const retainerDepositUsd = Math.round(subtotalUsd * 0.35);
  const estimatedFrames =
    pkg.includedRetouchedFrames + extraHoursCount * 5;

  return {
    basePackageUsd: pkg.baseRateUsd,
    extraHoursCount,
    extraHoursCostUsd,
    addOnsUsd,
    licensingFeeUsd,
    subtotalUsd,
    retainerDepositUsd,
    estimatedFrames,
  };
}

/**
 * Strictly validate booking submission input without silent fallbacks.
 */
export function validateBookingSubmission(
  input: BookingSubmissionInput
): BookingValidationResult {
  const errors: Record<string, string> = {};

  const name = input.clientName.trim();
  if (!name || name.length < 2) {
    errors.clientName = 'Please enter your full name (at least 2 characters).';
  }

  const email = input.clientEmail.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.clientEmail = 'Please provide a valid email address for your proposal.';
  }

  const date = input.preferredDate.trim();
  if (!date) {
    errors.preferredDate = 'Please select a target shoot date.';
  }

  const city = input.locationCity.trim();
  if (!city || city.length < 2) {
    errors.locationCity = 'Please specify the shoot city or studio location.';
  }

  const notes = input.projectNotes.trim();
  if (!notes || notes.length < 10) {
    errors.projectNotes =
      'Please share a brief creative direction or project description (min 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Compute summary statistics for the Client Proofing contact sheet.
 */
export function summarizeProofingFrames(
  frames: ProofingFrame[],
  packageSelectAllowance = 6
) {
  const selectedFrames = frames.filter((f) => f.clientSelected);
  const photographerPicks = frames.filter((f) => f.photographerPick);
  const notesCount = frames.filter((f) => f.retouchNote.trim().length > 0).length;
  const remainingAllowance = Math.max(
    0,
    packageSelectAllowance - selectedFrames.length
  );
  const extraSelectsCount = Math.max(
    0,
    selectedFrames.length - packageSelectAllowance
  );

  return {
    totalFrames: frames.length,
    selectedCount: selectedFrames.length,
    photographerPicksCount: photographerPicks.length,
    notesCount,
    packageSelectAllowance,
    remainingAllowance,
    extraSelectsCount,
    extraSelectsCostUsd: extraSelectsCount * 85,
  };
}

/**
 * Compute Studio Owner business metrics from bookings and portfolio items.
 */
export function calculateStudioOwnerMetrics(
  bookings: StudioBooking[],
  portfolioCount: number
) {
  const totalPipelineUsd = bookings.reduce((sum, b) => sum + b.totalQuoteUsd, 0);
  const confirmedOrCompleted = bookings.filter(
    (b) => b.status === 'Confirmed' || b.status === 'Completed'
  );
  const confirmedRevenueUsd = confirmedOrCompleted.reduce(
    (sum, b) => sum + b.totalQuoteUsd,
    0
  );
  const totalRetainersUsd = confirmedOrCompleted.reduce(
    (sum, b) => sum + b.retainerDepositUsd,
    0
  );
  const pendingReviewCount = bookings.filter(
    (b) => b.status === 'Pending Review'
  ).length;

  const avgCommissionUsd =
    bookings.length > 0 ? Math.round(totalPipelineUsd / bookings.length) : 0;

  return {
    totalBookings: bookings.length,
    pendingReviewCount,
    confirmedCount: confirmedOrCompleted.length,
    totalPipelineUsd,
    confirmedRevenueUsd,
    totalRetainersUsd,
    avgCommissionUsd,
    portfolioCount,
  };
}
