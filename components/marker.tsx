"use client";

import { Marker } from "react-map-gl";
import Pin from "./pin";
import { useMemo } from "react";

interface PinData {
  id: string;
  longitude: number;
  latitude: number;
}

export default function MapMarkers({
  setPopupInfo,
  pinsData,
}: {
  setPopupInfo: (info: any) => void;
  pinsData: PinData[];
}) {
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
