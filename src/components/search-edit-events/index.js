import React from "react";
import { Accordion, Row, Col } from "react-bootstrap";

import CitySearch from "../city-search";
import NumberOfEvents from "../number-of-events";

import "./styles.css";

const SearchEditEvents = (props) => {
  const { locations, onUpdateEvents } = props;

  return (
    <Accordion className="accordion-container">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="event-details">
          Search cities or edit the number of events
        </Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <CitySearch
                locations={locations}
                onUpdateEvents={onUpdateEvents}
              />
            </Col>
            <Col>
              <NumberOfEvents onNumOfEventsChange={onUpdateEvents} />
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SearchEditEvents;
