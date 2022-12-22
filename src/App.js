import React, { Component } from "react";
import {
  extractLocations,
  extractEventsSummary,
  getEventsFromServer,
  checkToken,
  getAccessToken,
} from "./apis";

import "./assets/css/nprogress.css";
import "./App.css";

import Banner from "./components/banner";
import WarningAlert from "./components/alert/warning-alert";
import CitySearch from "./components/city-search";
import NumberOfEvents from "./components/number-of-events";
import EventList from "./components/event-list";
import WelcomeScreen from "./components/welcome-screen";
import EventsStatisticsBarChart from "./components/statistics/events-statistics-bar-chart";
import EventsStatisticsPieChart from "./components/statistics/events-statistics-pie-chart";
import SearchEditEvents from "./components/search-edit-events";
import MyPieChart from "./components/charts/pie-chart";

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

    // For local testing
    // getEventsFromServer().then((events) => {
    //   if (this.mounted) {
    //     this.setState({ events, locations: extractLocations(events) });
    //   }
    // });
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
        <Banner />
        <WarningAlert message={warningMessage} />
        <EventsStatisticsPieChart
          cityStatisticsData={this.getCityStatistics()}
          eventsSummaryStatisticsData={this.getEventsSummaryStatistics()}
        />
        <EventsStatisticsBarChart
          cityStatisticsData={this.getCityStatistics()}
          eventsSummaryStatisticsData={this.getEventsSummaryStatistics()}
        />
        <SearchEditEvents
          locations={locations}
          onUpdateEvents={this.updateEventsHandler}
        />
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

  getCityStatistics = () => {
    const { locations, events } = this.state;

    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;

      let city = location.split(", ").shift();
      if (city.indexOf("-") > 0) {
        city = city.split("- ").shift();
      }
      if (number > 0) {
        return { city, number };
      } else {
        return { city, number: undefined };
      }
    });

    return data;
  };

  getEventsSummaryStatistics = () => {
    const { events } = this.state;
    const eventsSummary = extractEventsSummary(events);

    const data = eventsSummary.map((summary) => {
      const number = events.filter((event) => event.summary === summary).length;
      return { summary, number };
    });
    return data;
  };
}

export default App;
