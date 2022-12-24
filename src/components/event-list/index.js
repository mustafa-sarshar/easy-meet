import React, { Component } from "react";
import Event from "../event";

import "./styles.css";

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <div className="card event-list__card">
        <div className="card-body">
          <div className="card-title event-list__title">All Events</div>
          <div className="row justify-content-md-center mt-1">
            {events.map((event) => (
              <div
                className="col col-xl-4 col-md-6 col-sm-12 mb-3"
                key={"eventLi_" + event.id}
              >
                <Event event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
