import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatSetting from "./ChatSettings/ChatSetting";

function TopBar({ activeChat }: any) {
  const [CloseSettingsModal, setCloseSettingsModal] = useState(false);
  const user = useSelector((state: any) => state.user);
  //
  let chatMembers =
    activeChat?.members?.length > 0
      ? activeChat.members.filter((M: any) => M._id !== user._id)
      : [];
  //
  const openSettings = () => {
    setCloseSettingsModal(true);
  };
  const closeSettings = () => {
    setCloseSettingsModal(false);
  };
  //
  return (
    <div className="chat-profile">
      {/* =========================== TOP BAR*/}
      <div className="d-flex">
        {/* left side */}
        {activeChat &&
          chatMembers.map((M: any) => (
            <Link
              to={`/profile/${M._id}`}
              className="d-flex"
              key={M._id + "mem"}
            >
              <div>
                <img
                  src={
                    M.avatar ||
                    "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                  }
                  alt=""
                  style={{
                    width: "40px",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                />
              </div>
              <div className="d-flex flex-column text-dark">
                <h6 className="m-0">
                  {M.firstname} {M.lastname}
                </h6>
                <small>{"Online"}</small>
              </div>
            </Link>
          ))}
      </div>
      {/* right side */}
      <div className="d-flex align-items-center">
        <div className="mx-1">
          <MoreVertIcon style={{ cursor: "pointer" }} onClick={openSettings} />
        </div>
      </div>
      <ChatSetting
        closeSettings={closeSettings}
        CloseSettingsModal={CloseSettingsModal}
      />
    </div>
  );
}

export default TopBar;
