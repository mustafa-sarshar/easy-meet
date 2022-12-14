import React, { Component } from "react";

import styles from "./styles.module.css";

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
          className={styles["event-numbers"]}
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
