import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmedType } from "./interface";
import SimpleOrder from "./SimpleOrder";
//
function Confirmed({ Order, reFetch }: ConfirmedType) {
  const [SortOrders, setSortOrders] = useState([]);
  //
  //
  useEffect(() => {
    if (Order.length > 0) {
      const sorted: any = Order.sort(function (a: any, b: any) {
        let st: any = new Date(a.createdAt);
        let en: any = new Date(b.createdAt);
        return en - st;
      });
      setSortOrders(sorted);
    }
  }, [Order]);
  return (
    <div className="d-flex flex-column">
      <h5 className="d-flex align-items-center">
        Confirmed <CheckCircleOutlineIcon color="success" className="ml-2" />
      </h5>
      {SortOrders.length > 0 &&
        SortOrders.map(
          (oOrder: any) =>
            !oOrder.items.some((itm: any) => itm.item.completed === false) && (
              <Accordion className="simpleOrder p-0" key={oOrder._id + ".mdk"}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
                    <h6 className="text-muted text-center m-0">
                      <small>Order :</small> #{oOrder._id}
                    </h6>{" "}
                    <span className="d-flex align-items-center ml-auto mr-1 font-weight-bold">
                      Completed:{" "}
                      {!oOrder.items.some(
                        (itm: any) => itm.item.completed === false,
                      ) ? (
                        <CheckCircleOutlineIcon
                          color="success"
                          fontSize="medium"
                        />
                      ) : (
                        <CancelIcon color="warning" fontSize="medium" />
                      )}
                    </span>
                    <span className="d-flex align-items-center font-weight-bold">
                      Paid:{" "}
                      {oOrder.paid ? (
                        <CheckCircleOutlineIcon
                          color="success"
                          fontSize="medium"
                        />
                      ) : (
                        <CancelIcon color="warning" fontSize="medium" />
                      )}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="itemsOrderWrapper p-0">
                  <SimpleOrder Order={oOrder} reFetch={reFetch} />
                </AccordionDetails>
              </Accordion>
            ),
        )}
    </div>
  );
}

export default Confirmed;
