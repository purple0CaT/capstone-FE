import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Divider, Grid, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearShop, setDelItem, setItemQty } from "../../redux/actions/action";
import "./style.css";
// Style
const imgStyle = {
  maxWidth: "100%",
  maxHeight: "15rem",
  borderRadius: "10px",
  boxShadow: "0 1px 2px grey",
};
//
function Cart() {
  const shop = useSelector((state: any) => state.shop);
  const tokens = useSelector((state: any) => state.tokens);
  const [DeliveryAddress, setDeliveryAddress] = useState({
    street: "",
    postal: "",
    city: "",
    country: "",
  });
  const dispatch = useDispatch();
  const [ItemsCart, setItemsCart] = useState([{ item: {}, qty: 0 }]);
  //
  const createOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `${process.env.REACT_APP_FETCHURL}/order/createOrder`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          items: shop.cart,
          paid: false,
          deliveryAddress:
            DeliveryAddress.city +
            ", " +
            DeliveryAddress.street +
            ", " +
            DeliveryAddress.country +
            ", " +
            DeliveryAddress.postal,
          totalCost: shop.cart
            .map((I: any) => {
              return I.item.price * I.qty;
            })
            .reduce((T: number, I: number) => {
              return T + I;
            }),
        }),
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(clearShop());
        window.location.href = `${process.env.REACT_APP_FETCHURL}/order/checkout-session/${data._id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    setItemsCart(shop.cart);
    console.log(shop.cart);
  }, []);
  return (
    <>
      <div className="cartCard">
        <h4 className="text-muted text-center">Cart</h4>
        {shop.cart.length > 0 ? (
          shop.cart.map((I: any, index: number) => (
            <Grid container className="itemCart" key={I.item._id + "osos"}>
              <Grid item xs={12} md={6} className="text-center p-2">
                <img src={I.item.image} style={imgStyle} alt="" />
              </Grid>
              <Grid item xs={12} md={6} className="p-2">
                <div className="d-flex flex-column">
                  <h5 className="text-muted">{I.item.title}</h5>
                  <p>{I.item.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-baseline">
                      <p className=" m-0 mr-1">quantity: </p>
                      <h5 className="text-muted m-0"> {I.qty}</h5>
                    </div>

                    <div className="quatnityPick ">
                      <IconButton
                        onClick={() => {
                          if (I.qty > 1) {
                            dispatch(
                              setItemQty(
                                { item: I.item, qty: I.qty - 1 },
                                index,
                              ),
                            );
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (I.qty < 10) {
                            dispatch(
                              setItemQty(
                                { item: I.item, qty: I.qty + 1 },
                                index,
                              ),
                            );
                          }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                  <br />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-baseline">
                      <p>Price:</p>
                      <h5 className="text-muted ml-2">{I.item.price} £</h5>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <p>Total item price:</p>
                      <h5 className="text-muted ml-2">
                        {I.item.price * I.qty} £
                      </h5>
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex justify-content-center">
                    <IconButton color="warning">
                      <DeleteIcon
                        fontSize="medium"
                        onClick={() => dispatch(setDelItem(index))}
                      />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            </Grid>
          ))
        ) : (
          <h4 className="text-center"> Your cart is empty!</h4>
        )}
        {shop.cart.length > 0 && (
          <form
            onSubmit={(e) => createOrder(e)}
            className="d-flex flex-column p-2"
          >
            <h6 className="text-muted text-center">Delivery address</h6>
            <div className="d-flex justify-content-between flex-wrap">
              <TextField
                required
                variant="standard"
                label="House № & street"
                value={DeliveryAddress.street}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...DeliveryAddress,
                    street: e.target.value,
                  })
                }
              />
              <TextField
                required
                variant="standard"
                label="City"
                value={DeliveryAddress.city}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...DeliveryAddress,
                    city: e.target.value,
                  })
                }
              />
              <TextField
                required
                variant="standard"
                label="Country"
                value={DeliveryAddress.country}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...DeliveryAddress,
                    country: e.target.value,
                  })
                }
              />
              <TextField
                required
                variant="standard"
                label="Postal code"
                value={DeliveryAddress.postal}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...DeliveryAddress,
                    postal: e.target.value,
                  })
                }
              />
            </div>
            <Divider className="my-3" />
            <div className="d-flex justify-content-between px-5">
              <div className="d-flex align-items-baseline">
                <p className="m-0">Total amount:</p>
                <h5 className="m-0 text-muted ml-2">
                  {shop.cart
                    .map((I: any) => {
                      return I.item.price * I.qty;
                    })
                    .reduce((T: number, I: number) => {
                      return T + I;
                    })}{" "}
                  £
                </h5>
              </div>
              <div>
                <Button type="submit" color="info">
                  Create order & Pay
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
      <br />
    </>
  );
}

export default Cart;
