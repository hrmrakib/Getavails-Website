"use client";

import { useGetAllOfferRequestQuery } from "@/redux/features/admin/adminAPI";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Kind = "VENUE" | "ARTIST";

interface SystemPerformer {
  id: string;
  name: string;
  image: string;
  score: number;
  source: string;
  source_id: string;
  source_url: string;
}

interface SystemVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;
  capacity: number;
  score: number;
  image_url: string | null;
  source: string;
  source_id: string;
  source_url: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface OfferRequest {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  kind: Kind;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  budget: string;
  additional_info: string;
  artist_name: string | null;
  venue_name: string | null;
  system_performer_id: string | null;
  system_venue_id: string | null;
  system_performer: SystemPerformer | null;
  system_venue: SystemVenue | null;
  user: User;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── NoteModal ────────────────────────────────────────────────────────────────

function NoteModal({
  request,
  onClose,
}: {
  request: OfferRequest;
  onClose: () => void;
}) {
  const isVenue = request.kind === "VENUE";
  const entityName = isVenue ? request.venue_name : request.artist_name;
  const entityImage = isVenue
    ? request.system_venue?.image_url
    : request.system_performer?.image;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />

      <div
        className='relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='h-1.5 w-full bg-gradient-to-r from-[#1e3a5f] via-[#2d6a9f] to-[#1e3a5f]' />

        <div className='p-6'>
          {/* Top row */}
          <div className='flex items-start justify-between mb-5'>
            <div className='flex items-center gap-3'>
              {entityImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={entityImage}
                  alt={entityName ?? ""}
                  className='w-12 h-12 rounded-xl object-cover border border-slate-200'
                />
              ) : (
                <div className='w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center text-[#1e3a5f] font-bold text-lg'>
                  {entityName?.[0] ?? "?"}
                </div>
              )}
              <div>
                <p className='text-xs font-semibold uppercase tracking-widest text-[#2d6a9f] mb-0.5'>
                  {request.kind}
                </p>
                <h2 className='text-base font-bold text-slate-800 leading-tight'>
                  {entityName ?? "—"}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className='text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100'
              aria-label='Close'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Info grid */}
          <div className='grid grid-cols-2 gap-3 mb-5'>
            {[
              { label: "Requester", value: request.name },
              { label: "Phone", value: request.phone },
              { label: "Email", value: request.email },
              {
                label: "Budget",
                value: `$${Number(request.budget).toLocaleString()}`,
              },
              { label: "Book Date", value: formatDate(request.date) },
              { label: "Time", value: formatTime(request.time) },
            ].map(({ label, value }) => (
              <div key={label} className='bg-slate-50 rounded-xl px-3.5 py-2.5'>
                <p className='text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5'>
                  {label}
                </p>
                <p className='text-sm font-medium text-slate-700 break-all'>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <svg
                className='w-4 h-4 text-amber-500 flex-shrink-0'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              <p className='text-xs font-bold uppercase tracking-widest text-amber-600'>
                Additional Note
              </p>
            </div>
            <p className='text-sm text-slate-700 leading-relaxed'>
              {request.additional_info || "No additional notes provided."}
            </p>
          </div>

          <p className='text-xs text-slate-400 text-right mt-4'>
            Requested on {formatDate(request.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableSkeleton({ cols }: { cols: number }) {
  return (
    <>
      {/* Desktop */}
      <table className='hidden md:table w-full text-sm'>
        <thead>
          <tr className='bg-[#235789]'>
            {Array.from({ length: cols }).map((_, i) => (
              <th
                key={i}
                className='px-5 py-4 first:rounded-tl-2xl last:rounded-tr-2xl'
              >
                <div className='h-3 bg-white/20 rounded animate-pulse' />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr
              key={i}
              className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
            >
              {Array.from({ length: cols }).map((__, j) => (
                <td key={j} className='px-5 py-4'>
                  <div
                    className='h-3 bg-slate-200 rounded animate-pulse'
                    style={{ width: `${55 + ((j * 7) % 35)}%` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile */}
      <div className='md:hidden divide-y divide-slate-100'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='p-4 bg-white space-y-3'>
            <div className='flex justify-between'>
              <div className='space-y-2'>
                <div className='h-3.5 w-32 bg-slate-200 rounded animate-pulse' />
                <div className='h-2.5 w-44 bg-slate-100 rounded animate-pulse' />
                <div className='h-2.5 w-28 bg-slate-100 rounded animate-pulse' />
              </div>
              <div className='w-9 h-9 bg-slate-100 rounded-xl animate-pulse' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              {Array.from({ length: 4 }).map((__, j) => (
                <div
                  key={j}
                  className='bg-slate-50 rounded-lg px-3 py-2 space-y-1.5'
                >
                  <div className='h-2 w-10 bg-slate-200 rounded animate-pulse' />
                  <div className='h-3 w-20 bg-slate-200 rounded animate-pulse' />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function PaginationBar({
  pagination,
  page,
  onPageChange,
}: {
  pagination: Pagination;
  page: number;
  onPageChange: (p: number) => void;
}) {
  const { total, totalPages, limit } = pagination;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pages = (): (number | "…")[] => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3)
      return [
        1,
        "…",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  return (
    <div className='mt-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
      <p className='text-xs text-slate-400 order-2 sm:order-1'>
        Showing{" "}
        <span className='font-semibold text-[#222222]'>
          {from}–{to}
        </span>{" "}
        of <span className='font-semibold text-[#222222]'>{total}</span> results
      </p>

      {totalPages > 1 && (
        <div className='flex items-center gap-1 order-1 sm:order-2'>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className='p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all'
            aria-label='Previous page'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          {pages().map((p, idx) =>
            p === "…" ? (
              <span
                key={`ellipsis-${idx}`}
                className='px-2 text-slate-400 text-sm select-none'
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                  p === page
                    ? "bg-[#1e3a5f] text-white shadow-md"
                    : "border border-slate-200 text-[#222222] hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className='p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all'
            aria-label='Next page'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

function OfferTable({
  data,
  kind,
  isLoading,
  onViewNote,
}: {
  data: OfferRequest[];
  kind: Kind;
  isLoading: boolean;
  onViewNote: (r: OfferRequest) => void;
}) {
  const isVenue = kind === "VENUE";

  return (
    <div className='w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm'>
      {isLoading ? (
        <TableSkeleton cols={7} />
      ) : (
        <>
          {/* Desktop table */}
          <table className='hidden md:table w-full text-sm'>
            <thead>
              <tr className='bg-[#235789] text-white'>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  isVenue ? "Venue Name" : "Artist Name",
                  "Book Date",
                  "Request Date",
                  "Note",
                ].map((h) => (
                  <th
                    key={h}
                    className='px-5 py-4 text-left font-semibold tracking-wide text-xs uppercase whitespace-nowrap first:rounded-tl-2xl last:rounded-tr-2xl'
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center py-16 text-slate-400'>
                    <div className='flex flex-col items-center gap-2'>
                      <svg
                        className='w-10 h-10 text-slate-300'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                      <span>No offer requests found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-t border-slate-100 transition-colors hover:bg-blue-50/40 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className='px-5 py-4 text-base font-medium text-slate-800 whitespace-nowrap'>
                      {row.name}
                    </td>
                    <td className='px-5 py-4 text-base text-[#222222] whitespace-nowrap'>
                      {row.email}
                    </td>
                    <td className='px-5 py-4 text-base text-[#222222] whitespace-nowrap'>
                      {row.phone}
                    </td>
                    <td className='px-5 py-4 text-base text-slate-700 whitespace-nowrap'>
                      {isVenue ? row.venue_name : row.artist_name}
                    </td>
                    <td className='px-5 py-4 text-base text-[#222222] whitespace-nowrap'>
                      {formatDate(row.date)}
                    </td>
                    <td className='px-5 py-4 text-base text-[#222222] whitespace-nowrap'>
                      {formatDate(row.created_at)}
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center gap-2'>
                        <span className='text-[#000000CC] text-xs truncate max-w-[80px]'>
                          {row.additional_info?.slice(0, 10)}
                          {(row.additional_info?.length ?? 0) > 10 ? "…" : ""}
                        </span>
                        <button
                          onClick={() => onViewNote(row)}
                          className='ml-1 text-[#1e3a5f] hover:text-[#2d6a9f] transition-colors p-1.5 rounded-lg hover:bg-[#1e3a5f]/10'
                          aria-label='View note'
                        >
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={1.8}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className='md:hidden divide-y divide-slate-100'>
            {data.length === 0 ? (
              <div className='flex flex-col items-center gap-2 py-16 text-slate-400'>
                <svg
                  className='w-10 h-10 text-slate-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                <span className='text-sm'>No offer requests found.</span>
              </div>
            ) : (
              data.map((row) => (
                <div
                  key={row.id}
                  className='p-4 bg-white hover:bg-blue-50/30 transition-colors'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <p className='font-semibold text-slate-800'>{row.name}</p>
                      <p className='text-xs text-slate-500 mt-0.5'>
                        {row.email}
                      </p>
                      <p className='text-xs text-slate-500'>{row.phone}</p>
                    </div>
                    <button
                      onClick={() => onViewNote(row)}
                      className='text-[#1e3a5f] hover:text-[#2d6a9f] transition-colors p-2 rounded-xl hover:bg-[#1e3a5f]/10 flex-shrink-0'
                      aria-label='View note'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    </button>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='bg-slate-50 rounded-lg px-3 py-2'>
                      <p className='text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-0.5'>
                        {isVenue ? "Venue" : "Artist"}
                      </p>
                      <p className='text-xs font-medium text-slate-700 leading-tight'>
                        {isVenue ? row.venue_name : row.artist_name}
                      </p>
                    </div>
                    <div className='bg-slate-50 rounded-lg px-3 py-2'>
                      <p className='text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-0.5'>
                        Book Date
                      </p>
                      <p className='text-xs font-medium text-slate-700'>
                        {formatDate(row.date)}
                      </p>
                    </div>
                    <div className='bg-slate-50 rounded-lg px-3 py-2'>
                      <p className='text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-0.5'>
                        Budget
                      </p>
                      <p className='text-xs font-medium text-slate-700'>
                        ${Number(row.budget).toLocaleString()}
                      </p>
                    </div>
                    <div className='bg-slate-50 rounded-lg px-3 py-2'>
                      <p className='text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-0.5'>
                        Requested
                      </p>
                      <p className='text-xs font-medium text-slate-700'>
                        {formatDate(row.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const LIMIT = 12;

export default function OfferRequestsPage() {
  const [activeKind, setActiveKind] = useState<Kind>("VENUE");
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<OfferRequest | null>(
    null,
  );

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllOfferRequestQuery({
    kind: activeKind,
    page,
    limit: LIMIT,
  });

  const data: OfferRequest[] = response?.data ?? [];
  const pagination: Pagination = response?.meta?.pagination ?? {
    page,
    limit: LIMIT,
    total: 0,
    totalPages: 1,
  };

  const handleKindChange = (k: Kind) => {
    setActiveKind(k);
    setPage(1);
  };

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .animate-modal { animation: modalIn 0.22s ease-out both; }
      `}</style>

      <div className='min-h-screen'>
        <div className='container mx-auto py-8 sm:py-12'>
          {/* Page title */}
          {/* <div className='mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-[#1e3a5f] tracking-tight'>
              Offer Requests
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Manage incoming venue and artist booking requests
            </p>
          </div> */}

          {/* Toggle tabs */}
          <div className='flex gap-2 mb-6 bg-white w-fit rounded-xl p-1.5 shadow-sm border border-slate-200'>
            {(["VENUE", "ARTIST"] as Kind[]).map((k) => (
              <button
                key={k}
                onClick={() => handleKindChange(k)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeKind === k
                    ? "bg-[#235789] text-white shadow-md"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                {k.charAt(0) + k.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Table */}
          <OfferTable
            data={data}
            kind={activeKind}
            isLoading={isLoading || isFetching}
            onViewNote={setSelectedRequest}
          />

          {/* Pagination */}
          {!isLoading && !isFetching && (
            <PaginationBar
              pagination={pagination}
              page={page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <NoteModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </>
  );
}
