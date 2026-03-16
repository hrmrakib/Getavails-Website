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
  const page = useSelector((state: any) => state?.search?.page ?? 1);
  const limit = useSelector((state: any) => state?.search?.limit ?? 10);
  const total = useSelector((state: any) => state?.search?.total ?? 0);

  const isArtistMode = resultType === "artist";
  const isVenueMode = resultType === "venue";

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(e.target.value)));
    dispatch(setPage(1));
  };

  // Build page number array with ellipsis logic
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

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
              <div className='mt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
                {/* Left: rows per page */}
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <span>Rows per page</span>
                  <select
                    value={limit}
                    onChange={handleLimitChange}
                    className='bg-background border border-border rounded-lg px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                  >
                    {LIMIT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Center: prev / page numbers / next */}
                <div className='flex items-center gap-1'>
                  {/* Prev */}
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className='w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                    aria-label='Previous page'
                  >
                    ‹
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((p, idx) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className='w-9 h-9 flex items-center justify-center text-muted-foreground text-sm select-none'
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p as number)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors border ${
                          p === page
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}

                  {/* Next */}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className='w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                    aria-label='Next page'
                  >
                    ›
                  </button>
                </div>

                {/* Right: showing range */}
                <p className='text-sm text-muted-foreground'>
                  {total === 0
                    ? "0 results"
                    : `${(page - 1) * limit + 1}–${Math.min(page * limit, total)} of ${total}`}
                </p>
              </div>
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

// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { SearchSection } from "@/components/home/HeroSearch";
// import { useSelector } from "react-redux";
// import { setPage, setLimit } from "@/redux/features/search/searchSlice";

// // --- Venue shape (from SeatGeek venues API) ---
// interface VenueResult {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   postal_code: string;
//   country: string;
//   lat: number;
//   lng: number;
//   capacity: number;
//   score: number;
//   source: string;
//   source_id: string;
//   source_url: string;
// }

// // --- Artist/Performer shape (from SeatGeek performers API) ---
// interface ArtistResult {
//   id: string;
//   name: string;
//   image: string;
//   score: number;
//   source: string;
//   source_id: string;
//   source_url: string;
//   genres: string[];
//   booked_dates: Record<string, string>; // { "ISO date string": "event name" }
// }

// // Main Page Component
// export default function Home() {
//   const results = useSelector((state: any) => state?.search?.results ?? []);
//   const searchLoading = useSelector(
//     (state: any) => state?.search?.searchLoading,
//   );
//   const resultType = useSelector((state: any) => state?.search?.resultType); // "artist" | "venue"

//   const isArtistMode = resultType === "artist";
//   const isVenueMode = resultType === "venue";

//   return (
//     <main className='min-h-screen bg-background'>
//       <div className='flex flex-col lg:flex-row gap-6 container mx-auto my-6 md:my-12'>
//         {/* Left Panel - Search Filters */}
//         <SearchSection className='' />

//         {/* Right Panel - Results */}
//         <div className='flex-1 min-w-0 p-5 sm:p-0'>
//           {/* Header */}
//           <div className='mb-6'>
//             <h2 className='text-2xl md:text-3xl font-semibold text-foreground mb-2'>
//               Search Results
//             </h2>
//             <p className='text-sm md:text-base text-muted-foreground'>
//               {results.length} Result{results.length !== 1 ? "s" : ""}
//               {resultType ? ` · ${isArtistMode ? "Artists" : "Venues"}` : ""}
//             </p>
//           </div>

//           {/* Results Grid */}
//           {results.length > 0 ? (
//             <div className='space-y-4'>
//               {/* ── ARTIST CARDS ── */}
//               {isArtistMode &&
//                 (results as ArtistResult[]).map((artist) => {
//                   const bookedDateEntries = Object.entries(
//                     artist.booked_dates ?? {},
//                   );
//                   const hasBookedDates = bookedDateEntries.length > 0;

//                   return (
//                     <div
//                       key={artist.id}
//                       className='bg-background rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border'
//                     >
//                       <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
//                         {/* Artist Image */}
//                         {artist.image && (
//                           <div className='flex-shrink-0'>
//                             <div className='relative w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-muted'>
//                               <Image
//                                 src={artist.image}
//                                 alt={artist.name}
//                                 fill
//                                 className='object-cover'
//                               />
//                             </div>
//                           </div>
//                         )}

