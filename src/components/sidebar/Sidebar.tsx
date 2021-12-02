import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Divider, ListItem, ListItemIcon } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { clearUser } from "../../redux/actions/action";
import "./style.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
//
function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  //
  const handleLogout = () => {
    dispatch(clearUser());
    history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="navSearch">
        <SearchIcon className="mx-1" style={{ fontSize: "2rem" }} />{" "}
        <Form.Control
          // value={weather.search}
          type="text"
          placeholder="...search"
          // onChange={(e) => {
          //   dispatch(setSearch(e.target.value));
          // }}
          onKeyUp={(e) => {
            console.log("Click");
          }}
        />{" "}
      </div>
      <br />
      <ListItem button className="p-0">
        <Link to="/profile" className="sidebar-profile">
          <div>
            <img src={user.avatar} className="imageSidebar" alt="" />
          </div>
          <h6 className="m-0 my-auto ml-3 text-muted">
            {user.firstname} {user.lastname}
          </h6>
        </Link>
      </ListItem>
      <br />
      <Link to="/" className="sidebar-link">
        <ListItem button>
          <h6 className="text-muted m-0">Feed</h6>
        </ListItem>
      </Link>
      <Link to="/messages" className="sidebar-link">
        <ListItem button>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <h6 className="text-muted m-0">Messages</h6>
        </ListItem>
      </Link>
      <Link to="/order" className="sidebar-link">
        <ListItem button>
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <h6 className="text-muted m-0">My orders</h6>
        </ListItem>
      </Link>
      <Link to="/settings" className="sidebar-link">
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <h6 className="text-muted m-0">Settings</h6>
        </ListItem>
      </Link>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <h6 className="text-muted m-0">Cart</h6>
      </ListItem>
      {/* <br /> */}
      <Divider />

      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <h6 className="text-muted m-0">Log out</h6>
      </ListItem>
    </div>
  );
}

export default Sidebar;
