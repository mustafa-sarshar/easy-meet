import React, { Component } from "react";

import styles from "./styles.module.css";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = { nEvents: 32 };
  }

  render() {
    const { nEvents } = this.state;

    return (
      <>
        <label>Number of Events</label>
        <input
          className={styles["event-numbers"]}
          type="number"
          value={nEvents}
          min={1}
          max={32}
          step={1}
          onChange={(event) => {
            this.changeNumOfEvents(Number(event.target.value));
          }}
        ></input>
      </>
    );
  }
  changeNumOfEvents = async (value) => {
    if (value > 0 && value < 32) {
      this.setState({ nEvents: value });
      await this.props.onNumOfEventsChange(undefined, value);
    }
  };
}

export default NumberOfEvents;
