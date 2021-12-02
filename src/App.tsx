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
        <div className={`menuBar ${matches && "d-none"}`}>
          <MenuIcon className="ml-auto mt-auto" onClick={toggleDrawer} />
        </div>
        <Switch>
          <Route path="/register" exact render={() => <Register />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route
            path="/"
            exact
            render={() => (
              <Container fluid>
                <Row>
                  <Col xs="12" md="9" className="w-100">
                    <Main />
                  </Col>
                  {matches ? (
                    <Col md="3">
                      <Sidebar />
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
                            <ChevronRightIcon onClick={toggleDrawer} />
                          </div>
                        </>
                        <Sidebar toggleDrawer={toggleDrawer} />
                      </Drawer>
                    </>
                  )}
                </Row>
              </Container>
            )}
          />
          <Route
            path="/profile"
            exact
            render={() => (
              <Container fluid>
                <Row>
                  <Col xs="12" md="9" className="w-100">
                    <Profile />
                  </Col>
                  {matches ? (
                    <Col md="3">
                      <Sidebar toggleDrawer={toggleDrawer} />
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
                            <ChevronRightIcon onClick={toggleDrawer} />
                          </div>
                        </>
                        <Sidebar toggleDrawer={toggleDrawer} />
                      </Drawer>
                    </>
                  )}
                </Row>
              </Container>
            )}
          />
          <Route
            path="/profile/:id"
            exact
            render={() => (
              <Container fluid>
                <Row>
                  <Col xs="12" md="9" className="w-100">
                    <Profile />
                  </Col>
                  {matches ? (
                    <Col md="3">
                      <Sidebar />
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
                            <ChevronRightIcon onClick={toggleDrawer} />
                          </div>
                        </>
                        <Sidebar toggleDrawer={toggleDrawer} />
                      </Drawer>
                    </>
                  )}
                </Row>
              </Container>
            )}
          />
          <Route
            path="/order/:id"
            exact
            render={() => (
              <Container fluid>
                <Row>
                  <Col xs="12" md="9" className="w-100">
                    <h1>ORDERS</h1>{" "}
                  </Col>
                  {matches ? (
                    <Col md="3">
                      <Sidebar />
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
                            <ChevronRightIcon onClick={toggleDrawer} />
                          </div>
                        </>
                        <Sidebar toggleDrawer={toggleDrawer} />
                      </Drawer>
                    </>
                  )}
                </Row>
              </Container>
            )}
          />
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
    </>
  );
}

export default App;
