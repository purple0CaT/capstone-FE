import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import dateFormat from "dateformat";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveChat, setChats } from "../../../redux/actions/action";
import { socket } from "../MainMess";
import ChatSetting from "./ChatSettings/ChatSetting";
import Messages from "./Messages";
import TopBar from "./TopBar";
//
//
function MessCard() {
  const activeChat = useSelector((state: any) => state.chat.activeChat);
  const dispatch = useDispatch();
  //
  const [Message, setMessage] = useState("");
  const [ShowEmoji, setShowEmoji] = useState(false);
  // EMOFI
  const onEmojiClick = (event: any, emojiObject: any) => {
    setMessage(Message + emojiObject.emoji);
  };

  //
  const sendMessage = () => {
    socket.emit("sendmessage", {
      message: Message,
      room: activeChat._id,
    });
    setMessage("");
  };
  //

  // SOCKET IO
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
    });
    socket.on("message", ({ chatHistory, allChats }: any) => {
      dispatch(setChats(allChats));
      dispatch(setActiveChat(chatHistory));
    });
  }, []);
  return (
    <div className="d-flex flex-column message-chat">
      <TopBar activeChat={activeChat} />
      {/* =================================================================    CHAT SECTION */}
      <Messages activeChat={activeChat} />
      {/* ====================================================================    SEND SECTION */}
      <Row className="mt-auto d-flex justify-content-between sendmessage mx-0">
        <Col xs="1" className="position-relative d-flex justify-content-center">
          {!ShowEmoji ? (
            <EmojiEmotionsIcon
              // size="1.4rem"
              onClick={() => setShowEmoji(!ShowEmoji)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <InsertEmoticonIcon onClick={() => setShowEmoji(!ShowEmoji)} />
          )}
          {ShowEmoji && (
            <div
              className="emojiBoard-message"
              onMouseLeave={() => setShowEmoji(false)}
            >
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </Col>
        <Col xs="9" className="w-100">
          <input
            type="text"
            className="w-100 px-2"
            value={Message}
            onKeyUp={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Col>
        {Message.length > 0 ? (
          <Col xs="1">
            <SendIcon onClick={sendMessage} style={{ cursor: "pointer" }} />
          </Col>
        ) : (
          <Col xs="1">
            <MicIcon style={{ cursor: "pointer" }} />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default MessCard;
