import AvTimerIcon from "@mui/icons-material/AvTimer";
import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { creatorFetch } from "../creatorInterface";
import AppointPage from "./AppointPage";
import AvailabPage from "./AvailabPage";
//
function BookingCreator({ FetchedCreator, reFetch }: creatorFetch) {
  return (
    <div>
      {/* =================================================== PENDING APPOINTMENTS */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="m-0"
        >
          <EventIcon />
          <h5 className="text-center text-muted m-0 ml-2">Appointments</h5>
        </AccordionSummary>
        <AccordionDetails
          style={{ backgroundColor: "#f2f2f2" }}
          className="p-1"
        >
          <AppointPage FetchedCreator={FetchedCreator} reFetch={reFetch} />
        </AccordionDetails>
      </Accordion>
      <hr />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="m-0"
        >
          <AvTimerIcon />
          <h5 className="text-center text-muted m-0 ml-2">Availability</h5>
        </AccordionSummary>
        <AccordionDetails
          style={{ backgroundColor: "#f2f2f2" }}
          className="p-1"
        >
          <AvailabPage FetchedCreator={FetchedCreator} reFetch={reFetch} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BookingCreator;
