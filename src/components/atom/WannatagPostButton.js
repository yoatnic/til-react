import React from "react";

const WannatagPostButton = function(props) {
  const openPostForm = function() {
    props.onStartWanna(true);
  };

  return <button onClick={openPostForm}>+</button>;
};

export default WannatagPostButton;
