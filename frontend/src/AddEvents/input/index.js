import axios from "../../axios";
import React, { useState } from "react";
import "./style.css";

function Index(props) {
  const [input, setInput] = useState();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/addList", { listName: input })
      .then((res) => {
        console.log("res = ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="Head" onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Index;
