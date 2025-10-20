import { configureStore } from "@reduxjs/toolkit";
import { trucksReducer } from "./trucks/slice";

export const store = configureStore({
  reducer: {
    tracks: trucksReducer,
  },
});
