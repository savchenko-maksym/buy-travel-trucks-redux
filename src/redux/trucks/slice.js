const { createSlice } = "@reduxjs/toolkit";

const initialState = {
  tracks: [],
};

const slice = createSlice({
  name: "trucks",
  initialState,
  reducers: {},
});

export const trucksReducer = slice.reducer;
