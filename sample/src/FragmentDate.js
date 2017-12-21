import React from "react";

const FragmentDate = function(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
};
export default FragmentDate;
