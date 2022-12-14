import React from "react";
import { shallow, mount } from "enzyme";

import App from "../App";
import EventList from "../components/event-list";
import CitySearch from "../components/city-search";
import NumberOfEvents from "../components/number-of-events";

import fullStackWebDevCalendarEvents from "../assets/data/full-stack-web-dev-calendar-events";
import { extractLocations, getEventsFull } from "../apis";

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

describe("<App /> integration", () => {
  test("App passes 'events' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state().events;

    expect(AppEventsState).not.toEqual(undefined);

    const EventListEventsProp = AppWrapper.find(EventList).props().events;
    expect(EventListEventsProp).toEqual(AppEventsState);

    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");

    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);

    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(fullStackWebDevCalendarEvents);

    CitySearchWrapper.setState({ suggestions: locations });

    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];

    await CitySearchWrapper.instance().handleItemClicked(selectedCity);

    const allEvents = await getEventsFull();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);

    AppWrapper.unmount();
  });

  test("get list of all events when user selects 'See all cities'", async () => {
    const AppWrapper = mount(<App />);

    const suggestionItemsEl = AppWrapper.find(CitySearch).find(
      ".city-search__suggestions li"
    );
    await suggestionItemsEl.at(suggestionItemsEl.length - 1).simulate("click");

    const allEvents = await getEventsFull();
    expect(AppWrapper.state("events")).toEqual(allEvents);

    AppWrapper.unmount();
  });
});
