import { Button, Divider, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { setUser } from "../../redux/actions/action";
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
            <h5 className="text-muted text-center">
              <small>Order :</small> #{CompletedOrder._id}
            </h5>
            <Divider />
            {CompletedOrder.items.map((I: any) => (
              <Grid container className="d-flex justify-content-between p-1">
                <Grid xs={12} sm={4} item>
                  <img
                    src={I.item.image}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
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
                      <h6 className="m-0 ml-1">{I.item.price * I.qty}£</h6>
                    </span>
                    <span className="d-flex align-items-center">
                      Quantity: <h6 className="m-0 ml-1">{I.qty}</h6>
                    </span>
                  </div>
                </Grid>
              </Grid>
            ))}
            <Divider />
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex justify-content-between w-100 p-1">
                <span className="d-flex align-items-center">
                  {" "}
                  Total cost:{" "}
                  <h6 className="m-0 ml-1">{CompletedOrder.totalCost}£</h6>
                </span>
                <span className="d-flex align-items-center ml-auto mr-1 font-weight-bold">
                  Completed:{" "}
                  {CompletedOrder.completed ? (
                    <CheckCircleOutlineIcon color="success" fontSize="large" />
                  ) : (
                    <CancelIcon color="warning" fontSize="large" />
                  )}
                </span>
                <span className="d-flex align-items-center font-weight-bold">
                  Paid:{" "}
                  {CompletedOrder.paid ? (
                    <CheckCircleOutlineIcon color="success" fontSize="large" />
                  ) : (
                    <CancelIcon color="warning" fontSize="large" />
                  )}
                </span>
                {!CompletedOrder.paid && (
                  <Button
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
              <div className="w-100 my-1">
                <Divider />
              </div>
              <span className="d-flex align-items-center">
                Delivery address:
                <h5 className="m-0 ml-1">{CompletedOrder.deliveryAddress}</h5>
              </span>
              <span className="d-flex align-items-center">
                Delivery code/number:{" "}
                <h5 className="m-0 ml-1">
                  {CompletedOrder.deliveryCodeTracking
                    ? CompletedOrder.deliveryCodeTracking
                    : "-"}
                </h5>
              </span>
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
