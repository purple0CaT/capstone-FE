import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import "./style.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOrder from "./DeleteOrder";
import { setUser } from "../../redux/actions/action";

function Order() {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const dispatch = useDispatch();
  //
  const fetchUser = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${user._id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();

        dispatch(setUser(data.user));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Grid container style={{ boxShadow: "0 0 5px grey" }}>
      <Grid item xs={12} className="orderWrapper">
        <br />
        <h4 className="text-muted text-center">My orders</h4>
        <Divider />
        {user.shopping.orders &&
          user.shopping.orders.map((Order: any) => (
            <>
              <Accordion className="simpleOrder">
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
                        <CheckCircleOutlineIcon
                          color="success"
                          fontSize="large"
                        />
                      ) : (
                        <CancelIcon color="warning" fontSize="large" />
                      )}
                    </span>
                    <span className="d-flex align-items-center font-weight-bold">
                      Paid:{" "}
                      {Order.paid ? (
                        <CheckCircleOutlineIcon
                          color="success"
                          fontSize="large"
                        />
                      ) : (
                        <CancelIcon color="warning" fontSize="large" />
                      )}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="itemsOrderWrapper">
                  <Divider />
                  {Order.items.map((I: any) => (
                    <Grid
                      container
                      className="d-flex justify-content-between p-1 orderItem"
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
                        <div className="d-flex justify-content-between">
                          <span className="d-flex align-items-center">
                            Items price :{" "}
                            <h6 className="m-0 ml-1">
                              {I.item.price * I.qty}£
                            </h6>
                          </span>
                          <span className="d-flex align-items-center">
                            Quantity: <h6 className="m-0 ml-1">{I.qty}</h6>
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  ))}
                  <br />
                  <Divider />
                  <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-between flex-wrap w-100 p-1">
                      <span className="d-flex align-items-center">
                        {" "}
                        Total cost:{" "}
                        <h6 className="m-0 ml-1">{Order.totalCost}£</h6>
                      </span>
                      <span className="d-flex align-items-center ml-auto mr-4 font-weight-bold">
                        Completed:{" "}
                        {Order.completed ? (
                          <CheckCircleOutlineIcon
                            color="success"
                            fontSize="large"
                          />
                        ) : (
                          <CancelIcon color="warning" fontSize="large" />
                        )}
                      </span>
                      <span className="d-flex align-items-center font-weight-bold">
                        Paid:{" "}
                        {Order.paid ? (
                          <CheckCircleOutlineIcon
                            color="success"
                            fontSize="large"
                          />
                        ) : (
                          <CancelIcon color="warning" fontSize="large" />
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
                    <div className="w-100 my-1">
                      <Divider />
                    </div>
                    <span className="d-flex align-items-center">
                      Delivery address:
                      <h6 className="m-0 ml-1">{Order.deliveryAddress}</h6>
                    </span>
                    <span className="d-flex align-items-center">
                      Delivery code/number:{" "}
                      <h6 className="m-0 ml-1">
                        {Order.deliveryCodeTracking
                          ? Order.deliveryCodeTracking
                          : "-"}
                      </h6>
                    </span>
                  </div>
                  <br />
                  <Divider />
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <DeleteOrder id={Order._id} />{" "}
                  </div>
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        <br />
      </Grid>
    </Grid>
  );
}

export default Order;
