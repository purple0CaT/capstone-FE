import BrushIcon from "@mui/icons-material/Brush";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Badge, Divider, ListItem, ListItemIcon } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  clearChat,
  clearShop,
  clearToken,
  clearUser,
} from "../../redux/actions/action";
import "./style.css";
//
function Sidebar({ toggleDrawer }: any) {
  const dispatch = useDispatch();
  const tokens = useSelector((state: any) => state.tokens);
  const user = useSelector((state: any) => state.user);
  const shop = useSelector((state: any) => state.shop);
  const history = useHistory();
  const [SearchQuery, setSearchQuery] = useState("");
  const [UsersList, setUsersList] = useState([]) as any;
  //
  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    dispatch(clearChat());
    dispatch(clearShop());
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
              <Avatar
                src={user.avatar}
                alt={user.firstname}
                sx={{ width: 45, height: 45, boxShadow: "0 0 5px grey" }}
              />
              {/* <img
                src={user.avatar}
                className="imageSidebar"
                style={{ boxShadow: "0 0 8px grey" }}
                alt=""
              /> */}
            </div>
            <h6 className="m-0 my-auto ml-3 text-muted">{user.firstname}</h6>
          </Link>
        </ListItem>
        <br />
        <NavLink
          exact
          activeClassName="selectedNavb"
          to="/"
          className="sidebar-link"
        >
          <ListItem button>
            <ListItemIcon>
              <DynamicFeedIcon />
            </ListItemIcon>
            <h6 className="text-muted m-0">Feed</h6>
          </ListItem>
        </NavLink>
        <NavLink
          exact
          activeClassName="selectedNavb"
          to="/messages"
          className="sidebar-link"
        >
          <ListItem button>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <h6 className="text-muted m-0">Messages</h6>
          </ListItem>
        </NavLink>
        {user.type === "user" ? (
          <>
            <NavLink
              exact
              activeClassName="selectedNavb"
              to="/cart"
              className="sidebar-link"
            >
              <ListItem button>
                <ListItemIcon>
                  <Badge badgeContent={shop.cart.length} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </ListItemIcon>
                <h6 className="text-muted m-0">Cart</h6>
              </ListItem>
            </NavLink>
            <NavLink
              exact
              activeClassName="selectedNavb"
              to="/order"
              className="sidebar-link"
            >
              <ListItem button>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <h6 className="text-muted m-0">My orders</h6>
              </ListItem>
            </NavLink>
            <NavLink
              exact
              activeClassName="selectedNavb"
              to="/bookings"
              className="sidebar-link"
            >
              <ListItem button>
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <h6 className="text-muted m-0">My Bookings</h6>
              </ListItem>
            </NavLink>
          </>
        ) : (
          <NavLink
            exact
            activeClassName="selectedNavb"
            to="/storeorders"
            className="sidebar-link"
          >
            <ListItem button>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <h6 className="text-muted m-0">Store orders</h6>
            </ListItem>
          </NavLink>
        )}

        {user.creator && (
          <NavLink
            exact
            activeClassName="selectedNavb"
            to="/creator"
            className="sidebar-link"
          >
            <ListItem button>
              <ListItemIcon>
                <BrushIcon />
              </ListItemIcon>
              <h6 className="text-muted m-0">Creator</h6>
            </ListItem>
          </NavLink>
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
