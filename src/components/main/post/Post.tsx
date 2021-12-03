import { ListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Post({ post }: any) {
  //   text
  // media
  // author
  // likes
  // location
  // comments
  return (
    <div className="post">
      <Link to={`/profile/${post.author._id}`}>
        <ListItem button className="d-flex px-2">
          <div>
            <img src={post.author.avatar} alt="" className="post-img" />
          </div>
          <div>
            <h6 className="m-0 text-muted ml-2">
              {post.author.firstname} {post.author.lastname}
            </h6>
          </div>
        </ListItem>
      </Link>
      <div className="post-imgae">
        <img
          src="https://avivi.pro/local/templates/avivi2019/images/default-image.png"
          width="100%"
          alt=""
        />
      </div>
      <div className="d-flex">likebuttons etc</div>
      <div className="d-flex">Comments</div>
    </div>
  );
}

export default Post;
