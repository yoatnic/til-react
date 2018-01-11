export const UPDATE_LAST_WANNATAG_DATE = "UPDATE_LAST_WANNATAG_DATE";
export const UPDATE_FIRST_WANNATAG_DATE = "UPDATE_FIRST_WANNATAG_DATE";
export const RESEST_WANNATAG_DATE = "RESEST_WANNATAG_DATE";

export function updateLastWannatagDate(lastWannatagDate) {
  return { type: UPDATE_LAST_WANNATAG_DATE, lastWannatagDate };
}

export function updateFirstWannatagDate(firstWannatagDate) {
  return { type: UPDATE_FIRST_WANNATAG_DATE, firstWannatagDate };
}

export function resetWannatagDate() {
  return { type: RESEST_WANNATAG_DATE };
}
