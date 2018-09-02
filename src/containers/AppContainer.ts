import AppRouter from "../AppRouter";
import {
  updateLastWannatagDate,
  updateFirstWannatagDate,
  resetWannatagDate
} from "../actions/WannatagAction";
import { updateWannaPosting } from "../actions/PostAction";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    lastWannatagDate: state.wannatagReducers.lastWannatagDate,
    firstWannatagDate: state.wannatagReducers.firstWannatagDate,
    isWannaPosting: state.postReducers.isWannaPosting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateLastWannatagDate(value) {
      dispatch(updateLastWannatagDate(value));
    },
    onUpdateFirstWannatagDate(value) {
      dispatch(updateFirstWannatagDate(value));
    },
    onResetWannatagDate() {
      dispatch(resetWannatagDate());
    },
    onToggleWannaPosting(value) {
      dispatch(updateWannaPosting(value));
    }
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
export default AppContainer;
