import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Avatar, Dialog, Divider, IconButton, ListItem } from "@mui/material";
import dateFormat from "dateformat";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentsArea from "../comments/CommentsArea";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
//
function Post({ post, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [ComArea, setComArea] = useState(false);
  const [ShowFullSize, setShowFullSize] = useState(false);
  //
  let like = post.likes.some((L: string[]) => L === user._id);
  //
  const likeIt = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/post/likes/${post._id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        // const data = await res.json();
        reFetch();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const deletePost = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/post/single/${post._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        // const data = await res.json();
        reFetch();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="post">
      <div className="d-flex align-items-center px-2 py-1">
        <div className="mr-2">
          <Avatar
            src={post.author.avatar}
            alt={post.author.firstname}
            className="post-img"
          />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <ListItem button className="d-flex p-0">
            <Link
              to={`/profile/${post.author._id}`}
              className="d-flex align-items-center"
            >
              <h6 className="m-0 text-muted mr-1">
                {post.author.firstname} {post.author.lastname}
              </h6>
              {post.author.creator && (
                <div>
                  <PhotoCameraIcon
                    className="text-muted"
                    color="info"
                    style={{ fontSize: "0.8rem" }}
                  />
                </div>
              )}
            </Link>
          </ListItem>
          {post.location?.title && post.location?.cord.length > 1 && (
            <ListItem button className="d-flex align-items-center p-0">
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
                {post.location.title}
              </small>
            </ListItem>
          )}
        </div>
        {post.author._id === user._id && (
          <div className="mx-2 ml-auto">
            <div className="delete-btn" onClick={deletePost}>
              <HighlightOffIcon />
            </div>
          </div>
        )}
      </div>
      <Divider />
      {/* POST IMAGE */}
      <div className="post-image d-flex justify-content-center">
        <img
          onClick={() => setShowFullSize(true)}
          src={post.media}
          style={{ maxHeight: "25rem", maxWidth: "100%", cursor: "pointer" }}
          alt=""
        />
      </div>
      <Dialog
        // fullWidth
        fullScreen
        onClose={() => setShowFullSize(false)}
        open={ShowFullSize}
      >
        {" "}
        <div
          className="d-flex align-items-center justify-content-center h-100"
          onClick={() => setShowFullSize(false)}
          style={{ backgroundColor: "grey" }}
        >
          <img
            src={post.media}
            style={{ maxHeight: "100vh", maxWidth: "100%", cursor: "pointer" }}
            alt=""
          />
        </div>
      </Dialog>
      <Divider />
      {/* Height */}
      <div className="px-2 mt-1 d-flex">
        <div>
          <p className="m-0">{post.text}</p>
        </div>
        <div className="text-muted ml-auto" style={{ minWidth: "5rem" }}>
          <small className="m-0">
            {dateFormat(post.createdAt, "HH:MM, mmm d")}
          </small>
        </div>
      </div>
      <div className="d-flex px-2">
        <div className="d-flex align-items-center">
          <IconButton onClick={likeIt}>
            {like ? (
              <FavoriteIcon style={{ color: "tomato" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <small className="text-muted m-0">{post.likes.length}</small>
        </div>
        <div>
          <IconButton className="ml-2" onClick={() => setComArea(!ComArea)}>
            {!ComArea ? (
              <CommentIcon />
            ) : (
              <ModeCommentIcon style={{ opacity: 0.4 }} />
            )}
          </IconButton>
          <small className="text-muted m-0">{post.comments.length}</small>
        </div>
      </div>
      {ComArea && <CommentsArea post={post} reFetch={reFetch} />}
    </div>
  );
}

export default Post;
