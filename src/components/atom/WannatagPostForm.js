import React from "react";
import WannatagsAPI from "../../api/wannatagsAPI";

const modalStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.75)",
  top: 0,
  left: 0
};

class WannatagPostForm extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      body: "",
      userId: 9999
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeBody(e) {
    this.setState({ body: e.target.value });
  }

  async onSubmit() {
    try {
      await WannatagsAPI.post(this.state);
    } catch (e) {
      console.log(e);
      return;
    }
    this.props.onToggleWannaPosting(false);
    this.props.onResetWannatagDate();
  }

  render() {
    return (
      <div style={modalStyle}>
        <input type="text" onChange={this.onChangeTitle} />
        <textarea onChange={this.onChangeBody} />
        <button onClick={this.onSubmit}>ok</button>
      </div>
    );
  }
}

export default WannatagPostForm;
