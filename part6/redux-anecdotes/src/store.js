import { configureStore } from "@reduxjs/toolkit";
import {
  anecdoteReducer,
  filterReducer,
  notificationReducer,
} from "./reducers/reducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
