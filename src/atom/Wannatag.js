import React from "react";

const style = {
  boxShadow: "0 0 1px black",
  padding: "5px"
};

const Wannatag = function(props) {
  const d = new Date(props.postDate);
  const dateStr =
    `${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ` +
    `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return (
    <div style={style}>
      <div>{dateStr}</div>
      <div>{props.username}</div>
      <div>{props.title}</div>
      <div>{props.body}</div>
      {props.isOwner ? <button>delete</button> : null}
    </div>
  );
};

export default Wannatag;
