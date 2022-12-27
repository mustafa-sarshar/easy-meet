import React, { Component } from "react";

import "./styles.css";

const genres = ["JavaScript", "Node", "jQuery", "React", "Angular"];

class Event extends Component {
  render() {
    const { event } = this.props;
    const genre = genres.filter((genre) =>
      event.summary.trim().toLowerCase().includes(genre.toLowerCase())
    );

    return (
      <div className="card event h-100 w-100">
        <div className="card-header" style={{ fontSize: "0.8rem" }}>
          <b>*** {genre} ***</b>
        </div>
        <div className="card-title">
          <h3 className="event-summary">{event.summary}</h3>
        </div>
        <div className="card-body">
          <p className="event-start">
            {new Date(event.start.dateTime).toString()}
          </p>
          <p className="event-location">{`@${event.location}`}</p>
        </div>

        <div className="card-footer" style={{ padding: "0" }}>
          <div
            className="accordion accordion-flush"
            id={`accordionEvent_${event.id}`}
            style={{ width: "100%", border: "none" }}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={`headingOneEvent_${event.id}`}
              >
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseEvent_${event.id}`}
                  aria-expanded="false"
                  aria-controls={`collapseEvent_${event.id}`}
                >
                  About event
                </button>
              </h2>
              <div
                id={`collapseEvent_${event.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`#headingOneEvent_${event.id}`}
                data-bs-parent={`#accordionEvent_${event.id}`}
              >
                <div className="accordion-body">
                  <p className="event-details__description">
                    {event.description}
                  </p>
                  <a
                    className="event-details__htmlLink"
                    href={event.htmlLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    See the details on Google Calendar
                  </a>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
