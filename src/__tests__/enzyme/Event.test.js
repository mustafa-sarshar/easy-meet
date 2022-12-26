import React from "react";
import { shallow } from "enzyme";

import fullStackWebDevCalendarEvents from "../../assets/data/full-stack-web-dev-calendar-events";
import Event from "../../components/event";

describe("Event /> component", () => {
  let EventWrapper;
  const event = fullStackWebDevCalendarEvents[0];

  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test("renders the component", () => {
    expect(EventWrapper).toBeDefined();
  });

  test("renders event details collapsed by default", () => {
    expect(
      EventWrapper.find(".accordion-button").hasClass("collapsed")
    ).toEqual(true);
  });

  test("renders the summary of event", () => {
    const eventSummaryEl = EventWrapper.find(".event-summary");

    expect(eventSummaryEl).toHaveLength(1);
    expect(eventSummaryEl.text()).toBe(event.summary);
  });

  test("renders the event's start time details", () => {
    const txtEventStartEl = EventWrapper.find(".event-start");

    expect(txtEventStartEl).toHaveLength(1);
    expect(txtEventStartEl.text()).toBe(
      new Date(event.start.dateTime).toString()
    );
  });

  test("renders the event's location details", () => {
    const txtEventLocationEl = EventWrapper.find(".event-location");

    expect(txtEventLocationEl).toHaveLength(1);
    expect(txtEventLocationEl.text()).toBe(`@${event.location}`);
  });

  test("renders button 'About event', when details are collapsed", () => {
    EventWrapper.setState({ collapsed: true });
    const btnEventDetailsEl = EventWrapper.find(".accordion-button");

    expect(btnEventDetailsEl).toHaveLength(1);
    expect(btnEventDetailsEl.text()).toBe("About event");
  });

  test("renders details expanded, when 'About event' is clicked", async () => {
    EventWrapper.update();

    const btnEventDetailsEl = EventWrapper.find(".accordion-button");
    const accordionCollapseEl = EventWrapper.find(".accordion-collapse");
    expect(accordionCollapseEl.hasClass("show")).toBe(false);

    await btnEventDetailsEl.simulate("click");

    expect(EventWrapper.find(".event-details__htmlLink")).toHaveLength(1);
    expect(EventWrapper.find(".event-details__description")).toHaveLength(1);
  });

  test("renders details collapsed, when 'About event' is clicked again", async () => {
    EventWrapper.update();

    const btnEventDetailsEl = EventWrapper.find(".accordion-button");
    expect(btnEventDetailsEl.hasClass("collapsed")).toEqual(true);

    await btnEventDetailsEl.simulate("click");
    EventWrapper.update();
  });
});
