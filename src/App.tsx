import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import Main from "./components/main/Main";
import MainMess from "./components/messages/MainMess";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Sidebar from "./components/sidebar/Sidebar";
//
//
function App() {
  //
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
      <Router>
        <Navbar sideBar={matches} toggleDrawer={toggleDrawer} />
        <div
          className={`menuBar ${matches && "d-none"}`}
          style={{ zIndex: "200" }}
        >
          <MenuIcon className="ml-auto mt-auto" onClick={toggleDrawer} />
        </div>
        <Container fluid className="main-container">
          <Row className="h-100">
            {/* SWITCH CASE */}
            <Switch>
              <Route path="/register" exact render={() => <Register />} />
              <Route path="/login" exact render={() => <Login />} />
              {/* MAIN PAGE */}
              <Route
                path="/"
                exact
                render={() => (
                  <>
                    <Col xs="12" md="9" className="w-100">
                      <Main />
                    </Col>
                    {matches ? (
                      <Col md="3">
                        <div className="position-sticky" style={{ top: "0" }}>
                          <Sidebar />
                        </div>
                      </Col>
                    ) : (
                      <>
                        <Drawer
                          sx={{
                            backdropFilter: "blur(2px)",
                          }}
                          anchor="right"
                          open={SideBar}
                          onClose={toggleDrawer}
                        >
                          <>
                            <div className="navbar d-flex align-items-center side-drawer">
                              <ChevronRightIcon
                                fontSize="large"
                                onClick={toggleDrawer}
                              />
                            </div>
                          </>
                          <Sidebar toggleDrawer={toggleDrawer} />
                        </Drawer>
                      </>
                    )}
                  </>
                )}
              />
              {/* PROFILE PAGE */}
              <Route
                path="/profile/:id"
                exact
                render={() => (
                  <>
                    <Col xs="12" md="9" className="w-100">
                      <Profile />
                    </Col>
                    {matches ? (
                      <Col md="3">
                        <div className="position-sticky" style={{ top: "0" }}>
                          <Sidebar />
                        </div>
                      </Col>
                    ) : (
                      <>
                        <Drawer
                          sx={{
                            backdropFilter: "blur(2px)",
                          }}
                          anchor="right"
                          open={SideBar}
                          onClose={toggleDrawer}
                        >
                          <>
                            <div className="navbar d-flex align-items-center side-drawer">
                              <ChevronRightIcon
                                fontSize="large"
                                onClick={toggleDrawer}
                              />
                            </div>
                          </>
                          <Sidebar toggleDrawer={toggleDrawer} />
                        </Drawer>
                      </>
                    )}
                  </>
                )}
              />
              {/* ORDERS PAGE */}
              <Route
                path="/order/:id"
                exact
                render={() => (
                  <>
                    <Col xs="12" md="9" className="w-100">
                      <h1>ORDERS</h1>{" "}
                    </Col>
                    {matches ? (
                      <Col md="3" className="position-sticky">
                        <div className="position-sticky" style={{ top: "0" }}>
                          <Sidebar />
                        </div>
                      </Col>
                    ) : (
                      <>
                        <Drawer
                          sx={{
                            backdropFilter: "blur(2px)",
                          }}
                          anchor="right"
                          open={SideBar}
                          onClose={toggleDrawer}
                        >
                          <>
                            <div className="navbar d-flex align-items-center side-drawer">
                              <ChevronRightIcon
                                fontSize="large"
                                onClick={toggleDrawer}
                              />
                            </div>
                          </>
                          <Sidebar toggleDrawer={toggleDrawer} />
                        </Drawer>
                      </>
                    )}
                  </>
                )}
              />
              <Route
                path="/messages"
                exact
                render={() => (
                  <>
                    <Col xs="12" md="9" className="w-100">
                      <MainMess />
                    </Col>
                    {matches ? (
                      <Col md="3">
                        <div className="position-sticky" style={{ top: "0" }}>
                          <Sidebar />
                        </div>
                      </Col>
                    ) : (
                      <>
                        <Drawer
                          sx={{
                            backdropFilter: "blur(2px)",
                          }}
                          anchor="right"
                          open={SideBar}
                          onClose={toggleDrawer}
                        >
                          <>
                            <div className="navbar d-flex align-items-center side-drawer">
                              <ChevronRightIcon
                                fontSize="large"
                                onClick={toggleDrawer}
                              />
                            </div>
                          </>
                          <Sidebar toggleDrawer={toggleDrawer} />
                        </Drawer>
                      </>
                    )}
                  </>
                )}
              />
              {/* NOT FOUND PAGE */}
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
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;
