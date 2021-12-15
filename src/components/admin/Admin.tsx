import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Confirmed from "./Confirmed";
import Finished from "./Finished";
import NotConfiremd from "./NotConfiremd";
import SearchOrder from "./SearchOrder";
import "./style.css";
//
function Admin() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const history = useHistory();
  const [Loading, setLoading] = useState(false);
  const [AllOrders, setAllOrders] = useState([]);
  //
  const fetchOrders = async () => {
    const url = `${process.env.REACT_APP_FETCHURL}/order/adminOrders`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setAllOrders(data);
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  //
  useEffect(() => {
    fetchOrders();
    if (user.type !== "admin") {
      history.push("/");
    }
  }, []);
  return (
    <>
      {Loading && <LinearProgress />}
      <div className="adminWrapper">
        <SearchOrder Order={AllOrders} reFetch={fetchOrders} />
        <hr className="w-100" />
        <NotConfiremd Order={AllOrders} reFetch={fetchOrders} />
        <hr className="w-100" />
        <Confirmed Order={AllOrders} reFetch={fetchOrders} />
        {/* <hr className="w-100" />
        <Finished /> */}
      </div>
    </>
  );
}

export default Admin;
