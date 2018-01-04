import AppRouter from "../AppRouter";
import { getNextWannatags } from "../actions/wannatag";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    shownItemDate: state.shownItemDate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEnterWindow(value) {
      dispatch(getNextWannatags(value));
    }
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppRouter);
export default AppContainer;
