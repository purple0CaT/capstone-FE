import { Divider } from "@mui/material";
import dateFormat from "dateformat";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

//
interface BookingImport {
  B: any;
}
//
function BookingItem({ B }: BookingImport) {
  return (
    <div className="bookingItem">
      <small className="d-flex">
        id: <span className="font-weight-bold text-muted ml-1">{B._id}</span>
      </small>
      <Divider />
      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
        <h6 className="text-muted text-center">
          {dateFormat(B.appointmentDate, "ddd, d mmm , yyyy	")}
        </h6>
        <p>
          {dateFormat(B.appointmentDate, "HH:MM")}-
          {dateFormat(B.appointmentDate, "HH:MM")}
        </p>
        <div className="d-flex align-items-center justify-content-center">
          <p className="m-0 mr-2">Confirmed </p>
          {B.confirmed && <CheckCircleOutlineIcon color="success" />}
          {!B.confirmed && <CancelIcon color="warning" />}
        </div>
      </div>
    </div>
  );
}

export default BookingItem;
