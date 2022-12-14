import React, { Component } from "react";

import styles from "./styles.module.css";

class CitySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      suggestions: [],
      showSuggestions: undefined,
    };
  }

  handleInputChanged = (event) => {
    const { value } = event.target;
    const suggestions = this.props.locations.filter(
      (location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1
    );

    this.setState({
      query: value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    const { onUpdateEvents } = this.props;

    this.setState({
      query: suggestion,
      showSuggestions: false,
    });

    onUpdateEvents(suggestion);
  };

  render() {
    const { query, suggestions, showSuggestions } = this.state;

    return (
      <div className={styles["city-search"]}>
        <label>Search cities:</label>
        <input
          type="text"
          className={styles["city-search__city"]}
          value={query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className={styles["city-search__suggestions"]}
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
      </div>
    );
  }
}

export default CitySearch;
