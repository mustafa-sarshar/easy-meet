import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { extractLocations, getEventsFromServer } from "./apis";

import "./assets/css/nprogress.css";
import "./App.css";

import CitySearch from "./components/city-search";
import EventList from "./components/event-list";
import NumberOfEvents from "./components/number-of-events";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      locations: [],
      nEvents: 32,
    };
  }

  componentDidMount() {
    this.mounted = true;

    getEventsFromServer().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { events, locations, nEvents } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <div className="App">
              <CitySearch
                locations={locations}
                onUpdateEvents={this.updateEventsHandler}
              />
              <NumberOfEvents onNumOfEventsChange={this.updateEventsHandler} />
              <EventList events={events.slice(0, nEvents)} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  updateEventsHandler = async (location, nEvents) => {
    if (location) {
      await getEventsFromServer().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location.trim());

        this.setState({
          events: locationEvents,
        });
      });
    }
    if (nEvents) {
      this.setState({
        nEvents: nEvents,
      });
    }
  };
}

export default App;
