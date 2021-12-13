import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CreateItem({ reFetch }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  const [ItemForm, setItemForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [ItemImage, setItemImage]: any = useState();
  const [ImgPrev, setImgPrev]: any = useState();
  //
  const imageHandler = (e: any) => {
    const imagePreview: any = URL.createObjectURL(e.target.files[0]);
    setItemImage(e.target.files[0]);
    setImgPrev(imagePreview);
  };
  //
  const createItem = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", ItemForm.title);
    formData.append("description", ItemForm.description);
    formData.append("price", ItemForm.price);
    formData.append("quantity", ItemForm.quantity);
    formData.append("media", ItemImage!);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/shop/addItem`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        reFetch();
      } else {
        setLoading(false);
        alert("Error");
        console.log(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex flex-column creatorCard" onSubmit={createItem} style={{ backgroundColor: "white" }}>
        <h5 className="text-center text-muted">Add new item</h5>
        <div className="w-100 d-flex justify-content-center">
          {ImgPrev ? (
            <div className="position-relative">
              <img src={ImgPrev} alt="" style={{ width: "100%" }} />
              <div
                className="delete-img-button"
                onClick={() => {
                  setItemImage();
                  setImgPrev();
                }}
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
          ) : (
            <>
              <input
                id="createItemImg"
                className="d-none"
                type="file"
                accept="image/*"
                required
                style={{ display: "none" }}
                onChange={imageHandler}
              />
              <label htmlFor="createItemImg">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                </IconButton>
              </label>
            </>
          )}
        </div>
        <TextField
          required
          id="standard-required"
          label="Title"
          margin="dense"
          variant="standard"
          value={ItemForm.title}
          onChange={(e) => setItemForm({ ...ItemForm, title: e.target.value })}
        />
        <TextField
          required
          id="standard-required"
          label="Descrition"
          margin="dense"
          variant="standard"
          value={ItemForm.description}
          onChange={(e) =>
            setItemForm({ ...ItemForm, description: e.target.value })
          }
        />
        <TextField
          required
          type="number"
          id="standard-required"
          label="Quantity"
          margin="dense"
          variant="standard"
          value={ItemForm.quantity}
          onChange={(e) =>
            setItemForm({ ...ItemForm, quantity: e.target.value })
          }
        />
        <TextField
          required
          type="number"
          id="standard-required"
          label="Price"
          margin="dense"
          variant="standard"
          value={ItemForm.price}
          onChange={(e) => setItemForm({ ...ItemForm, price: e.target.value })}
        />

        <br />
        <LoadingButton
          type="submit"
          variant="outlined"
          color="info"
          loading={Loading}
        >
          Create
        </LoadingButton>
      </form>
    </div>
  );
}

export default CreateItem;
