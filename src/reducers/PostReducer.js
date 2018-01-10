import { WANNA_STARTED } from "../actions/PostAction";

const initinalState = {
  isStartedWanna: false
};

export function postReducers(state = initinalState, action) {
  switch (action.type) {
    case WANNA_STARTED:
      return Object.assign({}, state, {
        isStartedWanna: action.isStartedWanna
      });
    default:
      return state;
  }
}
