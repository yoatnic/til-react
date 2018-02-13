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
      <Wannatag {...props} weight={0} />
      <Wannatag {...props} weight={1} />
      <Wannatag {...props} weight={2} />
    </div>
  );
};

export default Sandbox;