//                         {/* Content */}
//                         <div className='flex-1 flex flex-col justify-between'>
//                           <div className='space-y-2 md:space-y-3'>
//                             {/* Name */}
//                             <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
//                               {artist.name}
//                             </h3>

//                             {/* Score */}
//                             <p className='text-sm text-muted-foreground'>
//                               Popularity Score:{" "}
//                               <span className='font-medium text-foreground'>
//                                 {Math.round(artist.score * 100)}%
//                               </span>
//                             </p>

//                             {/* Genres */}
//                             {artist.genres?.length > 0 && (
//                               <div className='flex flex-wrap gap-2'>
//                                 {artist.genres.map((genre) => (
//                                   <span
//                                     key={genre}
//                                     className='px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground capitalize'
//                                   >
//                                     {genre}
//                                   </span>
//                                 ))}
//                               </div>
//                             )}

//                             {/* Booked Dates */}
//                             {hasBookedDates && (
//                               <div className='space-y-1'>
//                                 <p className='text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide'>
//                                   Upcoming Bookings
//                                 </p>
//                                 <div className='flex flex-wrap gap-2'>
//                                   {bookedDateEntries.map(
//                                     ([isoDate, eventName]) => (
//                                       <span
//                                         key={isoDate}
//                                         className='px-3 py-1 bg-secondary rounded-lg text-xs md:text-sm text-muted-foreground font-medium'
//                                         title={eventName}
//                                       >
//                                         {new Date(isoDate).toLocaleDateString(
//                                           undefined,
//                                           {
//                                             month: "short",
//                                             day: "numeric",
//                                             year: "numeric",
//                                           },
//                                         )}
//                                       </span>
//                                     ),
//                                   )}
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           {/* CTA */}
//                           <div className='mt-4 flex flex-wrap gap-3 items-center'>
//                             <Button className='w-full sm:w-auto rounded-full font-semibold px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground hover:bg-primary/90'>
//                               Book Artist
//                             </Button>
//                             {artist.source_url && (
//                               <a
//                                 href={artist.source_url}
//                                 target='_blank'
//                                 rel='noopener noreferrer'
//                                 className='text-sm text-primary underline-offset-2 hover:underline'
//                               >
//                                 View Tickets
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}

//               {/* ── VENUE CARDS ── */}
//               {isVenueMode &&
//                 (results as VenueResult[]).map((venue) => (
//                   <div
//                     key={venue.id}
//                     className='bg-background rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border'
//                   >
//                     <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
//                       {/* Content */}
//                       <div className='flex-1 flex flex-col justify-between'>
//                         <div className='space-y-2 md:space-y-3'>
//                           {/* Name */}
//                           <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
//                             {venue.name}
//                           </h3>

//                           {/* Address */}
//                           <p className='text-sm md:text-base text-muted-foreground'>
//                             {[
//                               venue.address,
//                               venue.city,
//                               venue.state,
//                               venue.country,
//                             ]
//                               .filter(Boolean)
//                               .join(", ")}
//                           </p>

//                           {/* Capacity & Score */}
//                           <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
//                             {venue.capacity > 0 && (
//                               <span>
//                                 Capacity:{" "}
//                                 <span className='font-medium text-foreground'>
//                                   {venue.capacity.toLocaleString()}
//                                 </span>
//                               </span>
//                             )}
//                             <span>
//                               Score:{" "}
//                               <span className='font-medium text-foreground'>
//                                 {Math.round(venue.score * 100)}%
//                               </span>
//                             </span>
//                           </div>
//                         </div>

//                         {/* CTA */}
//                         <div className='mt-4 flex flex-wrap gap-3 items-center'>
//                           <Button className='w-full sm:w-auto rounded-full font-semibold px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground hover:bg-primary/90'>
//                             Book Venue
//                           </Button>
//                           {venue.source_url && (
//                             <a
//                               href={venue.source_url}
//                               target='_blank'
//                               rel='noopener noreferrer'
//                               className='text-sm text-primary underline-offset-2 hover:underline'
//                             >
//                               View on SeatGeek
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           ) : searchLoading ? (
//             <div className='bg-secondary rounded-2xl p-8 text-center'>
//               <p className='text-foreground font-medium'>Loading...</p>
//             </div>
//           ) : (
//             <div className='bg-secondary rounded-2xl p-8 text-center'>
//               <p className='text-foreground font-medium'>
//                 No results found. Try adjusting your filters.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
