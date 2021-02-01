import React from "react";
import "./style.css";

function Index(props) {
  const handleClick = (val) => {
    document.getElementById("submit__request").classList.add("active");
    var input = document.getElementById("changeProp");
    input.placeholder = `Change  ${val}`;
  };

  const handleSubmit = () => {};

  return (
    <div className="profile__form">
      <div className="sub__profile__form">
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick("Name");
            }}
          >
            ⬇️
          </span>
          <input type="text" value={props.user.fName} />
        </div>
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick("Email");
            }}
          >
            ⬇️
          </span>
          <input type="text" value={props.user.email} />
        </div>
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick("Password");
            }}
          >
            ⬇️
          </span>
          <input type="password" placeholder="Enter Your Password" />
        </div>
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick("Mobile");
            }}
          >
            ⬇️
          </span>
          <input type="text" value={props.user.mobile} />
        </div>
      </div>
      <div className="submit__request" id="submit__request">
        <input type="text" id="changeProp" />
        <input type="password" placeholder="Enter Old Password" />
        <button onClick={handleSubmit}>submit</button>
      </div>
    </div>
  );
}

export default Index;
