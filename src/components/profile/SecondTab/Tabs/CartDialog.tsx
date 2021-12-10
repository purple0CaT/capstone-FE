import { Button, Dialog } from "@mui/material";
import React, { useState } from "react";

function CartDialog({ I }: any) {
  const [DialogWindow, setDialogWindow] = useState(false);
  return (
    <>
      <Button
        color="success"
        disabled={I.quantity === 0 ? true : false}
        onClick={() => setDialogWindow(true)}
      >
        Add to cart
      </Button>
      <Dialog
        open={DialogWindow}
        keepMounted
        onClose={() => setDialogWindow(false)}
      >
        {I.title}
      </Dialog>
    </>
  );
}

export default CartDialog;
