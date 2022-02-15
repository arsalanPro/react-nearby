import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Map from "./components/Map/Map";
import { locationActions } from "./store/location-slice";
import Search from "./components/Search/Search";
import { getMyLocation } from "./common/commonService";
import List from "./components/List/List";
import { notificationActions } from "./store/notification-slice";
import Notification from "./components/Notification/Notification";

const App = () => {
  const dispatch = useDispatch();
  const [renderMap, setRenderMap] = useState(false);
  const message = useSelector((state) => state.notification.message);

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.clearNotification());
    }, 5000);
  }, [dispatch, message]);

  useEffect(() => {
    getMyLocation().then(
      (pos) => {
        dispatch(locationActions.setMyLocation(pos));
        dispatch(
          notificationActions.setNotification({
            message: "Loaded user's location successfully!",
            status: "Success",
          })
        );
        setRenderMap(true);
      },
      (err) => {
        dispatch(
          notificationActions.setNotification({
            message: "Could not load users location!!",
            status: "Error",
          })
        );
      }
    );
  }, [dispatch]);

  return (
    <>
      {message && <Notification />}
      <div>
        <Search />
        <div className="content">
          {renderMap && <Map />}
          <List />
        </div>
      </div>
    </>
  );
};

export default App;
