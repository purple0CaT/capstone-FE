import { Divider } from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
//
function Booking({ creator }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  const [CustomDate, setCustomDate] = useState();
  const [date, setDate]: any = useState();
  // CALENDAR AVAILAB
  const availab = creator.booking.availability.map(
    (A: any) => new Date(A.start),
  );
  const tileDisabled = ({ date, view }: any) =>
    view === "month" && // Block day tiles only
    !availab.some(
      (disabledDate: any) =>
        date.getFullYear() === new Date(disabledDate).getFullYear() &&
        date.getMonth() === new Date(disabledDate).getMonth() &&
        date.getDate() === new Date(disabledDate).getDate(),
    );
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
          {creator.booking.availability.length > 0 ? (
            creator.booking.availability.map(
              (A: any) =>
                new Date(A.end) >= new Date() && (
                  <div className="availabilityCard text-center">
                    <h6 className="m-0 text-muted">
                      {dateFormat(A.start, "mmm dd yyyy | HH:MM")} -
                      {dateFormat(A.end, "HH:MM")}
                    </h6>
                    <div>
                      {creator.booking.appointments.map((APP: any) => {
                        if (
                          A.start <= APP.appointmentDate &&
                          A.end >= APP.appointmentEnd
                        ) {
                          return (
                            <div className="d-flex flex-column align-items-center">
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
        <br />
      </Col>
      <Col xs="12" md="6" className="d-flex flex-column">
        <h5 className="text-muted mx-auto">Book a shot</h5>
        <Divider />
        <div className="position-relative">
          <Calendar
            minDate={new Date()}
            locale="US"
            onChange={(date: any) => {
              setDate(new Date(date));
            }}
            value={date}
            tileDisabled={tileDisabled}
          />
        </div>
        <hr className="w-100" />
        <div>Hours pick</div>
      </Col>
    </Row>
  );
}

export default Booking;
