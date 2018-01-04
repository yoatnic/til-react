import { GET_NEXT_WANNATAGS } from "../actions/wannatag";

const initinalNextWannatag = {
  shownItemDate: 0
};

export function wannatagReducers(state = initinalNextWannatag, action) {
  switch (action.type) {
    case GET_NEXT_WANNATAGS:
      return Object.assign({}, { shownItemDate: action.shownItemDate });
    default:
      return state;
  }
}
