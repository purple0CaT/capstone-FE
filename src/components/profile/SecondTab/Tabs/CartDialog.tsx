import { Button, Dialog, Divider, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/actions/action";
//
function CartDialog({ I, allPosts }: any) {
  const user = useSelector((state: any) => state.user);
  const [DialogWindow, setDialogWindow] = useState(false);
  const [ItemQty, setItemQty] = useState(1);
  const [PickedItem, setPickedItem]: any = useState({ image: "" });
  const dispatch = useDispatch();
  //   console.log(I);
  return (
    <>
      <Button
        color="success"
        disabled={I.quantity === 0 ? true : false || I.sellerId === user._id}
        onClick={() => setDialogWindow(true)}
      >
        Add to cart
      </Button>
      <Dialog
        open={DialogWindow}
        keepMounted
        onClose={() => setDialogWindow(false)}
      >
        <div
          className="p-3 d-flex flex-column justify-content-center"
          style={{ minWidth: "17rem", maxWidth: "30rem" }}
        >
          <h4 className="text-center text-muted">{I.title}</h4>
          <div className="text-center">
            <img
              src={PickedItem.image || I.image}
              alt=""
              style={{
                // maxWidth: "17rem",
                width: "100%",
                aspectRatio: I.imgRatio,
                objectFit: "cover",
              }}
            />
          </div>
          <small style={{ wordWrap: "break-word" }}>{I.description}</small>
          {/* IMAGE PICKER */}
          {I.type === "default" && (
            <div className="cartImgPicker">
              {allPosts &&
                allPosts.map((P: any) => (
                  <div
                    key={P._id + P.media}
                    style={{ cursor: "pointer" }}
                    onClick={() => setPickedItem({ ...I, image: P.media })}
                  >
                    <img
                      src={P.media}
                      alt=""
                      style={{
                        width: "10rem",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
          <div className="d-flex justify-content-center">
            <div className="quatnityPick ">
              <IconButton
                onClick={() => {
                  if (ItemQty > 1) {
                    setItemQty(ItemQty - 1);
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Input
                value={ItemQty}
                type="number"
                inputProps={{ min: 1, max: I.quantity }}
                onChange={(e: any) => setItemQty(e.target.value)}
                style={{ width: "3rem", textAlign: "center" }}
              />
              <IconButton
                onClick={() => {
                  if (ItemQty < 10) {
                    setItemQty(ItemQty + 1);
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <br />
          <Divider />
          <div className="d-flex justify-content-between">
            <Button onClick={() => setDialogWindow(false)}>Close</Button>
            <Button
              color="success"
              onClick={() =>
                dispatch(addToCart({ item: PickedItem, qty: ItemQty }))
              }
            >
              Add to cart
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default CartDialog;
