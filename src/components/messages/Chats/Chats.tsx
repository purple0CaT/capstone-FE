import SearchIcon from "@mui/icons-material/Search";
import { Avatar, LinearProgress } from "@mui/material";
import dateFormat from "dateformat";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
// import { socket } from "../../../App";
import { setActiveChat, setChats } from "../../../redux/actions/action";
import { ReduxStore, singleChatType } from "../../../types/reduxStore";
import { ChatDrawerType } from "../ChatInterface";
//
function Chats({ closeChatsDrawer }: ChatDrawerType) {
  const { user, chat, tokens } = useSelector((state: ReduxStore) => state);
  const [SearchQuery, setSearchQuery] = useState("");
  const [FindedUsers, setFindedUsers] = useState([]);
  const [UserLoader, setUserLoader] = useState(false);
  const dispatch = useDispatch();
  const socket: any = useSocket();

  // SEARCH FOR SPECIFIC USER
  const fetchUsers = async () => {
    setUserLoader(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user?search=${SearchQuery}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res) {
        const data = await res.json();
        setFindedUsers(data);
        setUserLoader(false);
      } else {
        console.log(res);
        setUserLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // CREATE CHAT WITH SPECIFIC USER
  const createChatConnection = async (chatId: string) => {
    console.log("sending connection");
    socket.emit("new-chat-created", { chatId });
  };
  //
  const createChat = async (id: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/chat/createChat/${id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      createChatConnection(data.newChat._id);
      if (res.ok) {
        dispatch(setActiveChat(data.newChat));
        dispatch(setChats(data.allChats));
        //
      } else {
        console.log(res);
        alert("Error");
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };
  return (
    <div>
      {/* SEARCH FOR USER */}
      <div className="searchChatUsers mt-3">
        <SearchIcon className="mx-1" style={{ fontSize: "2rem" }} />{" "}
        <Form.Control
          value={SearchQuery}
          type="text"
          placeholder="...search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (SearchQuery.length < 2) {
              setUserLoader(false);
              setFindedUsers([]);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              fetchUsers();
            }
          }}
        />
      </div>
      {/* SEARCH USER LISTS */}
      <div className="position-relative">
        {UserLoader && <LinearProgress />}
        {FindedUsers.length > 0 && (
          <div
            className="searchUserList"
            onMouseLeave={() => setFindedUsers([])}
          >
            {FindedUsers.map((U: any) => (
              <div
                style={{ cursor: "pointer" }}
                key={U._id + "3as1"}
                className="singleFindedUser"
                onClick={() => {
                  createChat(U._id);
                  setFindedUsers([]);
                  setSearchQuery("");
                }}
              >
                <Avatar src={U.avatar} />
                <p>
                  {U.firstname} {U.lastname}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* CHATS LIST */}
      <div className="d-flex flex-column w-100 mt-3">
        {chat.allChat.length > 0 &&
          chat.allChat.map((C: singleChatType) => (
            <div
              key={C._id + "alk"}
              className={`singleChat ${
                C._id === chat.activeChat?._id && "activeChat"
              }`}
              onClick={() => {
                dispatch(setActiveChat(C));
                closeChatsDrawer();
              }}
            >
              <Avatar
                src={C.members.filter((M: any) => M._id !== user._id)[0].avatar}
              />{" "}
              <div className="d-flex flex-column">
                <p className="m-0">
                  {
                    C.members.filter((M: any) => M._id !== user._id)[0]
                      .firstname
                  }{" "}
                  {C.members.filter((M: any) => M._id !== user._id)[0].lastname}
                </p>
                <small className="chatLastMess">
                  {(C.history && C.history[C.history.length - 1]?.message) ||
                    ""}
                </small>
              </div>
              <div className="ml-auto d-flex align-items-center">
                <small>
                  {(C.history &&
                    dateFormat(
                      C.history[C.history.length - 1]?.createdAt,
                      "HH:MM",
                    )) ||
                    ""}
                </small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Chats;
