import SettingsIcon from "@mui/icons-material/Settings";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Divider, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function EditProfile({ userInfo, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [OpenInfoUpdate, setOpenInfoUpdate] = useState(false);
  const [FormInfo, setFormInfo] = useState(userInfo);
  const [Loading, setLoading] = useState(false);
  //
  const handleInfoUpdate = () => {
    setOpenInfoUpdate(!OpenInfoUpdate);
  };
  const updateUserInfo = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user/single/${user._id}`;
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(FormInfo),
        headers: {
          Authorization: tokens.accessToken,
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        setOpenInfoUpdate(false);
        reFetch();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <IconButton onClick={handleInfoUpdate}>
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={OpenInfoUpdate}
        //   TransitionComponent={Transition}
        keepMounted
        onClose={handleInfoUpdate}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(2px)",
        }}
      >
        {FormInfo && (
          <form
            onSubmit={updateUserInfo}
            className="d-flex flex-column px-3 py-1"
          >
            <TextField
              className="mr-2"
              required
              id="standard-required"
              label="NickName"
              margin="dense"
              variant="standard"
              value={FormInfo.nickname}
              onChange={(e) =>
                setFormInfo({ ...FormInfo, nickname: e.target.value })
              }
            />
            <div className="d-flex" style={{ gap: "1rem" }}>
              <TextField
                className="mr-2"
                required
                id="standard-required"
                label="Firstname"
                margin="dense"
                variant="standard"
                value={FormInfo.firstname}
                onChange={(e) =>
                  setFormInfo({ ...FormInfo, firstname: e.target.value })
                }
              />
              <TextField
                className="mr-2"
                required
                id="standard-required"
                label="Lastname"
                margin="dense"
                variant="standard"
                value={FormInfo.lastname}
                onChange={(e) =>
                  setFormInfo({ ...FormInfo, lastname: e.target.value })
                }
              />
            </div>
            <br />
            <Divider />
            {/* {Loading && <LinearProgress />} */}
            <div className="d-flex justify-content-between px-3">
              <Button onClick={handleInfoUpdate}>Close</Button>
              <LoadingButton type="submit" loading={Loading} color="success">
                Update
              </LoadingButton>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}

export default EditProfile;
