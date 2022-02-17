import { ApiKey } from "@esri/arcgis-rest-auth";
import { geocode } from "@esri/arcgis-rest-geocoding";

const ARCGIS_APIKEY =
  "AAPK1246030e61bd44d5805e0280a1c3e010Be0ZrhwgBMr1H8Sjzb8H5iJRMLLG_HODVOswP4WCzBbKSA5eUBNOSNTLHpNMsevM";

const authentication = new ApiKey({
  key: ARCGIS_APIKEY,
});

export const searchByLocation = async (location, category) => {
  let locationLatLng = `${location.lng}, ${location.lat}`;
  return geocode({
    params: {
      category,
      location: locationLatLng,
      distance: 10,
      maxLocations: 20,
    },
    outFields: "PlaceName, Place_addr, City, Type, Region",
    authentication,
  })
    .then((response) => {
      return response.candidates;
    })
    .catch((error) => {
      return error;
    });
};

export const getMyLocation = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        try {
          pos.cityName = await getAddressFromLatLng(
            position.coords.latitude,
            position.coords.longitude
          );
        } catch (err) {
          console.log("Error found", err);
        }

        res(pos);
      },
      (error) => {
        rej(error);
      }
    );
  });
};

export const getAddressFromLatLng = async (lat, lng) => {
  const url =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode";

  return fetch(`${url}?f=pjson&location=${lng},${lat}&token=${ARCGIS_APIKEY}`)
    .then(async (response) => {
      const res = await response.json();

      return res.address.City;
    })
    .catch((err) => {
      return err;
    });
};
