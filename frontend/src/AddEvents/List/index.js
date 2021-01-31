import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./style.css";

function Index(props) {
  var [inputValue, setInputValue] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/getAllList", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        setInputValue(res.data.lists_to_add);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  console.log(inputValue);

  const handleCloseClick = (index) => {
    const id = inputValue[index]._id;
    axios
      .delete("/deleteList", {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id: id },
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className="List">
      {inputValue ? (
        <table>
          {inputValue?.map?.((item, index) => (
            <tbody key={index}>
              <td>{index}</td>
              <td>{item.list}</td>
              <td
                className="close"
                onClick={() => {
                  handleCloseClick(index);
                }}
              >
                X
              </td>
            </tbody>
          ))}
        </table>
      ) : null}
    </div>
  );
}

export default Index;
