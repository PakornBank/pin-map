"use client";

import * as React from "react";
import { useState, useEffect, useRef, createRef } from "react";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ControlPanel from "./control-panel";
import Pin from "./pin";
import MapMarkers from "./marker";
import { fetchPinsData } from "../lib/data";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapComponent() {
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

  const geoControlRef = createRef<mapboxgl.GeolocateControl>();

  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  return (
    <>
      <Map
        {...viewState}
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        onMove={(e) => setViewState(e.viewState)}
      >
        <GeolocateControl position="top-right" ref={geoControlRef} />
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
        <MapMarkers />

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
