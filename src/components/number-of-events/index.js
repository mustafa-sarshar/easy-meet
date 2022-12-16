import React, { Component } from "react";

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
        {errorMessage && (
          <>
            <br />
            <span className="event-error">{errorMessage}</span>
          </>
        )}
      </Form>
    );
  }
  changeNumOfEvents = async (value) => {
    this.setState({ errorMessage: null });
    if (value > 0 && value < 33) {
      this.setState({ nEvents: value });
      await this.props.onNumOfEventsChange(undefined, value);
    } else {
      this.setState({
        errorMessage: "Number of events can be between 1 and 32",
      });
    }
  };
}

export default NumberOfEvents;
