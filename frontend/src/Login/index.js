import React from "react";
import "./style.css";
import axios from "../axios";
function Index() {
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
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.message);
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
        if (!res.data.status == 200 || !res.data.status == 201)
          alert(res.data.message);
        localStorage.setItem("token", res.data);
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.message);
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
