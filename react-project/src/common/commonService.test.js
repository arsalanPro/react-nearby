import * as CommonService from "./commonService";
import * as GeocodingService from "@esri/arcgis-rest-geocoding";

describe("Common Service", () => {
  beforeEach(() => {
    jest.setTimeout(8000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the nearby places using longitude and latitude", async () => {
    let geoCodeSpy = jest.spyOn(GeocodingService, "geocode");
    geoCodeSpy.mockReturnValue(
      Promise.resolve({ candidates: [{}, {}], spatialReference: {} })
    );
    const res = await CommonService.searchByLocation(
      { lng: 2, lat: 2 },
      "Bank"
    );
    expect(geoCodeSpy).toHaveBeenCalled();
    expect(geoCodeSpy.mock.lastCall[0].params).toEqual({
      category: "Bank",
      location: "2, 2",
      distance: 10,
      maxLocations: 20,
    });
    expect(res).toEqual([{}, {}], {});
  });

  it("should return location using latitude and longitude", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValue({
      json: async () => {
        return {
          address: {
            City: "Dummy Place",
          },
        };
      },
    });
    const res = await CommonService.getAddressFromLatLng(3, 3);
    expect(res).toEqual("Dummy Place");
  });

  //   it("should return the latitude and longitude of user", async () => {
  //     const mockGeoLocation = {
  //       getCurrentPosition: jest
  //         .fn()
  //         .mockImplementation((success) =>
  //           Promise.resolve(success({ coords: { latitude: 2, longitude: 2 } }))
  //         ),
  //     };

  //     global.navigator.geolocation = mockGeoLocation;

  //     const getAddressFromLatLngSpy = jest.spyOn(
  //       CommonService,
  //       "getAddressFromLatLng"
  //     );

  //     getAddressFromLatLngSpy.mockReturnValue(Promise.resolve("Dummy Place"));
  //     const myLocaiton = await CommonService.getMyLocation();
  //     expect(getAddressFromLatLngSpy).toHaveBeenCalled();
  //     expect(myLocaiton).toEqual({
  //       lat: 2,
  //       lng: 2,
  //       cityName: "Dummy Place",
  //     });
  //   });
});
