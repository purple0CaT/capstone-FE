import { Divider, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CreateItem from "./CreateItem";
import DeleteItem from "./DeleteItem";
import EditItemStore from "./EditItemStore";

function StoreSet({ FetchedCreator, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className="d-flex flex-column p-1 py-2 creatorCard">
            <br />
            <h5 className="text-muted text-center">Items in my store</h5>
            <div
              className="d-flex p-1"
              style={{
                overflowX: "scroll",
                gap: "1rem",
                borderRight: "1px solid Gainsboro",
                borderLeft: "1px solid Gainsboro",
              }}
            >
              {FetchedCreator?.shop &&
                FetchedCreator.shop.items.map((I: any) => (
                  <div
                    className="creatorItemCard"
                    style={{ minWidth: "10rem" }}
                    key={I._id + "lsls"}
                  >
                    <img
                      src={I.image}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                        aspectRatio: "1/1",
                      }}
                      alt=""
                    />
                    <h6 className="m-0 text-muted">{I.title}</h6>
                    <small>{I.description}</small>
                    <Divider className="w-100 mt-auto" />
                    <small>
                      Quantity:{" "}
                      <span className="font-weight-bold">{I.quantity}</span>
                    </small>
                    <small>
                      Price:{" "}
                      <span className="font-weight-bold">{I.price}£</span>
                    </small>
                    {I.type === "user" && (
                      <div className="d-flex justify-content-between w-100">
                        <DeleteItem item={I} reFetch={reFetch} />
                        <EditItemStore itemInfo={I} reFetch={reFetch} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <CreateItem reFetch={reFetch} />
        </Grid>
      </Grid>
    </div>
  );
}

export default StoreSet;
