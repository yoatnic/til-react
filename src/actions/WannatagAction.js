export const GET_NEXT_WANNATAGS = "GET_NEXT_WANNATAGS";

export default {
  // shown last wannatag. you need get next
  type: GET_NEXT_WANNATAGS,
  // UNIX time
  shownItemDate: 0
};

export function getNextWannatags(shownItemDate) {
  return { type: GET_NEXT_WANNATAGS, shownItemDate };
}
