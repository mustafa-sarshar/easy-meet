import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Event from "../event";

import "./styles.css";

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <Card className="event-list__card">
        <Card.Body>
          <Card.Title className="event-list__title">All Events</Card.Title>
          <Row className="main-view justify-content-md-center mt-1">
            {events.map((event) => (
              <Col
                key={"eventLi_" + event.id}
                className="mb-3"
                xl={4}
                md={6}
                sm={12}
              >
                <Event event={event} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default EventList;
