export const WANNA_STARTED = "WANNA_STARTED";

export function startWanna(isStartedWanna) {
  return { type: WANNA_STARTED, isStartedWanna };
}
