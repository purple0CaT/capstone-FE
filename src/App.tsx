import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import MyBooking from "./components/bookings/MyBooking";
import Cart from "./components/cart/Cart";
import Creator from "./components/creator/Creator";
import Main from "./components/feed/Main";
import MainMess from "./components/messages/MainMess";
import Navbar from "./components/navbar/Navbar";
import Redirect from "./components/oauth/Redirect";
import Order from "./components/order/Order";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import Sidebar from "./components/sidebar/Sidebar";
import SuccessOrder from "./components/success/SuccessOrder";
import RouteAdapter from "./RouteAdapter";
//
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container fluid="xl" className="main-container">
          <Row style={{ height: "calc(100vh - 2.8rem" }}>
            {/* SWITCH CASE */}
            <Switch>
              <Route path="/register" exact render={() => <Register />} />
              <Route path="/login" exact render={() => <Login />} />
              {/* MAIN PAGE */}
              <Route
                path="/"
                exact
                render={() => (
                  <RouteAdapter>
                    <Main />
                  </RouteAdapter>
                )}
              />
              {/* PROFILE PAGE */}
              <Route
                path="/profile/:id"
                exact
                render={() => (
                  <RouteAdapter>
                    <Profile />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/messages"
                exact
                render={() => (
                  <RouteAdapter>
                    <MainMess />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/cart"
                exact
                render={() => (
                  <RouteAdapter>
                    <Cart />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/order"
                exact
                render={() => (
                  <RouteAdapter>
                    <Order />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/settings"
                exact
                render={() => (
                  <RouteAdapter>
                    <Settings />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/googlelog"
                exact
                render={() => (
                  <>
                    <Redirect />
                  </>
                )}
              />
              <Route
                path="/creator"
                exact
                render={() => (
                  <RouteAdapter>
                    <Creator />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/bookings"
                exact
                render={() => (
                  <RouteAdapter>
                    <MyBooking />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/admin"
                exact
                render={() => (
                  <RouteAdapter>
                    <Admin />
                  </RouteAdapter>
                )}
              />
              <Route
                path="/success/:id"
                exact
                render={() => (
                  <RouteAdapter>
                    <SuccessOrder />
                  </RouteAdapter>
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
