import * as React from "react";
import { Button, Icon, Colors } from "@blueprintjs/core";
import { wannatagReducers } from "../../reducers/WannatagReducer";
import WannatagsAPI from "../../api/wannatagsAPI";

interface Props {
  firstWannatagDate: number;
  lastWannatagDate: number;
  onUpdateLastWannatagDate: Function;
  onUpdateFirstWannatagDate: Function;
  onResetWannatagDate: Function;
}

interface State {
  wannatags: Array<any>;
  wannatagsFeed: Array<any>;
}
export default function(WrapedComponent: any) {
  return class WannatagRequestHOC extends React.Component<Props, State> {
    wannatagNewPosts: Array<any>;

    constructor(props: Props) {
      super(props);
      this.state = {
        wannatags: [],
        wannatagsFeed: []
      };
      this.wannatagNewPosts = [];
      this.onShowButtonClick = this.onShowButtonClick.bind(this);
    }

    pollingFeed() {
      setInterval(async () => {
        const wannatagsFeed = await WannatagsAPI.get({
          postDate: this.props.firstWannatagDate,
          compare: "newer"
        });
        if (wannatagsFeed.length > 0) this.setState({ wannatagsFeed });
      }, 5000);
    }

    async updateWannatags(lastWannatagDate: number) {
      try {
        const wannatags = await WannatagsAPI.get({
          postDate: lastWannatagDate
        });

        if (wannatags.length > 0) {
          this.setState((prevState: { wannatags: Array<any> }) => {
            return {
              wannatags: [...prevState.wannatags, ...wannatags]
            };
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.updateWannatags(this.props.lastWannatagDate);
      this.pollingFeed();
    }

    componentWillReceiveProps(nextProps: {
      firstWannatagDate: number;
      lastWannatagDate: number;
    }) {
      if (
        nextProps.firstWannatagDate === 0 &&
        nextProps.lastWannatagDate === 0
      ) {
        this.setState({ wannatags: [], wannatagsFeed: [] });
        this.updateWannatags(nextProps.lastWannatagDate);
      }

      if (nextProps.lastWannatagDate !== this.props.lastWannatagDate) {
        this.updateWannatags(nextProps.lastWannatagDate);
      }
    }

    onShowButtonClick() {
      this.setState(
        (prevState: { wannatagsFeed: Array<any>; wannatags: Array<any> }) => {
          return {
            wannatags: prevState.wannatagsFeed.concat(prevState.wannatags),
            wannatagsFeed: []
          };
        }
      );
    }

    render() {
      const props = {
        onUpdateLastWannatagDate: this.props.onUpdateLastWannatagDate,
        onUpdateFirstWannatagDate: this.props.onUpdateFirstWannatagDate,
        onResetWannatagDate: this.props.onResetWannatagDate,
        wannatags: this.state.wannatags
      };
      const showNewItems =
        this.state.wannatagsFeed.length > 0 ? (
          <div style={{ width: "100%", height: "40px" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                lineHeight: "40px",
                display: "inline-block",
                backgroundColor: Colors.GRAY5
              }}
            >
              <a onClick={this.onShowButtonClick}>
                <Icon icon="refresh" style={{ marginTop: "12px" }} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`${this.state.wannatagsFeed.length}件の新着をみる`}
              </a>
            </div>
          </div>
        ) : null;
      return (
        <div>
          {showNewItems}
          <WrapedComponent {...props} />
        </div>
      );
    }
  };
}
