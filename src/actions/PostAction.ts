export const UPDATE_WANNA_POSTING = "UPDATE_WANNA_POSTING";

export function updateWannaPosting(isWannaPosting: boolean) {
  return { type: UPDATE_WANNA_POSTING, isWannaPosting };
}
