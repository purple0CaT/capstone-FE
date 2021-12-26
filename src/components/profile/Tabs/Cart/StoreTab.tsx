import { Divider } from "@mui/material";
import React from "react";
import CartDialog from "./CartDialog";
//
function StoreTab({ creator, Posts }: any) {
  return (
    <div className="storeTab">
      {creator.shop.items.map((I: any) => (
        <div key={I._id} className="storeItem">
          <div className="d-flex justify-content-center">
            <img src={I.image} alt="" style={{ maxWidth: "13rem" }} />
          </div>
          <div className="p-1 d-flex flex-column">
            <h6
              className="font-weight-light"
              style={{ wordWrap: "break-word" }}
            >
              {I.title}
            </h6>
            <p>{I.description}</p>
            {/*  */}
          </div>
          <div className="d-flex flex-column mt-auto">
            <div className="d-flex justify-content-between px-1">
              <h6>
                <small>price: </small>
                {I.price} £
              </h6>
              <h6>
                <small>quantity: </small>
                {I.quantity}
              </h6>
            </div>
            <Divider />
            <CartDialog I={I} allPosts={Posts} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StoreTab;
