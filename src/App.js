import React, { Component } from "react";
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
    const { events, locations } = this.state;

    return (
      <div className="App">
        <CitySearch
          locations={locations}
          onUpdateEvents={this.updateEventsHandler}
        />
        <NumberOfEvents />
        <EventList events={events} />
      </div>
    );
  }

  updateEventsHandler = (location) => {
    getEventsFromServer().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location.trim());

      this.setState({
        events: locationEvents,
      });
    });
  };
}

export default App;
