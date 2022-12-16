import React from "react";
import { shallow, mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";

import App from "../../App";
import Event from "../../components/event";

import fullStackWebDevCalendarEvents from "../../assets/data/full-stack-web-dev-calendar-events";

const feature = loadFeature(
  "./src/__tests__/jest-cucumber/features/showHideAnEventsDetails.feature"
);

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppWrapper;

    given("user has selected a city from the search box", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the events loads from the server", () => {
      AppWrapper.update();

      const { events } = AppWrapper.state();
      expect(events).toHaveLength(fullStackWebDevCalendarEvents.length);
    });

    then("the event elements will be collapsed by default", async () => {
      AppWrapper.update();

      const EventsWrapper = await AppWrapper.find(Event);
      await EventsWrapper.forEach((eventEl) => {
        expect(eventEl.state("collapsed")).toBe(true);
        expect(eventEl.find(".event-details")).toHaveLength(0);
      });
    });
  });

  test("User can expand an event to see its details.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    let FirstEventWrapper;
    given("the events are loaded and displayed on the screen", async () => {
      AppWrapper = await mount(<App />);

      const { nEvents, events } = await AppWrapper.state();
      expect(events).toHaveLength(fullStackWebDevCalendarEvents.length);

      AppWrapper.update();
      const EventsWrapper = await AppWrapper.find(Event);
      expect(EventsWrapper).toHaveLength(nEvents);
    });

    when("the user clicks on event elements", async () => {
      const EventsWrapper = await AppWrapper.find(Event);
      FirstEventWrapper = await shallow(EventsWrapper.get(0));
      await FirstEventWrapper.find(".event-button__details").simulate("click");
    });

    then(
      "the event element will be expanded and event's details will be shown",
      async () => {
        expect(FirstEventWrapper.state().collapsed).toBe(false);
        expect(FirstEventWrapper.find(".event-details")).toHaveLength(1);
      }
    );
  });

  test("User can collapse an event to hide its details.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    let FirstEventWrapper;
    given("an event element is expanded", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();

      FirstEventWrapper = await shallow(AppWrapper.find(Event).get(0));
      await FirstEventWrapper.find(".event-button__details").simulate("click");
      expect(FirstEventWrapper.state().collapsed).toBe(false);
      expect(FirstEventWrapper.find(".event-details")).toHaveLength(1);
    });

    when("user clicks on it", async () => {
      await FirstEventWrapper.find(".event-button__details").simulate("click");
    });

    then("the event element will be collapsed again", () => {
      expect(FirstEventWrapper.state().collapsed).toBe(true);
      expect(FirstEventWrapper.find(".event-details")).toHaveLength(0);
    });
  });
});
