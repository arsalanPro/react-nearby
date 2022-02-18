import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  userLocation: null,
  mapLocations: [],
  selectedPlace: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.selectedPlace = action.payload.cityName;
      state.userLocation = action.payload;
    },
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload.res;
      state.selectedPlace = action.payload.place;
      state.mapLocations = action.payload.res;
    },
  },
});

export const locationActions = locationSlice.actions;
export default locationSlice;
