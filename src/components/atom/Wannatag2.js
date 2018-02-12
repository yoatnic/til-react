import React from "react";
import "../../index.css";

const headerStyle = {
  backgroundColor: "#EFEFEF",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  padding: "10px"
};
const bodyStyle = {
  padding: "10px"
};

const Wannatag = function(props) {
  const wannatagStyle = {
    boxShadow: "0 0 1px black",
    width: `250px`,
    wordWrap: "break-word",
    display: "inline-block",
    position: "absolute",
    borderRadius: "3px"
  };

  const d = new Date(props.postDate);
  const dateStr =
    `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
    `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return (
    <div style={wannatagStyle}>
      <div style={headerStyle}>
        <div>
          <span>{dateStr}</span>
          <span>{props.username}</span>
          <button>delete</button>
        </div>
        <div>{props.title}</div>
      </div>
      <div style={bodyStyle}>
        <span>{props.body}</span>
      </div>
    </div>
  );
};

export default Wannatag;
