import { Divider, Grid, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDelItem, setItemQty } from "../../redux/actions/action";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
// Style
const imgStyle = {
  maxWidth: "100%",
  maxHeight: "15rem",
  borderRadius: "10px",
  boxShadow: "0 3px 6px grey",
};
//
interface ItemCartImport {
  I: any;
  index: number;
}
//
function CartItem({ I, index }: ItemCartImport) {
  const dispatch = useDispatch();
  return (
    <Grid container className="itemCart">
      <Grid item xs={12} md={6} className="text-center p-2">
        <img src={I.item.image} style={imgStyle} alt="" />
      </Grid>
      <Grid item xs={12} md={6} className="p-2">
        <div className="d-flex flex-column">
          <h5 className="text-muted">{I.item.title}</h5>
          <p>{I.item.description}</p>
          <section className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-baseline">
              <p className=" m-0 mr-1">quantity: </p>
              <h5 className="text-muted m-0"> {I.qty}</h5>
            </div>

            <div className="quatnityPick ">
              <IconButton
                onClick={() => {
                  if (I.qty > 1) {
                    dispatch(
                      setItemQty({ item: I.item, qty: I.qty - 1 }, index),
                    );
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (I.qty < 10) {
                    dispatch(
                      setItemQty({ item: I.item, qty: I.qty + 1 }, index),
                    );
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </section>
          <br />
          <section className="d-flex justify-content-between">
            <div className="d-flex align-items-baseline">
              <p>Price:</p>
              <h5 className="text-muted ml-2">{I.item.price} £</h5>
            </div>
            <div className="d-flex align-items-baseline">
              <p>Total item price:</p>
              <h5 className="text-muted ml-2">{I.item.price * I.qty} £</h5>
            </div>
          </section>
          <Divider />
          <section className="d-flex justify-content-center">
            <IconButton color="warning">
              <DeleteIcon
                fontSize="medium"
                onClick={() => dispatch(setDelItem(index))}
              />
            </IconButton>
          </section>
        </div>
      </Grid>
    </Grid>
  );
}

export default CartItem;
