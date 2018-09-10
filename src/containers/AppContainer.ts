import AppRouter from "../AppRouter";
import {
  updateLastWannatagDate,
  updateFirstWannatagDate,
  resetWannatagDate
} from "../actions/WannatagAction";
import { updateWannaPosting } from "../actions/PostAction";
import { connect } from "react-redux";

function mapStateToProps(state: {
  wannatagReducers: {
    lastWannatagDate: number;
    firstWannatagDate: number;
  };
  postReducers: {
    isWannaPosting: boolean;
  };
}) {
  return {
    lastWannatagDate: state.wannatagReducers.lastWannatagDate,
    firstWannatagDate: state.wannatagReducers.firstWannatagDate,
    isWannaPosting: state.postReducers.isWannaPosting
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    onUpdateLastWannatagDate(value: number) {
      dispatch(updateLastWannatagDate(value));
    },
    onUpdateFirstWannatagDate(value: number) {
      dispatch(updateFirstWannatagDate(value));
    },
    onResetWannatagDate() {
      dispatch(resetWannatagDate());
    },
    onToggleWannaPosting(value: boolean) {
      dispatch(updateWannaPosting(value));
    }
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
export default AppContainer;
