import { Divider, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BookingItem from "../components/bookings/BookingItem";
import { setUser } from "../redux/actions/action";
import { ReduxStore } from "../types/reduxStore";
import "../components/bookings/style.css";

//
function MyBooking() {
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
  //
  return (
    <div className="myBookings">
      {Loading ? (
        <LinearProgress />
      ) : (
        <>
          <br />
          <h5 className="text-muted text-center">Approved bookings</h5>
          <section className="bookingItemWraper">
            {user.booking &&
              user.booking.map((B: any) => {
                return (
                  B.confirmed &&
                  new Date(B.appointmentDate) >= new Date() && (
                    <BookingItem key={B._id + "aef"} B={B} />
                  )
                );
              })}
          </section>
          <Divider />
          <br />
          <h5 className="text-center text-muted">Not approved</h5>
          <section className="bookingItemWraper">
            {user.booking &&
              user.booking.map((B: any) => {
                return (
                  !B.confirmed &&
                  new Date(B.appointmentDate) >= new Date() && (
                    <BookingItem key={B._id + "aef"} B={B} />
                  )
                );
              })}
          </section>
          <Divider />
          <br />
          <h5 className="text-center text-muted">Booking Archive</h5>
          <section className="bookingItemWraper">
            {user.booking &&
              user.booking.map((B: any) => {
                return (
                  new Date(B.appointmentDate) <= new Date() && (
                    <BookingItem key={B._id + "aef"} B={B} />
                  )
                );
              })}
          </section>
        </>
      )}
    </div>
  );
}

export default MyBooking;
