import React from "react";
import { shallow } from "enzyme";

import NumberOfEvents from "../components/number-of-events";

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

  test("renders the new number of events when the user changes it", () => {
    expect(NumberOfEventsWrapper.state("nEvents")).toBe(32);

    NumberOfEventsWrapper.find(".event-number").simulate("change", {
      target: { value: 24 },
    });
    expect(NumberOfEventsWrapper.state("nEvents")).toBe(24);
  });
});
