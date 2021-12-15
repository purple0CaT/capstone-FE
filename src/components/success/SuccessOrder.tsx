import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Grid, LinearProgress } from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setUser } from "../../redux/actions/action";
import "./style.css";
//
function SuccessOrder() {
  const params: any = useParams();
  const session_id = new URLSearchParams(window.location.search).get(
    "session_id",
  );
  const dispatch = useDispatch();
  const tokens = useSelector((state: any) => state.tokens);
  const user = useSelector((state: any) => state.user);
  const [Loading, setLoading] = useState(true);
  //
  const [CompletedOrder, setCompletedOrder]: any = useState();
  // CHECK SESSION TRUE
  const checkSession = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/order/sessionIdCheck/${params.id}?session_id=${session_id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCompletedOrder(data);
        setLoading(false);
        fetchProfile();
      } else {
        console.log(res);
        alert("Error");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   FETCH USER
  const fetchProfile = async () => {
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
  // EFECT
  useEffect(() => {
    checkSession();
  }, []);
  //   TSX
  return (
    <Grid container className="successOrder">
      <Grid item xs={12} md={8} className="orderItem">
        {Loading && <LinearProgress />}
        {CompletedOrder && (
          <>
            {CompletedOrder.items?.map((I: any) => (
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
                      Item price : <h6 className="m-0 ml-1">{I.item.price}£</h6>
                    </span>
                    <span className="d-flex align-items-center">
                      Quantity: <h6 className="m-0 ml-1">{I.qty}</h6>
                    </span>
                    <span className="d-flex align-items-center">
                      Total:{" "}
                      <h6 className="m-0 ml-1">{I.item.price * I.qty}£</h6>
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
                <h6 className="m-0 ml-1">{CompletedOrder.deliveryAddress}</h6>
              </span>
              <div className="d-flex align-items-center justify-content-between flex-wrap w-100"></div>
              <span className="d-flex align-items-center flex-wrap mt-3">
                Order created at:{" "}
                <h6 className="m-0 ml-2 text-muted">
                  {dateFormat(CompletedOrder.createdAt)}
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
                Total cost:{" "}
                <h6 className="m-0 ml-1">{CompletedOrder.totalCost}£</h6>
              </span>
              <span className="d-flex align-items-center ml-auto mr-4 font-weight-bold">
                Completed:{" "}
                {!CompletedOrder.items.some(
                  (itm: any) => itm.item.completed === false,
                ) ? (
                  <CheckCircleOutlineIcon color="success" fontSize="medium" />
                ) : (
                  <CancelIcon color="warning" fontSize="medium" />
                )}
              </span>
              <span className="d-flex align-items-center font-weight-bold">
                Paid:{" "}
                {CompletedOrder.paid ? (
                  <CheckCircleOutlineIcon color="success" fontSize="medium" />
                ) : (
                  <CancelIcon color="warning" fontSize="medium" />
                )}
              </span>
              {!CompletedOrder.paid && (
                <Button
                  className="ml-3"
                  variant="contained"
                  color="info"
                  onClick={() => {
                    window.location.href = `${process.env.REACT_APP_FETCHURL}/order/checkout-session/${CompletedOrder._id}`;
                  }}
                >
                  Pay now!
                </Button>
              )}
            </div>
          </>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        className="d-flex flex-column align-items-center"
        style={{ gap: "1em" }}
      >
        <br />
        <Link to={`/profile/${user._id}`} className="text-decoration-none">
          <Button variant="outlined" color="success">
            {" "}
            Profile page
          </Button>
        </Link>
        <Link to="/order" className="text-decoration-none">
          <Button variant="outlined" color="info">
            {" "}
            My orders page
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default SuccessOrder;
