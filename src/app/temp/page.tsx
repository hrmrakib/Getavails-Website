import GoogleCalendarEvent from "@/components/calenderEvent/page";
import React from "react";

const page = () => {
  return (
    <div>
      <GoogleCalendarEvent />
    </div>
  );
};

export default page;

// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "lucide-react";
// import Image from "next/image";

// interface Artist {
//   id: string;
//   name: string;
//   address: string;
//   genre: string;
//   availability: string[];
//   image: string;
// }

// // Mock data
// const mockArtists: Artist[] = [
//   {
//     id: "1",
//     name: "Neko Case",
//     address: "12 Street Kimbal Building, London",
//     genre: "rock",
//     availability: ["Feb 2 - Feb 3", "Feb 8 - Feb 10"],
//     image:
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//   },
//   {
//     id: "2",
//     name: "The Indie Collective",
//     address: "45 Music Ave, London",
//     genre: "pop",
//     availability: ["Feb 2 - Feb 3", "Feb 8 - Feb 10"],
//     image:
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//   },
//   {
//     id: "3",
//     name: "Electronic Dreams",
//     address: "78 Concert Hall, London",
//     genre: "electronic",
//     availability: ["Feb 2 - Feb 3", "Feb 8 - Feb 10"],
//     image:
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//   },
//   {
//     id: "4",
//     name: "Classical Symphony",
//     address: "33 Royal Street, London",
//     genre: "classical",
//     availability: ["Feb 2 - Feb 3", "Feb 8 - Feb 10"],
//     image:
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//   },
//   {
//     id: "5",
//     name: "Jazz Quintet",
//     address: "99 Downtown Plaza, London",
//     genre: "jazz",
//     availability: ["Feb 5 - Feb 7", "Feb 15 - Feb 20"],
//     image:
//       "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
//   },
//   {
//     id: "6",
//     name: "Rock Legends",
//     address: "56 Uptown Lane, London",
//     genre: "rock",
//     availability: ["Feb 1 - Feb 4", "Feb 10 - Feb 12"],
//     image:
//       "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop",
//   },
// ];

// // Result Card Component
// function ResultCard({
//   artist,
//   isBooked,
//   onBook,
// }: {
//   artist: Artist;
//   isBooked: boolean;
//   onBook: () => void;
// }) {
//   return (
//     <div className='bg-background rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-border'>
//       <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
//         {/* Image */}
//         <div className='flex-shrink-0'>
//           <div className='relative w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-muted'>
//             <Image
//               src={artist.image || "/placeholder.svg"}
//               alt={artist.name}
//               fill
//               className='object-cover'
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div className='flex-1 flex flex-col justify-between'>
//           <div className='space-y-2 md:space-y-3'>
//             <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
//               {artist.name}
//             </h3>
//             <p className='text-sm md:text-base text-muted-foreground'>
//               {artist.address}
//             </p>

//             {/* Availability */}
//             <div className='space-y-2'>
//               <p className='text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide'>
//                 Availability
//               </p>
//               <div className='flex flex-wrap gap-2'>
//                 {artist.availability.map((date, idx) => (
//                   <span
//                     key={idx}
//                     className='px-3 py-1 bg-secondary rounded-lg text-xs md:text-sm text-muted-foreground font-medium'
//                   >
//                     {date}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Book Button */}
//           <div className='mt-4 sm:mt-0'>
//             <Button
//               onClick={onBook}
//               className={`w-full sm:w-auto rounded-full font-semibold px-6 md:px-8 py-2 md:py-3 transition-all ${
//                 isBooked
//                   ? "bg-primary text-primary-foreground hover:bg-primary/90"
//                   : "bg-primary text-primary-foreground hover:bg-primary/90"
//               }`}
//             >
//               {isBooked ? "Booked ✓" : "Book Now"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Search Panel Component
// function SearchPanel({
//   searchType,
//   onSearchTypeChange,
//   selectedGenre,
//   onGenreChange,
//   location,
//   onLocationChange,
//   dateRange,
//   onDateRangeChange,
// }: {
//   searchType: "artist" | "venue";
//   onSearchTypeChange: (type: "artist" | "venue") => void;
//   selectedGenre: string;
//   onGenreChange: (genre: string) => void;
//   location: string;
//   onLocationChange: (location: string) => void;
//   dateRange: string;
//   onDateRangeChange: (dateRange: string) => void;
// }) {
//   return (
//     <div className='w-full lg:w-96 flex-shrink-0'>
//       {/* Header Section */}
//       <div className='bg-secondary rounded-3xl p-6 md:p-8 space-y-6'>
//         <div className='space-y-4'>
//           <h2 className='text-2xl md:text-3xl font-semibold text-foreground'>
//             I'm looking for
//           </h2>

