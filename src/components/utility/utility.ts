import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearChat,
  clearShop,
  clearToken,
  clearUser,
} from "../../redux/actions/action";

export const tokenCheck = ({ res }: any) => {
  if (res.message === "Relogin") {
    const dispatch = useDispatch();
    const history = useHistory();
    //
    dispatch(clearUser());
    dispatch(clearToken());
    dispatch(clearChat());
    dispatch(clearShop());
    history.push("/login");
  }
};
