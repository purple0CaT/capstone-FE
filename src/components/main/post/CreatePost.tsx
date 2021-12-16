import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
//
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
//
function CreatePost({ reFetch }: any) {
  const [Open, setOpen] = useState(false);
  const [NewPost, setNewPost] = useState({ text: "", location: "" });
  const [MediaFiles, setMediaFiles] = useState([]);
  const [ImgPrev, setImgPrev] = useState([]);
  const [Loading, setLoading] = useState(false);
  const tokens = useSelector((state: any) => state.tokens);
  // CREATE POST
  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", NewPost.text);
    formData.append("location", NewPost.location);
    formData.append("media", MediaFiles[0]);
    //
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/post`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (res.ok) {
        // const data = await res.json();
        reFetch();
        setLoading(false);
        setOpen(false);
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
  const imageHandler = (e: any) => {
    const images = e.target.files;
    const imageArray: any = Array.from(images);
    const imagePreview = imageArray.map((i: any) => URL.createObjectURL(i));
    setMediaFiles(imageArray);
    setImgPrev(imagePreview);
  };
  //
  const handleClose = () => {
    setOpen(!Open);
  };
  //
  const removeImg = (i: number) => {
    const delImg = [...ImgPrev];
    delImg.splice(i, 1);
    setImgPrev(delImg);
    //
    const imgFile = [...MediaFiles];
    imgFile.splice(i, 1);
    setMediaFiles(imgFile);
  };
  //
  // useEffect(() => { }, []);
  // =====================
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center post-create"
        onClick={handleClose}
        style={{ cursor: "pointer" }}
      >
        <h6 className="text-muted m-0">Create post</h6>
      </div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={Open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Create post</DialogTitle>
        <form onSubmit={createPost}>
          <DialogContent dividers>
            <TextField
              required
              autoFocus
              margin="dense"
              id="text"
              label="Text"
              type="text"
              fullWidth
              variant="standard"
              value={NewPost.text}
              onChange={(e: any) =>
                setNewPost({ ...NewPost, text: e.target.value })
              }
            />

            <TextField
              margin="dense"
              id="heo"
              label="Heolocation"
              type="text"
              fullWidth
              variant="standard"
              value={NewPost.location}
              onChange={(e: any) =>
                setNewPost({ ...NewPost, location: e.target.value })
              }
            />
            <div
              className="w-100 position-relative"
              style={{ overflow: "hidden" }}
            >
              <div className="upload-images mt-3">
                {ImgPrev.length > 0 &&
                  ImgPrev.map((Img, i) => (
                    <div
                      className="d-flex flex-column position-relative"
                      style={{ width: "20rem" }}
                    >
                      <img
                        src={Img}
                        alt=""
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <div
                        className="delete-img-button"
                        onClick={() => removeImg(i)}
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
                  ))}
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center mt-3">
              <input
                id="raised-button-file"
                onChange={(e: any) => imageHandler(e)}
                accept="image/*"
                required
                style={{ display: "none" }}
                type="file"
              />
              <label htmlFor="raised-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                </IconButton>
              </label>
            </div>
          </DialogContent>
          <DialogActions className="d-flex justify-content-center">
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton type="submit" loading={Loading} variant="outlined">
              Post
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CreatePost;
