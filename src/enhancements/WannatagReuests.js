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

    polling() {
      setInterval(async () => {
        const wannatagsFeed = await this.getWannatagsFeed(
          this.props.firstItemDate
        );
        this.setState({ wannatagsFeed });
      }, 5000);
    }

    async getWannatagsFeed(firstItemDate) {
      const r = await fetch(`/wannatagsFeed/${firstItemDate}`);
      return await r.json();
    }

    async getWannatags(shownItemDate) {
      const r = await fetch(`/wannatags/${shownItemDate}`);
      return await r.json();
    }

    async updateWannatags(shownItemDate) {
      try {
        const wannatags = await this.getWannatags(shownItemDate);
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
      this.polling();
    }

    componentWillReceiveProps(nextProps) {
      this.updateWannatags(nextProps.shownItemDate);
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
