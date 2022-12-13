import React from "react";
import "./App.css";

import EventList from "./components/event-list";
import CitySearch from "./components/city-search";
import NumberOfEvents from "./components/number-of-events";

function App() {
  return (
    <div className="App">
      <EventList />
      <CitySearch />
      <NumberOfEvents />
    </div>
  );
}

export default App;
