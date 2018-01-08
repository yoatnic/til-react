import {
  GET_NEXT_WANNATAGS,
  UPDATE_FIRST_WANNATAG
} from "../actions/WannatagAction";

const initinalNextWannatag = {
  shownItemDate: 0,
  firstItemDate: 0
};

export function wannatagReducers(state = initinalNextWannatag, action) {
  switch (action.type) {
    case GET_NEXT_WANNATAGS:
      return Object.assign({}, { shownItemDate: action.shownItemDate });
    case UPDATE_FIRST_WANNATAG:
      return Object.assign({}, { firstItemDate: action.firstItemDate });
    default:
      return state;
  }
}
