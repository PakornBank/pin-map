"use client";

import { Marker } from "react-map-gl";
import Pin from "./pin";
import { fetchPinsData } from "../lib/data";
import { useState, useEffect, use } from "react";

export default function MapMarkers() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/pins/api");
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
