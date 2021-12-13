import { Button, Dialog, Divider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/action";

function UsCreatBtn() {
  const [ShowModal, setShowModal] = useState(false);
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const dispatch = useDispatch();
  //
  const changeUserType = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/creator/${
        user.creator ? "beUser" : "beCreator"
      }`;
      const res = await fetch(url, {
        method: user.creator ? "DELETE" : "POST",
        body: JSON.stringify({ creatorType: "Photographer" }),
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(setUser(data));
        setShowModal(false);
      } else {
        console.log(res);
        alert("Error");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => setShowModal(true)}
        color={user.creator ? "success" : "primary"}
      >
        {user.creator ? "Change to User" : "Change to Artist"}
      </Button>
      <Dialog open={ShowModal} keepMounted onClose={() => setShowModal(false)}>
        <div className="confirmUserType">
          <h6 className="text-center text-muted">
            Are you sure you want to be {user.creator ? "User" : "Artist"}
          </h6>
          <p>
            {user.creator
              ? "All your Artist data (bookings, store items) will be deleted!"
              : ""}
          </p>
          <Divider />
          <div className="d-flex justify-content-between">
            <Button onClick={() => setShowModal(false)} color="success">
              Cancel
            </Button>
            <Button onClick={changeUserType} color="warning">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default UsCreatBtn;
