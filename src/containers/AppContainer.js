import AppRouter from "../AppRouter";
import {
  getNextWannatags,
  updateFirstWannatag
} from "../actions/WannatagAction";
import { startWanna } from "../actions/PostAction";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    shownItemDate: state.wannatagReducers.shownItemDate,
    firstItemDate: state.wannatagReducers.firstItemDate,
    isStartedWanna: state.postReducers.isStartedWanna
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEnterWindow(value) {
      dispatch(getNextWannatags(value));
    },
    onUpdateFirstDate(value) {
      dispatch(updateFirstWannatag(value));
    },
    onStartWanna(value) {
      dispatch(startWanna(value));
    }
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppRouter);
export default AppContainer;
