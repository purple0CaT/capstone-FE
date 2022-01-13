import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import L from "leaflet";
import React, {
  ChangeEvent, KeyboardEvent, useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Col, Row } from "react-bootstrap";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";

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
function SetCordMap({ clearForm, setFormLocation }: any) {
  const [Loading, setLoading] = useState(false);
  const markerRef = useRef(null);
  const [SearchLoc, setSearchLoc] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const [position, setPosition]: any = useState({});
  // === Marker Handler on Click
  const ClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        setSearchData([]);
      },
    });
    return null;
  };
  const SetViewOnClick = () => {
    const map = useMap();
    position.lat && map.setView([position.lat, position.lng], map.getZoom());

    return null;
  };
  // === Marker Handler on Move
  const markerHandler = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setSearchData([]);
        }
      },
    }),
    [],
  );
  // Fetch position
  const fetchCord = async (type: boolean) => {
    setLoading(true);
    const url = type
      ? `https://api.opencagedata.com/geocode/v1/json?q=${position.lat}+${position.lng}&key=${process.env.REACT_APP_GEOMAPSEARCH}`
      : `https://api.opencagedata.com/geocode/v1/json?q=${SearchLoc}&key=${process.env.REACT_APP_GEOMAPSEARCH}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        if (type) {
          setSearchLoc(data.results[0].formatted);
          setFormLocation({
            title: data.results[0].formatted,
            cord: [data.results[0].geometry.lat, data.results[0].geometry.lng],
          });
        } else {
          setPosition({});
          setSearchData(data.results);
        }
      } else {
        setLoading(false);
        alert("Erorr");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  // === Renew
  useEffect(() => {
    if (position.lat) {
      fetchCord(true);
    }
  }, [position]);
  //====== JSX
  return (
    <Row>
      {/* SEARCH */}
      <Col xs="12" md="6">
        <div className="d-flex justify-content-between align-items-baseline position-relative">
          <TextField
            margin="dense"
            id="heo"
            label="Heolocation"
            type="text"
            fullWidth
            variant="standard"
            value={SearchLoc}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              setSearchLoc(e.target.value);
              if (e.target.value === "") {
                setSearchData([]);
              }
            }}
            onKeyUp={(e: KeyboardEvent<HTMLDivElement>) => {
              e.key === "Enter" && fetchCord(false);
            }}
          />{" "}
          {Loading ? (
            <CircularProgress size={30} className="mt-auto ml-3" />
          ) : (
            setSearchLoc && (
              <IconButton
                className="mt-auto"
                onClick={() => {
                  setSearchData([]);
                  setSearchLoc("");
                  setPosition({});
                  setFormLocation({ title: "", cord: [] });
                }}
              >
                <HighlightOffIcon fontSize="medium" color="warning" />
              </IconButton>
            )
          )}
        </div>
        {SearchData.length > 0 && (
          <>
            <div className="locationSearch">
              {SearchData.map((Res: any) => (
                <div
                  key={Res.formatted + "cxb"}
                  className="locationSearchItem"
                  onClick={() => {
                    setPosition(Res.geometry);
                    setFormLocation({
                      title: Res.formatted,
                      cord: [Res.geometry.lat, Res.geometry.lng],
                    });
                    setSearchLoc(Res.formatted);
                    setSearchData([]);
                  }}
                >
                  {Res.formatted}
                </div>
              ))}
            </div>
            <br />
          </>
        )}
      </Col>

      {/* MAP */}
      <Col xs="12" md="6">
        <MapContainer
          center={[51.5072, 0.1]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
        >
          <ClickHandler />
          <SetViewOnClick />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position.lat && (
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
