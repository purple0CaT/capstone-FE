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
  TextField
} from "@mui/material";
import dateFormat from "dateformat";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function SingleOrder({ Order, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [DeliveryCode, setDeliveryCode] = useState("");
  //
  const confirmDelivery = async (lastCode: any, id: string) => {
    const trackingSum = lastCode ? `${lastCode}, ` : "";
    const url = `${process.env.REACT_APP_FETCHURL}/order/delivery/${id}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          deliveryCodeTracking: trackingSum + DeliveryCode,
        }),
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        reFetch();
      } else {
        alert("Error!");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmItem = async (orderId: string, itemId: string) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/order/completeItem/${orderId}/${itemId}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        reFetch();
      } else {
        alert("Error!");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Accordion className="simpleOrder p-0">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
          <h5 className="text-muted text-center">
            <small>Order :</small> #{Order._id}
          </h5>{" "}
          <span className="d-flex align-items-center ml-auto mr-1 font-weight-bold">
            Completed:{" "}
            {Order.completed ? (
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
        {Order.items?.map((I: any) => (
          <Grid
            container
            className="d-flex justify-content-between p-0 orderItem"
            key={"331" + I.item._id}
          >
            <Grid xs={12} sm={4} item>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={I.item.image}
                  style={{
                    maxWidth: "50%",
                    maxHeight: "50%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                  alt=""
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
                  <h6 className="m-0 ml-1">You</h6>
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
                  {I.item.completed ? (
                    <CheckCircleOutlineIcon color="success" fontSize="medium" />
                  ) : (
                    <CancelIcon color="warning" fontSize="medium" />
                  )}
                </div>
                {I.item.sellerId === user._id && !I.item.completed && (
                  <div>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => confirmItem(Order._id, I.item._id)}
                    >
                      Completed
                    </Button>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between mt-2 flex-wrap">
                <span className="d-flex align-items-center">
                  Items price :{" "}
                  <h6 className="m-0 ml-1">{I.item.price * I.qty}£</h6>
                </span>
                <span className="d-flex align-items-center">
                  Quantity: <h6 className="m-0 ml-1">{I.qty}</h6>
                </span>
              </div>
            </Grid>
          </Grid>
        ))}
        <hr />
        <div
          className="d-flex flex-column align-items-center p-1"
          style={{ backgroundColor: "white", borderRadius: "3px" }}
        >
          <span className="d-flex align-items-center">
            Delivery address:
            <h6 className="m-0 ml-1">{Order.deliveryAddress}</h6>
          </span>
          <div className="d-flex align-items-center justify-content-between flex-wrap w-100">
            <span className="d-flex align-items-center">
              Delivery code/number:{" "}
              <h6 className="m-0 ml-1">
                {Order.deliveryCodeTracking ? Order.deliveryCodeTracking : "-"}
              </h6>
            </span>
            <div className="d-flex align-items-baseline">
              <TextField
                required
                color="info"
                variant="standard"
                label="Tracking code"
                value={DeliveryCode}
                onChange={(e) => setDeliveryCode(e.target.value)}
              />
              <Button
                disabled={DeliveryCode ? false : true}
                onClick={() =>
                  confirmDelivery(Order.deliveryCodeTracking, Order._id)
                }
                variant="outlined"
                className="ml-1"
              >
                Add track
              </Button>
            </div>
          </div>
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
            Total cost: <h6 className="m-0 ml-1">{Order.totalCost}£</h6>
          </span>
          <span className="d-flex align-items-center ml-auto mr-4 font-weight-bold">
            Completed:{" "}
            {Order.completed ? (
              <CheckCircleOutlineIcon color="success" fontSize="large" />
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
        <br />
      </AccordionDetails>
    </Accordion>
  );
}

export default SingleOrder;
