import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
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
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Sidebar;
