import notificationSlice, { notificationActions } from "./notification-slice";

describe("Notification Slice", () => {
  const initialState = {
    message: null,
    status: null,
  };

  it("should set notification", () => {
    const prevState = initialState;
    expect(
      notificationSlice.reducer(
        prevState,
        notificationActions.setNotification({
          message: "Dummy Success",
          status: "Success",
        })
      )
    ).toEqual({
      message: "Dummy Success",
      status: "Success",
    });
  });
});
