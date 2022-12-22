import React, { Component } from "react";
import { Card, Accordion } from "react-bootstrap";

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

    return (
      <Card className="event h-100 w-100">
        <Card.Title>
          <h3 className="event-summary">{event.summary}</h3>
        </Card.Title>
        <Card.Body>
          <p className="event-start">
            {new Date(event.start.dateTime).toString()}
          </p>
          <p className="event-location">{`@${event.location}`}</p>
        </Card.Body>
        <Card.Footer>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="event-details">
                About event
              </Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Footer>
      </Card>
    );
  }
}

export default Event;
