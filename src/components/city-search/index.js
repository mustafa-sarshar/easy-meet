import React, { Component } from "react";

import "./styles.css";

class CitySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      suggestions: [],
      showSuggestions: undefined,
      alertMessage: "Search cities",
    };
  }

  handleInputChanged = (event) => {
    const { value } = event.target;
    this.setState({ showSuggestions: true });

    const suggestions = this.props.locations.filter(
      (location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1
    );

    if (suggestions.length === 0) {
      this.setState({
        query: value,
        alertMessage: "No city found",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        alertMessage: "Search cities",
      });
    }
  };

  handleItemClicked = (suggestion) => {
    const { onUpdateEvents } = this.props;

    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      alertMessage: "Search cities",
    });

    onUpdateEvents(suggestion);
  };

  render() {
    const { query, suggestions, showSuggestions, alertMessage } = this.state;
    const suggestionsStyle = showSuggestions ? {} : { display: "none" };
    const alertStyle = alertMessage === "Search cities" ? {} : { color: "red" };

    return (
      <form
        className="city-search"
        autoComplete="off"
        onSubmit={(evt) => evt.preventDefault()}
      >
        <div className="input-group mb-3">
          <div className="row mx-auto">
            <div className="col">
              <label htmlFor="event-numbers-enter" className="form-label">
                Number of Events
              </label>
              <input
                type="text"
                id="city-search-enter"
                aria-describedby="city-search-input"
                className="form-control city-search__city"
                placeholder="enter the city name to search"
                value={query}
                onChange={this.handleInputChanged}
                onFocus={() => {
                  this.setState({ showSuggestions: true });
                }}
              />
              <ul
                className="list-group list-group city-search__suggestions"
                style={suggestionsStyle}
              >
                {suggestions.map((suggestion, idx) => (
                  <li
                    key={suggestion + idx}
                    className="list-group-item city-search__suggestions-items"
                    style={alertStyle}
                    onClick={() => {
                      this.handleItemClicked(suggestion);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
                <li
                  key="all"
                  className="list-group-item city-search__suggestions-items"
                  style={alertStyle}
                  onClick={() => {
                    this.handleItemClicked("all");
                  }}
                >
                  All cities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CitySearch;
