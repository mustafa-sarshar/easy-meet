import React, { Component } from "react";
import ErrorAlert from "../alert/error-alert";

import { Form } from "react-bootstrap";

import "./styles.css";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nEvents: 32,
      errorMessage: null,
    };
  }

  render() {
    const { nEvents, errorMessage } = this.state;

    return (
      <Form>
        <label>Number of Events</label>
        <input
          className="event-numbers"
          type="number"
          value={nEvents}
          min={1}
          max={32}
          step={1}
          onChange={(event) => {
            this.changeNumOfEvents(Number(event.target.value));
          }}
        ></input>
        <ErrorAlert message={errorMessage} />
      </Form>
    );
  }
  changeNumOfEvents = async (value) => {
    if (value > 0 && value < 33) {
      this.setState({ nEvents: value, errorMessage: null });
      await this.props.onNumOfEventsChange(undefined, value);
    } else {
      this.setState({
        errorMessage: "Select a number from 1 to 32",
      });
    }
  };
}

export default NumberOfEvents;
