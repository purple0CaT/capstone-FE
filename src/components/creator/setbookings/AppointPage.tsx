import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
import dateFormat from "dateformat";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxStore } from "../../../types/reduxStore";
import { creatorFetch } from "../creatorInterface";
//
function AppointPage({ FetchedCreator, reFetch }: creatorFetch) {
  const tokens = useSelector((state: ReduxStore) => state.tokens);
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
    <>
      <br />
      <div className="d-flex flex-column align-items-center creatorCard">
        <h5 className="text-muted">Pending appointments</h5>
        <div
          className="d-flex p-1 py-3 w-100"
          style={{
            gap: "1rem",
            overflowX: "scroll",
            borderRight: "1px solid Gainsboro",
            borderLeft: "1px solid Gainsboro",
          }}
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
                      {dateFormat(AP.appointmentDate, "mmm d, yyyy |  HH:MM ")}
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
      {/* ================================================================ Approved appointments */}
      <div className="d-flex flex-column align-items-center creatorCard">
        <h5 className="text-muted">Approved appointments</h5>
        <div
          className="d-flex p-1 py-3 w-100"
          style={{
            gap: "1rem",
            overflowX: "scroll",
            borderRight: "1px solid Gainsboro",
            borderLeft: "1px solid Gainsboro",
          }}
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
                      {dateFormat(AP.appointmentDate, "mmm d, yyyy |  HH:MM ")}
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
      <hr className="w-100" />
      {/* ================================================================ Appointments Archive */}
      <div className="d-flex flex-column align-items-center creatorCard">
        <h5 className="text-muted">Appointments Archive</h5>
        <div
          className="d-flex p-1 py-3 w-100"
          style={{
            gap: "1rem",
            overflowX: "scroll",
            borderRight: "1px solid Gainsboro",
            borderLeft: "1px solid Gainsboro",
          }}
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
                      {dateFormat(AP.appointmentDate, "mmm d, yyyy |  HH:MM ")}
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
      <br />
    </>
  );
}

export default AppointPage;
