import { Divider } from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SendAppointment from "./SendAppointment";
import { freeAppHours } from "./utility";
//
function Booking({ creator }: any) {
  const user = useSelector((state: any) => state.user);
  const params: any = useParams();
  const [CustomDate, setCustomDate]: any = useState({
    appointmentDate: null,
    appointmentEnd: null,
  });
  const [PickDay, setPickDay]: any = useState();
  const [FreeHours, setFreeHours] = useState([]);
  // CALENDAR AVAILAB DAYS
  const availab = creator.booking.availability.map(
    (A: any) => new Date(A.start),
  );
  const tileDisabled = ({ date, view }: any) =>
    view === "month" &&
    !availab.some(
      (disabledDate: any) =>
        date.getFullYear() === new Date(disabledDate).getFullYear() &&
        date.getMonth() === new Date(disabledDate).getMonth() &&
        date.getDate() === new Date(disabledDate).getDate(),
    );
  // set appointment
  const setAppointment = (hours: number) => {
    const start0 = new Date(PickDay).setHours(hours);
    const start1 = new Date(start0).setSeconds(0);
    const start = new Date(start1).setMinutes(0);
    const end0 = new Date(PickDay).setHours(hours);
    const end1 = new Date(end0).setSeconds(0);
    const end = new Date(end1).setMinutes(59);
    setCustomDate({
      appointmentDate: new Date(start),
      appointmentEnd: new Date(end),
    });
  };
  // =====
  useEffect(() => {
    // Set free hours
    if (PickDay) {
      const Fhours: any = freeAppHours(PickDay, creator);
      setFreeHours(Fhours);
    }
  }, [PickDay]);
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
                new Date() <= new Date(A.end) && (
                  <div
                    className="availabilityCard text-center"
                    key={"3322" + A.end}
                  >
                    <h6 className="m-0 text-muted">
                      {dateFormat(A.start, "mmm dd yyyy | HH:MM")} -
                      {dateFormat(A.end, "HH:MM")}
                    </h6>
                    <div>
                      {creator.booking.appointments.map(
                        (APP: any) =>
                          A.start <= APP.appointmentDate &&
                          A.end >= APP.appointmentEnd &&
                          APP.confirmed && (
                            <div
                              className="d-flex flex-column align-items-center"
                              key={APP._id + "llkk"}
                            >
                              <small className="text-muted">
                                Booked Appointment
                              </small>
                              <p className="m-0">
                                {dateFormat(APP.appointmentDate, "HH:MM")} -{" "}
                                {dateFormat(APP.appointmentEnd, "HH:MM")}
                              </p>
                            </div>
                          ),
                      )}
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
      <Col xs="12" md="6" className="d-flex flex-column align-items-center">
        <h5 className="text-muted mx-auto">Book a shot</h5>
        <Divider />
        <div className="position-relative">
          <Calendar
            minDate={new Date()}
            locale="US"
            onChange={(date: any) => {
              setPickDay(new Date(date));
            }}
            value={PickDay}
            tileDisabled={tileDisabled}
          />
        </div>
        <hr className="w-100" />
        {params.id !== user._id && FreeHours.length > 0 && (
          <>
            <div
              className="d-flex flex-column align-items-center"
              style={{ overflowX: "scroll", height: "8rem", width: "100%" }}
            >
              {FreeHours.map((Ap: any) => (
                <div
                  key={Ap + "zxc"}
                  className={`appointHoursPick ${
                    new Date(CustomDate.appointmentDate).getHours() === Ap &&
                    "appointHoursActive"
                  }`}
                  onClick={() => setAppointment(Ap)}
                >
                  {Ap}
                </div>
              ))}
            </div>
            <SendAppointment creator={creator} appInfo={CustomDate} />
          </>
        )}
      </Col>
    </Row>
  );
}

export default Booking;
