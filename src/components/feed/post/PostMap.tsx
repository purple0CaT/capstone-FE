import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Dialog, ListItem } from "@mui/material";
import L from "leaflet";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

//
function getIcon(iconSize: any) {
  return L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize,
    iconAnchor: [15, 30],
  });
}
function PostMap({ location }: any) {
  const [OpenMap, setOpenMap] = useState(false);
  return (
    <>
      {location?.cord.length > 1 && (
        <>
          <ListItem
            button
            className="d-flex align-items-center p-0"
            onClick={() => setOpenMap(true)}
          >
            <LocationOnIcon
              className="text-muted mr-1"
              style={{ fontSize: "1rem" }}
            />
            <small
              style={{
                textOverflow: "ellipsis",
                maxWidth: "7em",
                overflow: "hidden",
                maxHeight: "1rem",
              }}
            >
              {location.title}
            </small>
          </ListItem>
          <Dialog fullWidth open={OpenMap} onClose={() => setOpenMap(false)}>
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
              <Marker position={location.cord} icon={getIcon(30)}></Marker>
            </MapContainer>
          </Dialog>{" "}
        </>
      )}
    </>
  );
}

export default PostMap;
