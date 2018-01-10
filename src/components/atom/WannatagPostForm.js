import React from "react";

const modalStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.75)",
  top: 0,
  left: 0
};

class WannatagPostForm extends React.Component {
  render() {
    return (
      <div style={modalStyle}>
        <form>
          <input type="text" />
          <textarea />
          <button>ok</button>
        </form>
      </div>
    );
  }
}

export default WannatagPostForm;
