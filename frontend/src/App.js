import "./App.css";
import React, { useState } from "react";
import Header from "./Header";
import AddEvent from "./AddEvents";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/addEvents">
          <AddEvent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
