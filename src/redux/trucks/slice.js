import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchTracks,
  fetchTrackByIdThunk,
  loadFavoritesFromStorage,
  saveFavoritedToStorage,
} from "./operations.js";

const initialState = {
  tracks: [],
  selectedTrack: null,
  favorites: loadFavoritesFromStorage(),
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const track = action.payload;
      const exists = state.favorites.some((fav) => fav.id === track.id);

      if (exists) {
        state.favorites = state.favorites.filter((fav) => fav.id !== track.id);
      } else {
        state.favorites.push(track);
      }
      saveFavoritedToStorage(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
      })
      .addCase(fetchTrackByIdThunk.fulfilled, (state, action) => {
        state.selectedTrack = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchTracks.rejected, fetchTrackByIdThunk.rejected),
        (state, action) => {
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchTracks.pending, fetchTrackByIdThunk.pending),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchTracks.fulfilled, fetchTrackByIdThunk.fulfilled),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const trucksReducer = slice.reducer;
export const { toggleFavorite } = slice.actions;
