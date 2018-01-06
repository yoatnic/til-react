import { createStore } from "redux";
import { wannatagReducers } from "../reducers/WannatagReducer";

export const wannatagStore = createStore(wannatagReducers);
