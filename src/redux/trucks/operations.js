import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

// export const fetchTracks = createAsyncThunk(
//   "fetchTracks",
//   async ({ location, form, equipment } = {}) => {
//     try {
//       const params = {};
//       if (location) {
//         params.location = location;
//       }
//       if (form) {
//         params.form = form;
//       }

//       if (equipment && equipment.length > 0) {
//         equipment.forEach((item) => {
//           params[item] = true;
//         });
//       }
//       const response = await axiosAPI.get("/campers", { params });
//       return response.data.items;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const fetchTracks = createAsyncThunk(
  "fetchTracks",
  async (_, thunkAPI) => {
    try {
      const response = await axiosAPI.get("/campers");

      return response.data.items;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchTrackById = async (id) => {
//   const response = await axiosAPI.get(`/campers/${id}`);
//   return response.data;
// };

export const fetchTrackByIdThunk = createAsyncThunk(
  "tracks/fetchTrackById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosAPI.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllLocations = async () => {
  const response = await axiosAPI.get("/campers");
  const items = response.data.items || [];
  const uniqeLocations = [...new Set(items.map((item) => item.location))];
  return uniqeLocations;
};

export const loadFavoritesFromStorage = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const saveFavoritedToStorage = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error(error);
  }
};