//           {/* Search Type Buttons */}
//           <div className='flex flex-wrap gap-3'>
//             <Button
//               onClick={() => onSearchTypeChange("artist")}
//               variant={searchType === "artist" ? "default" : "outline"}
//               className={`rounded-full font-medium transition-all ${
//                 searchType === "artist"
//                   ? "bg-foreground text-secondary"
//                   : "border-2 border-foreground text-foreground hover:bg-background"
//               }`}
//             >
//               Fins Artist
//             </Button>
//             <Button
//               onClick={() => onSearchTypeChange("venue")}
//               variant={searchType === "venue" ? "default" : "outline"}
//               className={`rounded-full font-medium transition-all ${
//                 searchType === "venue"
//                   ? "bg-primary text-primary-foreground"
//                   : "border-2 border-primary text-primary hover:bg-background"
//               }`}
//             >
//               Find Venue
//             </Button>
//           </div>
//         </div>

//         {/* Search Form */}
//         <div className='bg-background rounded-2xl p-6 space-y-6'>
//           <h3 className='text-lg font-semibold text-foreground'>You Search</h3>

//           {/* Genres */}
//           <div className='space-y-2'>
//             <label className='text-sm font-medium text-muted-foreground'>
//               Genres
//             </label>
//             <Select value={selectedGenre} onValueChange={onGenreChange}>
//               <SelectTrigger className='rounded-xl border-2 border-border bg-background text-foreground'>
//                 <SelectValue placeholder='All Genres' />
//               </SelectTrigger>
//               <SelectContent className='bg-background border-border'>
//                 <SelectItem value='all'>All Genres</SelectItem>
//                 <SelectItem value='rock'>Rock</SelectItem>
//                 <SelectItem value='pop'>Pop</SelectItem>
//                 <SelectItem value='jazz'>Jazz</SelectItem>
//                 <SelectItem value='classical'>Classical</SelectItem>
//                 <SelectItem value='electronic'>Electronic</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Location and Dates Row */}
//           <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
//             {/* Location */}
//             <div className='space-y-2'>
//               <label className='text-sm font-medium text-muted-foreground'>
//                 Location
//               </label>
//               <Input
//                 value={location}
//                 onChange={(e) => onLocationChange(e.target.value)}
//                 placeholder='London'
//                 className='rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground'
//               />
//             </div>

//             {/* Dates */}
//             <div className='space-y-2'>
//               <label className='text-sm font-medium text-muted-foreground'>
//                 Dates
//               </label>
//               <div className='relative'>
//                 <Input
//                   value={dateRange}
//                   onChange={(e) => onDateRangeChange(e.target.value)}
//                   placeholder='19 April-19 June, 2025'
//                   className='rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground pl-3 pr-10'
//                 />
//                 <Calendar className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none' />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main Page Component
// export default function Home() {
//   const [searchType, setSearchType] = useState<"artist" | "venue">("artist");
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [location, setLocation] = useState("London");
//   const [dateRange, setDateRange] = useState("19 April-19 June, 2025");
//   const [bookedArtists, setBookedArtists] = useState<Set<string>>(new Set());

//   const filteredResults = useMemo(() => {
//     return mockArtists.filter((artist) => {
//       // Filter by location - if location is empty, show all
//       if (location.trim() !== "") {
//         if (!artist.address.toLowerCase().includes(location.toLowerCase())) {
//           return false;
//         }
//       }

//       // Filter by genre
//       if (selectedGenre !== "all") {
//         if (artist.genre !== selectedGenre) {
//           return false;
//         }
//       }

//       return true;
//     });
//   }, [location, selectedGenre]);

//   const handleBook = (artistId: string) => {
//     setBookedArtists((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(artistId)) {
//         newSet.delete(artistId);
//       } else {
//         newSet.add(artistId);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <main className='min-h-screen bg-background'>
//       <div className='flex flex-col lg:flex-row gap-6 container mx-auto my-6 md:my-12'>
//         {/* Left Panel - Search Filters */}
//         <SearchPanel
//           searchType={searchType}
//           onSearchTypeChange={setSearchType}
//           selectedGenre={selectedGenre}
//           onGenreChange={setSelectedGenre}
//           location={location}
//           onLocationChange={setLocation}
//           dateRange={dateRange}
//           onDateRangeChange={setDateRange}
//         />

//         {/* Right Panel - Results */}
//         <div className='flex-1 min-w-0'>
//           {/* Header */}
//           <div className='mb-6'>
//             <h2 className='text-2xl md:text-3xl font-semibold text-foreground mb-2'>
//               Search Result
//             </h2>
//             <p className='text-sm md:text-base text-muted-foreground'>
//               {filteredResults.length} Result
//               {filteredResults.length !== 1 ? "s" : ""}
//             </p>
//           </div>

//           {/* Results Grid */}
//           {filteredResults.length > 0 ? (
//             <div className='space-y-4'>
//               {filteredResults.map((artist) => (
//                 <ResultCard
//                   key={artist.id}
//                   artist={artist}
//                   isBooked={bookedArtists.has(artist.id)}
//                   onBook={() => handleBook(artist.id)}
//                 />
//               ))}
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
