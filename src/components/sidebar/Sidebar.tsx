import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Divider, ListItem, ListItemIcon } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { clearUser, clearToken, clearChat } from "../../redux/actions/action";
import "./style.css";
import BrushIcon from "@mui/icons-material/Brush";
//
function Sidebar({ toggleDrawer }: any) {
  const dispatch = useDispatch();
  const tokens = useSelector((state: any) => state.tokens);
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const [SearchQuery, setSearchQuery] = useState("");
  const [UsersList, setUsersList] = useState([]) as any;
  //
  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    dispatch(clearChat());
    history.push("/login");
  };
  //
  const fetchUsers = async () => {
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/user?search=${SearchQuery}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      } else {
        alert(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  // useEffect(() => {
  //   if (SearchQuery.length >= 2) {
  //     fetchUsers();
  //   }
  // }, [SearchQuery]);
  return (
    <div className="sidebar">
      <div className="position-relative d-flex flex-column justify-content-center">
        <div className="navSearch">
          <SearchIcon className="mx-1" style={{ fontSize: "2rem" }} />{" "}
          <Form.Control
            value={SearchQuery}
            type="text"
            placeholder="...search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (SearchQuery.length > 2) {
                fetchUsers();
              }
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                fetchUsers();
              }
            }}
          />
        </div>
        {UsersList.length > 0 && SearchQuery.length > 1 && (
          <div className="findedUser">
            {UsersList.map((U: any) => (
              <Link
                to={`/profile/${U._id}`}
                key={321 + U._id}
                onClick={() => {
                  setSearchQuery("");
                  // toggleDrawer();
                }}
              >
                <ListItem button className="d-flex align-items-center">
                  <div>
                    <img src={U.avatar} alt="" className="findedUserImg" />
                  </div>
                  <h6 className="text-muted m-0 ml-2">{U.firstname}</h6>
                </ListItem>
              </Link>
            ))}
          </div>
        )}
      </div>
      <br />
      <div onClick={toggleDrawer}>
        <ListItem button className="p-0">
          <Link to={`/profile/${user._id}`} className="sidebar-profile">
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
            <ListItemIcon>
              <DynamicFeedIcon />
            </ListItemIcon>
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
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <h6 className="text-muted m-0">Cart</h6>
        </ListItem>
        {user.creator && (
          <ListItem button>
            <ListItemIcon>
              <BrushIcon />
            </ListItemIcon>
            <h6 className="text-muted m-0">Creator</h6>
          </ListItem>
        )}
        <Link to="/settings" className="sidebar-link">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <h6 className="text-muted m-0">Settings</h6>
          </ListItem>
        </Link>
        {/* <br /> */}
        <Divider />

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <h6 className="text-muted m-0">Log out</h6>
        </ListItem>
      </div>
    </div>
  );
}

export default Sidebar;
