"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ControlPanel from "./control-panel";
import Pin from "./pin";

import type { MarkerDragEvent, LngLat } from "react-map-gl";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function App() {
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const [showMarker, setShowMarker] = useState(true);

  const handleShowMarker = () => {
    setShowMarker(!showMarker);
  };

  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const handleChangeLat = (lat: number) => {
    setViewState({ ...viewState, latitude: lat });
  };

  const handleChangeLong = (long: number) => {
    setViewState({ ...viewState, longitude: long });
  };

  return (
    <>
      <Map
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        {...viewState}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        onMove={(e) => setViewState(e.viewState)}
      >
        {showMarker ? (
          <Marker
            longitude={viewState.longitude}
            latitude={viewState.latitude}
            anchor="bottom"
          >
            <Pin size={20} />
          </Marker>
        ) : (
          <></>
        )}

        <NavigationControl />
      </Map>
      <ControlPanel
        longitude={viewState.longitude}
        latitude={viewState.latitude}
        handleChangeLat={handleChangeLat}
        handleChangeLong={handleChangeLong}
        handleShowMarker={handleShowMarker}
      />
    </>
  );
}
