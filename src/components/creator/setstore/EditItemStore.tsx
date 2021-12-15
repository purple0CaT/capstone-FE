import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoadingButton } from "@mui/lab";
import { Dialog, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//
function EditItemStore({ itemInfo, reFetch }: any) {
  const tokens = useSelector((state: any) => state.tokens);
  const [Loading, setLoading] = useState(false);
  const [ShowEdit, setShowEdit] = useState(false);
  const [ItemForm, setItemForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [ItemImage, setItemImage]: any = useState();
  const [ImgPrev, setImgPrev]: any = useState();
  // IMAGE CONVERTER
  const imageHandler = (e: any) => {
    const imagePreview: any = URL.createObjectURL(e.target.files[0]);
    setItemImage(e.target.files[0]);
    setImgPrev(imagePreview);
  };
  // UPDATE
  const updateItem = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", ItemForm.title);
    formData.append("description", ItemForm.description);
    formData.append("price", ItemForm.price);
    formData.append("quantity", ItemForm.quantity);
    formData.append("media", ItemImage!);
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/shop/item/${itemInfo._id}`;
      const res = await fetch(url, {
        method: "PUT",
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
  useEffect(() => {
    setItemForm({
      title: itemInfo.title,
      description: itemInfo.description,
      price: itemInfo.price,
      quantity: itemInfo.quantity,
    });
    setImgPrev(itemInfo.image);
  }, []);
  return (
    <>
      <IconButton onClick={() => setShowEdit(true)}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={ShowEdit}
        onClose={() => setShowEdit(false)}
        sx={{
          backdropFilter: "blur(2px)",
        }}
      >
        <form
          className="d-flex flex-column creatorCard p-4"
          onSubmit={updateItem}
          style={{ backgroundColor: "white" }}
        >
          <h5 className="text-center text-muted">Add new item</h5>
          <div className="w-100 d-flex justify-content-center">
            {ImgPrev ? (
              <div className="d-flex justify-content-center position-relative">
                <img
                  src={ImgPrev}
                  alt=""
                  style={{ maxWidth: "70%", maxHeight: "30em" }}
                  className="text-center"
                />
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
                  id="updateItemImg"
                  className="d-none"
                  type="file"
                  accept="image/*"
                  required
                  style={{ display: "none" }}
                  onChange={imageHandler}
                />
                <label htmlFor="updateItemImg">
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
            onChange={(e) =>
              setItemForm({ ...ItemForm, title: e.target.value })
            }
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
            onChange={(e) =>
              setItemForm({ ...ItemForm, price: e.target.value })
            }
          />

          <br />
          <LoadingButton
            type="submit"
            variant="outlined"
            color="info"
            loading={Loading}
          >
            Update
          </LoadingButton>
        </form>
      </Dialog>
    </>
  );
}

export default EditItemStore;
