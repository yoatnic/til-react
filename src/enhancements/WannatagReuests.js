import React from "react";

export default function(WrapedComponent) {
  return class WannatagRequestHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        wannatags: []
      };
    }

    polling() {
      setInterval(async () => {
        const wannatags = await this.getWannatags(0);
        const current = this.state.wannatags.slice(0, 20);
        const diff = wannatags.filter(w => {
          const i = current.findIndex(wt => {
            return w.wannatagId === wt.wannatagId;
          });
          return i < 0;
        });
        if (diff.length > 0) {
          this.setState(prevState => {
            return {
              wannatags: diff.concat(prevState.wannatags)
            };
          });
        }
      }, 5000);
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

    render() {
      const props = {
        onEnterWindow: this.props.onEnterWindow
      };
      return <WrapedComponent {...this.state} {...props} />;
    }
  };
}
