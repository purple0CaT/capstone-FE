import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleOrder from "./SimpleOrder";

function SearchOrder({ Order, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);

  const [SearchById, setSearchById] = useState("");
  const [FindedOrder, setFindedOrder] = useState([]);
  //
  const confirmDelivery = async (delCode: string, orderId: string) => {};
  //
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
  //
  useEffect(() => {
    if (SearchById.length > 3) {
      console.log(Order);
      if (Order) {
        const orders = Order.filter((Or: any) => Or._id.includes(SearchById));
        console.log(orders);
        if (orders.length > 0) {
          setFindedOrder(orders);
        }
      }
    }
    if (SearchById.length === 0) {
      setFindedOrder([]);
    }
  }, [SearchById]);
  //
  return (
    <>
      <div className="d-flex flex-column">
        <TextField
          className="ml-auto"
          value={SearchById}
          id="search-id-order"
          label="Search by ID"
          size="small"
          variant="standard"
          onChange={(e: any) => setSearchById(e.target.value)}
        />
        <div className="w-100 d-flex flex-column">
          {FindedOrder.length > 0 &&
            FindedOrder.map((Order: any) => (
              <>
                <hr className="w-100" />
                <div className="findedOrder">
                  <span className="d-flex justify-content-center align-items-baseline">
                    id:
                    <h5 className="text-muted m-0 ml-2">{Order._id}</h5>
                  </span>
                  <SimpleOrder Order={Order} reFetch={reFetch} />
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchOrder;
