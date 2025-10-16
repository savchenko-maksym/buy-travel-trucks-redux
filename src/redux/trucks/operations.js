import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const fetchTracks = async ({ location, form, equipment } = {}) => {
  const params = {};
  if (location) {
    params.location = location;
  }
  if (form) {
    params.form = form;
  }

  if (equipment && equipment.length > 0) {
    equipment.forEach((item) => {
      params[item] = true;
    });
  }
  const response = await axiosAPI.get("/campers", { params });
  return response.data.items;
};

export const fetchTrackById = async (id) => {
  const response = await axiosAPI.get(`/campers/${id}`);
  return response.data;
};

export const fetchAllLocations = async () => {
  const response = await axiosAPI.get("/campers");
  const items = response.data.items || [];
  const uniqeLocations = [...new Set(items.map((item) => item.location))];
  return uniqeLocations;
};
