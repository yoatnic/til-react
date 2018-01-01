import React from "react";

const width = "250px";
const style = {
  boxShadow: "0 0 1px black",
  flexBasis: width,
  maxWdith: width,
  width, // https://qiita.com/taka_mura3/items/2e9719165eab1ea6bfbe
  alignItems: "flex-start",
  wordWrap: "break-word",
  margin: "10px"
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
      <p>{props.body}</p>
      {props.isOwner ? <button>delete</button> : null}
    </div>
  );
};

export default Wannatag;
