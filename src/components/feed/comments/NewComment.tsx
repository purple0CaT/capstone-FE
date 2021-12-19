import { TextField } from "@mui/material";
import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
// 
function NewComment({ postId, reFetch }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Comment, setComment] = useState("");
  const [ShowEmoji, setShowEmoji] = useState(false)

  //  // EMOFI
  const onEmojiClick = (event: any, emojiObject: any) => {
    setComment(Comment + emojiObject.emoji);
  };
  // 
  const sendComment = async (e: any) => {
    e.preventDefault();
    // 
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/comments/add/${postId}`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ text: Comment }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (res.ok) {
        // const data = await res.json();
        reFetch();
        setComment("")
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4">
      <form onSubmit={sendComment} className="d-flex align-items-baseline">
        <div className='d-flex align-items-center w-100'>
          <div className='mt-auto position-relative'>
            {!ShowEmoji ? (
              <EmojiEmotionsIcon
                // size="1.4rem"
                onClick={() => setShowEmoji(!ShowEmoji)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <InsertEmoticonIcon
                onClick={() => setShowEmoji(!ShowEmoji)}
              />
            )}
            {ShowEmoji && (
              <div
                className="emojiBoard"
                onMouseLeave={() => setShowEmoji(false)}
              >
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <TextField
            margin="dense"
            id="name"
            label="Your comment"
            type="text"
            fullWidth
            color="info"
            variant="standard"
            className='ml-3'
            value={Comment}
            onChange={(e: any) => setComment(e.target.value)}
          />
        </div>
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
