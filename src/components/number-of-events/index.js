import React, { Component } from "react";
import ErrorAlert from "../alert/error-alert";

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
      <form
        className="event-form"
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
                className="form-control event-numbers"
                id="event-numbers-enter"
                aria-describedby="nEventsInput"
                type="number"
                value={nEvents}
                min={1}
                max={32}
                step={1}
                onChange={this.changeNumOfEvents}
              />
              <div id="nEventsInput" className="form-text">
                <ErrorAlert message={errorMessage} />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
  changeNumOfEvents = (event) => {
    const value = Number(event.target.value);
    if (value > 0 && value < 33) {
      this.setState({ nEvents: value, errorMessage: null });
      this.props.onNumOfEventsChange(undefined, value);
    } else {
      this.setState({
        errorMessage: "Select a number from 1 to 32",
      });
    }
  };
}

export default NumberOfEvents;
