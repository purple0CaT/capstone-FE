import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TotalOrders from "./orders/TotalOrders";
import BookingCreator from "./setbookings/BookingCreator";
import StoreSet from "./setstore/StoreSet";
import "./style.css";

function Creator() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [FetchedCreator, setFetchedCreator]: any = useState();
  const [Loading, setLoading] = useState(true);
  const myTotalEarnings = FetchedCreator?.shop.orders.map((OR: any) =>
    OR.items.filter((IT: any) => IT.item.sellerId === user._id),
  );
  const total2 = myTotalEarnings
    ?.map((OR: any) => OR?.map((IT: any) => IT.item.price * IT.qty))
    .flat();
  const totalEarnings = total2?.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
  );
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
    fetchCreator();
  }, []);
  return (
    <>
      {Loading ? (
        <LinearProgress />
      ) : (
        <div className="cardWrapper">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h4 className="text-center text-muted">Booking</h4>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "#f2f2f2" }}
              className="p-1"
            >
              <BookingCreator
                FetchedCreator={FetchedCreator}
                reFetch={fetchCreator}
              />
            </AccordionDetails>
          </Accordion>
          <hr className="w-100" />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h4 className="text-center text-muted">Store</h4>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "#f2f2f2" }}
              className="p-1"
            >
              <StoreSet
                FetchedCreator={FetchedCreator}
                reFetch={fetchCreator}
              />
            </AccordionDetails>
          </Accordion>
          <hr />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <h4 className="text-center text-muted">Orders</h4>
                <span className="d-flex">
                  Total earnings: <h5 className="ml-1">{totalEarnings}£</h5>
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails className="p-1">
              <TotalOrders
                reFetch={fetchCreator}
                FetchedCreator={FetchedCreator}
              />
            </AccordionDetails>
          </Accordion>{" "}
        </div>
      )}
    </>
  );
}

export default Creator;
