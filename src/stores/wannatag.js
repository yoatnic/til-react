import { createStore } from "redux";
import { wannatagReducers } from "../reducers/wannatag";

export const wannatagStore = createStore(wannatagReducers);
