"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Car, Bike, PersonStanding, X } from "lucide-react";

const libraries: any = ["places"];

export default function AdvancedMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTO_SUGGESTION!,
    libraries,
  });

  const pickRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320); // Initial width
  const [isDragging, setIsDragging] = useState(false);

  const [pickCoords, setPickCoords] = useState<any>(null);
  const [dropCoords, setDropCoords] = useState<any>(null);
  const [directions, setDirections] = useState<any>(null);

  const [distanceKm, setDistanceKm] = useState(0);
  const [durationMin, setDurationMin] = useState(0);
  const [trafficDuration, setTrafficDuration] = useState("");
  const [fare, setFare] = useState(0);
  const [travelMode, setTravelMode] = useState("DRIVING");

  const center = { lat: 23.8103, lng: 90.4125 };

  // Pick & Drop handlers
  const handlePick = () => {
    const place = pickRef.current?.getPlace();
    if (!place?.geometry) return;
    setPickCoords(place.geometry.location);
  };
  const handleDrop = () => {
    const place = dropRef.current?.getPlace();
    if (!place?.geometry) return;
    setDropCoords(place.geometry.location);
  };

  // Calculate route and fare
  const calculateRoute = async () => {
    if (!pickCoords || !dropCoords) {
      alert("Select pickup and drop");
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pickCoords,
      destination: dropCoords,
      travelMode:
        google.maps.TravelMode[
          travelMode as keyof typeof google.maps.TravelMode
        ],
      drivingOptions:
        travelMode === "DRIVING"
          ? {
              departureTime: new Date(),
              trafficModel: google.maps.TrafficModel.BEST_GUESS,
            }
          : undefined,
    });
    setDirections(results);

    const legs = results.routes[0].legs;
    let totalDistance = 0;
    let totalDuration = 0;
    legs.forEach((leg: any) => {
      totalDistance += leg.distance.value;
      totalDuration += leg.duration.value;
    });
    const km = totalDistance / 1000;
    const minutes = totalDuration / 60;
    setDistanceKm(Number(km.toFixed(2)));
    setDurationMin(Number(minutes.toFixed(0)));

    if (travelMode === "DRIVING" && legs[0].duration_in_traffic) {
      setTrafficDuration(legs[0].duration_in_traffic.text);
    }

    // Fare logic
    const baseFare = 50;
    const perKm =
      travelMode === "DRIVING" ? 20 : travelMode === "BICYCLING" ? 10 : 5;
    const perMinute = 2;
    setFare(Number((baseFare + km * perKm + minutes * perMinute).toFixed(2)));
  };

  // Sidebar drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      let newWidth = e.clientX;
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 600) newWidth = 600;
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className='flex h-screen w-full relative'>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl z-20 transition-all duration-300 overflow-hidden`}
        style={{ width: sidebarOpen ? sidebarWidth : 0 }}
      >
        <div className='flex justify-between items-center mb-5 p-5'>
          <h2 className='text-lg font-bold'>Trip Planner</h2>
          <X className='cursor-pointer' onClick={() => setSidebarOpen(false)} />
        </div>

        {/* Travel Mode */}
        <div className='flex justify-between mb-4 px-5'>
          <button
            onClick={() => setTravelMode("DRIVING")}
            className={`p-3 rounded-lg ${
              travelMode === "DRIVING"
                ? "bg-[#235789] text-white"
                : "bg-gray-100"
            }`}
          >
            <Car />
          </button>
          <button
            onClick={() => setTravelMode("BICYCLING")}
            className={`p-3 rounded-lg ${
              travelMode === "BICYCLING"
                ? "bg-[#235789] text-white"
                : "bg-gray-100"
            }`}
          >
            <Bike />
          </button>
          <button
            onClick={() => setTravelMode("WALKING")}
            className={`p-3 rounded-lg ${
              travelMode === "WALKING"
                ? "bg-[#235789] text-white"
                : "bg-gray-100"
            }`}
          >
            <PersonStanding />
          </button>
        </div>

        {/* Pickup */}
        <div className='px-5 mb-3'>
          <div className='flex items-center gap-1.5 mb-3'>
            <span className='text-[#b90707] font-semibold'>A</span>
            <Autocomplete
              onLoad={(ref) => (pickRef.current = ref)}
              onPlaceChanged={handlePick}
              className='flex-1'
            >
              <input
                type='text'
                placeholder='Pickup location'
                className='border p-2 w-full! rounded'
              />
            </Autocomplete>
          </div>

          {/* Drop */}
          <div className='flex items-center gap-1.5 mb-3'>
            <span className='text-[#b90707] font-semibold'>B</span>
            <Autocomplete
              onLoad={(ref) => (dropRef.current = ref)}
              onPlaceChanged={handleDrop}
              className='flex-1'
            >
              <input
                type='text'
                placeholder='Drop location'
                className='border p-2 w-full! rounded'
              />
            </Autocomplete>
          </div>

          <button
            onClick={calculateRoute}
            className='bg-[#235789] text-white w-full py-2 rounded-sm'
          >
            See Route
          </button>
        </div>

        {/* Results */}
        {distanceKm > 0 && (
          <div className='bg-gray-100 p-4 rounded mt-4 text-sm mx-5'>
            <p>
              <strong>Distance:</strong> {distanceKm} km
            </p>
            <p>
              <strong>Duration:</strong> {durationMin} mins
            </p>
            {trafficDuration && (
              <p>
                <strong>With Traffic:</strong> {trafficDuration}
              </p>
            )}
            <p className='text-lg font-bold mt-2'>Estimated Fare: ৳ {fare}</p>
          </div>
        )}
      </div>

      {/* Sidebar Drag Handle */}
      {sidebarOpen && (
        <div
          onMouseDown={handleMouseDown}
          className='absolute top-0 left-[320px] h-full w-1 cursor-col-resize z-30 bg-gray-200'
          style={{ left: sidebarWidth }}
        />
      )}

      {/* Open Sidebar Button */}
      {!sidebarOpen && (
        <button
          className='absolute top-8 left-4 z-30 bg-white p-2 rounded shadow cursor-pointer'
          onClick={() => setSidebarOpen(true)}
        >
          Menu
        </button>
      )}

      {/* Map */}
      <div className='flex-1'>
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}
