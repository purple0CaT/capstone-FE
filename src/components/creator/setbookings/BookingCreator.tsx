import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, IconButton } from "@mui/material";
import dateFormat from "dateformat";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//
const setHBtns = {
  borderRadius: "20px",
  boxShadow: "0 0 3px grey",
  backgroundColor: "white",
};
//
function BookingCreator({ FetchedCreator, reFetch }: any) {
  const [AvailabDate, setAvailabDate]: any = useState(
    new Date(new Date().setMinutes(0)),
  );
  const [AvailabEnd, setAvailabEnd]: any = useState(
    new Date(new Date().setMinutes(0)),
  );
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  //
  //
  const setAvailab = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/booking/setavailability`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ start: AvailabDate, end: AvailabEnd }),
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        reFetch();
        setLoading(false);
      } else {
        setLoading(false);
        alert("Error!");
        console.log(res);
      }
    } catch (error) {
      setLoading(false);
      alert("Error!");
      console.log(error);
    }
  };
  //
  const confirmApp = async (id: any) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/booking/appointmentConfirm/${id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (res.ok) {
        reFetch();
      } else {
        alert("Error!");
        console.log(res);
      }
    } catch (error) {
      alert("Error!");
      console.log(error);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <div className="creatorCard">
          <div className="d-flex flex-column align-items-center">
            {/* =================================================== PENDING APPOINTMENTS */}
            <h5 className="text-muted">Pending appointments</h5>
            <div
              className="d-flex p-1 w-100"
              style={{ gap: "1rem", overflowX: "scroll" }}
            >
              {FetchedCreator?.booking &&
                FetchedCreator.booking.appointments.map(
                  (AP: any) =>
                    !AP.confirmed &&
                    new Date(AP.appointmentEnd) >= new Date() && (
                      <div className="creatorItemCard" key={AP._id + "lsls"}>
                        <span className="d-flex align-items-center font-weight-bold">
                          <small className="mr-1">id: </small> {AP._id}
                        </span>
                        <Link to={`/profile/${AP.user}`}>User profile</Link>{" "}
                        <h6 className="my-2">
                          {dateFormat(
                            AP.appointmentDate,
                            "mmm d, yyyy |  HH:MM ",
                          )}
                          {dateFormat(AP.appointmentEnd, "- HH:MM")}
                        </h6>
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="d-flex align-items-center">
                            <h6 className="m-0">Confirmed: </h6>
                            <CancelIcon color="warning" />
                          </div>
                          <Button
                            onClick={() => confirmApp(AP._id)}
                            variant="outlined"
                            color="success"
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ),
                )}
            </div>
          </div>
          <hr className="w-100" />
          <div className="d-flex flex-column align-items-center">
            <h5 className="text-muted">Approved bookings</h5>
            <div
              className="d-flex p-1 w-100"
              style={{ gap: "1rem", overflowX: "scroll" }}
            >
              {FetchedCreator?.booking &&
                FetchedCreator.booking.appointments.map(
                  (AP: any) =>
                    AP.confirmed &&
                    new Date(AP.appointmentEnd) >= new Date() && (
                      <div className="creatorItemCard" key={AP._id + "zcsf"}>
                        <span className="d-flex align-items-center font-weight-bold">
                          <small className="mr-1">id: </small> {AP._id}
                        </span>
                        <Link to={`/profile/${AP.user}`}>User profile</Link>{" "}
                        <h6 className="my-2">
                          {dateFormat(
                            AP.appointmentDate,
                            "mmm d, yyyy |  HH:MM ",
                          )}
                          {dateFormat(AP.appointmentEnd, "- HH:MM")}
                        </h6>
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="d-flex align-items-center">
                            <h6 className="m-0">Confirmed: </h6>
                            <CheckCircleOutlineIcon color="success" />
                          </div>
                        </div>
                      </div>
                    ),
                )}
            </div>
          </div>
          {/* =================================================== Your Availability */}
          <hr className="w-100" />
          <h5 className="text-muted text-center">Your Availability</h5>
          <div
            className="d-flex p-1 w-100"
            style={{ gap: "1rem", overflowX: "scroll" }}
          >
            {FetchedCreator?.booking.availability.length > 0 ? (
              FetchedCreator.booking.availability.map(
                (A: any) =>
                  new Date(A.end) >= new Date() && (
                    <div
                      className="availItemBook text-center"
                      key={A._id + "kcvs"}
                    >
                      <h6 className="m-0 text-muted">
                        {dateFormat(A.start, "mmm dd yyyy | HH:MM")} -
                        {dateFormat(A.end, "HH:MM")}
                      </h6>
                      <div>
                        {FetchedCreator.booking.appointments.map((APP: any) => {
                          if (
                            A.start <= APP.appointmentDate &&
                            A.end >= APP.appointmentEnd &&
                            APP.confirmed
                          ) {
                            return (
                              <div
                                className="d-flex flex-column align-items-center"
                                key={APP._id + "pfpf"}
                              >
                                <small className="text-muted">
                                  Booked Appointment
                                </small>
                                <p className="m-0">
                                  {dateFormat(APP.appointmentDate, "HH:MM")} -{" "}
                                  {dateFormat(APP.appointmentEnd, "HH:MM")}
                                </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  ),
              )
            ) : (
              <div>
                <br />
                <h5 className="text-center text-muted">No availability set!</h5>
              </div>
            )}
          </div>
          <hr className="w-100" />
          <div className="d-flex flex-column align-items-center">
            <h5 className="text-muted">Appointments Archive</h5>
            <div
              className="d-flex p-1 w-100"
              style={{ gap: "1rem", overflowX: "scroll" }}
            >
              {FetchedCreator?.booking &&
                FetchedCreator.booking.appointments.map(
                  (AP: any) =>
                    new Date(AP.appointmentEnd) <= new Date() && (
                      <div className="creatorItemCard" key={AP._id + "zcsf"}>
                        <span className="d-flex align-items-center font-weight-bold">
                          <small className="mr-1">id: </small> {AP._id}
                        </span>
                        <Link to={`/profile/${AP.user}`}>User profile</Link>{" "}
                        <h6 className="my-2">
                          {dateFormat(
                            AP.appointmentDate,
                            "mmm d, yyyy |  HH:MM ",
                          )}
                          {dateFormat(AP.appointmentEnd, "- HH:MM")}
                        </h6>
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="d-flex align-items-center">
                            <h6 className="m-0">Confirmed: </h6>
                            {AP.confirmed ? (
                              <CheckCircleOutlineIcon color="success" />
                            ) : (
                              <CancelIcon color="warning" />
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                )}
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={5}>
        <div className="creatorCard">
          <div className="d-flex flex-column align-items-center w-100">
            <h5 className="text-center text-muted">Set availability</h5>
            <Calendar
              minDate={new Date()}
              locale="US"
              onChange={(date: any) => {
                let cDate = new Date(date);
                cDate.setMinutes(0);
                setAvailabDate(new Date(cDate));
                cDate.setHours(cDate.getHours() + 1);
                setAvailabEnd(new Date(cDate));
              }}
              value={AvailabDate}
              // tileDisabled={tileDisabled}
            />
            <hr />
            {/* ================================ SET AVAILABILITY HOURS  */}
            <div className="d-flex flex-column w-100">
              <h5 className="text-center">
                {dateFormat(AvailabDate, "mmm dd yyyy | HH:MM - ")}
                {AvailabEnd && dateFormat(AvailabEnd, "HH:MM")}
              </h5>
            </div>
            <div className="d-flex justify-content-between w-100">
              <span>
                <small>Start at: </small>
                {AvailabDate?.getHours()}h
              </span>
              <span>
                <small>End at: </small>
                {AvailabEnd?.getHours()}h
              </span>
            </div>
            <div className="d-flex justify-content-between w-100">
              {/* ===================== START HOURS */}

              <div className="d-flex align-items-center" style={setHBtns}>
                <IconButton
                  onClick={() => {
                    setAvailabDate(
                      new Date(
                        AvailabDate.setHours(AvailabDate.getHours() + 1),
                      ),
                    );
                    if (AvailabDate.getHours() >= AvailabEnd.getHours()) {
                      AvailabEnd.setHours(AvailabEnd.getHours() + 1);
                      setAvailabEnd(new Date(AvailabEnd));
                    }
                  }}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>{" "}
                <IconButton
                  onClick={() =>
                    setAvailabDate(
                      new Date(
                        AvailabDate.setHours(AvailabDate.getHours() - 1),
                      ),
                    )
                  }
                >
                  <KeyboardArrowDownIcon />
                </IconButton>{" "}
              </div>
              <div className="d-flex w-100 justify-content-center">
                <h5 className="text-muted">
                  {AvailabEnd.getHours() - AvailabDate.getHours()} hours
                </h5>
              </div>
              {/* ============================== END HOURS  */}
              <div className="d-flex" style={setHBtns}>
                <IconButton
                  onClick={() => {
                    AvailabEnd.setMinutes(0);
                    AvailabEnd.setHours(AvailabEnd.getHours() + 1);
                    setAvailabEnd(new Date(AvailabEnd));
                  }}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>{" "}
                <IconButton
                  onClick={() => {
                    AvailabEnd.setHours(AvailabEnd.getHours() - 1);
                    setAvailabEnd(new Date(AvailabEnd));
                    if (AvailabDate.getHours() >= AvailabEnd.getHours()) {
                      AvailabDate.setHours(AvailabDate.getHours() - 1);
                      setAvailabDate(new Date(AvailabDate));
                    }
                  }}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>{" "}
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-center">
              <LoadingButton
                loading={Loading}
                variant="outlined"
                onClick={setAvailab}
              >
                Set availability
              </LoadingButton>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default BookingCreator;
