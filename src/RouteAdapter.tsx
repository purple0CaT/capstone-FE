import { Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Col } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function RouteAdapter(props: any) {
  const matches = useMediaQuery("(min-width:768px)");
  const [SideBar, setSideBar] = useState(false);
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
