import { configureStore } from "@reduxjs/toolkit";
import {
  blogReducer,
  filterReducer,
  notificationReducer,
} from "./reducers/reducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
