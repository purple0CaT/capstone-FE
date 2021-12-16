import SettingsIcon from "@mui/icons-material/Settings";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Divider, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

function EditProfile({ userInfo, reFetch }: any) {
  const user = useSelector((state: any) => state.user);
  const tokens = useSelector((state: any) => state.tokens);
  const [OpenInfoUpdate, setOpenInfoUpdate] = useState(false);
  const [FormInfo, setFormInfo]: any = useState();
  const [Loading, setLoading] = useState(false);
  const [NewLink, setNewLink] = useState({ title: "", link: "" });
  //
  const handleInfoUpdate = () => {
    setOpenInfoUpdate(!OpenInfoUpdate);
  };
  //
  const removeLink = (i: number) => {
    if (FormInfo) {
      const updateForm = FormInfo.links.slice(i, 1);
      if (!updateForm.links) {
        updateForm.links = [];
      }
      setFormInfo(updateForm);
    }
  };
  const pushToForm = () => {
    if (FormInfo) {
      const updateForm = FormInfo;
      updateForm.links.push(NewLink);
      setFormInfo(updateForm);
    }
  };
  //
  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
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
  useEffect(() => {
    setFormInfo(userInfo);
  }, []);
  return (
    <>
      <IconButton onClick={handleInfoUpdate}>
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={OpenInfoUpdate}
        //   TransitionComponent={Transition}
        // keepMounted
        onClose={handleInfoUpdate}
      >
        <h6 className="text-center mt-3">Update profile</h6>
        {FormInfo && (
          <form
            onSubmit={updateUserInfo}
            className="d-flex flex-column px-5 py-2"
          >
            <TextField
              className="mr-2"
              required
              id="standard-required"
              // label="NickName"
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
            <TextField
              className="mr-2"
              required
              id="standard-required"
              label="Bio"
              margin="dense"
              variant="standard"
              value={FormInfo.bio}
              onChange={(e) =>
                setFormInfo({ ...FormInfo, bio: e.target.value })
              }
            />
            <br />
            {/* <div className="d-flex flex-column align-items-center mt-2">
              <h5 className="text-muted mr-auto">Links:</h5>
              {FormInfo.links?.length > 0 &&
                FormInfo.links.map((Li: any, i: number) => (
                  <div
                    key={Li.link + i + "a4"}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span className="d-flex align-items-baseline">
                      {Li.title}:{" "}
                      <h6 className="m-0 ml-2 font-weight-light">{Li.link}</h6>
                    </span>
                    <IconButton color="warning" onClick={() => removeLink(i)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
            </div> */}
            {/* <div className="d-flex flex-column align-items-center">
              <div>
                <TextField
                  className="mr-2"
                  required
                  id="newLink"
                  label="New Title"
                  margin="dense"
                  variant="standard"
                  value={NewLink.title}
                  onChange={(e: any) =>
                    setNewLink({ ...NewLink, title: e.target.value })
                  }
                />
                <TextField
                  className="mr-2"
                  required
                  id="newLink"
                  label="New Link"
                  margin="dense"
                  variant="standard"
                  value={NewLink.link}
                  onChange={(e: any) =>
                    setNewLink({ ...NewLink, link: e.target.value })
                  }
                />
              </div>
              <Button
                disabled={
                  NewLink.link.length > 0 && NewLink.title.length > 0
                    ? false
                    : true
                }
                onClick={() => pushToForm()}
              >
                Add to links
              </Button>
            </div> */}
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
