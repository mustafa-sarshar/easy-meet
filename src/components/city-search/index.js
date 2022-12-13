import React, { Component } from "react";

class CitySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      suggestions: [],
    };
  }

  handleInputChanged = (event) => {
    const { value } = event.target;
    const suggestions = this.props.locations.filter(
      (location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    // let suggestions;
    // if (this.props.locations) {
    //   suggestions = this.props.locations.filter(
    //     (location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1
    //   );
    // } else {
    //   suggestions = [value];
    // }

    this.setState({
      query: value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
    });
  };

  render() {
    return (
      <div className="city-search">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion, idx) => (
            <li
              key={suggestion + idx}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key="all">
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
