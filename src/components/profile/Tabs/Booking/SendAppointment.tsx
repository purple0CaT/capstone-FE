import { LoadingButton } from "@mui/lab";
import { Button, Dialog } from "@mui/material";
import dateFormat from "dateformat";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function SendAppointment({ appInfo, creator }: any) {
  const [ShowDialog, setShowDialog] = useState(false);
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  //
  const sendApp = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_FETCHURL}/booking/createAppoint/${creator._id}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(appInfo),
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setShowDialog(false);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Error");
    }
  };
  //
  return (
    <>
      <Button
        className="mt-1"
        onClick={() => setShowDialog(true)}
        color="info"
        variant="outlined"
      >
        Create Appointment
      </Button>
      <Dialog open={ShowDialog} onClose={() => setShowDialog(false)}>
        <div className="p-3 d-flex flex-column align-items-center">
          <h5 className="text-muted"> Confirm appointment</h5>{" "}
          <hr className="w-100" />
          <div>
            <h6>{dateFormat(appInfo.appointmentDate, "ddd mmm dd yyyy")}</h6>
            <h5>
              {dateFormat(appInfo.appointmentDate, "HH:MM - ")}
              {dateFormat(appInfo.appointmentEnd, "HH:MM")}
            </h5>
          </div>
          <hr className="w-100" />
          <div>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
            <LoadingButton
              variant="outlined"
              color="success"
              loading={Loading}
              onClick={sendApp}
            >
              Confirm
            </LoadingButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default SendAppointment;
