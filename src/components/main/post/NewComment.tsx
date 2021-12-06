import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
function NewComment({ postId, reFetch }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Comment, setComment] = useState({ text: "" });
  //
  const sendComment = async (e: any) => {
    e.preventDefault();
    // 
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/comments/add/${postId}`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(Comment),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        reFetch();
        setComment({ text: '' })
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4">
      <form onSubmit={sendComment} className="d-flex align-items-center">
        <TextField
          margin="dense"
          id="name"
          label="Your comment"
          type="text"
          fullWidth
          color="info"
          variant="standard"
          value={Comment.text}
          onChange={(e: any) => setComment({ text: e.target.value })}
        />
        <div>
          <IconButton onClick={sendComment}>
            <SendIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
}

export default NewComment;
