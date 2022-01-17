import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
//
function RouteAdapter(props: any) {
  const matches = useMediaQuery("(min-width:768px)");
  const [SideBar, setSideBar] = useState(false);
  const { pathname } = useLocation();
  //
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setSideBar(!SideBar);
  };
  return (
    <>
      <div
        className={`menuBar ${matches && "d-none"}`}
        style={{ zIndex: "200" }}
      >
        <NavLink
          exact
          to="/"
          className="text-white align-items-center justify-content-center d-flex"
        >
          <DynamicFeedIcon fontSize={pathname === "/" ? "large" : `medium`} />
        </NavLink>

        <NavLink
          exact
          to="/messages"
          className="text-white align-items-center justify-content-center d-flex"
        >
          <MailOutlineIcon
            fontSize={pathname === "/messages" ? "large" : `medium`}
          />
        </NavLink>
        <MenuIcon fontSize="medium" onClick={toggleDrawer} />
      </div>
      <Col xs="12" md="9" className="w-100">
        <>{props.children}</>
      </Col>
      {matches ? (
        <Col md="3" className="pr-4">
          <div className="sidebarWraper">
            <Sidebar />
          </div>
        </Col>
      ) : (
        <>
          <Drawer anchor="right" open={SideBar} onClose={toggleDrawer}>
            <>
              <div className="navbar d-flex align-items-center side-drawer">
                <ChevronRightIcon fontSize="large" onClick={toggleDrawer} />
              </div>
            </>
            <Sidebar toggleDrawer={toggleDrawer} />
          </Drawer>
        </>
      )}
    </>
  );
}

export default RouteAdapter;
