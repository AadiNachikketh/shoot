import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMMISSION_PACKAGES,
  calculateCommissionQuote,
  calculateStudioOwnerMetrics,
  filterPortfolioItems,
  summarizeProofingFrames,
  validateBookingSubmission,
  type PortfolioItem,
  type ProofingFrame,
  type StudioBooking,
} from './studioLogic';

const samplePortfolio: PortfolioItem[] = [
  {
    id: 'work-1',
    title: 'Alabaster Light Study IV',
    seriesCode: 'LA-01',
    category: 'Editorial & Fashion',
    location: 'Paris, Le Marais',
    year: 2026,
    client: 'Vogue France Monograph',
    featuredSpan: 'wide',
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    aspectLabel: '16:9 Medium Format',
    story: 'Natural casement window shadows over raw ivory linen.',
    exif: {
      camera: 'Phase One XF IQ4 150MP',
      lens: 'Schneider Kreuznach 80mm LS',
      focalLength: '80mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/500s',
      iso: 64,
      lightingSetup: 'Direct morning window light + 8x8 unbleached muslin bounce',
    },
    editionPriceUsd: 1400,
  },
  {
    id: 'work-2',
    title: 'Nordic Concrete Pavilion',
    seriesCode: 'LA-02',
    category: 'Architecture & Interior',
    location: 'Aarhus, Denmark',
    year: 2026,
    client: 'Kengo Spatial Atelier',
    featuredSpan: 'standard',
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    aspectLabel: '16:9 Architectural',
    story: 'Cantilevered white concrete reflecting over still coastal water.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 28P',
      focalLength: '28mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/125s',
      iso: 64,
      lightingSetup: 'Low-angle Nordic golden hour daylight',
    },
    editionPriceUsd: 1800,
  },
];

test('filterPortfolioItems filters by category and search query accurately', () => {
  const all = filterPortfolioItems(samplePortfolio, 'All Works', '');
  assert.equal(all.length, 2);

  const archOnly = filterPortfolioItems(
    samplePortfolio,
    'Architecture & Interior',
    ''
  );
  assert.equal(archOnly.length, 1);
  assert.equal(archOnly[0].id, 'work-2');

  const byLensSearch = filterPortfolioItems(
    samplePortfolio,
    'All Works',
    'Schneider'
  );
  assert.equal(byLensSearch.length, 1);
  assert.equal(byLensSearch[0].id, 'work-1');
});

test('calculateCommissionQuote computes base, extra hours, add-ons, and 35% retainer', () => {
  const quote = calculateCommissionQuote(
    {
      packageId: 'editorial',
      totalHours: 6, // 2 extra hours above 4 included (@ $350/hr = $700)
      includeArchivalPrints: true, // +$650
      includeRawTetherArchive: false,
      expressTurnaround48h: true, // +$550
      usageLicense: 'global_commercial', // +$1200
    },
    COMMISSION_PACKAGES
  );

  assert.equal(quote.basePackageUsd, 2400);
  assert.equal(quote.extraHoursCount, 2);
  assert.equal(quote.extraHoursCostUsd, 700);
  assert.equal(quote.addOnsUsd, 1200);
  assert.equal(quote.licensingFeeUsd, 1200);
  assert.equal(quote.subtotalUsd, 5500);
  assert.equal(quote.retainerDepositUsd, Math.round(5500 * 0.35));
  assert.equal(quote.estimatedFrames, 24 + 2 * 5);
});

