import * as React from "react";
import * as ReactDOM from "react-dom";
import Observer from "react-intersection-observer";
import {
  Elevation,
  Card,
  Button,
  Icon,
  Colors,
  Tooltip,
  Position
} from "@blueprintjs/core";
import WannatagsAPI from "../../api/wannatagsAPI";

const headerStyle = {
  backgroundColor: "#EFEFEF",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  padding: "10px"
};
const bodyStyle = {
  padding: "10px"
};

interface Props {
  onUpdateFirstWannatagDate: Function;
  onUpdateLastWannatagDate?: Function;
  onResetWannatagDate: Function;
  isOwner: boolean;
  heightRef: Function;
  wannatagId: any;
  postDate: number;
  username: string;
  title: string;
  body: string;
  translate: {
    x: number;
    y: number;
  };
  width: number;
}

interface State {
  animated: boolean;
  onUpdateLastWannatagDate: boolean;
}

class Wannatag extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      onUpdateLastWannatagDate: !!props.onUpdateLastWannatagDate,
      animated: false
    };

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.onUpdateFirstWannatagDate) {
      this.props.onUpdateFirstWannatagDate(this.props.postDate);
    }
    const self = document.querySelector(`.wanantag${this.props.wannatagId}`);
    const height = self.clientHeight;
    this.props.heightRef(height);
  }

  onEnter(inView: boolean) {
    if (!inView) return;
    this.props.onUpdateLastWannatagDate(this.props.postDate);
    this.setState({ onUpdateLastWannatagDate: false });
  }

  async onDelete() {
    const result = await WannatagsAPI.remove(this.props.wannatagId);
    // TODO wait for complate transaction
    if (result) setTimeout(() => this.props.onResetWannatagDate(), 3000);
  }

  isOwner() {
    // TODO: tempolary
    return this.props.isOwner;
  }

  render() {
    const animation = !!this.props.translate;
    const translate = animation
      ? `translate(${this.props.translate.x}px, ${this.props.translate.y}px)`
      : "translate(0px, 10000px)";
    const wannatagStyle = {
      width: `${this.props.width}px`,
      wordWrap: "break-word",
      transform: translate,
      position: "absolute",
      opacity: this.state.animated ? 1 : 0
    } as React.CSSProperties;

    const d = new Date(this.props.postDate);
    const dateStr =
      `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
      `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    let elem = (
      <div>
        <h5 style={{ color: Colors.GRAY2 }}>
          <Tooltip content={this.props.username} position={Position.TOP}>
            <Icon iconSize={24} icon="user" />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;
          {dateStr}
          {this.isOwner() ? (
            <Icon
              icon="cross"
              onClick={this.onDelete}
              style={{ float: "right" }}
            />
          ) : null}
        </h5>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
      </div>
    );
    const onChangeView = (inView: boolean) => this.onEnter(inView);
    if (this.state.onUpdateLastWannatagDate) {
      elem = (
        <Observer onChange={onChangeView} triggerOnce={true}>
          {elem}
        </Observer>
      );
    }

    if (!this.state.animated && animation) {
      setTimeout(() => {
        const el: any = ReactDOM.findDOMNode(this);
        el.animate(
          [
            { transform: `${translate} scale(0.5)`, opacity: 0.6 },
            { transform: `${translate} scale(0.8)`, opacity: 0.8 },
            { transform: `${translate} scale(1.0)`, opacity: 1 }
          ],
          200
        ).finished.then(() => {
          this.setState({ animated: true });
        });
      }, 50);
    }
    return (
      <Card
        className={`wanantag${this.props.wannatagId}`}
        interactive={false}
        elevation={Elevation.ONE}
        style={wannatagStyle}
      >
        {elem}
      </Card>
    );
  }
}

export default Wannatag;
