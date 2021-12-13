import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import dateFormat from "dateformat";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

import { Divider, LinearProgress } from "@mui/material";
import { setUser } from "../../redux/actions/action";
//
function MyBooking() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
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
    fetchUser();
  }, []);
  //
  return (
    <div className="myBookings">
      {Loading ? (
        <LinearProgress />
      ) : (
        <>
          <br />
          <h5 className="text-muted text-center">Approved bookings</h5>
          <div className="bookingItemWraper">
            {user.booking &&
              user.booking.map((B: any) => {
                return (
                  B.confirmed &&
                  new Date(B.appointmentDate) >= new Date() && (
                    <div className="bookingItem" key={B._id + "aef"}>
                      <small className="d-flex">
                        id:{" "}
                        <span className="font-weight-bold text-muted ml-1">
                          {B._id}
                        </span>
                      </small>
                      <Divider />
                      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                        <h6 className="text-muted text-center">
                          {dateFormat(B.appointmentDate, "ddd, d mmm , yyyy	")}
                        </h6>
                        <p>
                          {dateFormat(B.appointmentDate, "HH:MM")}-
                          {dateFormat(B.appointmentDate, "HH:MM")}
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <p className="m-0 mr-2">Confirmed </p>
                          <CheckCircleOutlineIcon color="success" />
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
          <Divider />
          <br />
          <h5 className="text-center text-muted">Not approved</h5>
          <div className="bookingItemWraper">
            {user.booking &&
              user.booking.map((B: any) => {
                return (
                  !B.confirmed &&
                  new Date(B.appointmentDate) >= new Date() && (
                    <div className="bookingItem" key={"321" + B._id}>
                      <small className="d-flex">
                        id:{" "}
                        <span className="font-weight-bold text-muted ml-1">
                          {B._id}
                        </span>
                      </small>
                      <Divider />
                      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                        <h6 className="text-muted text-center">
                          {dateFormat(B.appointmentDate, "ddd, d mmm , yyyy	")}
                        </h6>
                        <p>
                          {dateFormat(B.appointmentDate, "HH:MM")}-
                          {dateFormat(B.appointmentDate, "HH:MM")}
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <p className="m-0 mr-2">Confirmed </p>
                          <CancelIcon color="warning" />
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
          <Divider />
          <br />
          <h5 className="text-center text-muted">Booking Archive</h5>
          <div className="bookingItemWraper">
            {user.booking &&
              user.booking.map((B: any) => {
                return (
                  new Date(B.appointmentDate) <= new Date() && (
                    <div className="bookingItem" key={B._id + "acxf"}>
                      <small className="d-flex">
                        id:{" "}
                        <span className="font-weight-bold text-muted ml-1">
                          {B._id}
                        </span>
                      </small>
                      <Divider />
                      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                        <h6 className="text-muted text-center">
                          {dateFormat(B.appointmentDate, "ddd, d mmm , yyyy	")}
                        </h6>
                        <p>
                          {dateFormat(B.appointmentDate, "HH:MM")}-
                          {dateFormat(B.appointmentDate, "HH:MM")}
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <p className="m-0 mr-2">Confirmed </p>
                          <CancelIcon color="warning" />
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyBooking;
