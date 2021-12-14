import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Admin() {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (user.type !== "admin") {
      history.push("/");
    }
  }, []);
  return <div></div>;
}

export default Admin;
