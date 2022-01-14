import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LoadingButton } from "@mui/lab";
import { Divider, Grid, IconButton } from "@mui/material";
import dateFormat from "dateformat";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { Appointment, Availability } from "../../../types/Creator/creatorTypes";
import { ReduxStore } from "../../../types/reduxStore";
// Style
const setHBtns = {
  borderRadius: "20px",
  boxShadow: "0 0 3px grey",
  backgroundColor: "white",
};
//
function AvailabPage({ FetchedCreator, reFetch }: any) {
  const tokens = useSelector((state: ReduxStore) => state.tokens);
  const [Loading, setLoading] = useState(false);
  const [AvailabDate, setAvailabDate]: any = useState(
    new Date(new Date().setMinutes(0)),
  );
  const [AvailabEnd, setAvailabEnd]: any = useState(
    new Date(new Date().setMinutes(0)),
  );
  // DISABLE DAYS
  const tileDisabled = ({ date, view }: any) =>
    view === "month" &&
    FetchedCreator?.booking.availability.some(
      (disabledDate: any) =>
        date.getFullYear() === new Date(disabledDate.start).getFullYear() &&
        date.getMonth() === new Date(disabledDate.start).getMonth() &&
        date.getDate() === new Date(disabledDate.start).getDate(),
    );
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
  const cancelAvailab = async (id: string) => {
    const url = `${process.env.REACT_APP_FETCHURL}/booking/cancelAvailability/${id}`;
    try {
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
    <>
      <br />
      <div className="creatorCard">
        <h5 className="text-muted text-center">Your Availability</h5>
        <div
          className="d-flex p-1 py-3 w-100"
          style={{
            gap: "1rem",
            overflowX: "scroll",
            borderRight: "1px solid Gainsboro",
            borderLeft: "1px solid Gainsboro",
          }}
        >
          {FetchedCreator?.booking.availability.length > 0 ? (
            FetchedCreator.booking.availability.map(
              (A: Availability) =>
                new Date(A.end) >= new Date() && (
                  <div
                    className="availItemBookCreator text-center"
                    key={A._id + "kcvs"}
                  >
                    <h6 className="m-0">
                      {dateFormat(A.start, "mmm dd yyyy | HH:MM")} -
                      {dateFormat(A.end, "HH:MM")}
                    </h6>
                    <div>
                      <Divider className="w-100" />
                      {FetchedCreator.booking.appointments.map((APP: Appointment) => {
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
                    <div className="mt-auto">
                      <br />{" "}
                      <IconButton
                        color="warning"
                        onClick={() => cancelAvailab(A._id)}
                      >
                        <DeleteIcon color="warning" />
                      </IconButton>
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
      </div>
      <hr />
      <div className="creatorCard">
        <Grid
          container
          className="d-flex  justify-content-between align-items-center w-100"
        >
          <Grid item xs={12} md={6}>
            <div className="d-flex flex-column align-items-center">
              {/* ======================================================================= Set availability CALENDAR*/}
              <h5 className="text-center text-muted">Set availability</h5>
              <Calendar
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                locale="US"
                onChange={(date: any) => {
                  let cDate = new Date(date);
                  cDate.setMinutes(0);
                  setAvailabDate(new Date(cDate));
                  cDate.setHours(cDate.getHours() + 1);
                  setAvailabEnd(new Date(cDate));
                }}
                value={AvailabDate}
                tileDisabled={tileDisabled}
              />
            </div>
          </Grid>
          {/* =================================================================== SET AVAILABILITY HOURS  */}
          <Grid item xs={12} md={6}>
            <div className="p-4">
              <div className="d-flex justify-content-center flex-column w-100 py-3">
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
                    {AvailabEnd.getHours() - AvailabDate.getHours()} h
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
          </Grid>
        </Grid>
      </div>
      <br />
    </>
  );
}

export default AvailabPage;
