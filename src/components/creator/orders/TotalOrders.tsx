import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

function TotalOrders({ reFetch, FetchedCreator }: any) {
  const [SortOrders, setSortOrders] = useState([]);
  //
  useEffect(() => {
    if (FetchedCreator?.shop.orders.length > 0) {
      const sorted = FetchedCreator.shop.orders.sort(function (a: any, b: any) {
        let st: any = new Date(a.createdAt);
        let en: any = new Date(b.createdAt);
        return en - st;
      });
      setSortOrders(sorted);
    }
  }, [FetchedCreator]);
  return (
    <>
      {SortOrders.length > 0 &&
        SortOrders.map(
          (Order: any) =>
            Order.items.some((itm: any) => itm.item.completed === false) && (
              <SingleOrder
                Order={Order}
                reFetch={reFetch}
                key={Order._id + "zvffcc"}
              />
            ),
        )}
      <hr />
      <h5 className="text-muted">Confirmed</h5>
      <hr />
      {SortOrders.length > 0 &&
        SortOrders.map(
          (Order: any) =>
            !Order.items.some((itm: any) => itm.item.completed === false) && (
              <SingleOrder
                Order={Order}
                reFetch={reFetch}
                key={Order._id + "zvffcc"}
              />
            ),
        )}
    </>
  );
}

export default TotalOrders;
