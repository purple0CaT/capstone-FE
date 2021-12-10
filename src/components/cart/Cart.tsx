import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Divider, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDelItem, setItemQty } from "../../redux/actions/action";
import "./style.css";
// Style
const imgStyle = {
  maxWidth: "100%",
  maxHight: "10rem",
  borderRadius: "10px",
  boxShadow: "0 1px 2px grey",
};
//
function Cart() {
  const shop = useSelector((state: any) => state.shop);
  const dispatch = useDispatch();
  const [ItemsCart, setItemsCart] = useState([{ item: {}, qty: 0 }]);
  //
  useEffect(() => {
    setItemsCart(shop.cart);
  }, []);
  return (
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
                            setItemQty({ item: I.item, qty: I.qty - 1 }, index),
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
                            setItemQty({ item: I.item, qty: I.qty + 1 }, index),
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
    </div>
  );
}

export default Cart;
