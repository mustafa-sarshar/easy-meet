import React from "react";
import { shallow } from "enzyme";
import { extractLocations } from "../../apis";

import CitySearch from "../../components/city-search";

import mockData from "../../assets/data/mock-data";

describe("<CitySearch /> component", () => {
  let CitySearchWrapper, locations;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} onUpdateEvents={() => {}} />
    );
  });

  test("render text input", () => {
    expect(CitySearchWrapper.find(".city-search__city")).toHaveLength(1);
  });

  test("renders text input correctly", () => {
    const query = CitySearchWrapper.state("query");
    expect(CitySearchWrapper.find(".city-search__city").prop("value")).toBe(
      query
    );
  });

  test("change state when text input changes", () => {
    CitySearchWrapper.setState({
      query: "Munich",
    });

    const eventObject = { target: { value: "Berlin" } };

    CitySearchWrapper.find(".city-search__city").simulate(
      "change",
      eventObject
    );
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });

  test("render a list of suggestions", () => {
    expect(CitySearchWrapper.find(".city-search__suggestions")).toHaveLength(1);
  });

  test("render list of suggestions correctly", () => {
    CitySearchWrapper.setState({ suggestions: locations });

    const suggestions = CitySearchWrapper.state("suggestions");
    expect(CitySearchWrapper.find(".city-search__suggestions li")).toHaveLength(
      suggestions.length + 1
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(
        CitySearchWrapper.find(".city-search__suggestions li").at(i).text()
      ).toBe(suggestions[i]);
    }
  });

  test("suggestion list match the query when changed", () => {
    CitySearchWrapper.setState({ query: "", suggestions: [] });
    CitySearchWrapper.find(".city-search__city").simulate("change", {
      target: { value: "Berlin" },
    });

    const query = CitySearchWrapper.state("query");
    const filteredLocations = locations.filter(
      (location) => location.toUpperCase().indexOf(query.toUpperCase()) > -1
    );
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });

  test("selecting a suggestion should change query state", () => {
    CitySearchWrapper.setState({
      query: "Berlin",
    });
    const suggestions = CitySearchWrapper.state("suggestions");

    CitySearchWrapper.find(".city-search__suggestions li")
      .at(0)
      .simulate("click");
    expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
  });

  test("selecting CitySearch input reveals the suggestions list", () => {
    CitySearchWrapper.find(".city-search__city").simulate("focus");

    expect(CitySearchWrapper.state("showSuggestions")).toBe(true);
    expect(
      CitySearchWrapper.find(".city-search__suggestions").prop("style")
    ).not.toEqual({
      display: "none",
    });
  });

  test("selecting a suggestion should hide the suggestions list", () => {
    CitySearchWrapper.setState({
      query: "Berlin",
      showSuggestions: undefined,
    });

    CitySearchWrapper.find(".city-search__suggestions li")
      .at(0)
      .simulate("click");

    expect(CitySearchWrapper.state("showSuggestions")).toBe(false);
    expect(
      CitySearchWrapper.find(".city-search__suggestions").prop("style")
    ).toEqual({
      display: "none",
    });
  });
});