test('validateBookingSubmission enforces required fields and rejects empty inputs', () => {
  const invalid = validateBookingSubmission({
    clientName: 'A',
    clientEmail: 'not-an-email',
    companyOrPublication: 'Studio',
    preferredDate: '',
    locationCity: '',
    projectNotes: 'Too short',
    quoteConfig: {
      packageId: 'editorial',
      totalHours: 4,
      includeArchivalPrints: false,
      includeRawTetherArchive: false,
      expressTurnaround48h: false,
      usageLicense: 'personal_editorial',
    },
    shortlistedWorkIds: [],
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.clientName);
  assert.ok(invalid.errors.clientEmail);
  assert.ok(invalid.errors.preferredDate);
  assert.ok(invalid.errors.locationCity);
  assert.ok(invalid.errors.projectNotes);

  const valid = validateBookingSubmission({
    clientName: 'Claire Moreau',
    clientEmail: 'claire@atelier-paris.fr',
    companyOrPublication: 'Maison Moreau',
    preferredDate: '2026-11-18',
    locationCity: 'Paris',
    projectNotes: 'Full autumn lookbook shoot in natural morning studio light.',
    quoteConfig: {
      packageId: 'editorial',
      totalHours: 4,
      includeArchivalPrints: false,
      includeRawTetherArchive: false,
      expressTurnaround48h: false,
      usageLicense: 'personal_editorial',
    },
    shortlistedWorkIds: ['work-1'],
  });

  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('summarizeProofingFrames calculates selected frames and extra select costs', () => {
  const frames: ProofingFrame[] = [
    {
      id: 'f1',
      frameNumber: '001A',
      title: 'Frame 1',
      imageUrl: '',
      exifSummary: '80mm f/2.8',
      photographerPick: true,
      clientSelected: true,
      rating: 5,
      retouchNote: 'Keep natural skin texture',
    },
    {
      id: 'f2',
      frameNumber: '002A',
      title: 'Frame 2',
      imageUrl: '',
      exifSummary: '80mm f/2.8',
      photographerPick: false,
      clientSelected: true,
      rating: 4,
      retouchNote: '',
    },
    {
      id: 'f3',
      frameNumber: '003A',
      title: 'Frame 3',
      imageUrl: '',
      exifSummary: '50mm f/1.4',
      photographerPick: true,
      clientSelected: true,
      rating: 5,
      retouchNote: '',
    },
  ];

  const summary = summarizeProofingFrames(frames, 2);
  assert.equal(summary.totalFrames, 3);
  assert.equal(summary.selectedCount, 3);
  assert.equal(summary.photographerPicksCount, 2);
  assert.equal(summary.notesCount, 1);
  assert.equal(summary.remainingAllowance, 0);
  assert.equal(summary.extraSelectsCount, 1);
  assert.equal(summary.extraSelectsCostUsd, 85);
});

test('calculateStudioOwnerMetrics aggregates revenue and pending inquiries', () => {
  const bookings: StudioBooking[] = [
    {
      id: 'b1',
      referenceCode: 'LUM-801',
      clientName: 'Elena Rostova',
      clientEmail: 'elena@kinfolk.dk',
      companyOrPublication: 'Kinfolk',
      packageName: 'Editorial & Fashion Campaign',
      preferredDate: '2026-11-12',
      locationCity: 'Copenhagen',
      totalQuoteUsd: 3000,
      retainerDepositUsd: 1050,
      status: 'Confirmed',
      shortlistedCount: 2,
      projectNotes: 'Monograph cover story',
      createdAt: '2026-10-28',
    },
    {
      id: 'b2',
      referenceCode: 'LUM-802',
      clientName: 'Marcus Vance',
      clientEmail: 'marcus@vancearch.com',
      companyOrPublication: 'Vance Studio',
      packageName: 'Architecture & Spatial Monograph',
      preferredDate: '2026-12-01',
      locationCity: 'New York',
      totalQuoteUsd: 4000,
      retainerDepositUsd: 1400,
      status: 'Pending Review',
      shortlistedCount: 1,
      projectNotes: 'Gallery flagship',
      createdAt: '2026-10-29',
    },
  ];

  const metrics = calculateStudioOwnerMetrics(bookings, 6);
  assert.equal(metrics.totalBookings, 2);
  assert.equal(metrics.pendingReviewCount, 1);
  assert.equal(metrics.confirmedCount, 1);
  assert.equal(metrics.totalPipelineUsd, 7000);
  assert.equal(metrics.confirmedRevenueUsd, 3000);
  assert.equal(metrics.totalRetainersUsd, 1050);
  assert.equal(metrics.avgCommissionUsd, 3500);
  assert.equal(metrics.portfolioCount, 6);
});
