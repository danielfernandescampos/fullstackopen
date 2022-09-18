import { configureStore } from "@reduxjs/toolkit";
import {
  blogReducer,
  loginReducer,
  notificationReducer,
  userReducer,
} from "./reducers/reducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
    loggedUser: loginReducer,
  },
});

export default store;
