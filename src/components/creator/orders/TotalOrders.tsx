import React from "react";
import SingleOrder from "./SingleOrder";

function TotalOrders({ reFetch, FetchedCreator }: any) {
  return (
    <>
      {FetchedCreator &&
        FetchedCreator.shop.orders.map((Order: any) => (
          <SingleOrder
            Order={Order}
            reFetch={reFetch}
            key={Order._id + "zvffcc"}
          />
        ))}
    </>
  );
}

export default TotalOrders;
