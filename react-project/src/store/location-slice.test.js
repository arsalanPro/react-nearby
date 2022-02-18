import locationSlice, { locationActions } from "./location-slice";

describe("Location Slice", () => {
  const initialState = {
    searchResults: [],
    userLocation: null,
    mapLocations: [],
    selectedPlace: null,
  };

  it("should return initial state in case of no action", () => {
    expect(locationSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it("should set location and place", () => {
    const prevState = initialState;
    expect(
      locationSlice.reducer(
        prevState,
        locationActions.setMyLocation({
          lat: 2,
          lng: 2,
          cityName: "Dummy Place",
        })
      )
    ).toEqual({
      ...prevState,
      userLocation: { lat: 2, lng: 2, cityName: "Dummy Place" },
      selectedPlace: "Dummy Place",
    });
  });

  it("should update the search results, map locations and place", () => {
    const prevState = initialState;
    expect(
      locationSlice.reducer(
        prevState,
        locationActions.updateSearchResults({
          res: [{}, {}],
          place: "Dummy Place",
        })
      )
    ).toEqual({
      ...prevState,
      searchResults: [{}, {}],
      selectedPlace: "Dummy Place",
      mapLocations: [{}, {}],
    });
  });
});
