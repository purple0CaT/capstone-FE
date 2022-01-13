import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
//
function Navbar() {
  return (
    <div
      className="navbar"
      style={{ boxShadow: "0 2px 10px grey", zIndex: "100" }}
    >
      <Col xs="3" className="position-relative"></Col>
      <Col xs="6" className="d-flex justify-content-center">
        <Link to="/" className="d-flex logo-style">
          <h4 className="m-0 mx-auto">
            <span style={{ fontWeight: "lighter" }}>sando</span>
            <span
              style={{
                color: "#9c2500",
                fontStyle: "italic",
                fontSize: "1.8rem",
              }}
            >
              R
            </span>
            <span
              style={{
                color: "#cdaf5c",
                fontStyle: "italic",
                fontWeight: "lighter",
                // color: "#51befc",
              }}
            >
              aw
            </span>
          </h4>
        </Link>
      </Col>
      <Col xs="3" className="d-flex"></Col>
    </div>
  );
}

export default Navbar;
