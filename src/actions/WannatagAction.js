export const GET_NEXT_WANNATAGS = "GET_NEXT_WANNATAGS";
export const UPDATE_FIRST_WANNATAG = "UPDATE_FIRST_WANNATAG";

export function getNextWannatags(shownItemDate) {
  return { type: GET_NEXT_WANNATAGS, shownItemDate };
}

export function updateFirstWannatag(firstItemDate) {
  return { type: UPDATE_FIRST_WANNATAG, firstItemDate };
}
