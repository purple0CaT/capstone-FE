import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import "../style.css";
//

function Map({ creator, Posts }: any) {
  return (
    <div className="posistion-relative">
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Posts.length > 0 &&
          Posts.map(
            (P: any) =>
              P.location.cord.length > 1 && (
                <CustomMarker P={P} key={P._id + "zvcx"} />
              ),
          )}
      </MapContainer>
    </div>
  );
}

export default Map;
