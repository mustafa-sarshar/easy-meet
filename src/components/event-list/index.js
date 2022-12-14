import React, { Component } from "react";
import Event from "../event";

import styles from "./styles.module.css";

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <ul className={styles["event-list"]}>
        {events.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
