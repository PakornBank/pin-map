import * as React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchPinsData } from "../lib/data";
import MapMarkers from "./marker";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default async function MapView() {
  const pins = await fetchPinsData();
  return (
    <>
      <Map
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        latitude={40}
        longitude={-100}
        zoom={3.5}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        onMove={(e) => setViewState(e.viewState)}
      >
        <MapMarkers pins={pins} />

        <NavigationControl />
      </Map>
    </>
  );
}
