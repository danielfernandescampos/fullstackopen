import { configureStore } from "@reduxjs/toolkit";
import {
  blogReducer,
  notificationReducer,
  userReducer,
} from "./reducers/reducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;
