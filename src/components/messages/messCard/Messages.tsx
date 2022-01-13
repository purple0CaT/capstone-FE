import dateFormat from "dateformat";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { chatHistoryType } from "../../../types/reduxStore";
import { ActiveChatImprt } from "../ChatInterface";

function Messages({ activeChat }: ActiveChatImprt) {
  const user = useSelector((state: any) => state.user);
  // AUTO SCROLL
  const messagesEndRef: any = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [activeChat?.history]);
  return (
    <div
      className="d-flex flex-column messages p-2"
      style={{
        backgroundImage: `url("${activeChat?.image}")`,
      }}
    >
      {activeChat?.history &&
        activeChat.history.length > 0 &&
        activeChat.history.map((m: chatHistoryType) => (
          <div
            key={m._id + "history"}
            className={`messageStyle my-1 ${
              m.sender._id.toString() === user._id.toString() && "ml-auto"
            }`}
          >
            <img
              src={m.sender.avatar}
              style={{
                width: "20px",
                aspectRatio: "1/1",
                borderRadius: "50%",
                marginRight: "1rem",
              }}
              alt=""
            />
            <span className="mr-1">{m.message}</span>
            <small className="ml-2 text-muted">
              {dateFormat(m.createdAt, "HH:MM")}
            </small>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
