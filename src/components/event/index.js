import React, { Component } from "react";

import "./styles.css";

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
      <div className="event">
        <h1 className="event-summary">{event.summary}</h1>
        <p className="event-start">
          {new Date(event.start.dateTime).toString()}
        </p>
        <p className="event-location">{`@${event.location}`}</p>

        {!collapsed && (
          <div className="event-details">
            <h2 className="event-details__about">About event:</h2>

            <p className="event-details__description">{event.description}</p>
            <a className="event-details__htmlLink" href={event.htmlLink}>
              See the details on Google Calendar
            </a>
            <div className="clearfix"></div>
          </div>
        )}

        <button
          className="event-button__details"
          onClick={() => this.toggleDetails()}
        >
          {collapsed ? "⌄" : "^"} details
        </button>
      </div>
    );
  }
}

export default Event;
