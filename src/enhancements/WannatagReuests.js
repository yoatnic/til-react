import React from "react";

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
          `/wannatagsFeed/${this.props.firstItemDate}`
        );
        if (wannatagsFeed.length > 0) this.setState({ wannatagsFeed });
      }, 5000);
    }

    async getJson(url) {
      const r = await fetch(url);
      return await r.json();
    }

    async updateWannatags(shownItemDate) {
      try {
        const wannatags = await this.getJson(`/wannatags/${shownItemDate}`);
        this.setState(prevState => {
          return {
            wannatags: prevState.wannatags.concat(wannatags)
          };
        });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.updateWannatags(this.props.shownItemDate);
      this.pollingFeed();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.shownItemDate !== this.props.shownItemDate) {
        this.updateWannatags(nextProps.shownItemDate);
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
        onEnterWindow: this.props.onEnterWindow,
        onUpdateFirstDate: this.props.onUpdateFirstDate,
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
