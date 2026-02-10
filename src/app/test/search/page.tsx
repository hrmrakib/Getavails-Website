"use client";

import { useState } from "react";
import { Calendar, Search, X, ChevronDown } from "lucide-react";
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
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { addDays } from "date-fns";

const GENRES = [
  "Hip Hop",
  "Rap",
  "Jazz",
  "Pop",
  "Rock",
  "Electronic",
  "Classical",
  "R&B",
  "Country",
  "Indie",
];

export default function SearchSection() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Hip Hop",
    "Rap",
  ]);
  const [location, setLocation] = useState("");
  //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
  //     from: new Date(2025, 3, 19),
  //     to: new Date(2026, 5, 19),
  //   });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [genreSearchInput, setGenreSearchInput] = useState("");

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleSelectAllGenres = () => {
    if (selectedGenres.length === GENRES.length) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres([...GENRES]);
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

  const handleSearch = () => {
    const searchParams = {
      genres: selectedGenres,
      location,
      dateFrom: dateRange?.from,
      dateTo: dateRange?.to,
    };
    console.log("Search params:", searchParams);
  };

  const filteredGenres = GENRES.filter((genre) =>
    genre.toLowerCase().includes(genreSearchInput.toLowerCase()),
  );

  const genreDisplayText =
    selectedGenres.length === 0
      ? "All Genres"
      : selectedGenres.length === GENRES.length
        ? "All Genres"
        : `${selectedGenres.length} Genre${selectedGenres.length > 1 ? "s" : ""}`;

  const dateDisplayText =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`
      : "Date Range";

  return (
    <div className='w-full max-w-2xl mx-auto p-4 sm:p-6'>
      <div className='border border-gray-300 rounded-3xl p-4 sm:p-6 bg-white shadow-sm'>
        {/* Genres Section */}
        <div className='mb-6 sm:mb-8'>
          <label className='block text-sm sm:text-base font-medium text-gray-700 mb-3'>
            Genres
          </label>
          <Popover open={isGenreOpen} onOpenChange={setIsGenreOpen}>
            <PopoverTrigger asChild>
              <button className='w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-between bg-white'>
                <span className='text-sm sm:text-base'>{genreDisplayText}</span>
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
                    checked={selectedGenres.length === GENRES.length}
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
                      <span className='text-sm sm:text-base'>{genre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

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
                        onSelect={(day) => day && handleDateSelect(day, "from")}
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
                        onSelect={(day) => day && handleDateSelect(day, "to")}
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
          className='w-full h-11 bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-4 text-base sm:text-lg rounded-full flex items-center justify-center gap-2 transition-colors'
        >
          <Search className='w-5 h-5' />
          Search Availability
        </Button>
      </div>
    </div>
  );
}
