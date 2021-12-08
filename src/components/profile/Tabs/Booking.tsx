import { LinearProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";

function Booking({ creator }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  const [Date, setDate] = useState();
  //
  const [AllBookings, setAllBookings] = useState([]);
  //
  return (
    <Row>
      <Col xs="12" md="6">
        <div className="d-flex p-1 flex-column justify-content-center">
          <h5 className="text-muted mx-auto">Availability</h5>
          {creator.booking.availability.map((A: any) => (
            <div className="availabilityCard text-center">
              <p className="m-0">
                {dateFormat(A.start, "HH:MM")} -
                {dateFormat(A.end, "HH:MM | mmm dd yyyy")}
              </p>
            </div>
          ))}
        </div>
      </Col>
      <Col xs="12" md="6" className="d-flex flex-column">
        <h5 className="text-muted mx-auto">Pick a booking</h5>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={Date}
              onChange={(newValue) => {
                // setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      </Col>
    </Row>
  );
}

export default Booking;
