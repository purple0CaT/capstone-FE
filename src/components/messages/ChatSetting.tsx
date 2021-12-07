import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setChats } from "../../redux/actions/action";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";

function ChatSetting({ closeSettings, CloseSettingsModal }: any) {
  const users = useSelector((state: any) => state.chat.activeChat.members);
  const chat = useSelector((state: any) => state.chat.activeChat);
  const dispatch = useDispatch();
  //
  const [AddField, setAddField] = useState(false);
  const [FetchedUsers, setFetchedUsers]: any = useState([]);
  const [AddFieldQuery, setAddFieldQuery] = useState("");
  // DELETE USER
  const deleteUser = async (id: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/chats/deleteFromChat/${id}/${chat._id}`;
      const res = await fetch(url, {
        credentials: "include",
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setChats(data.allChats));
        dispatch(setActiveChat(data.chat));
      } else {
        console.log("Delete!", id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ADD USER TO CHAT
  const addUserToChat = async (id: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/chats/addToChat/${id}/${chat._id}`;
      const res = await fetch(url, { credentials: "include", method: "POST" });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(setChats(data.allChats));
        dispatch(setActiveChat(data.newChat));
        setAddField(!AddField);
      } else {
        console.log("Error!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // FIND USER
  const fetchUsers = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/users/search/${AddFieldQuery}`;
      const res = await fetch(url, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setFetchedUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   ====================
  return (
    <Row
      className={`position-absolute chatSetting ${
        CloseSettingsModal && "chatAppear"
      }`}
      onMouseLeave={closeSettings}
      onBlur={closeSettings}
    >
      {/* <div className="d-flex flex-column align-items-center p-3"> */}
      {/* Chat Users */}
      <Col xs="12" md="6" className="d-flex flex-column w-100">
        <h5 className="text-muted mx-auto"> Users </h5>
        {users &&
          users.map((U: any) => (
            <div className="d-flex my-1 align-items-center border-bottom">
              <div>
                <img
                  src={
                    U.avatar ||
                    "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
                  }
                  alt=""
                  style={{
                    width: "30px",
                    aspectRatio: "1/1",
                    marginRight: "0.5rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Link to={`/profile/${U._id}`}>
                <span className="text-dark text-decoration-none">
                  {U.firstname} {U.lastname}
                </span>
              </Link>
              <div className="ml-auto">
                <DeleteSweepIcon
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteUser(U._id)}
                />
              </div>
            </div>
          ))}
      </Col>
      {/* FIND USER AND ADD TO CHAT */}
      <Col xs="12" md="6" className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <br />
          {!AddField ? (
            <div>
              <Button
                variant="success"
                onClick={() => {
                  setAddField(!AddField);
                  setFetchedUsers([]);
                }}
              >
                Add user
              </Button>
            </div>
          ) : (
            <>
              <FormControl
                type="text"
                value={AddFieldQuery}
                onBlur={(e) => {
                  if (e.target.value.length < 2) setAddField(false);
                }}
                onChange={(e) => {
                  setAddFieldQuery(e.target.value);
                  if (e.target.value.length > 1) {
                    fetchUsers();
                  } else {
                    setFetchedUsers([]);
                  }
                }}
              />
              <div className="addUserSearchBar py-2">
                {/* user div     */}
                {FetchedUsers.length > 0 &&
                  FetchedUsers.map((U: any) => (
                    <div
                      onClick={() => {
                        addUserToChat(U._id);
                        setAddFieldQuery("");
                      }}
                      className="d-flex justify-content-between align-items-center p-1 px-4"
                      style={{ cursor: "pointer" }}
                    >
                      {/* image div */}
                      <div>
                        <img
                          src={
                            U.avatar ||
                            "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
                          }
                          alt=""
                          style={{
                            width: "30px",
                            aspectRatio: "1/1",
                            marginRight: "1rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <span>
                        {U.firstname} {U.lastname}
                      </span>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-3 mx-auto">
          <h5 onClick={() => console.log("Hey!")} className="btn btn-danger">
            DELETE CHAT
          </h5>
        </div>
      </Col>
      <Col xs="12">
        <Divider />
        <div
          className="d-flex justify-content-center w-100"
          onClick={closeSettings}
        >
          <IconButton>
            <KeyboardArrowUpIcon fontSize="medium" />
          </IconButton>
        </div>
      </Col>
      {/*  */}
    </Row>
    // </div>
  );
}

export default ChatSetting;
