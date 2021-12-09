import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
//
function StoreTab({ creator }: any) {
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
            <p>{I.descrition}</p>
            {/*  */}
            <div className="d-flex justify-content-between mt-auto">
              <h6>
                <small>price: </small>
                {I.price}
              </h6>
              <h6>
                <small>quantity: </small>
                {I.quantity}
              </h6>
            </div>
            <Divider />
            <Button color="success" disabled={I.quantity === 0 ? true : false}>
              Buy
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StoreTab;
