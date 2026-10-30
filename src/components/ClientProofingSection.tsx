import React, { useState } from 'react';
import { Check, MessageSquare, Star } from 'lucide-react';
import {
  summarizeProofingFrames,
  type ProofingFrame,
} from '../utils/studioLogic';

interface ClientProofingSectionProps {
  frames: ProofingFrame[];
  onToggleFrameSelect: (frameId: string) => void;
  onUpdateFrameRating: (frameId: string, rating: number) => void;
  onUpdateRetouchNote: (frameId: string, note: string) => void;
}

type ProofingFilter = 'all' | 'selected' | 'photographer_picks';

export const ClientProofingSection: React.FC<ClientProofingSectionProps> = ({
  frames,
  onToggleFrameSelect,
  onUpdateFrameRating,
  onUpdateRetouchNote,
}) => {
  const [filter, setFilter] = useState<ProofingFilter>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [sheetApproved, setSheetApproved] = useState(false);

  const summary = summarizeProofingFrames(frames, 4);

  const displayedFrames = frames.filter((frame) => {
    if (filter === 'selected') return frame.clientSelected;
    if (filter === 'photographer_picks') return frame.photographerPick;
    return true;
  });

  return (
    <section
      id="proofing"
      aria-label="Client Contact Sheet Proofing Room"
      className="scroll-mt-20 py-16 lg:py-24 bg-[#FAFAFA] border-b border-zinc-200/80"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-10">
        {/* Header & Package Allowance Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span>03. Interactive Client Proofing Room</span>
              <span aria-hidden="true">·</span>
              <span>Live Contact Sheet Demo (Session #LUM-841)</span>
            </div>
            <h2
              className="text-3xl lg:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Experience How Clients Review, Rate &amp; Approve Contact Sheets
            </h2>
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
              Within 48 hours of every shoot, clients receive a private gallery link
              just like this one. Select frames for master 16-bit retouching, compare
              the photographer&apos;s picks, and attach retouching notes directly to
              each negative.
            </p>
          </div>

          {/* Live Selection Telemetry Strip */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 flex flex-wrap items-center gap-6 shrink-0">
            <div>
              <p className="text-[11px] text-zinc-400">Selected for Master Print</p>
              <p className="text-xl font-serif-display font-semibold text-zinc-950 tabular-nums">
                {summary.selectedCount} / {summary.packageSelectAllowance} Included
              </p>
            </div>
            <div className="border-l border-zinc-200 pl-6">
              <p className="text-[11px] text-zinc-400">Retouching Annotations</p>
              <p className="text-xl font-serif-display font-semibold text-zinc-950 tabular-nums">
                {summary.notesCount} Notes
              </p>
            </div>
            <div className="border-l border-zinc-200 pl-6">
              <button
                type="button"
                onClick={() => setSheetApproved((prev) => !prev)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  sheetApproved
                    ? 'bg-emerald-900 text-white'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                {sheetApproved
                  ? 'Contact Sheet Approved ✓'
                  : 'Approve Contact Sheet'}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Sheet Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter contact sheet frames"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-200/60 rounded-xl"
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              All Contact Frames ({summary.totalFrames})
            </button>
            <button
              type="button"
              onClick={() => setFilter('selected')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'selected'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Client Selects ({summary.selectedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('photographer_picks')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'photographer_picks'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Photographer&apos;s Picks ({summary.photographerPicksCount})
            </button>
          </div>

          <div className="text-xs text-zinc-500 font-mono-tabular">
            {summary.extraSelectsCount > 0 ? (
              <span>
                +{summary.extraSelectsCount} additional retouched plate(s) (+$
                {summary.extraSelectsCostUsd})
              </span>
            ) : (
              <span>
                {summary.remainingAllowance} package select(s) remaining at no extra
                fee
              </span>
            )}
          </div>
        </div>

        {/* Contact Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFrames.map((frame) => {
            const isEditingNote = editingNoteId === frame.id;
            return (
              <div
                key={frame.id}
                className={`bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors ${
                  frame.clientSelected
                    ? 'border-zinc-900'
                    : 'border-zinc-200/90 hover:border-zinc-400'
                }`}
              >
                {/* Contact Frame Top Header (Film Rebate Style, Zero Pills) */}
                <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-200/80 flex items-center justify-between text-[11px] font-mono-tabular text-zinc-500">
                  <span>{frame.frameNumber}</span>
                  <span>
                    {frame.photographerPick
                      ? 'Curator Pick · ' + frame.exifSummary
                      : frame.exifSummary}
                  </span>
                </div>

                {/* Image Preview */}
                <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <img
                    src={frame.imageUrl}
                    alt={frame.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Frame Controls & Retouching Notes */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-serif-display font-medium text-zinc-950">
                        {frame.title}
                      </h3>
                      {/* Star Rating Control */}
                      <div
                        className="flex items-center gap-0.5 shrink-0"
                        role="group"
                        aria-label={`Rate ${frame.title}`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => onUpdateFrameRating(frame.id, star)}
                            aria-label={`Set rating ${star} out of 5 for ${frame.title}`}
                            className="p-0.5 text-zinc-800 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                star <= frame.rating
                                  ? 'fill-zinc-900 text-zinc-900'
                                  : 'text-zinc-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Retouching Note Display or Editor */}
                    {isEditingNote ? (
                      <div className="space-y-2 pt-1">
                        <label
                          htmlFor={`note-${frame.id}`}
                          className="sr-only"
                        >
                          Retouching note for {frame.title}
                        </label>
                        <textarea
                          id={`note-${frame.id}`}
                          rows={2}
                          value={frame.retouchNote}
                          onChange={(e) =>
                            onUpdateRetouchNote(frame.id, e.target.value)
                          }
                          placeholder="e.g. Warm skin highlights, keep natural linen texture..."
                          className="w-full p-2.5 text-xs bg-zinc-50 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
                        />
                        <button
                          type="button"
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1 text-xs font-medium text-white bg-zinc-900 rounded-md cursor-pointer"
                        >
                          Save Note
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-600 leading-relaxed min-h-[2rem]">
                        {frame.retouchNote ? (
                          <>
                            <strong className="text-zinc-900">Retouch Note:</strong>{' '}
                            {frame.retouchNote}
                          </>
                        ) : (
                          <span className="text-zinc-400">
                            No retouching instructions added yet.
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingNoteId(isEditingNote ? null : frame.id)
                      }
                      className="px-3 py-2 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/70 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{frame.retouchNote ? 'Edit Note' : 'Add Note'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFrameSelect(frame.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        frame.clientSelected
                          ? 'bg-zinc-900 text-white'
                          : 'bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-900'
                      }`}
                    >
                      {frame.clientSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected for Final Print</span>
                        </>
                      ) : (
                        <span>Select Frame</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
