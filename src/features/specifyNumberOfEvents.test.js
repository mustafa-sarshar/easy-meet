import React from "react";
import { shallow, mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";

import App from "../App";
import NumberOfEvents from "../components/number-of-events";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number.", ({
    given,
    when,
    then,
  }) => {
    let NumberOfEventsWrapper;

    given("user hasn't specified a number", async () => {
      NumberOfEventsWrapper = await shallow(<NumberOfEvents />);
    });

    when("user want to specify a number of an event", () => {});

    then("the default event number will be 32", () => {
      expect(NumberOfEventsWrapper.state("nEvents")).toBe(32);
    });
  });

  test("User can change the number of events they want to see.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    let NumberOfEventsWrapper;
    const nEventsToShow = 5;

    given("user hasn't given specified the number of events", async () => {
      AppWrapper = await mount(<App />);
      const { updateEventsHandler } = AppWrapper.instance();
      NumberOfEventsWrapper = await shallow(
        <NumberOfEvents onNumOfEventsChange={updateEventsHandler} />
      );
    });

    when("user specifies a number of an event", async () => {
      await NumberOfEventsWrapper.find(".event-numbers").simulate("change", {
        target: { value: nEventsToShow },
      });
    });

    then("the events that has this number will be shown", () => {
      AppWrapper.update();

      expect(AppWrapper.find(".event")).toHaveLength(nEventsToShow);
    });
  });
});
