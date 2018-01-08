import AppRouter from "../AppRouter";
import {
  getNextWannatags,
  updateFirstWannatag
} from "../actions/WannatagAction";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    shownItemDate: state.shownItemDate,
    firstItemDate: state.firstItemDate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEnterWindow(value) {
      dispatch(getNextWannatags(value));
    },
    onUpdateFirstDate(value) {
      dispatch(updateFirstWannatag(value));
    }
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppRouter);
export default AppContainer;
