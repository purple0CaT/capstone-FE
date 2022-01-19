import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SettingsEmail from "../components/settings/SettingsEmail";
import SettingsPass from "../components/settings/SettingsPass";
import "../components/settings/style.css";
import UsCreatBtn from "../components/settings/UsCreatBtn";
import { setUser } from "../redux/actions/action";
import { ReduxStore } from "../types/reduxStore";

function MySettings() {
  const history = useHistory();
  const { user, tokens } = useSelector((state: ReduxStore) => state);
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
          <SettingsPass />
          <div className="w-100">
            <hr />
          </div>
          <SettingsEmail />
        </div>
      )}
    </>
  );
}

export default MySettings;
