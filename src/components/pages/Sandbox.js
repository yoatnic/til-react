import React from "react";
import Wannatag from "../atom/Wannatag2";

const Sandbox = function() {
  const props = {
    title: "title",
    body: "body body body body body body body body body",
    postDate: new Date().getTime(),
    username: "user"
  };
  return (
    <div>
      <Wannatag {...props} />
      <Wannatag {...props} />
      <Wannatag {...props} />
    </div>
  );
};

export default Sandbox;
