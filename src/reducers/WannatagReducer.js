import {
  UPDATE_LAST_WANNATAG_DATE,
  UPDATE_FIRST_WANNATAG_DATE,
  RESEST_WANNATAG_DATE
} from "../actions/WannatagAction";

const initinalState = {
  lastWannatagDate: 0,
  firstWannatagDate: 0
};

export function wannatagReducers(state = initinalState, action) {
  switch (action.type) {
    case UPDATE_LAST_WANNATAG_DATE:
      return Object.assign({}, state, {
        lastWannatagDate: action.lastWannatagDate
      });
    case UPDATE_FIRST_WANNATAG_DATE:
      return Object.assign({}, state, {
        firstWannatagDate: action.firstWannatagDate
      });
    case RESEST_WANNATAG_DATE:
      return Object.assign({}, state, initinalState);
    default:
      return state;
  }
}
