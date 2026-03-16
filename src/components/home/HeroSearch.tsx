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
import { Checkbox } from "@/components/ui/checkbox";
import { DateRange } from "react-day-picker";
import { format, set } from "date-fns";
import { Label } from "@/components/ui/label";
import { addDays } from "date-fns";
import { toast } from "sonner";
import {
  useGetAllGenresQuery,
  useLazySearchArtistsQuery,
  useLazySearchVenuesQuery,
  useSearchArtistsQuery,
  useSearchVenuesQuery,
} from "@/redux/features/search/searchAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setResultType,
  setSearchLoading,
  setSearchResult,
} from "@/redux/features/search/searchSlice";
import { useRouter } from "next/navigation";
import SearchRange from "../ui/Sliderwithtooltip";

export function SearchSection({ className }: { className?: string }) {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [genreSearchInput, setGenreSearchInput] = useState("");
  const [genresSearchInput, setGenresSearchInput] = useState("");
  const [venueSearchInput, setVenueSearchInput] = useState("");
  const [onSearchTypeChange, setOnSearchTypeChange] = useState<
    "artist" | "venue"
  >("artist");
  const [radiusValue, setRadiusValue] = useState([0, 0]);

  const [triggerArtistSearch, { data: artistData, isLoading: artistLoading }] =
    useLazySearchArtistsQuery();
  const [triggerVenueSearch, { data: venueData, isLoading: venueLoading }] =
    useLazySearchVenuesQuery();
  const { data: artists } = useSearchArtistsQuery({});
  const { data: venuesList } = useSearchVenuesQuery({});

  const { data } = useGetAllGenresQuery({});

  const genresList = data?.data;

  const searchLoading = useSelector(
    (state: any) => state?.search?.searchLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (genresList) {
      setGenres(genresList);
    }
  }, [genresList]);

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

  const handleSelectAllGenres = () => {
    if (selectedGenres.length === genres.length) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres([...genres]);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setSearchLoading(true));

    try {
      if (onSearchTypeChange === "artist") {
        const res = await triggerArtistSearch({
          search: genresSearchInput,
          genres: selectedGenres.join(","),
          location_lat: coordinates?.lat,
          location_lng: coordinates?.lng,
          radius_mi: radiusValue[0],
        }).unwrap();

        if (res?.success) {
          dispatch(setResultType("artist"));
          dispatch(setSearchResult(res));
          router.push("/search");
        }
      } else {
        const res = await triggerVenueSearch({
          location_lat: coordinates?.lat,
          location_lng: coordinates?.lng,
          radius_mi: radiusValue[0],
          search: venueSearchInput,
        }).unwrap();

        if (res?.success) {
          dispatch(setResultType("venue"));
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

  const genreDisplayText =
    selectedGenres.length === 0
      ? "All Genres"
      : selectedGenres.length === genres.length
        ? "All Genres"
        : selectedGenres.length <= 2
          ? selectedGenres.join(", ")
          : `${selectedGenres.length} Genres Selected`;

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
              <>
                {/* Search Input */}
                <div className='relative mb-5'>
                  <Input
                    placeholder='Search for genres...'
                    value={genresSearchInput}
                    onChange={(e) => setGenresSearchInput(e.target.value)}
                    className='h-12 pl-4 pr-10 bg-white! border border-gray-300 rounded-full'
                  />
                  <Search className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                </div>

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
                            onChange={(e) =>
                              setGenreSearchInput(e.target.value)
                            }
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
              </>
            ) : (
              <div>
                <div className='mb-6 sm:mb-8'>
                  <div className='space-y-4'>
                    {/* Search Input */}
                    <div className='relative'>
                      <Input
                        placeholder='Search venue'
                        value={venueSearchInput}
                        onChange={(e) => setVenueSearchInput(e.target.value)}
                        className='h-12 pl-4 pr-10 bg-white! border border-gray-300 rounded-full'
                      />
                      <Search className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location and Dates Section */}
            <div className='grid grid-cols-1  gap-4 sm:gap-6 mb-6 sm:mb-8'>
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
                    className='bg-white! pr-10 border-gray-300 text-sm sm:text-base h-12 sm:h-14 rounded-full'
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
            </div>

            <div className='mb-6 sm:mb-8'>
              <SearchRange
                radiusValue={radiusValue}
                setRadiusValue={setRadiusValue}
              />
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
