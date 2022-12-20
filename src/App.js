import React, { Component } from "react";
import {
  extractLocations,
  getEventsFromServer,
  checkToken,
  getAccessToken,
} from "./apis";

import "./assets/css/nprogress.css";
import "./App.css";

import CitySearch from "./components/city-search";
import EventList from "./components/event-list";
import NumberOfEvents from "./components/number-of-events";
import WarningAlert from "./components/alert/warning-alert";
import WelcomeScreen from "./components/welcome-screen";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      locations: [],
      nEvents: 32,
      showWelcomeScreen: undefined,
    };
  }

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEventsFromServer().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { events, locations, nEvents, showWelcomeScreen } = this.state;
    const warningMessage = navigator.onLine
      ? ""
      : "App is running in Offline-Mode";

    if (showWelcomeScreen === undefined) {
      return <div className="App"></div>;
    }

    return (
      <div className="App">
        <WarningAlert message={warningMessage} />
        <CitySearch
          locations={locations}
          onUpdateEvents={this.updateEventsHandler}
        />
        <NumberOfEvents onNumOfEventsChange={this.updateEventsHandler} />
        <EventList events={events.slice(0, nEvents)} />
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={getAccessToken}
        />
      </div>
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
