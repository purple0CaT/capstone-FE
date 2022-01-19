import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
import { setActiveChat, setChats } from "../../../redux/actions/action";
import { ReduxStore } from "../../../types/reduxStore";
import { SendMessageType } from "../ChatInterface";
import Messages from "./Messages";
import TopBar from "./TopBar";
//
//
function MessCard() {
  const { activeChat } = useSelector((state: ReduxStore) => state.chat);
  const [ShowEmoji, setShowEmoji] = useState(false);
  const [Message, setMessage] = useState("");
  const socket: any = useSocket();
  const dispatch = useDispatch();

  // EMOJI
  const onEmojiClick = (event: any, emojiObject: any) => {
    setMessage(Message + emojiObject.emoji);
  };
  // Message Handler
  const sendMessage = () => {
    socket.emit("sendmessage", {
      message: Message,
      room: activeChat?._id,
    });
    setMessage("");
  };
  //  % kill -9 6192
  //* SOCKET IO
  useEffect(() => {
    socket.on("message", ({ chatHistory, allChats }: SendMessageType) => {
      dispatch(setChats(allChats));
      dispatch(setActiveChat(chatHistory));
    });
  }, []);
  return (
    <>
      {activeChat && (
        <div className="d-flex flex-column message-chat">
          <TopBar activeChat={activeChat} />
          {/* =================================================================    CHAT SECTION */}
          <Messages activeChat={activeChat} />
          {/* ====================================================================    SEND SECTION */}
          <Row className="mt-auto d-flex justify-content-between sendmessage mx-0">
            <Col
              xs="1"
              className="position-relative d-flex justify-content-center"
            >
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
                  e.key === "Enter" && Message.length > 0 && sendMessage();
                }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Col>
            {Message.length > 0 ? (
              <Col xs="1">
                <SendIcon
                  onClick={() => {
                    Message.length > 0 && sendMessage();
                  }}
                  style={{ cursor: "pointer" }}
                />
              </Col>
            ) : (
              <Col xs="1">
                <MicIcon style={{ cursor: "pointer" }} />
              </Col>
            )}
          </Row>
        </div>
      )}
    </>
  );
}

export default MessCard;
