import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

function Index(props) {
  console.log("props = ", props);
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    props.setUser(null);
    history.push("/");
  };
  return (
    <nav className="header">
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <Link to="/addEvents">
        <h3>Add Events</h3>
      </Link>
      {props?.user?.fName ? (
        <Link to="/profile">
          <h3>Your Profile</h3>
        </Link>
      ) : (
        <Link to="/login">
          <h3>Sign In</h3>
        </Link>
      )}
    </nav>
  );
}

export default Index;
