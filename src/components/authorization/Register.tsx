import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setTokens, setUser } from "../../redux/actions/action";
import "./style.css";

function Register() {
  const [FormInfo, setFormInfo] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    nickname: "",
  });
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  //
  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/register`;
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
  return (
    <div className=" h-75 w-100 d-flex justify-content-center align-items-center">
      <div className="loginCard">
        <h5 className="mx-auto text-muted">Register</h5>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <TextField
            required
            id="standard-required"
            label="nickname"
            margin="dense"
            variant="standard"
            value={FormInfo.nickname}
            onChange={(e) =>
              setFormInfo({ ...FormInfo, nickname: e.target.value })
            }
          />
          <div>
            <TextField
              className="mr-2"
              required
              id="standard-required"
              label="Firstname"
              margin="dense"
              variant="standard"
              value={FormInfo.firstname}
              onChange={(e) =>
                setFormInfo({ ...FormInfo, firstname: e.target.value })
              }
            />
            <TextField
              required
              id="standard-required"
              label="Surname"
              margin="dense"
              variant="standard"
              value={FormInfo.lastname}
              onChange={(e) =>
                setFormInfo({ ...FormInfo, lastname: e.target.value })
              }
            />
          </div>
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
            Register
          </LoadingButton>
        </Form>
        <br />
        <div className="d-flex justify-content-center">
          <GoogleButton
            label="Register with Google"
            type="light"
            onClick={() =>
              window.open(`${process.env.REACT_APP_FETCHURL}/auth/google`)
            }
          />
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <p className="text-muted">
            You have account?{" "}
            <Link to="/login">
              <span className="font-weight-bold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
