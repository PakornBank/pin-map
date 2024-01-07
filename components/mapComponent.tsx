"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Map, {
  NavigationControl,
  GeolocateControl,
  Popup,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./maplibreglPopupContent.css";
import { useSearchParams } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";

import ControlPanel from "./controlPanel";
import MapMarkers from "./marker";
import PopupCard from "./popupCard";
import PopupForm from "./popupForm";

import { fetchPinsData } from "@/lib/data";

export default function MapComponent() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });

  const searchParams = useSearchParams();
  const [pinsData, setPinsData] = useState([]);

  const fetchPins = async () => {
    setIsLoading(true);
    try {
      const category = searchParams.get("category");
      const user = searchParams.get("user");
      const pin_name = searchParams.get("pin_name");
      const pins = await fetchPinsData(category, user, pin_name);
      setPinsData(pins);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPinsData([]);
    fetchPins();
  }, [searchParams]);

  const geoControlRef = useRef<maplibregl.GeolocateControl | null>(null);

  useEffect(() => {
    // make geolocate trigger on load
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
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
        <PopupForm
          latitude={viewState.latitude}
          longitude={viewState.longitude}
          fetchPins={fetchPins}
          setShowCreateForm={setShowCreateForm}
          setPopupInfo={setPopupInfo}
          showCreateForm={showCreateForm}
        />

        <MapMarkers setPopupInfo={setPopupInfo} pinsData={pinsData} />
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number((popupInfo as any).longitude)}
            latitude={Number((popupInfo as any).latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <PopupCard
              popupInfo={popupInfo}
              fetchPins={fetchPins}
              setPopupInfo={setPopupInfo}
            ></PopupCard>
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
        handleShowCreateForm={handleShowCreateForm}
      />
    </>
  );
}
