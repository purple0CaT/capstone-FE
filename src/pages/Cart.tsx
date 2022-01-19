import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reduxItem, ReduxStore } from "../types/reduxStore";
import CartForm from "../components/cart/CartForm";
import CartItem from "../components/cart/CartItem";
import "../components/cart/style.css";

//
function Cart() {
  const history = useHistory();
  const { user, shop } = useSelector((state: ReduxStore) => state);

  //
  useEffect(() => {
    if (user._id === "") {
      history.push("/login");
    }
  }, []);
  return (
    <>
      <div className="cartCard">
        <h4 className="text-muted text-center">Cart</h4>
        {shop.cart.length > 0 ? (
          shop.cart.map((I: reduxItem, index: number) => (
            <CartItem key={I.item._id + "osos"} I={I} index={index} />
          ))
        ) : (
          <h4 className="text-center"> Your cart is empty!</h4>
        )}
        {shop.cart.length > 0 && <CartForm />}
      </div>
      <br />
    </>
  );
}

export default Cart;
