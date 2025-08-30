import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import authReducer from "./features/authSlice"; // ✅ এখানে authReducer import

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer, // ✅ এখানে add
  },
});

export default store;
