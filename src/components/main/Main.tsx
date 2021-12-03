import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./style.css";
//
//
function Main() {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (user._id === "") {
      history.push("/login");
    }
  }, []);
  return (
    <>
      <div className="post-container">
        <h1 className="text-muted">Main page!</h1>;
      </div>
    </>
  );
}

export default Main;
