import { UPDATE_WANNA_POSTING } from "../actions/PostAction";

const initinalState = {
  isWannaPosting: false
};

export function postReducers(
  state = initinalState,
  action: {
    type: string;
    isWannaPosting: boolean;
  }
) {
  switch (action.type) {
    case UPDATE_WANNA_POSTING:
      return {
        ...state,
        isWannaPosting: action.isWannaPosting
      };
    default:
      return state;
  }
}
