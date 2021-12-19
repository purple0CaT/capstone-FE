import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SimpleOrder from "./SimpleOrder";

function SearchOrder({ Order, reFetch }: any) {
  const [SearchById, setSearchById] = useState("");
  const [FindedOrder, setFindedOrder] = useState([]);
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
                    <h6 className="text-muted m-0 ml-2">{Order._id}</h6>
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
