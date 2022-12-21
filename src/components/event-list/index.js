import React, { Component } from "react";
import Event from "../event";

import "./styles.css";

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <div className="container">
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EventList;
