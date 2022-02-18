import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  status: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearNotification(state) {
      state.message = null;
      state.status = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
