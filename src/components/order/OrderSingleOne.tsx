import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  reduxItem,
  reduxSingleOrder,
  ReduxStore,
} from "../../types/reduxStore";
import DeleteOrder from "./DeleteOrder";
//
interface OrderRefetch {
  Order: reduxSingleOrder;
  reFetch: () => void;
}
//
function OrderSingleOne({ Order, reFetch }: any) {
  const history = useHistory();
  const user = useSelector((state: ReduxStore) => state.user);
  //
  useEffect(() => {
    if (user._id === "") {
      history.push("/login");
    }
  }, []);
  return (
    <>
      {Order.items && (
        <Accordion className="simpleOrder p-0">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`header-${Order._id}`}
          >
            <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
              {" "}
              <span style={{ textOverflow: "ellipsis" }}>
                {" "}
                {Order.items?.map((I: reduxItem) => I.item.title + ", ")}
              </span>
              <span className="d-flex align-items-center ml-auto mr-1 font-weight-bold">
                Completed:{" "}
                {!Order?.items.some(
                  (itm: reduxItem) => itm.item.completed === false,
                ) ? (
                  <CheckCircleOutlineIcon color="success" fontSize="medium" />
                ) : (
                  <CancelIcon color="warning" fontSize="medium" />
                )}
              </span>
              <span className="d-flex align-items-center font-weight-bold">
                Paid:{" "}
                {Order.paid ? (
                  <CheckCircleOutlineIcon color="success" fontSize="medium" />
                ) : (
                  <CancelIcon color="warning" fontSize="medium" />
                )}
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="itemsOrderWrapper p-0">
            <Divider />
            <br />
            <h6 className="text-muted text-center">
              <small>Order :</small> #{Order._id}
            </h6>
            {Order.items?.map((I: reduxItem) => (
              <Grid
                container
                className="d-flex justify-content-between p-0 orderItem"
                key={"331" + I.item._id}
              >
                <Grid xs={12} sm={4} item>
                  <div className="d-flex h-100 align-items-center justify-content-center">
                    <img
                      src={I.item.image}
                      style={{
                        maxWidth: "70%",
                        maxHeight: "70%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      alt={I.item.title}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  className="d-flex justify-content-center w-100 flex-column p-2"
                >
                  <p>{I.item.title}</p>
                  <span className="d-flex align-items-center">
                    Seller:{" "}
                    {I.item.sellerId === user._id ? (
                      "You"
                    ) : (
                      <Link
                        className="ml-1 font-weight-bold"
                        to={`/profile/${I.item.sellerId}`}
                      >
                        {I.item.sellerId}
                      </Link>
                    )}
                  </span>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex">
                      <span>Completed: </span>
                      {console.log(I.item)}
                      {I.item.completed ? (
                        <CheckCircleOutlineIcon
                          color="success"
                          fontSize="medium"
                        />
                      ) : (
                        <CancelIcon color="warning" fontSize="medium" />
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <span className="d-flex align-items-baseline">
                      Delivery code :{" "}
                      <h6 className="m-0 ml-1">
                        {I.item.deliveryCode ? I.item.deliveryCode : "-"}
                      </h6>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap">
                    <span className="d-flex align-items-center">
                      Item price : <h6 className="m-0 ml-1">{I.item.price}??</h6>
                    </span>
                    <span className="d-flex align-items-center">
                      Quantity: <h6 className="m-0 ml-1">{I.qty}</h6>
                    </span>
                    <span className="d-flex align-items-center">
                      Total:{" "}
                      <h6 className="m-0 ml-1">{I.item.price * I.qty}??</h6>
                    </span>
                  </div>
                </Grid>
              </Grid>
            ))}
            <hr />
            <div
              className="d-flex flex-column align-items-center p-2"
              style={{ backgroundColor: "white", borderRadius: "3px" }}
            >
              <span className="d-flex align-items-center">
                Delivery address:
                <h6 className="m-0 ml-1">{Order.deliveryAddress}</h6>
              </span>
              <div className="d-flex align-items-center justify-content-between flex-wrap w-100"></div>
              <span className="d-flex align-items-center flex-wrap mt-3">
                Order created at:{" "}
                <h6 className="m-0 ml-2 text-muted">
                  {dateFormat(Order.createdAt)}
                </h6>
              </span>
            </div>
            <hr className="w-100" />
            <div
              className="d-flex justify-content-between flex-wrap w-100 p-1 "
              style={{ backgroundColor: "white", borderRadius: "3px" }}
            >
              <span className="d-flex align-items-center">
                {" "}
                Total cost: <h6 className="m-0 ml-1">{Order.totalCost}??</h6>
              </span>
              <span className="d-flex align-items-center ml-auto mr-4 font-weight-bold">
                Completed:{" "}
                {!Order?.items.some(
                  (itm: reduxItem) => itm.item.completed === false,
                ) ? (
                  <CheckCircleOutlineIcon color="success" fontSize="medium" />
                ) : (
                  <CancelIcon color="warning" fontSize="medium" />
                )}
              </span>
              <span className="d-flex align-items-center font-weight-bold">
                Paid:{" "}
                {Order.paid ? (
                  <CheckCircleOutlineIcon color="success" fontSize="medium" />
                ) : (
                  <CancelIcon color="warning" fontSize="medium" />
                )}
              </span>
              {!Order.paid && (
                <Button
                  className="ml-3"
                  variant="contained"
                  color="info"
                  onClick={() => {
                    window.location.href = `${process.env.REACT_APP_FETCHURL}/order/checkout-session/${Order._id}`;
                  }}
                >
                  Pay now!
                </Button>
              )}
            </div>
            <hr />
            <div className="d-flex justify-content-center align-items-center w-100">
              <DeleteOrder id={Order._id} />{" "}
            </div>
            <br />
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}

export default OrderSingleOne;
