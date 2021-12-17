import { Button, LinearProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "../../redux/actions/action";
import "./style.css";
import UsCreatBtn from "./UsCreatBtn";

function Settings() {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  const [ChangePassword, setChangePassword] = useState({
    oldPass: "",
    pass: "",
    repeat: "",
  });
  const [ChangeEmail, setChangeEmail] = useState({ old: "", new: "" });
  //
  const fetchUser = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${user._id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        dispatch(setUser(data.user));
      } else {
        setLoading(false);
        console.log(res);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //
  useEffect(() => {
    if (user._id === "") {
      history.push("/login");
    }
    fetchUser();
  }, []);
  return (
    <>
      {Loading ? (
        <LinearProgress />
      ) : (
        <div className="settingsCard">
          <br />
          {user.type === "user" && (
            <>
              <span className="d-flex align-items-baseline">
                User type:
                <h5 className="m-0 ml-2 text-muted">
                  {user.creator ? "Artist" : "User"}
                </h5>
              </span>
              <UsCreatBtn />
              <div className="w-100">
                <hr />{" "}
              </div>
            </>
          )}
          <div className="d-flex flex-column align-items-center">
            <h5 className="text-muted">Change password</h5>
            <form
              onSubmit={() => console.log("Not availabel")}
              className="d-flex flex-column align-items-center  p-3"
              style={{ boxShadow: " 0 0 5px grey", borderRadius: "10px" }}
            >
              <TextField
                className="my-1"
                id="old-pass"
                label="Old password"
                type="password"
                // helperText="Incorrect entry."
                value={ChangePassword.oldPass}
                onChange={(e) =>
                  setChangePassword({
                    ...ChangePassword,
                    oldPass: e.target.value,
                  })
                }
                variant="standard"
              />
              <TextField
                error={
                  ChangePassword.repeat === ChangePassword.pass ? false : true
                }
                type="password"
                id="new-pass"
                label="New password"
                variant="standard"
                value={ChangePassword.pass}
                className="my-1"
                onChange={(e) =>
                  setChangePassword({
                    ...ChangePassword,
                    pass: e.target.value,
                  })
                }
              />
              <TextField
                type="password"
                className="my-1"
                error={
                  ChangePassword.repeat === ChangePassword.pass ? false : true
                }
                id="repeat-pass"
                label="Repeat password"
                variant="standard"
                value={ChangePassword.repeat}
                onChange={(e) =>
                  setChangePassword({
                    ...ChangePassword,
                    repeat: e.target.value,
                  })
                }
              />
              <Button type="submit" disabled>
                Submit
              </Button>
            </form>
          </div>
          <div className="w-100">
            <hr />{" "}
          </div>{" "}
          <h5 className="text-muted">Change Email</h5>
          <form
            onSubmit={() => console.log("Not availabel")}
            className="d-flex flex-column align-items-center  p-3"
            style={{ boxShadow: " 0 0 5px grey", borderRadius: "10px" }}
          >
            {" "}
            <TextField
              type="email"
              className="my-1"
              error={ChangeEmail.old === ChangeEmail.new ? false : true}
              id="email-change"
              label="Old email"
              variant="standard"
              value={ChangeEmail.old}
              onChange={(e) =>
                setChangeEmail({
                  ...ChangeEmail,
                  old: e.target.value,
                })
              }
            />
            <TextField
              type="email"
              className="my-1"
              error={ChangeEmail.old === ChangeEmail.new ? false : true}
              id="new-email"
              label="New email"
              variant="standard"
              value={ChangeEmail.new}
              onChange={(e) =>
                setChangeEmail({
                  ...ChangeEmail,
                  new: e.target.value,
                })
              }
            />
            <Button type="submit" disabled>
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default Settings;
