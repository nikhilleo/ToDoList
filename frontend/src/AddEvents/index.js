import React from "react";
import List from "./List";
import Input from "./input";
import "./style.css";

function Index() {
  console.log("handleSubmit");
  return (
    <div>
      <Input />
      <List />
    </div>
  );
}

export default Index;
