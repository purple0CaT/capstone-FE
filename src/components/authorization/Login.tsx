import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setTokens, setUser } from "../../redux/actions/action";
import { ReduxStore } from "../../types/reduxStore";
import "./style.css";

function Login() {
  const [FormInfo, setFormInfo] = useState({ email: "", password: "" });
  const [Loading, setLoading] = useState(false);
  //
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxStore) => state.user);
  //
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/login`;
      const res: any = await fetch(url, {
        method: "POST",
        body: JSON.stringify(FormInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        dispatch(setTokens(data.tokens));
        setLoading(false);
        history.push("/");
      } else {
        console.log(res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    if (user._id !== "") {
      history.push("/");
    }
  }, []);
  //
  useEffect(() => {
    console.log("Reload");
    if (user._id) {
      // history.push("/");
    }
  }, [user._id]);
  //
  return (
    <div className="loginWrapper">
      <div>
        <img
          src="./sandorawLogo.png"
          alt="Logo"
          style={{
            width: "19rem",
            aspectRatio: "1/1",
            objectFit: "cover",
            marginRight: "0.4rem",
          }}
        />
      </div>
      <div className="loginCard">
        <h5 className="mx-auto">Login</h5>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <TextField
            required
            id="standard-required"
            label="Email"
            margin="dense"
            variant="standard"
            value={FormInfo.email}
            onChange={(e) =>
              setFormInfo({ ...FormInfo, email: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={FormInfo.password}
            onChange={(e) =>
              setFormInfo({ ...FormInfo, password: e.target.value })
            }
          />
          <br />
          <LoadingButton
            type="submit"
            loading={Loading}
            variant="outlined"
            loadingPosition="start"
          >
            Login
          </LoadingButton>
        </Form>
        <br />
        <div>
          <a
            href={`${process.env.REACT_APP_FETCHURL}/login/google`}
            target="popup"
            className="text-decoration-none googleButton"
            onClick={() => {
              window.open(
                `${process.env.REACT_APP_FETCHURL}/login/google`,
                "googleLoginTarget",
                "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=800",
              );
            }}
          >
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              style={{ width: 40, height: 40 }}
              alt="Google"
            />
            <span>Login with Google</span>
          </a>
        </div>
        <div>
          <br />
          <p className="text-muted">
            You dont have account?{" "}
            <Link to="/register">
              <span className="font-weight-bold">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
