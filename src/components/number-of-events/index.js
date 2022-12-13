import React, { Component } from "react";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = { nEvents: 32 };
  }

  changeNumOfEvents = (value) => {
    this.setState({ nEvents: value });
  };

  render() {
    const { nEvents } = this.state;

    return (
      <label>
        Number of Events
        <input
          className="event-number"
          type="number"
          value={nEvents}
          onChange={(event) => {
            this.changeNumOfEvents(event.target.value);
          }}
        ></input>
      </label>
    );
  }
}

export default NumberOfEvents;
