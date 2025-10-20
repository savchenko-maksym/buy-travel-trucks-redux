import { createSlice } from "@reduxjs/toolkit";
import { fetchTracks } from "./operations.js";

const initialState = {
  tracks: [],
  isLoading: false,
  eroor: null,
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    dataFulfilledOperation: (state, action) => {
      state.tracks = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.eroor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
  },
});

export const trucksReducer = slice.reducer;
export const { dataFulfilledOperation, setLoading, setError } = slice.actions;
