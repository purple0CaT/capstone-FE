import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/Inbox";
import { Drawer, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chats from "./Chats";
import MessCard from "./MessCard";
import "./style.css";

//

function MainMess() {
  const history = useHistory();
  const matches = useMediaQuery("(min-width:768px)");
  const [SideBar, setSideBar] = useState(false);
  const user = useSelector((state: any) => state.user);
  //
  const toggleDrawer = () => {
    setSideBar(!SideBar);
  };
  const closeChatsDrawer = () => {
    setSideBar(false);
  };
  //

  useEffect(() => {
    if (user._id === "") {
      history.push("/login");
    }
  }, []);
  return (
    <div className="mainMessageCard position-relative">
      {matches ? (
        <Col xs="4" className="h-100 p-0 chatsCardWrapper">
          <Chats closeChatsDrawer={closeChatsDrawer} />{" "}
        </Col>
      ) : (
        <>
          <Drawer anchor="left" open={SideBar} onClose={toggleDrawer}>
            <div className="navbar d-flex align-items-end side-drawer">
              <ChevronLeftIcon
                className="ml-auto"
                fontSize="large"
                onClick={toggleDrawer}
              />
            </div>
            <div className="mobileAllChats">
              <Chats closeChatsDrawer={closeChatsDrawer} />
            </div>
          </Drawer>
          <div
            className={`msgBtnMobile ${matches && "d-none"}`}
            style={{ zIndex: "200" }}
          >
            <InboxIcon
              className="ml-auto mt-auto"
              fontSize="large"
              onClick={toggleDrawer}
            />
          </div>
        </>
      )}
      <Col xs="12" md="8" className="h-100 p-0">
        <MessCard />
      </Col>
    </div>
  );
}

export default MainMess;
