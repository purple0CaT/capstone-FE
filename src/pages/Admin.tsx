import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReduxStore } from "../types/reduxStore";
import Confirmed from "../components/admin/Confirmed";
import NotConfiremd from "../components/admin/NotConfiremd";
import SearchOrder from "../components/admin/SearchOrder";
import "../components/admin/style.css";
//
function Admin() {
  const user = useSelector((state: ReduxStore) => state.user);
  const tokens = useSelector((state: ReduxStore) => state.tokens);
  const history = useHistory();
  const [Loading, setLoading] = useState(false);
  const [AllOrders, setAllOrders] = useState([]);
  //
  const fetchOrders = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_FETCHURL}/order/adminOrders`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        console.log(data);
        setAllOrders(data);
      } else {
        setLoading(false);
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
