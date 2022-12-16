import React from "react";
import { shallow } from "enzyme";

import EventList from "../../components/event-list";
import Event from "../../components/event";

import mockData from "../../assets/data/mock-data";

describe("<EventList /> component", () => {
  test("render correct number of events", () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(3);
  });
});
