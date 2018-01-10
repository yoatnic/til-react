import { combineReducers, createStore } from "redux";
import { wannatagReducers } from "../reducers/WannatagReducer";
import { postReducers } from "../reducers/PostReducer";

const combinedReducer = combineReducers({
  wannatagReducers,
  postReducers
});

export const store = createStore(combinedReducer);
