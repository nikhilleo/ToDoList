import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./style.css";

function Index(props) {
  var [inputValue, setInputValue] = useState();

  useEffect(() => {
    axios
      .get("/getAllList")
      .then((res) => {
        console.log(res.data);
        setInputValue(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  console.log(inputValue);

  const handleCloseClick = (index) => {};
  return (
    <div className="List">
      {inputValue ? (
        <table>
          {inputValue?.map?.((item, index) => (
            <tbody key={index}>
              <td>{index}</td>
              <td>{item.listName}</td>
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
