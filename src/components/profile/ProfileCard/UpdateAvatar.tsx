import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoadingButton } from "@mui/lab";
import { Avatar, Dialog, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../types/reduxStore";
import { ProfUserFetchType } from "../ProfileInterface";

function UpdateAvatar({ fetchedUser, reFetch }: ProfUserFetchType) {
  const { tokens, user } = useSelector((state: ReduxStore) => state);
  const [MediaImg, setMediaImg]: any = useState();
  const [MediaPrew, setMediaPrew]: any = useState();
  const [ShowAvatarUpdate, setShowAvatarUpdate] = useState(false);
  const [Loading, setLoading] = useState(false);
  //
  const fetchUploadAvatar = async (e: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("media", MediaImg!);
      const url = `${process.env.REACT_APP_FETCHURL}/user/avatar`;
      const res = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        setLoading(false);
        setShowAvatarUpdate(false);
        reFetch();
      } else {
        setLoading(false);
        console.log(res);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //
  const removeImg = () => {
    setMediaImg();
    setMediaPrew();
  };
  //
  useEffect(() => {
    if (MediaImg) {
      const prew: any = URL.createObjectURL(MediaImg);
      setMediaPrew(prew);
    } else {
      setMediaImg();
      setMediaPrew();
    }
  }, [MediaImg]);
  //
  return (
    <>
      {fetchedUser && (
        <>
          <Avatar
            alt={fetchedUser.firstname + " " + fetchedUser.lastname}
            src={fetchedUser.avatar}
            sx={{ width: "100%", height: "100%", boxShadow: "0 0 8px grey" }}
            onClick={() => {
              if (user._id === fetchedUser._id) {
                setShowAvatarUpdate(true);
              }
            }}
            style={{ cursor: "pointer" }}
          />
          <Dialog
            open={ShowAvatarUpdate}
            keepMounted
            onClose={() => setShowAvatarUpdate(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <div
              className="d-flex flex-column p-3"
              style={{ minWidth: "18rem" }}
            >
              <h5 className="text-muted text-center">Update avatar</h5>
              {MediaPrew && (
                <div className="d-flex justify-content-center position-relative">
                  <img
                    src={MediaPrew}
                    style={{
                      //   aspectRatio: "1/1",
                      objectFit: "cover",
                      maxWidth: "100%",
                    }}
                  />
                  <div
                    className="delete-img-button"
                    onClick={() => removeImg()}
                  >
                    <IconButton
                      className="p-1"
                      color="warning"
                      aria-label="upload picture"
                      component="span"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </div>
                </div>
              )}
              <Divider />
              <div className="text-center">
                {!MediaPrew && (
                  <label
                    htmlFor="UpdateAvatar"
                    className="h-100"
                    style={{ cursor: "pointer" }}
                  >
                    <AddPhotoAlternateIcon color="primary" fontSize="large" />
                  </label>
                )}
                <input
                  type="file"
                  className="d-none"
                  id="UpdateAvatar"
                  onChange={(e: any) => setMediaImg(e.target.files[0])}
                />
              </div>
              <Divider />
              <LoadingButton
                color="info"
                disabled={MediaImg ? false : true}
                loading={Loading}
                onClick={fetchUploadAvatar}
              >
                Upload
              </LoadingButton>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}

export default UpdateAvatar;
