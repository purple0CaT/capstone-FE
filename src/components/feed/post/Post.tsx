import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Dialog, Divider, IconButton, ListItem } from "@mui/material";
import dateFormat from "dateformat";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxStore } from "../../../types/reduxStore";
import CommentsArea from "../comments/CommentsArea";
import { PostRefetchImprt } from "../feedInterface";
import PostMap from "./PostMap";
//
function Post({ post, reFetch }: PostRefetchImprt) {
  const { user, tokens } = useSelector((state: ReduxStore) => state);
  const [ComArea, setComArea] = useState(false);
  const [ShowFullSize, setShowFullSize] = useState(false);
  //
  let like = post.likes.some((L: string) => L === user._id);
  //
  const likeIt = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/post/likes/${post._id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
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
      <section className="d-flex align-items-center px-2 py-1">
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
              <h6 className="m-0 text-muted mx-1">
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
          {/* ===  */}
          <PostMap location={post.location} />
        </div>
        {post.author._id === user._id && (
          <div className="mx-2 ml-auto">
            <div className="delete-btn" onClick={deletePost}>
              <HighlightOffIcon />
            </div>
          </div>
        )}
      </section>
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
      <section className="d-flex px-2">
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
      </section>
      {ComArea && <CommentsArea post={post} reFetch={reFetch} />}
    </div>
  );
}

export default Post;
