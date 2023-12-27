"use client";

import { Marker } from "react-map-gl";
import Pin from "./pin";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MapMarkers() {
  const router = useRouter();
  const { category } = router.query;
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/pins/api${category ? `?category=${category}` : ""}}`
        );
        const pins = await res.json();
        setPins(pins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
