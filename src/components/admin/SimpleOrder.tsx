import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Grid, TextField } from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SimpleOrder({ Order, reFetch }: any) {
  const [DeliveryCode, setDeliveryCode]: any = useState({});
  const tokens = useSelector((state: any) => state.tokens);
  //
  const confirmItem = async (
    orderId: string,
    itemId: string,
    index: number,
  ) => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/order/completeItemDelivery/${orderId}/${itemId}`;
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ deliveryCode: DeliveryCode[index + "a"] }),
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
  useEffect(() => {
    return setDeliveryCode({});
  }, []);
  return (
    <>
      {Order &&
        Order.items.map((I: any, index: number) => (
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
                <Link
                  className="ml-1 font-weight-bold"
                  to={`/profile/${I.item.sellerId}`}
                >
                  {I.item.sellerId}
                </Link>
              </span>
              <span className="d-flex align-items-baseline">
                Item type : <h6 className="m-0 ml-1">{I.item.type}</h6>
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
              </div>

              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <span className="d-flex align-items-baseline">
                  Delivery code :{" "}
                  <h6 className="m-0 ml-1">
                    {I.item.deliveryCode ? I.item.deliveryCode : "-"}
                  </h6>
                </span>

                {I.item.type === "default" && !I.item.completed && (
                  <div className="d-flex align-items-baseline">
                    <TextField
                      required
                      color="info"
                      variant="standard"
                      label="Tracking code"
                      value={DeliveryCode[index + "a"]}
                      size="small"
                      onChange={(e) =>
                        setDeliveryCode({
                          ...DeliveryCode,
                          [index + "a"]: e.target.value,
                        })
                      }
                    />
                    <Button
                      disabled={DeliveryCode[index + "a"] ? false : true}
                      onClick={() => confirmItem(Order._id, I.item._id, index)}
                      variant="outlined"
                      className="ml-1"
                      size="small"
                    >
                      Add track
                    </Button>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between flex-wrap">
                <span className="d-flex align-items-center">
                  Item price : <h6 className="m-0 ml-1">{I.item.price}£</h6>
                </span>
                <span className="d-flex align-items-center">
                  Quantity: <h6 className="m-0 ml-1">{I.qty}</h6>
                </span>
                <span className="d-flex align-items-center">
                  Total: <h6 className="m-0 ml-1">{I.item.price * I.qty}£</h6>
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
        <span>
          Customer page:{" "}
          <Link
            to={`/profile/${Order.customerId}`}
            className="ml-2 font-weight-bold"
          >
            {Order.customerId}
          </Link>
        </span>
        <span className="d-flex align-items-center">
          Delivery address:
          <h6 className="m-0 ml-1">{Order.deliveryAddress}</h6>
        </span>
        <div className="d-flex align-items-center justify-content-between flex-wrap w-100"></div>
        <span className="d-flex align-items-center flex-wrap mt-3">
          Order created at:{" "}
          <h6 className="m-0 ml-2 text-muted">{dateFormat(Order.createdAt)}</h6>
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
          {!Order?.items.some((itm: any) => itm.item.completed === false) ? (
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
    </>
  );
}

export default SimpleOrder;
