"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SearchSection } from "@/components/home/HeroSearch";
import { useSelector } from "react-redux";

interface Artist {
  id: string;
  name: string;
  address: string;
  genre: string;
  availability: string[];
  image: string;
}

interface BaseUser {
  id: string;
  role: "VENUE" | "ARTIST";
  name: string;
  email: string;
  avatar: string;
  location: string;
  availability: string[];
  price: string | null;
  location_lat: number | null;
  location_lng: number | null;
}

interface Venue extends BaseUser {
  role: "VENUE";
  venue_type: string;
  capacity: number;
}

interface Artist extends BaseUser {
  role: "ARTIST";
  gender: string;
  genre: string;
}

type SearchResult = Venue | Artist;

// Main Page Component
export default function Home() {
  const [bookedArtists, setBookedArtists] = useState<Set<string>>(new Set());
  const results = useSelector((state: any) => state?.search?.results);

  const handleBook = (artistId: string) => {
    setBookedArtists((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(artistId)) {
        newSet.delete(artistId);
      } else {
        newSet.add(artistId);
      }
      return newSet;
    });
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
              Search Result
            </h2>
            <p className='text-sm md:text-base text-muted-foreground'>
              {results.length} Result
              {results.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className='space-y-4'>
              {results?.map((item: SearchResult) => {
                const isVenue = item.role === "VENUE";
                const isArtist = item.role === "ARTIST";

                return (
                  <div
                    key={item.id}
                    className='bg-background rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border'
                  >
                    <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
                      {/* Image */}
                      {item.avatar && (
                        <div className='flex-shrink-0'>
                          <div className='relative w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-muted'>
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_IMAGE_URL + item?.avatar
                              }
                              alt={item.name}
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
                            {item.name}
                          </h3>

                          {/* Location */}
                          <p className='text-sm md:text-base text-muted-foreground'>
                            {item.location}
                          </p>

                          {/* Role Specific Section */}
                          {isVenue && (
                            <div className='flex gap-4 text-sm text-muted-foreground'>
                              <span>Capacity: {(item as Venue).capacity}</span>
                              <span>Type: {(item as Venue).venue_type}</span>
                            </div>
                          )}

                          {isArtist && (
                            <div className='flex gap-4 text-sm text-muted-foreground'>
                              <span>Genre: {(item as Artist).genre}</span>
                              <span>Gender: {(item as Artist).gender}</span>
                            </div>
                          )}

                          {/* Price (Both may have it) */}
                          {item.price && (
                            <p className='text-sm font-medium text-primary'>
                              {item.price}
                            </p>
                          )}

                          {/* Availability */}
                          {item.availability?.length > 0 && (
                            <div className='space-y-2'>
                              <p className='text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide'>
                                Availability
                              </p>

                              <div className='flex flex-wrap gap-2'>
                                {item.availability.map((date, idx) => (
                                  <span
                                    key={idx}
                                    className='px-3 py-1 bg-secondary rounded-lg text-xs md:text-sm text-muted-foreground font-medium'
                                  >
                                    {date}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Button */}
                        <div className='mt-4 sm:mt-0'>
                          <Button className='w-full sm:w-auto rounded-full font-semibold px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground hover:bg-primary/90'>
                            {isVenue ? "Book Venue" : "Book Artist"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
