"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: any = ["places"];

export default function HomeMapController() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTO_SUGGESTION!,
    libraries,
  });

  const [pickAddress, setPickAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");

  const [pickCoordinates, setPickCoordinates] = useState<number[]>([]);
  const [dropCoordinates, setDropCoordinates] = useState<number[]>([]);

  const [recentDestinations, setRecentDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pickRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropRef = useRef<google.maps.places.Autocomplete | null>(null);

  const mapCenter = { lat: 23.8103, lng: 90.4125 };

  // 📦 Load Recent Destinations
  useEffect(() => {
    const data = localStorage.getItem("recent_destinations");
    if (data) {
      setRecentDestinations(JSON.parse(data));
    }
  }, []);

  // 💾 Save Recent Destination
  const saveRecentDestination = (address: string, lat: number, lng: number) => {
    let updated = recentDestinations.filter((d) => d.address !== address);
    updated.unshift({ address, lat, lng });

    if (updated.length > 5) updated.pop();

    setRecentDestinations(updated);
    localStorage.setItem("recent_destinations", JSON.stringify(updated));
  };

  // 📍 Handle Pick Select
  const handlePickSelect = () => {
    const place = pickRef.current?.getPlace();
    if (!place?.geometry) return;

    const lat = place.geometry.location?.lat();
    const lng = place.geometry.location?.lng();

    setPickAddress(place.formatted_address || "");
    setPickCoordinates([lat!, lng!]);
  };

  // 📍 Handle Drop Select
  const handleDropSelect = () => {
    const place = dropRef.current?.getPlace();
    if (!place?.geometry) return;

    const lat = place.geometry.location?.lat();
    const lng = place.geometry.location?.lng();

    setDropAddress(place.formatted_address || "");
    setDropCoordinates([lat!, lng!]);

    saveRecentDestination(place.formatted_address!, lat!, lng!);
  };

  // 💰 Estimate Fare
  const calculateFare = async () => {
    if (pickCoordinates.length < 2 || dropCoordinates.length < 2) {
      alert("Please select pickup and drop location");
      return;
    }

    setIsLoading(true);

    const body = {
      pickup_lat: pickCoordinates[0],
      pickup_lng: pickCoordinates[1],
      dropoff_lat: dropCoordinates[0],
      dropoff_lng: dropCoordinates[1],
      pickup_address: pickAddress,
      dropoff_address: dropAddress,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trips/estimate-fare`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert(`Estimated Fare: ${data.estimated_fare}`);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Network error");
    }

    setIsLoading(false);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className='p-5 space-y-4'>
      {/* Pickup */}
      <Autocomplete
        onLoad={(ref) => (pickRef.current = ref)}
        onPlaceChanged={handlePickSelect}
      >
        <input
          type='text'
          placeholder='Pickup Location'
          className='border p-2 w-full'
        />
      </Autocomplete>

      {/* Drop */}
      <Autocomplete
        onLoad={(ref) => (dropRef.current = ref)}
        onPlaceChanged={handleDropSelect}
      >
        <input
          type='text'
          placeholder='Drop Location'
          className='border p-2 w-full'
        />
      </Autocomplete>

      {/* Button */}
      <button
        onClick={calculateFare}
        className='bg-blue-600 text-white px-4 py-2'
        disabled={isLoading}
      >
        {isLoading ? "Calculating..." : "Estimate Fare"}
      </button>

      {/* Recent */}
      <div>
        <h3 className='font-bold mt-4'>Recent Destinations</h3>
        {recentDestinations.map((dest, i) => (
          <div key={i} className='text-sm text-gray-600'>
            {dest.address}
          </div>
        ))}
      </div>

      {/* Map */}
      <GoogleMap
        zoom={12}
        center={mapCenter}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}
