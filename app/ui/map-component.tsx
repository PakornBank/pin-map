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
import { useSearchParams } from "next/navigation";

import ControlPanel from "./control-panel";
import Pin from "./pin";
import MapMarkers from "./marker";
import PopupCard from "./popup-card";
import PopupForm from "./popup-form";
import { Box } from "@mantine/core";

export default function MapComponent() {
  const [showMarker, setShowMarker] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  const handleShowMarker = () => {
    setShowMarker(!showMarker);
  };

  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });

  const searchParams = useSearchParams();
  const [pinsData, setPinsData] = useState([]);

  const fetchPins = async () => {
    // console.log("fetching pins");
    // setPinsData([]);
    try {
      const category = searchParams.get("category");
      const res = await fetch(
        `/api/pins${category ? `?category=${category}` : ""}`,
        { cache: "no-store" }
      );
      const pins = await res.json();
      setPinsData(pins);
      setPopupInfo(null);
      // console.log(pins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPins();
  }, [searchParams]);

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
          <>
            <Marker
              longitude={viewState.longitude}
              latitude={viewState.latitude}
              anchor="bottom"
            >
              <Pin size={20} />
            </Marker>
            <Box
              pos={"absolute"}
              style={{
                zIndex: 10,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 15px)",
              }}
            >
              {/* <PopupCard popupInfo={popupInfo}></PopupCard> */}
              <PopupForm
                latitude={viewState.latitude}
                longitude={viewState.longitude}
                fetchPins={fetchPins}
                setShowMarker={setShowMarker}
              ></PopupForm>
            </Box>
          </>
        ) : (
          <></>
        )}
        <MapMarkers setPopupInfo={setPopupInfo} pinsData={pinsData} />
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number((popupInfo as any).longitude)}
            latitude={Number((popupInfo as any).latitude)}
            // closeOnClick={false}
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
        handleChangeLat={handleChangeLat}
        handleChangeLong={handleChangeLong}
        handleShowMarker={handleShowMarker}
      />
    </>
  );
}
