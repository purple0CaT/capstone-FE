import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Sidebar from "./components/sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";

//
function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
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
    <Router>
      <Navbar sideBar={matches} toggleDrawer={toggleDrawer} />
      <div className={`menuBar ${matches && "d-none"}`}>
        <MenuIcon className="ml-auto mt-auto" onClick={toggleDrawer} />
      </div>
      <Switch>
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/login" exact render={() => <Login />} />
        <Container>
          <Row>
            <Col xs="12" md="9" className="w-100">
              <Route path="/" exact render={() => <Main />} />
              <Route path="/profile" exact render={() => <Profile />} />
              <Route path="/profile/:id" exact render={() => <Profile />} />
              <Route path="/order/:id" exact render={() => <h1>Order</h1>} />
            </Col>
            {!matches && (
              <Drawer
                sx={{
                  backdropFilter: "blur(2px)",
                }}
                anchor="right"
                open={SideBar}
                onClose={toggleDrawer}
              >
                <div className="navbar d-flex align-items-center">
                  <ChevronRightIcon onClick={toggleDrawer} />
                </div>
                <Sidebar />
              </Drawer>
            )}
            {matches && (
              <Col md="3">
                <div
                  style={{ boxShadow: "0 2px 5px grey", borderRadius: "20px" }}
                >
                  <Sidebar />
                </div>
              </Col>
            )}
          </Row>
        </Container>
        <Route
          render={() => (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
              <h1 className="text-danger text-center m-5 p-5">
                404 - NOT FOUND
              </h1>
            </div>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
