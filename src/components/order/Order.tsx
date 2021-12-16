import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/action";
import OrderSingleOne from "./OrderSingleOne";
import "./style.css";

function Order() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [SortOrders, setSortOrders] = useState([]);
  const dispatch = useDispatch();
  //
  const fetchUser = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${user._id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();

        dispatch(setUser(data.user));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const sortingShopOrders = () => {
    if (user.shopping.orders.length > 0) {
      const sorted = user.shopping.orders.sort(function (a: any, b: any) {
        let st: any = new Date(a.createdAt);
        let en: any = new Date(b.createdAt);
        return en - st;
      });
      setSortOrders(sorted);
    }
  };
  //
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    sortingShopOrders();
  }, [user]);
  return (
    <div style={{ boxShadow: "0 0 5px grey" }}>
      <div className="orderWrapper">
        <br />
        <h4 className="text-muted text-center">My orders</h4>
        <Divider />
        {SortOrders.length > 0 ? (
          SortOrders.map((Order: any) => (
            <OrderSingleOne
              Order={Order}
              reFetch={fetchUser}
              key={"asls" + Order._id}
            />
          ))
        ) : (
          <div>
            <br />
            <h5 className="text-center text-muted">No orders</h5>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default Order;
