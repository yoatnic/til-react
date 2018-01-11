import { UPDATE_WANNA_POSTING } from "../actions/PostAction";

const initinalState = {
  isWannaPosting: false
};

export function postReducers(state = initinalState, action) {
  switch (action.type) {
    case UPDATE_WANNA_POSTING:
      return Object.assign({}, state, {
        isWannaPosting: action.isWannaPosting
      });
    default:
      return state;
  }
}
