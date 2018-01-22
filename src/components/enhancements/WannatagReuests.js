import React from "react";
import testwannatagsfeedpayload from "../../../serverapi/TestWannatagsFeedPayload.js";
import testwannatagspayload from "../../../serverapi/TestWannatagsPayload.js";
import { wannatagReducers } from "../../reducers/WannatagReducer";

export default function(WrapedComponent) {
  return class WannatagRequestHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        wannatags: [],
        wannatagsFeed: []
      };
      this.wannatagNewPosts = [];
      this.onShowButtonClick = this.onShowButtonClick.bind(this);
    }

    pollingFeed() {
      setInterval(async () => {
/*        const wannatagsFeed = await this.getJson(
          `/wannatagsFeed/${this.props.firstWannatagDate}`
        );
 */       
      const wannatagsFeed = testwannatagspayload;
      console.log(wannatagsFeed);
      if (wannatagsFeed.length > 0) this.setState({ wannatagsFeed });
      }, 5000);
    }

    async getJson(url) {
      const r = await fetch(url);
      return await r.json();
    }

    async updateWannatags(lastWannatagDate) {
      try {
        const cond = lastWannatagDate === 0 ? "startAt" : "endAt";
        var index = 0;
        const wannatagsRef = testwannatagsfeedpayload.getwanatags(lastWannatagDate);
        const wannatagsJSON = wannatagsRef;
        if (wannatagsJSON) {
          const wannatags = [];
          for (let wannatagId in wannatagsJSON) {
            wannatags.unshift(
              Object.assign(
                {
                  wannatagId: wannatagId
                },
                wannatagsJSON[wannatagId]
              )
            );
          }

          this.setState(prevState => {
            return {
              wannatags: prevState.wannatags.concat(wannatags)
            };
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.updateWannatags(this.props.lastWannatagDate);
      // this.pollingFeed();
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.firstWannatagDate === 0 &&
        nextProps.lastWannatagDate === 0
      ) {
        this.setState({ wannatags: [], wannatagsFeed: [] });
      }

      if (nextProps.lastWannatagDate !== this.props.lastWannatagDate) {
        this.updateWannatags(nextProps.lastWannatagDate);
      }
    }

    onShowButtonClick() {
      this.setState(prevState => {
        return {
          wannatags: prevState.wannatagsFeed.concat(prevState.wannatags),
          wannatagsFeed: []
        };
      });
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
          <button onClick={this.onShowButtonClick}>
            {this.state.wannatagsFeed.length}件の新着をみる
          </button>
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
