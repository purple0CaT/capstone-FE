import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reduxItem, reduxOrders, ReduxStore } from "../../types/reduxStore";
import TotalOrders from "./orders/TotalOrders";
import BookingCreator from "./setbookings/BookingCreator";
import StoreSet from "./setstore/StoreSet";
import "./style.css";

function Creator() {
  const history = useHistory();
  const { user, tokens } = useSelector((state: ReduxStore) => state);
  const [FetchedCreator, setFetchedCreator]: any = useState();
  const [Loading, setLoading] = useState(true);
  const myTotalEarnings = FetchedCreator?.shop.orders.map((OR: reduxOrders) =>
    OR.items.filter((IT: any) => IT.item.sellerId === user._id),
  );
  const total2 = myTotalEarnings
    ?.map((OR: reduxItem[]) =>
      OR?.map((IT: reduxItem) => IT.item.price * IT.qty),
    )
    .flat();
  const totalEarnings =
    total2?.length > 0
      ? total2.reduce(
          (previousValue: any, currentValue: any) =>
            previousValue + currentValue,
        )
      : 0;
  //
  const fetchCreator = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/creator/single/${user.creator}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        setFetchedCreator(data);
        setLoading(false);
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
    fetchCreator();
    return () => {
      setFetchedCreator();
    };
  }, []);
  return (
    <>
      {Loading ? (
        <LinearProgress />
      ) : (
        <div className="cardWrapper">
          <h4 className="text-center text-muted m-0">Booking</h4>
          <BookingCreator
            FetchedCreator={FetchedCreator}
            reFetch={fetchCreator}
          />
          <hr className="w-100" />
          <h3 className="text-center text-muted">Store</h3>
          <StoreSet FetchedCreator={FetchedCreator} reFetch={fetchCreator} />
          <br />
          <h3 className="text-center text-muted">Orders</h3>
          <hr />
          <div className="d-flex justify-content-between">
            <h5 className="text-center text-muted m-0">
              Waiting for your confirmation
            </h5>
            <span className="d-flex">
              Total earnings: <h5 className="ml-1">{totalEarnings}£</h5>
            </span>
          </div>
          <TotalOrders reFetch={fetchCreator} FetchedCreator={FetchedCreator} />
          <br />
        </div>
      )}
    </>
  );
}

export default Creator;
