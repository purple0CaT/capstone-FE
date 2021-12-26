import { Grid } from "@mui/material";
import React, { useState } from "react";
import CreatePost from "./createPost/CreatePost";
import FeedType from "./feedType/FeedType";

function FeedToolBar({ reFetch }: any) {
  const [OpenCreatePost, setOpenCreatePost] = useState(false);
  const handleClose = () => {
    setOpenCreatePost(false);
  };
  return (
    <Grid container className="align-items-center">
      <Grid item xs={3}>
        <FeedType />
      </Grid>
      <Grid item xs={6}>
        <div
          className="d-flex justify-content-center align-items-center post-create"
          onClick={() => setOpenCreatePost(true)}
          style={{ cursor: "pointer" }}
        >
          <h6 className="text-muted m-0">Create post</h6>
        </div>
        {OpenCreatePost && (
          <CreatePost reFetch={reFetch} handleClose={handleClose} />
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}

export default FeedToolBar;
