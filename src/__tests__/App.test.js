import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import EventList from "../components/event-list";
import CitySearch from "../components/city-search";
import NumberOfEvents from "../components/number-of-events";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("renders all components in the main div", () => {
    expect(AppWrapper.find(".App")).toBeDefined();
  });

  test("renders list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("renders CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("renders NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
