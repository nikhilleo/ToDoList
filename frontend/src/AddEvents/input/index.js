import axios from "../../axios";
import React, { useState } from "react";
import "./style.css";

function Index(props) {
  const [input, setInput] = useState();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "/addList",
        { list: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res = ", res);
        alert(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="list__form">
      <form className="Head" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Add Lists"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Index;
