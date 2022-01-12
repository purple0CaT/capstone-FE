import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { itemRefetch } from "../creatorInterface";

function DeleteItem({ item, reFetch }: itemRefetch) {
  const tokens = useSelector((state: any) => state.tokens);
  const [ShowDelete, setShowDelete] = useState(false);
  //
  const deleteItem = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/shop/item/${item._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        reFetch();
      } else {
        alert("Error");
        console.log("Error");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  return (
    <>
      <IconButton color="warning" onClick={() => setShowDelete(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={ShowDelete} onClose={() => setShowDelete(false)}>
        <div className="p-3 d-flex flex-column w-100">
          <h5 className="text-center text-muted">Delete this item?</h5>
          <hr className="w-100" />
          <div className="d-flex justify-content-between">
            <Button onClick={() => setShowDelete(false)} color="info">
              Cancel
            </Button>
            <Button color="warning" onClick={deleteItem}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteItem;
