import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setChats } from "../../../../redux/actions/action";
import LoadingButton from "@mui/lab/LoadingButton";

function DeleteChat({ closeSettings }: any) {
  const [DeleteModal, setDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const tokens = useSelector((state: any) => state.tokens);
  const chat = useSelector((state: any) => state.chat);
  const dispatch = useDispatch();
  //
  const handleClose = () => {
    setDeleteModal(false);
  };
  //
  const deleteChat = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/chat/deleteChat/${chat.activeChat._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setChats(data.allChats));
        dispatch(setActiveChat(data.chat));
        closeSettings();
        setLoading(false);
        setDeleteModal(false);
      } else {
        console.log(res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="mt-3 mx-auto">
      <h5 onClick={() => setDeleteModal(true)} className="btn btn-danger">
        DELETE CHAT
      </h5>
      <Dialog open={DeleteModal} onClose={handleClose}>
        {" "}
        <DialogTitle>Are you shure you want to delete these chat?</DialogTitle>
        <DialogActions className="w-100">
          <LoadingButton
            loading={Loading}
            color="warning"
            onClick={() => deleteChat()}
          >
            Yes
          </LoadingButton>
          <Button color="success" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteChat;
