"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Search, X, ChevronDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRange } from "react-day-picker";
import { format, set } from "date-fns";
import { Label } from "@/components/ui/label";
import { addDays } from "date-fns";
import { toast } from "sonner";
import {
  useLazySearchArtistsQuery,
  useLazySearchVenuesQuery,
  useSearchArtistsQuery,
  useSearchVenuesQuery,
} from "@/redux/features/search/searchAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchLoading,
  setSearchResult,
} from "@/redux/features/search/searchSlice";
import { useRouter } from "next/navigation";

export function SearchSection({ className }: { className?: string }) {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [genreSearchInput, setGenreSearchInput] = useState("");
  const [venueSearchInput, setVenueSearchInput] = useState("");
  const [onSearchTypeChange, setOnSearchTypeChange] = useState<
    "artist" | "venue"
  >("artist");
  const [minVenueCapacity, setMinVenueCapacity] = useState(0);
  const [maxVenueCapacity, setMaxVenueCapacity] = useState(0);
  const [triggerArtistSearch, { data: artistData, isLoading: artistLoading }] =
    useLazySearchArtistsQuery();

  const [triggerVenueSearch, { data: venueData, isLoading: venueLoading }] =
    useLazySearchVenuesQuery();
  const { data: artists } = useSearchArtistsQuery({});
  const { data: venuesList } = useSearchVenuesQuery({});
  const searchLoading = useSelector(
    (state: any) => state?.search?.searchLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (artists?.meta?.total_genres) {
      setGenres(artists?.meta?.total_genres);
    }
    if (venuesList?.meta?.total_venue_types) {
      setVenues(venuesList?.meta?.total_venue_types);
    }
  }, [artists, venuesList]);

  // google places auto-suggest
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const locationInputRef = useRef<HTMLInputElement>(null);
  const [mapsInstance, setMapsInstance] = useState<any>(null);

  // google places auto-suggest
  useEffect(() => {
    if (window.google?.maps) {
      setMapsInstance(window.google.maps);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTO_SUGGESTION}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setMapsInstance(window.google.maps);
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapsInstance || !locationInputRef.current) return;

    const autocomplete = new mapsInstance.places.Autocomplete(
      locationInputRef.current,
      {
        types: ["geocode"], // homes + buildings
        fields: ["formatted_address", "geometry", "name"],
      },
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.formatted_address || !place.geometry?.location) {
        toast.error("Please select a location from the list");
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      // Set location text
      setLocation(place.formatted_address);
      setCoordinates({ lat, lng }); // ✅ THIS WAS MISSING

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
      console.log("place.formatted_address", place.formatted_address);

      // setUser((prev) => ({
      //   ...prev,
      //   location: place.formatted_address,
      // }));
    });

    return () => {
      mapsInstance.event.clearInstanceListeners(autocomplete);
    };
  }, [mapsInstance]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleVenueToggle = (venue: string) => {
    setSelectedVenues((prev) =>
      prev.includes(venue) ? prev.filter((g) => g !== venue) : [...prev, venue],
    );
  };

  const handleSelectAllGenres = () => {
    if (selectedGenres.length === genres.length) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres([...genres]);
    }
  };

  const handleSelectAllVenues = () => {
    if (selectedVenues.length === venues.length) {
      setSelectedVenues([]);
    } else {
      setSelectedVenues([...venues]);
    }
  };

  const handleDateSelect = (day: Date, position: "from" | "to") => {
    setDateRange((prev) => {
      if (!prev) return { from: day, to: undefined };
      if (position === "from") {
        return { from: day, to: prev.to };
      } else {
        return { from: prev.from, to: day };
      }
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setSearchLoading(true));

    try {
      if (onSearchTypeChange === "artist") {
        const res = await triggerArtistSearch({
          genres: selectedGenres.join(","),
          start_date: dateRange?.from?.toISOString(),
          end_date: dateRange?.to?.toISOString(),
          location_lat: coordinates?.lat,
          location_lng: coordinates?.lng,
        }).unwrap();

        if (res?.success) {
          dispatch(setSearchResult(res));
          router.push("/search");
        }
      } else {
        const res = await triggerVenueSearch({
          venue_types: selectedVenues.join(","),
          min_capacity: minVenueCapacity,
          max_capacity: maxVenueCapacity,
          location_lat: coordinates?.lat,
          location_lng: coordinates?.lng,
          start_date: dateRange?.from?.toISOString(),
          end_date: dateRange?.to?.toISOString(),
        }).unwrap();

        if (res?.success) {
          dispatch(setSearchResult(res));
          router.push("/search");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setTimeout(() => {
        dispatch(setSearchLoading(false));
      }, 1000);
    }
  };

  const filteredGenres = genres?.filter((genre: any) =>
    genre?.toLowerCase().includes(genreSearchInput?.toLowerCase()),
  );

  const filteredVenues = venues?.filter((venue: any) =>
    venue?.toLowerCase().includes(genreSearchInput?.toLowerCase()),
  );

  const genreDisplayText =
    selectedGenres.length === 0
      ? "All Genres"
      : selectedGenres.length === genres.length
        ? "All Genres"
        : selectedGenres.length <= 2
          ? selectedGenres.join(", ")
          : `${selectedGenres.length} Genres Selected`;

  const venueDisplayText =
    selectedVenues.length === 0
      ? "All Venue Types"
      : selectedVenues.length === venues.length
        ? "All Venue Types"
        : selectedVenues.length <= 2
          ? selectedVenues.join(", ")
          : `${selectedVenues.length} Venue Types Selected`;

  const dateDisplayText =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`
      : "Date Range";

  return (
    <div className={`w-full max-w-3xl ${className}`}>
      <div className='border border-gray-300 rounded-3xl p-4 sm:p-6 bg-[#E9EEF3] shadow-sm'>
        <div className='mb-3'>
          <h2 className='text-xl md:text-2xl font-semibold text-[#000000CC]'>
            I'm looking for
          </h2>
        </div>

        <div>
          {/* Search Type Buttons */}
          <div className='flex flex-wrap gap-3'>
            <Button
              onClick={() => setOnSearchTypeChange("artist")}
              variant={onSearchTypeChange === "artist" ? "default" : "outline"}
              className={`rounded-full font-medium transition-all ${
                onSearchTypeChange === "artist"
                  ? "bg-[#4F79A1] text-secondary"
                  : "text-foreground hover:bg-background"
              }`}
            >
              Find Artist
            </Button>
            <Button
              onClick={() => setOnSearchTypeChange("venue")}
              variant={onSearchTypeChange === "venue" ? "default" : "outline"}
              className={`rounded-full font-medium transition-all ${
                onSearchTypeChange === "venue"
                  ? "bg-[#4F79A1] text-primary-foreground"
                  : "text-primary hover:bg-background"
              }`}
            >
              Find Venue
            </Button>
          </div>

          <div className='bg-white rounded-3xl p-4 sm:p-6 mt-4'>
            {/* Genres Section */}
            {onSearchTypeChange === "artist" ? (
              <div className='mb-6 sm:mb-8'>
                <label className='block text-sm sm:text-base font-medium text-gray-700 mb-3'>
                  Genres
                </label>
                <Popover open={isGenreOpen} onOpenChange={setIsGenreOpen}>
                  <PopoverTrigger asChild>
                    <button className='w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-between bg-white'>
                      <span className='text-sm sm:text-base'>
                        {genreDisplayText}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isGenreOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='lg:min-w-[572px]! p-0 border-0'
                    align='end'
                  >
                    <div className='p-4 sm:p-6 space-y-4'>
                      {/* Search Input */}
                      <div className='relative'>
                        <Input
                          placeholder='Search genres...'
                          value={genreSearchInput}
                          onChange={(e) => setGenreSearchInput(e.target.value)}
                          className='pl-4 pr-10 bg-gray-100 border-0'
                        />
                        <Search className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                      </div>

                      {/* Select All Genres */}
                      <div className='flex items-center space-x-3 py-2 cursor-pointer'>
                        <Checkbox
                          id='select-all-genres'
                          checked={selectedGenres.length === genres.length}
                          onCheckedChange={handleSelectAllGenres}
                        />
                        <Label
                          htmlFor='select-all-genres'
                          className='text-sm sm:text-base font-medium'
                        >
                          Select all genres
                        </Label>
                      </div>

                      {/* Genre List */}
                      <div className='space-y-2 max-h-60 overflow-y-auto'>
                        {filteredGenres.map((genre) => (
                          <div
                            key={genre}
                            className='flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded'
                            onClick={() => handleGenreToggle(genre)}
                          >
                            <Checkbox
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={() => handleGenreToggle(genre)}
                            />
                            <span className='text-sm sm:text-base'>
                              {genre}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div>
                <div className='mb-6 sm:mb-8'>
                  <label className='block text-sm sm:text-base font-medium text-gray-700 mb-3'>
                    Type of venue
                  </label>
                  <Popover open={isGenreOpen} onOpenChange={setIsGenreOpen}>
                    <PopoverTrigger asChild>
                      <button className='w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-between bg-white'>
                        <span className='text-sm sm:text-base'>
                          {venueDisplayText}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${isGenreOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='lg:min-w-min! p-0 border-0'
                      align='end'
                    >
                      <div className='p-4 sm:p-6 space-y-4'>
                        {/* Search Input */}
                        <div className='relative'>
                          <Input
                            placeholder='Type of venue'
                            value={venueSearchInput}
                            onChange={(e) =>
                              setVenueSearchInput(e.target.value)
                            }
                            className='pl-4 pr-10 bg-gray-100 border-0'
                          />
                          <Search className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                        </div>

                        {/* Select All Genres */}
                        <div className='flex items-center space-x-3 py-2 cursor-pointer'>
                          <Checkbox
                            id='select-all-genres'
                            checked={selectedVenues.length === venues.length}
                            onCheckedChange={handleSelectAllVenues}
                          />
                          <Label
                            htmlFor='select-all-genres'
                            className='text-sm sm:text-base font-medium'
                          >
                            Select all genres
                          </Label>
                        </div>

                        {/* VENUES List */}
                        <div className='space-y-2 max-h-60 overflow-y-auto'>
                          {filteredVenues?.map((venue) => (
                            <div
                              key={venue}
                              className='flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded'
                              onClick={() => handleVenueToggle(venue)}
                            >
                              <Checkbox
                                checked={selectedVenues.includes(venue)}
                                onCheckedChange={() => handleVenueToggle(venue)}
                              />
                              <span className='text-sm sm:text-base'>
                                {venue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='mb-6 sm:mb-8'>
                  <label className='block text-sm sm:text-base font-medium text-gray-700 mb-3'>
                    Venue Capacity
                  </label>

                  <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-5 lg:border border-gray-300 rounded-full px-4 py-1'>
                    <div className='flex items-center gap-3'>
                      <label className='block text-sm sm:text-base font-medium text-gray-700'>
                        Minimum
                      </label>
                      {/* Search Input */}
                      <div className='relative p-1'>
                        <Input
                          type='number'
                          placeholder='0'
                          value={minVenueCapacity}
                          onChange={(e) =>
                            setMinVenueCapacity(Number(e.target.value))
                          }
                          className='bg-transparent border rounded-full'
                        />
                      </div>
                    </div>
                    <div className='hidden lg:block'>
                      <Minus className='w-5 h-5 text-gray-400' />{" "}
                    </div>
                    <div className='flex items-center gap-3'>
                      <label className='block text-sm sm:text-base font-medium text-gray-700'>
                        Maximum
                      </label>
                      {/* Search Input */}
                      <div className='relative p-1'>
                        <Input
                          type='number'
                          placeholder='0'
                          value={maxVenueCapacity}
                          onChange={(e) =>
                            setMaxVenueCapacity(Number(e.target.value))
                          }
                          className='min-w-20 bg-transparent border rounded-full'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location and Dates Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8'>
              {/* Location */}
              <div>
                <label className='block text-sm sm:text-base font-medium text-gray-700 mb-3'>
                  Location
                </label>
                <div className='relative'>
                  <Input
                    placeholder='City or Zip Code'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    ref={locationInputRef}
                    className='pr-10 border-gray-300 text-sm sm:text-base h-12 sm:h-14 rounded-full'
                  />
                  {location && (
                    <button
                      onClick={() => setLocation("")}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div>
                <label className='block text-sm sm:text-base font-medium text-gray-700 mb-3'>
                  Dates
                </label>
                <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                  <PopoverTrigger asChild>
                    <button className='w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-between bg-white text-sm sm:text-base'>
                      <span>{dateDisplayText}</span>
                      <Calendar className='w-5 h-5' />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full sm:w-auto p-4' align='end'>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {/* From Date */}
                        <div>
                          <h3 className='text-sm font-semibold mb-2 text-gray-700'>
                            From
                          </h3>
                          <CalendarComponent
                            mode='single'
                            selected={dateRange?.from}
                            onSelect={(day) =>
                              day && handleDateSelect(day, "from")
                            }
                            disabled={(date) =>
                              dateRange?.to ? date > dateRange.to : false
                            }
                            className='text-sm'
                          />
                        </div>

                        {/* To Date */}
                        <div>
                          <h3 className='text-sm font-semibold mb-2 text-gray-700'>
                            To
                          </h3>
                          <CalendarComponent
                            mode='single'
                            selected={dateRange?.to}
                            onSelect={(day) =>
                              day && handleDateSelect(day, "to")
                            }
                            disabled={(date) =>
                              dateRange?.from ? date < dateRange.from : false
                            }
                            className='text-sm'
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => setIsDateOpen(false)}
                        className='w-full bg-gray-900 hover:bg-gray-800 text-white'
                      >
                        Apply
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={searchLoading}
              className='w-full h-11 bg-[#1E1E1E] hover:bg-[#0e0d0d] text-white py-3 sm:py-4 text-base sm:text-lg rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Search className='w-5 h-5' />
              Search Availability
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
