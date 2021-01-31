import React, { useEffect } from "react";
import "./style.css";
import axios from "../axios";
import { useHistory } from "react-router-dom";
function Index(props) {
  const history = useHistory();
  useEffect(() => {
    history.push("/profile");
  }, []);
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const data = {
      fName: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      mobile: e.target[3].value,
    };
    axios
      .post("/register", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data);
        props.setUser(res.data.user);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    axios
      .post("/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.setUser(res.data.user);
        history.push("/");
        alert("Successfully logged in");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className="login__form">
        <form
          onSubmit={handleRegisterSubmit}
          id="login__form"
          className="sub__login__form"
        >
          <h1>Register</h1>
          <input type="text" name="fname" placeholder="Full Name" required />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="text"
            name="number"
            placeholder="Mobile Number"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="login__form">
        <form
          onSubmit={handleLoginSubmit}
          id="login__form"
          className="sub__login__form"
        >
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Index;
