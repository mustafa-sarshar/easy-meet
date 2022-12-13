import React, { Component } from "react";

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
      <div>
        <h1 className="event-summary">{event.summary}</h1>
        <p className="event-start">
          {new Date(event.start.dateTime).toString()}
        </p>
        <p className="event-location">{`@${event.location}`}</p>

        {!collapsed && (
          <>
            <h2 className="event-about">About event:</h2>
            <a className="event-htmlLink" href={event.htmlLink}>
              See details on Google Calendar
            </a>
            <p className="event-description">{event.description}</p>
          </>
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
