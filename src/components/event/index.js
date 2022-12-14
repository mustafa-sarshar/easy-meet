import React, { Component } from "react";

import styles from "./styles.module.css";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <div className={styles.event}>
        <h1 className={styles["event-summary"]}>{event.summary}</h1>
        <p className={styles["event-start"]}>
          {new Date(event.start.dateTime).toString()}
        </p>
        <p className={styles["event-location"]}>{`@${event.location}`}</p>

        {!collapsed && (
          <div className={styles["event-details"]}>
            <h2 className={styles["event-details__about"]}>About event:</h2>

            <p className={styles["event-details__description"]}>
              {event.description}
            </p>
            <a
              className={styles["event-details__htmlLink"]}
              href={event.htmlLink}
            >
              See the details on Google Calendar
            </a>
            <div className={styles.clearfix}></div>
          </div>
        )}

        <button
          className={styles["event-button__details"]}
          onClick={() => this.toggleDetails()}
        >
          {collapsed ? "⌄" : "^"} details
        </button>
      </div>
    );
  }
}

export default Event;
