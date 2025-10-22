import { createSlice } from "@reduxjs/toolkit";
import { fetchTracks, fetchTrackByIdThunk } from "./operations.js";

const initialState = {
  tracks: [],
  selectedTrack: null,
  isLoading: false,
  error: null,
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
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTrackByIdThunk.fulfilled, (state, action) => {
        state.selectedTrack = action.payload;
      });
  },
});

export const trucksReducer = slice.reducer;
export const { dataFulfilledOperation, setLoading, setError } = slice.actions;
