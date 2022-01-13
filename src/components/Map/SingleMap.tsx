import { Dialog } from "@mui/material";
import L from "leaflet";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { SingleMapImport } from "./MapInterface";

function getIcon(iconSize: any) {
  return L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize,
    iconAnchor: [15, 30],
  });
}
//
function SingleMap({ location, OpenMap, closeMap }: SingleMapImport) {
  return (
    <>
      {" "}
      <Dialog fullWidth open={OpenMap} onClose={closeMap}>
        <MapContainer
          center={location.cord}
          zoom={7}
          scrollWheelZoom={false}
          style={{ minWidth: "10em", minHeight: "20em" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location.cord && (
            <Marker position={location.cord} icon={getIcon(30)}></Marker>
          )}
        </MapContainer>
      </Dialog>{" "}
    </>
  );
}

export default SingleMap;
