import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ListItem } from "@mui/material";
import React, { useState } from "react";
import SingleMap from "./SingleMap";

//

function PostMap({ location }: any) {
  const [OpenMap, setOpenMap] = useState(false);
  const closeMap = () => {
    setOpenMap(false);
  };
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
          {OpenMap && (
            <SingleMap
              OpenMap={OpenMap}
              location={location}
              closeMap={closeMap}
            />
          )}
        </>
      )}
    </>
  );
}

export default PostMap;
