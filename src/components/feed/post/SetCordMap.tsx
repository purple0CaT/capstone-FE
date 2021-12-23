import { TextField } from "@mui/material";
import L from "leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
// ==== MARKER ICON
function getIcon(iconSize: any) {
  return L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize,
    iconAnchor: [15, 30],
  });
}
// ===================== JSX SET UP
function SetCordMap() {
  const markerRef = useRef(null);
  const [SearchLoc, setSearchLoc] = useState("");
  const [position, setPosition]: any = useState({});
  // === Marker Handler on Click
  const ClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
      },
    });
    return null;
  };
  // === Marker Handler on Move
  const markerHandler = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  // Fetch position
  const fetchCord = async (type: boolean) => {
    const url = type
      ? `https://api.opencagedata.com/geocode/v1/json?q=${position.lat}+${position.lng}&key=${process.env.REACT_APP_GEOMAPSEARCH}`
      : `https://api.opencagedata.com/geocode/v1/json?q=${SearchLoc}&key=${process.env.REACT_APP_GEOMAPSEARCH}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        if (type) {
          setSearchLoc(data.results[0].formatted);
        }
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  //
  useEffect(() => {
    fetchCord(true);
  }, [position]);
  //====== JSX
  return (
    <Row>
      {/* SEARCH */}
      <Col xs="12" md="6">
        <TextField
          margin="dense"
          id="heo"
          label="Heolocation"
          type="text"
          fullWidth
          variant="standard"
          value={SearchLoc}
          onChange={(e: any) => setSearchLoc(e.target.value)}
          onClick={(e: any) => {
            e.key === "Enter" && fetchCord(false);
          }}
        />{" "}
      </Col>

      {/* MAP */}
      <Col xs="12" md="6">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
        >
          <ClickHandler />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position?.lat && (
            <Marker
              draggable={true}
              eventHandlers={markerHandler}
              position={position}
              ref={markerRef}
              icon={getIcon(30)}
            ></Marker>
          )}
        </MapContainer>
      </Col>
    </Row>
  );
}

export default SetCordMap;
