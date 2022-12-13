import React from "react";
import { shallow } from "enzyme";

import fullStackWebDevCalendarEvents from "../assets/data/full-stack-web-dev-calendar-events";
import Event from "../components/event";

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
    expect(EventWrapper.state("collapsed")).toBe(true);
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

  test("renders button show details (⌄), when details are collapsed", () => {
    EventWrapper.setState({ collapsed: true });
    const btnEventDetailsEl = EventWrapper.find(".event-button__details");

    expect(btnEventDetailsEl).toHaveLength(1);
    expect(btnEventDetailsEl.text()).toBe("⌄ details");
  });

  test("renders details expanded, when show details (⌄) is clicked", () => {
    EventWrapper.setState({ collapsed: true });
    const btnEventDetailsEl = EventWrapper.find(".event-button__details");

    expect(btnEventDetailsEl.text()).toBe("⌄ details");
    expect(EventWrapper.find(".event-about")).toHaveLength(0);
    expect(EventWrapper.find(".event-htmlLink")).toHaveLength(0);
    expect(EventWrapper.find(".event-description")).toHaveLength(0);

    btnEventDetailsEl.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
    expect(EventWrapper.find(".event-button__details").text()).toBe(
      "^ details"
    );
    expect(EventWrapper.find(".event-about")).toHaveLength(1);
    expect(EventWrapper.find(".event-htmlLink")).toHaveLength(1);
    expect(EventWrapper.find(".event-description")).toHaveLength(1);
  });

  test("renders details collapsed, when hide details (^) is clicked", () => {
    EventWrapper.setState({ collapsed: false });

    const btnEventDetailsEl = EventWrapper.find(".event-button__details");
    const txtEventAboutEl = EventWrapper.find(".event-about");
    const lnkHtmlLinkEl = EventWrapper.find(".event-htmlLink");
    const txtDescriptionEl = EventWrapper.find(".event-description");

    expect(btnEventDetailsEl.text()).toBe("^ details");
    expect(txtEventAboutEl).toHaveLength(1);
    expect(txtEventAboutEl.text()).toBe("About event:");
    expect(lnkHtmlLinkEl).toHaveLength(1);
    expect(lnkHtmlLinkEl.text()).toBe("See details on Google Calendar");
    expect(lnkHtmlLinkEl.prop("href")).toBe(event.htmlLink);
    expect(txtDescriptionEl).toHaveLength(1);
    expect(txtDescriptionEl.text()).toBe(event.description);

    btnEventDetailsEl.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(true);
  });
});
