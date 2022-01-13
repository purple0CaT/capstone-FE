import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Divider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/action";
import { ReduxStore } from "../../types/reduxStore";

function DeleteOrder({ id }: any) {
  const dispatch = useDispatch();
  const { user, tokens } = useSelector((state: ReduxStore) => state);
  const [ShowConfirmModal, setShowConfirmModal] = useState(false);
  //
  const cancelOrder = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/order/cancelorder/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        fetchProfile();
        setShowConfirmModal(false);
      } else {
        setShowConfirmModal(false);
        alert("Error");
        console.log(res);
      }
    } catch (error) {
      setShowConfirmModal(false);
      console.log(error);
    }
  };
  //   FETCH USER
  const fetchProfile = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${user._id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();

        dispatch(setUser(data.user));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setShowConfirmModal(true)}
        color="warning"
      >
        Cancel Order
      </Button>
      <Dialog
        open={ShowConfirmModal}
        keepMounted
        onClose={() => setShowConfirmModal(false)}
      >
        <div
          className="d-flex flex-column"
          style={{ minWidth: "17rem", padding: "2em" }}
        >
          <h5 className="text-muted text-center">Cancel order?</h5>
          <Divider />
          <br />
          <div className="d-flex justify-content-between">
            <Button onClick={() => setShowConfirmModal(false)}>Close</Button>
            <LoadingButton onClick={cancelOrder} color="warning">
              Cancel order
            </LoadingButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteOrder;
