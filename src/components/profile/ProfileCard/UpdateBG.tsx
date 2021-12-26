import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoadingButton } from "@mui/lab";
import { Dialog, Divider, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UpdateBG({ user, reFetch }: any) {
  const matches = useMediaQuery("(min-width:599px)");
  const tokens = useSelector((state: any) => state.tokens);
  const myUser = useSelector((state: any) => state.user);
  const [MediaImg, setMediaImg]: any = useState();
  const [MediaPrew, setMediaPrew]: any = useState();
  const [ShowBGUpdate, setShowBGUpdate] = useState(false);
  const [Loading, setLoading] = useState(false);
  //
  const fetchUploadBG = async (e: any) => {
    // e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("media", MediaImg!);
      const url = `${process.env.REACT_APP_FETCHURL}/user/background`;
      const res = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        setLoading(false);
        setShowBGUpdate(false);
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
  return (
    <>
      <img
        onClick={() => {
          {
            if (myUser._id === user._id) {
              setShowBGUpdate(true);
            }
          }
        }}
        src={user.background}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: matches ? "4/3" : "16/5",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />
      <Dialog
        open={ShowBGUpdate}
        keepMounted
        onClose={() => setShowBGUpdate(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="d-flex flex-column p-3" style={{ minWidth: "18rem" }}>
          <h5 className="text-muted text-center">Update background</h5>
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
              <div className="delete-img-button" onClick={() => removeImg()}>
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
                htmlFor="UpdateBG"
                className="h-100"
                style={{ cursor: "pointer" }}
              >
                <AddPhotoAlternateIcon color="primary" fontSize="large" />
              </label>
            )}
            <input
              type="file"
              className="d-none"
              id="UpdateBG"
              onChange={(e: any) => setMediaImg(e.target.files[0])}
            />
          </div>
          <Divider />
          <LoadingButton
            color="info"
            disabled={MediaImg ? false : true}
            loading={Loading}
            onClick={fetchUploadBG}
          >
            Upload
          </LoadingButton>
        </div>
      </Dialog>
    </>
  );
}

export default UpdateBG;
