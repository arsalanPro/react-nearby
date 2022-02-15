import Search from "./search";
import { shallow } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import * as commonService from "../../common/commonService";
import { locationActions } from "../../store/location-slice";
import { notificationActions } from "../../store/notification-slice";
import { Places } from "../../constants/Places";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Search Component", () => {
  let wrapper;

  const mockStore = {
    location: {
      userLocation: {
        lat: 2,
        lng: 2,
      },
    },
  };

  const useSelectorMock = useSelector;
  const useDispatchMock = useDispatch;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
    useDispatchMock.mockImplementation(() => () => {});
  });

  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it("should render the select control with options length added to 1", () => {
    expect(wrapper.find(".search__select").length).toBe(1);
    expect(wrapper.find("option").length).toEqual(Places.length + 1);
  });

  it("should update the search results and set success notification", async () => {
    let searchByLocationSpy = jest.spyOn(commonService, "searchByLocation");
    let updateSearchResultsSpy = jest.spyOn(
      locationActions,
      "updateSearchResults"
    );
    let setNotificationSpy = jest.spyOn(notificationActions, "setNotification");

    searchByLocationSpy.mockReturnValue(Promise.resolve([{}, {}]));
    wrapper.find(".search__submit").first().simulate("click");
    expect(searchByLocationSpy).toHaveBeenCalled();

    expect(searchByLocationSpy).toHaveBeenCalledWith(
      { lng: 2, lat: 2 },
      "Bank"
    );
    await Promise.resolve();
    expect(updateSearchResultsSpy).toHaveBeenCalledWith({
      place: Places[0],
      res: [{}, {}],
    });
    expect(setNotificationSpy).toHaveBeenCalledWith({
      message: `Request successful`,
      status: "Success",
    });
  });

  // it("should set error notification in case of no response", async () => {
  //   let searchByLocationSpy = jest.spyOn(commonService, "searchByLocation");
  //   let setNotificationSpy = jest.spyOn(notificationActions, "setNotification");

  //   searchByLocationSpy.mockReturnValue(Promise.resolve([{}, {}]));
  //   wrapper.find(".search__submit").first().simulate("click");
  //   expect(searchByLocationSpy).toHaveBeenCalled();

  //   expect(searchByLocationSpy).toHaveBeenCalledWith(
  //     { lng: 2, lat: 2 },
  //     "Bank"
  //   );
  //   await Promise.reject();

  //   expect(setNotificationSpy).toHaveBeenCalledWith({
  //     message: `Unable to fetch ${Place[0]}`,
  //     status: "Error",
  //   });
  // });
});
