"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./maplibregl-popup-content.css";

import ControlPanel from "./control-panel";
import Pin from "./pin";
import MapMarkers from "./marker";
import PopupCard from "./popup-card";

export default function MapComponent() {
  const [showMarker, setShowMarker] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);

  const handleShowMarker = () => {
    setShowMarker(!showMarker);
  };

  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });

  const handleChangeLat = (lat: number) => {
    setViewState({ ...viewState, latitude: lat });
  };

  const handleChangeLong = (long: number) => {
    setViewState({ ...viewState, longitude: long });
  };

  const geoControlRef = useRef<maplibregl.GeolocateControl | null>(null);
  useEffect(() => {
    // make geolocate trigger on load
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  return (
    <>
      <Map
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=g9SJCPMB2ji0vRCDxrAw"
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
        <MapMarkers setPopupInfo={setPopupInfo} />
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number((popupInfo as any).longitude)}
            latitude={Number((popupInfo as any).latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <PopupCard popupInfo={popupInfo}></PopupCard>
          </Popup>
        )}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
          ref={geoControlRef}
        />
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
