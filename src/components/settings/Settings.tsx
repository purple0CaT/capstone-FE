import { Divider, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/action";
import "./style.css";
import UsCreatBtn from "./UsCreatBtn";

function Settings() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
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
    fetchUser();
  }, []);
  return (
    <>
      {Loading ? (
        <LinearProgress />
      ) : (
        <div className="settingsCard">
          <br />
          <span className="d-flex align-items-baseline">
            User type:
            <h5 className="m-0 ml-2 text-muted">
              {user.creator ? "Artist" : "User"}
            </h5>
          </span>
          <UsCreatBtn />
          <Divider />
        </div>
      )}
    </>
  );
}

export default Settings;
