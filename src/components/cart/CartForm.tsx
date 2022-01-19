import { Divider, TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearShop } from "../../redux/actions/action";
import { ReduxStore } from "../../types/reduxStore";

//
function CartForm() {
  const { shop, tokens } = useSelector((state: ReduxStore) => state);
  const dispatch = useDispatch();
  //
  const [DeliveryAddress, setDeliveryAddress] = useState({
    street: "",
    postal: "",
    city: "",
    country: "",
  });
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
  return (
    <form onSubmit={(e) => createOrder(e)} className="d-flex flex-column p-2">
      <h6 className="text-muted text-center">Delivery address</h6>
      <section className="d-flex justify-content-between flex-wrap">
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
      </section>
      <Divider className="my-3" />
      <section className="d-flex justify-content-between px-5">
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
      </section>
    </form>
  );
}

export default CartForm;
