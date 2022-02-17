import { Fragment, useState } from "react";
import { Places } from "../../constants/Places";
import "./Search.scss";
import { searchByLocation } from "../../common/commonService";
import { useSelector, useDispatch } from "react-redux";
import { locationActions } from "../../store/location-slice";
import { notificationActions } from "../../store/notification-slice";

const Search = () => {
  const [place, setPlace] = useState(Places[0]);
  const userLocation = useSelector((state) => state.location.userLocation);
  const selectedPlace = useSelector((state) => state.location.selectedPlace);
  const dispatch = useDispatch();

  const setPlaceHandler = (event) => {
    setPlace(event.target.value);
  };

  const submitHandler = () => {
    searchByLocation(userLocation, place)
      .then((res) => {
        dispatch(locationActions.updateSearchResults({ place, res }));
        dispatch(
          notificationActions.setNotification({
            message: `Request successful`,
            status: "Success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          notificationActions.setNotification({
            message: `Unable to fetch ${place}`,
            status: "Error",
          })
        );
      });
  };

  return (
    <Fragment>
      <div className="search">
        <h1 className="search__left">BrowserStack</h1>

        <div className="search__center">
          <select
            className="search__select"
            onChange={setPlaceHandler}
            aria-label="Select Place"
          >
            <option key="dummy" value="none" disabled selected hidden>
              Search here...
            </option>
            {Places.map((place) => {
              return (
                <option key={place} value={place}>
                  {place}
                </option>
              );
            })}
          </select>

          <button className="search__submit" onClick={submitHandler}>
            Search
          </button>
        </div>
        <div className="search__right">
          {selectedPlace && (
            <span className="search__place">{selectedPlace}</span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
