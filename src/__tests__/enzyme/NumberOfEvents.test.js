import React from "react";
import { shallow } from "enzyme";

import NumberOfEvents from "../../components/number-of-events";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents onNumOfEventsChange={() => {}} />
    );
  });

  test("renders the component", () => {
    expect(NumberOfEventsWrapper).toBeDefined();
  });

  test("renders number of events 32 by default", () => {
    expect(NumberOfEventsWrapper.state("nEvents")).toBe(32);
  });

  test("App passes the 'onNumOfEventsChange' event handler to NumberOfEvents component", () => {
    expect(NumberOfEventsWrapper.props("onNumOfEventsChange")).toBeDefined();
  });

  test("the method 'changeNumOfEvents' updates the state 'nEvents' when the given value is in the valid range (1-32)", () => {
    NumberOfEventsWrapper.find(".event-numbers").simulate("change", {
      target: { value: 1000 },
    });
    expect(NumberOfEventsWrapper.state("nEvents")).toBe(32);

    NumberOfEventsWrapper.find(".event-numbers").simulate("change", {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state("nEvents")).toBe(10);
  });

  test("renders the new number of events when the user changes it", () => {
    NumberOfEventsWrapper.find(".event-numbers").simulate("change", {
      target: { value: 24 },
    });
    expect(NumberOfEventsWrapper.state("nEvents")).toBe(24);
  });
});
