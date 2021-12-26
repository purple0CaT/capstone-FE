import { Switch } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setFeedSearch } from "../../../redux/actions/action";

function FeedType() {
  const app = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Switch
        color="warning"
        checked={app.feed}
        onChange={() => dispatch(setFeedSearch(!app.feed))}
        inputProps={{ "aria-label": "controlled" }}
      />
      <small className="text-muted font-weight-bold">
        {app.feed ? "All" : "Followed"}
      </small>
    </div>
  );
}

export default FeedType;
