import { Avatar, Divider } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import NewComment from "./NewComment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";

function CommentsArea({ post, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  //
  const deleteComment = async (id: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/comments/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
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
  return (
    <div className="p-2">
      <Divider />
      <NewComment postId={post._id} reFetch={reFetch} />
      <br />
      {post.comments.length > 0 &&
        post.comments.map((C: any) => (
          // Comment
          <div className="singleComment" key={C._id + 2}>
            <div className="d-flex align-items-center">
              <Avatar
                alt={C.author.firstname + " " + C.author.lastname}
                src={C.author.avatar}
              />
              <div className="d-flex flex-column justify-content-center">
                <div>
                  <p className="text-muted m-0">
                    {C.author.firstname + " " + C.author.lastname}
                  </p>
                </div>
                <div>
                  <small className="text-muted">
                    {dateFormat(C.createdAt, "HH:MM, mmm d")}
                  </small>
                </div>
              </div>
            </div>
            <div className=" ml-4 mr-auto">
              <p className="m-0">{C.text}</p>
            </div>
            <div>
              {" "}
              {C.author._id === user._id && (
                <div className="mx-2 ml-auto">
                  <a
                    className="delete-btn"
                    onClick={() => deleteComment(C._id)}
                  >
                    <HighlightOffIcon />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default CommentsArea;
