import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setTokens, setUser } from "../../redux/actions/action";
import "./style.css";

function Login() {
  const [FormInfo, setFormInfo] = useState({ email: "", password: "" });
  const [Loading, setLoading] = useState(false);
  //
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  //
  const handleSubmit = async (e: any) => {
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
  return (
    <div className=" h-75 w-100 d-flex justify-content-center align-items-center">
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
        <div className="">
          <GoogleButton
            label="Login with Google"
            type="light"
            onClick={() =>
              window.open(`${process.env.REACT_APP_FETCHURL}/login/google`)
            }
          />
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