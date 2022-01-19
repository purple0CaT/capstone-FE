import { useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import Admin from "./pages/Admin";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import MyBooking from "./pages/MyBooking";
import Cart from "./pages/Cart";
import Creator from "./pages/Creator";
import Main from "./pages/Feed";
import MainMess from "./pages/MyMessages";
import Navbar from "./components/navbar/Navbar";
import Redirect from "./components/oauth/Redirect";
import Order from "./pages/MyOrder";
import Profile from "./pages/Profile";
import Settings from "./pages/MySettings";
import SuccessOrder from "./components/success/SuccessOrder";
import { SocketProvider, useSocket } from "./context/SocketProvider";
import RouteAdapter from "./RouteAdapter";
import { ReduxStore } from "./types/reduxStore";
//
function App() {
  const { tokens } = useSelector((state: ReduxStore) => state);
  return (
    <>
      <SocketProvider accessToken={tokens.accessToken}>
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
      </SocketProvider>
    </>
  );
}

export default App;
