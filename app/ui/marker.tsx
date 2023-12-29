"use client";

import { Marker } from "react-map-gl";
import Pin from "./pin";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PinData {
  id: string;
  longitude: number;
  latitude: number;
}

export default function MapMarkers({
  setPopupInfo,
}: {
  setPopupInfo: (info: any) => void;
}) {
  const searchParams = useSearchParams();
  const [pinsData, setPinsData] = useState<PinData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setPinsData([]);
      try {
        const category = searchParams.get("category");
        const res = await fetch(
          `/api/pins${category ? `?category=${category}` : ""}`
        );
        const pins = await res.json();
        console.log(pins);
        setPinsData(pins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchParams]);

  const pins = useMemo(
    () =>
      pinsData.map((city) => (
        <Marker
          key={city.id}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin size={20} />
        </Marker>
      )),
    [pinsData, setPopupInfo]
  );

  return <>{pins}</>;
}
