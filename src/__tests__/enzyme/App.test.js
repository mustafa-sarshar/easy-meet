import React from "react";
import { shallow, mount } from "enzyme";

import App from "../../App";
import SearchEditEvents from "../../components/search-edit-events";
import EventsStatistics from "../../components/events-statistics";
import EventList from "../../components/event-list";
import CitySearch from "../../components/city-search";
import NumberOfEvents from "../../components/number-of-events";

import fullStackWebDevCalendarEvents from "../../assets/data/full-stack-web-dev-calendar-events";
import { extractLocations, getEventsFromServer } from "../../apis";

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

  test("renders SearchEditEvents accordion", async () => {
    const SearchEditEventsWrapper = await AppWrapper.find(SearchEditEvents);
    AppWrapper.update();
    expect(SearchEditEventsWrapper).toHaveLength(1);
  });

  test("renders EventsStatistics accordion", () => {
    expect(AppWrapper.find(EventsStatistics)).toHaveLength(1);
  });
});

// describe("<App /> integration", () => {
// test("App passes 'events' state as a prop to EventList", () => {
// const AppWrapper = mount(<App />);
// const AppEventsState = AppWrapper.state().events;

// expect(AppEventsState).not.toEqual(undefined);

// const EventListEventsProp = AppWrapper.find(EventList).props().events;
// expect(EventListEventsProp).toEqual(AppEventsState);

// AppWrapper.unmount();
// });

// test("App passes 'locations' state as a prop to CitySearch", () => {
//   const AppWrapper = mount(<App />);

//   const AppLocationsState = AppWrapper.state("locations");
//   expect(AppLocationsState).not.toEqual(undefined);
//   expect(AppWrapper.find(CitySearch).props().locations).toEqual(
//     AppLocationsState
//   );

//   AppWrapper.unmount();
// });

// test("get list of events matching the city selected by the user", async () => {
//   const AppWrapper = mount(<App />);

//   const CitySearchWrapper = AppWrapper.find(CitySearch);
//   const locations = extractLocations(fullStackWebDevCalendarEvents);

//   CitySearchWrapper.setState({ suggestions: locations });

//   const suggestions = CitySearchWrapper.state("suggestions");
//   const selectedIndex = Math.floor(Math.random() * suggestions.length);
//   const selectedCity = suggestions[selectedIndex];

//   await CitySearchWrapper.instance().handleItemClicked(selectedCity);

//   const allEvents = await getEventsFromServer();
//   const eventsToShow = allEvents.filter(
//     (event) => event.location === selectedCity
//   );
//   expect(AppWrapper.state("events")).toEqual(eventsToShow);

//   AppWrapper.unmount();
// });

// test("get list of all events when user selects 'See all cities'", async () => {
//   const AppWrapper = await mount(<App />);

//   const suggestionItemsEl = AppWrapper.find(CitySearch).find(
//     ".city-search__suggestions li"
//   );
//   await suggestionItemsEl.at(suggestionItemsEl.length - 1).simulate("click");

//   const allEvents = await getEventsFromServer();
//   expect(AppWrapper.state("events")).toEqual(allEvents);

//   AppWrapper.unmount();
// });

// test("App passes the 'onNumOfEventsChange' to the NumberOfEvents component", async () => {
//   const AppWrapper = await mount(<App />);

//   const updateEventsHandler = AppWrapper.instance().updateEventsHandler;
//   const { onNumOfEventsChange } = AppWrapper.find(NumberOfEvents).props();

//   expect(onNumOfEventsChange).not.toEqual(undefined);
//   expect(updateEventsHandler).toEqual(onNumOfEventsChange);

//   AppWrapper.unmount();
// });

// test("The number of events in the App changes when the user changes it", async () => {
//   const AppWrapper = await mount(<App />);

//   const numEventsInputEl =
//     AppWrapper.find(NumberOfEvents).find(".event-numbers");
//   const nEventsUpdate = { target: { value: 5 } };
//   numEventsInputEl.simulate("change", nEventsUpdate);
//   expect(AppWrapper.state("nEvents")).toEqual(nEventsUpdate.target.value);

//   AppWrapper.unmount();
// });

// test("The number of events to be shown are equal to specified number of events by the user", async () => {
//   const AppWrapper = await mount(<App />);

//   const nEventsInputEl =
//     AppWrapper.find(NumberOfEvents).find(".event-numbers");
//   const nEventsUpdate = { target: { value: 2 } };

//   await nEventsInputEl.simulate("change", nEventsUpdate);

//   expect(AppWrapper.state("nEvents")).toEqual(2);
//   expect(AppWrapper.find(NumberOfEvents).state("nEvents")).toEqual(2);
//   expect(AppWrapper.find(EventList).props().events.length).toEqual(2);

//   AppWrapper.unmount();
// });
// });
