import Map from "./map";
import { useSelector } from "react-redux";
import { shallow } from "enzyme";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mapLocations = [
  {
    address: "Gramin Bank of Aryavart",
    attributes: {
      City: "Aligarh",
      PlaceName: "Gramin Bank of Aryavart",
      Place_addr:
        "Emadul Mulk Road, Aligarh Muslim University Campus, Aligarh, Uttar Pradesh, 202001",
      Region: "Uttar Pradesh",
      Type: "Bank",
    },
    extent: {
      xmax: 78.08265000000006,
      xmin: 78.07265000000007,
      ymax: 27.92549000000003,
      ymin: 27.91549000000003,
    },
    location: {
      x: 78.07765000000006,
      y: 27.92049000000003,
    },
    score: 100,
  },
  {
    address: "Gramin Bank-Jamal Pur",
    attributes: {
      City: "Aligarh",
      PlaceName: "Gramin Bank-Jamal Pur",
      Place_addr: "Jamalpur, Aligarh, Uttar Pradesh, 202001",
      Region: "Uttar Pradesh",
      Type: "Bank",
    },
    extent: {
      xmax: 78.08159000000006,
      xmin: 78.07159000000007,
      ymax: 27.929990000000036,
      ymin: 27.919990000000038,
    },
    location: {
      x: 78.07659000000007,
      y: 27.924990000000037,
    },
    score: 100,
  },
];

describe("Map Component", () => {
  let wrapper;
  const mockStore = {
    location: {
      mapLocations,
      userLocation: {
        lng: 2,
        lat: 2,
      },
    },
  };

  const useSelectorMock = useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
    wrapper = shallow(<Map />);
  });

  afterEach(() => {
    useSelectorMock.mockClear();
  });

  describe("Map location are not fetched", () => {
    beforeAll(() => {
      mockStore.location.mapLocations = [];
    });

    it("should show only one Marker", () => {
      expect(wrapper.find(".marker").length).toBe(1);
    });
  });

  describe("Map location are fetched", () => {
    beforeAll(() => {
      mockStore.location.mapLocations = mapLocations;
    });

    it("should show 2 Markers", () => {
      expect(wrapper.find(".markers").length).toBe(2);
    });
  });
});
