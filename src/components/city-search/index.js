import React, { Component } from "react";
import InfoAlert from "../alert/info-alert";

import { Form } from "react-bootstrap";

import "./styles.css";

class CitySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      suggestions: [],
      showSuggestions: undefined,
      alertMessage: "",
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
        alertMessage:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        alertMessage: "",
      });
    }
  };

  handleItemClicked = (suggestion) => {
    const { onUpdateEvents } = this.props;

    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      alertMessage: "",
    });

    onUpdateEvents(suggestion);
  };

  render() {
    const { query, suggestions, showSuggestions, alertMessage } = this.state;

    return (
      <Form className="city-search">
        <InfoAlert message={alertMessage} />
        <label>Search cities:</label>
        <input
          type="text"
          className="city-search__city"
          value={query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="city-search__suggestions"
          style={showSuggestions ? {} : { display: "none" }}
        >
          {suggestions.map((suggestion, idx) => (
            <li
              key={suggestion + idx}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key="all" onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </Form>
    );
  }
}

export default CitySearch;
