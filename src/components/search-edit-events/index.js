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
        <Accordion.Header>
          <div className="text-green">
            Search cities or edit the number of events
          </div>
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
