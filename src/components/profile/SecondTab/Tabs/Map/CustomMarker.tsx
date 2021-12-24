import { Marker, Popup } from "react-leaflet";
import React from "react";
import L from "leaflet";
//
function getIcon(iconSize: any) {
  return L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize,
    iconAnchor: [15, 30],
  });
}
function CustomMarker({ P }: any) {
  return (
    <>
      <Marker position={P.location.cord} icon={getIcon(30)}>
        <Popup>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              src={P.media}
              style={{
                width: "100px",
                aspectRatio: "1.5/1",
                objectFit: "cover",
              }}
              alt=""
            />
          </div>
        </Popup>
      </Marker>
    </>
  );
}

export default CustomMarker;
