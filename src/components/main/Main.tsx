import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
//
//
function Main() {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (user._id === "") {
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    }
    console.log(user);
  }, []);
  return <h1 className="text-muted">Main page!</h1>;
}

export default Main;
