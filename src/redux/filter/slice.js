import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

const slice = createSlice({
  name: "filter",
  initialState,
});

export const filterReducer = slice.reducer;
