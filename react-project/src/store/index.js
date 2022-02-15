import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification-slice";
import locationSlice from "./location-slice";

const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
