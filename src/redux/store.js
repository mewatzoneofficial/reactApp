// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
