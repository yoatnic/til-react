import React from "react";
import Wanna from "../atom/Wanna";

class Wannas extends React.Component {
  constructor() {
    this.state = {
      wannas: []
    };
  }
  componentDidMount() {
    return fetch("/wannas")
      .then(responce => responce.json())
      .then(responceJson => {
        this.setState({
          wannas: responceJson
        });
      });
  }

  render() {
    const wannas = this.state.wannas.map(wanna => <Wanna {...wanna} />);
    return <React.Fragment>{...wannas}</React.Fragment>;
  }
}

export default Wannas;
