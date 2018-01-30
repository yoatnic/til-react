import React from "react";
import firebase from "../../infra/FireBaseApp";
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
        const wannatagsFeed = await this.getJson(
          `/wannatagsFeed/${this.props.firstWannatagDate}`
        );
        if (wannatagsFeed.length > 0) this.setState({ wannatagsFeed });
      }, 5000);
    }

    async getJson(url) {
      const r = await fetch(url);
      return await r.json();
    }

    async updateWannatags(lastWannatagDate) {
      try {
        const req = await fetch(`wannatags/${lastWannatagDate}`);
        const wannatags = await req.json();

        if (wannatags.length > 0) {
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
      this.pollingFeed();
    }

    componentWillReceiveProps(nextProps) {
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
