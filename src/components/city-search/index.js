import React, { Component } from "react";
import InfoAlert from "../alert/info-alert";
import { Form, ListGroup, Alert, Row, Col } from "react-bootstrap";

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
        alertMessage: "No city found",
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
      <Form className="city-search" autoComplete="off">
        <Form.Group controlId="formGroup-SearchCity">
          <Row>
            <Col>
              <Form.Label>Search cities</Form.Label>
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
              <InfoAlert message={alertMessage} />
            </Col>
          </Row>
        </Form.Group>
        <ListGroup
          defaultActiveKey="#all"
          className="city-search__suggestions"
          style={showSuggestions ? {} : { display: "none" }}
        >
          {suggestions.map((suggestion, idx) => (
            <ListGroup.Item
              key={suggestion + idx}
              className="city-search__suggestions-items"
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
            onClick={(evt) => {
              evt.preventDefault();
              this.handleItemClicked("all");
            }}
          >
            All cities
          </ListGroup.Item>
        </ListGroup>
      </Form>
    );
  }
}

export default CitySearch;
