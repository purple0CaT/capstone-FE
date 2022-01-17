import { LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setTokens, setUser } from "../../redux/actions/action";

function Redirect() {
  const dispatch = useDispatch();
  const accessToken = new URLSearchParams(window.location.search).get(
    "accessToken",
  );
  const refreshToken = new URLSearchParams(window.location.search).get(
    "refToken",
  );
  const history = useHistory();
  //
  const fetchUser = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/me`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(setUser(data.user));
        dispatch(setTokens({ accessToken, refreshToken }));
        setTimeout(() => {
          window.opener.location.reload();
          window.close();
        }, 100);
      } else {
        window.close();
        console.log(res);
        history.push("/login");
        alert("Error!");
      }
    } catch (error) {
      window.close();
      console.log(error);
      alert("Error!");
    }
  };
  //
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="w-100">
      <LinearProgress />
    </div>
  );
}

export default Redirect;
