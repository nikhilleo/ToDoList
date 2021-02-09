import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import AddEvent from "./AddEvents";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "./axios";

function App() {
  const [user, setUser] = useState();
    console.log('App Starte');
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axios
        .get("/getUserDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header user={user} setUser={setUser} />
          <Home />
        </Route>
        <Route exact path="/login">
          <Header user={user} setUser={setUser} />
          <Login setUser={setUser} />
        </Route>
        <Route
          exact
          path="/addEvents"
          render={() => {
            if (user) {
              return (
                <>
                  <Header user={user} setUser={setUser} />
                  <AddEvent />
                </>
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/profile"
          render={() => {
            if (user) {
              return (
                <>
                  <Header user={user} setUser={setUser} />
                  <Profile user={user} />
                </>
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
