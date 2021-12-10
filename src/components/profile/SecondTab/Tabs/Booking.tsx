import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Divider, TextField } from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function Booking({ creator }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  const [CustomDate, setCustomDate] = useState();
  //
  const [AllBookings, setAllBookings] = useState([]);
  useEffect(() => {
    console.log(CustomDate);
  }, [CustomDate]);
  //
  return (
    <Row>
      <Col xs="12" md="6" className="d-flex flex-column">
        <h5 className="text-muted mx-auto">Availability</h5>
        <Divider />
        <div className="d-flex p-1 flex-column justify-content-center">
          {creator.booking.availability.map((A: any) => (
            <div className="availabilityCard text-center">
              <h6 className="m-0 text-muted">
                {dateFormat(A.start, "mmm dd yyyy | HH:MM")} -
                {dateFormat(A.end, "HH:MM")}
              </h6>
              <div>
                {creator.booking.appointments.map((APP: any) => {
                  if (
                    A.start <= APP.appointmentDate &&
                    A.end >= APP.appointmentDate
                  ) {
                    return (
                      <div className="d-flex flex-column align-items-center">
                        <small className="text-muted">Booked Appointment</small>
                        <p className="m-0">
                          {dateFormat(APP.appointmentDate, "HH:MM")} -{" "}
                          {dateFormat(APP.appointmentDate, "HH:MM")}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
        <br />
      </Col>
      <Col xs="12" md="6" className="d-flex flex-column">
        <h5 className="text-muted mx-auto">Book a shot</h5>
        <Divider />
        <div className="position-relative">
          <LocalizationProvider dateAdapter={AdapterDateFns} className="w-100">
            <StaticDatePicker<Date>
              orientation="portrait"
              openTo="day"
              value={CustomDate}
              minDate={new Date()}
              onChange={(newValue: any) => {
                setCustomDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </Col>
    </Row>
  );
}

export default Booking;
