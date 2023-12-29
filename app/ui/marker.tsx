"use client";

import { Marker } from "react-map-gl";
import Pin from "./pin";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { set } from "mongoose";

interface PinData {
  id: string;
  longitude: number;
  latitude: number;
}

export default function MapMarkers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pins, setPins] = useState<PinData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setPins([]);
      try {
        const category = searchParams.get("category");
        const res = await fetch(
          `/api/pins${category ? `?category=${category}` : ""}`
        );
        const pins = await res.json();
        console.log(pins);
        setPins(pins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      {pins.map((marker) => (
        <Marker
          key={marker.id}
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
        >
          <Pin size={20} />
        </Marker>
      ))}
    </>
  );
}
