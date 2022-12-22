import React, { Component } from "react";
import { Form, ListGroup, Row, Col } from "react-bootstrap";

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
    event.preventDefault();

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
      <Form
        className="city-search"
        autoComplete="off"
        onSubmit={(evt) => evt.preventDefault()}
      >
        <Form.Group controlId="formGroup-SearchCity">
          <Row>
            <Col>
              <Form.Label style={alertStyle}>{alertMessage}</Form.Label>
              <Form.Control
                type="text"
                className="city-search__city"
                placeholder="enter the city name to search"
                value={query}
                onChange={this.handleInputChanged}
                onFocus={() => {
                  this.setState({ showSuggestions: true });
                }}
              />
              <ListGroup
                defaultActiveKey="#all"
                className="city-search__suggestions"
                style={suggestionsStyle}
              >
                {suggestions.map((suggestion, idx) => (
                  <ListGroup.Item
                    key={suggestion + idx}
                    className="city-search__suggestions-items"
                    style={alertStyle}
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.handleItemClicked(suggestion);
                    }}
                  >
                    {suggestion}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item
                  key="all"
                  className="city-search__suggestions-items"
                  style={alertStyle}
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.handleItemClicked("all");
                  }}
                >
                  All cities
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    );
  }
}

export default CitySearch;
