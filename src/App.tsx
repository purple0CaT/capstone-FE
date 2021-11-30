import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/authorisation/Login";
import Register from "./components/authorisation/Register";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Main />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/profile/:id" render={() => <Profile />} />
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
