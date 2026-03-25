"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SearchSection } from "@/components/home/HeroSearch";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setLimit } from "@/redux/features/search/searchSlice";

// --- Venue shape (from SeatGeek venues API) ---
interface VenueResult {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  lat: number;
  lng: number;
  capacity: number;
  score: number;
  source: string;
  source_id: string;
  source_url: string;
}

// --- Artist/Performer shape (from SeatGeek performers API) ---
interface ArtistResult {
  id: string;
  name: string;
  image: string;
  score: number;
  source: string;
  source_id: string;
  source_url: string;
  genres: string[];
  booked_dates: Record<string, string>; // { "ISO date string": "event name" }
}

const LIMIT_OPTIONS = [10, 20, 50];

// Main Page Component
export default function Home() {
  const dispatch = useDispatch();

  const results = useSelector((state: any) => state?.search?.results ?? []);
  const searchLoading = useSelector(
    (state: any) => state?.search?.searchLoading,
  );
  const resultType = useSelector((state: any) => state?.search?.resultType); // "artist" | "venue"
  const { page, limit, total, totalPages } = useSelector(
    (state: any) => state?.search?.meta?.pagination ?? 1,
  );

  const data = useSelector((state: any) => state?.search);

  const isArtistMode = resultType === "artist";
  const isVenueMode = resultType === "venue";

  return (
    <main className='min-h-screen bg-background'>
      <div className='flex flex-col lg:flex-row gap-6 container mx-auto my-6 md:my-12'>
        {/* Left Panel - Search Filters */}
        <SearchSection className='' />

        {/* Right Panel - Results */}
        <div className='flex-1 min-w-0 p-5 sm:p-0'>
          {/* Header */}
          <div className='mb-6'>
            <h2 className='text-2xl md:text-3xl font-semibold text-foreground mb-2'>
              Search Results
            </h2>
            <p className='text-sm md:text-base text-muted-foreground'>
              {total} Result{total !== 1 ? "s" : ""}
              {resultType ? ` · ${isArtistMode ? "Artists" : "Venues"}` : ""}
            </p>
          </div>

          {/* Results Grid */}
          {results.length > 0 ? (
            <>
              <div className='space-y-4'>
                {/* ── ARTIST CARDS ── */}
                {isArtistMode &&
                  (results as ArtistResult[]).map((artist) => {
                    const bookedDateEntries = Object.entries(
                      artist.booked_dates ?? {},
                    );
                    const hasBookedDates = bookedDateEntries.length > 0;

                    return (
                      <div
                        key={artist.id}
                        className='bg-background rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border'
                      >
                        <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
                          {/* Artist Image */}
                          {artist.image && (
                            <div className='flex-shrink-0'>
                              <div className='relative w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-muted'>
                                <Image
                                  src={artist.image}
                                  alt={artist.name}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className='flex-1 flex flex-col justify-between'>
                            <div className='space-y-2 md:space-y-3'>
                              {/* Name */}
                              <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
                                {artist.name}
                              </h3>

                              {/* Score */}
                              <p className='text-sm text-muted-foreground'>
                                Popularity Score:{" "}
                                <span className='font-medium text-foreground'>
                                  {Math.round(artist.score * 100)}%
                                </span>
                              </p>

                              {/* Genres */}
                              {artist.genres?.length > 0 && (
                                <div className='flex flex-wrap gap-2'>
                                  {artist.genres.map((genre) => (
                                    <span
                                      key={genre}
                                      className='px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground capitalize'
                                    >
                                      {genre}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Booked Dates */}
                              {hasBookedDates && (
                                <div className='space-y-1'>
                                  <p className='text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide'>
                                    Upcoming Bookings
                                  </p>
                                  <div className='flex flex-wrap gap-2'>
                                    {bookedDateEntries.map(
                                      ([isoDate, eventName]) => (
                                        <span
                                          key={isoDate}
                                          className='px-3 py-1 bg-secondary rounded-lg text-xs md:text-sm text-muted-foreground font-medium'
                                          title={eventName}
                                        >
                                          {new Date(isoDate).toLocaleDateString(
                                            undefined,
                                            {
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric",
                                            },
                                          )}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* CTA */}
                            <div className='mt-4 flex flex-wrap gap-3 items-center'>
                              <Button className='w-full sm:w-auto rounded-full font-semibold px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground hover:bg-primary/90'>
                                Book Artist
                              </Button>
                              {artist.source_url && (
                                <a
                                  href={artist.source_url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='text-sm text-primary underline-offset-2 hover:underline'
                                >
                                  View Tickets
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* ── VENUE CARDS ── */}
                {isVenueMode &&
                  (results as VenueResult[]).map((venue) => (
                    <div
                      key={venue.id}
                      className='bg-background rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border'
                    >
                      <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
                        {/* Content */}
                        <div className='flex-1 flex flex-col justify-between'>
                          <div className='space-y-2 md:space-y-3'>
                            {/* Name */}
                            <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
                              {venue.name}
                            </h3>

                            {/* Address */}
                            <p className='text-sm md:text-base text-muted-foreground'>
                              {[
                                venue.address,
                                venue.city,
                                venue.state,
                                venue.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>

                            {/* Capacity & Score */}
                            <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
                              {venue.capacity > 0 && (
                                <span>
                                  Capacity:{" "}
                                  <span className='font-medium text-foreground'>
                                    {venue.capacity.toLocaleString()}
                                  </span>
                                </span>
                              )}
                              <span>
                                Score:{" "}
                                <span className='font-medium text-foreground'>
                                  {Math.round(venue.score * 100)}%
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className='mt-4 flex flex-wrap gap-3 items-center'>
                            <Button className='w-full sm:w-auto rounded-full font-semibold px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground hover:bg-primary/90'>
                              Book Venue
                            </Button>
                            {venue.source_url && (
                              <a
                                href={venue.source_url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-sm text-primary underline-offset-2 hover:underline'
                              >
                                View on SeatGeek
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* ── PAGINATION ── */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-8'>
                  {/* Prev Button */}
                  <button
                    disabled={page === 1}
                    onClick={() => dispatch(setPage(page - 1))}
                    className='w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50'
                  >
                    ‹
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(
                      Math.max(0, page - 3),
                      Math.min(totalPages, page + 2),
                    )
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => dispatch(setPage(p))}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                        ${
                          page === p
                            ? "bg-primary text-white"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                  {/* Next Button */}
                  <button
                    disabled={page === totalPages}
                    onClick={() => dispatch(setPage(page + 1))}
                    className='w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50'
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          ) : searchLoading ? (
            <div className='bg-secondary rounded-2xl p-8 text-center'>
              <p className='text-foreground font-medium'>Loading...</p>
            </div>
          ) : (
            <div className='bg-secondary rounded-2xl p-8 text-center'>
              <p className='text-foreground font-medium'>
                No results found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
