import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Index() {
  return (
    <nav className="header">
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <Link to="/addEvents">
        <h3>Add Events</h3>
      </Link>
      <Link to="/login">
        <h3>Sign In</h3>
      </Link>
    </nav>
  );
}

export default Index;
