import React from "react";

import CitySearch from "../city-search";
import NumberOfEvents from "../number-of-events";

import "./styles.css";

const SearchEditEvents = (props) => {
  const { locations, onUpdateEvents } = props;

  return (
    <div className="accordion" id="accordionSearchEditEvents">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOneSearchEditEvents">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSearchEditEvents-1"
            aria-expanded="false"
            aria-controls="collapseSearchEditEvents-1"
          >
            Search cities or edit the number of events
          </button>
        </h2>
        <div
          id="collapseSearchEditEvents-1"
          className="accordion-collapse collapse"
          aria-labelledby="#headingOneSearchEditEvents"
          data-bs-parent="#accordionSearchEditEvents"
        >
          <div className="accordion-body">
            <div className="row mx-auto">
              <div className="col-md-6 col-sm-12">
                <CitySearch
                  locations={locations}
                  onUpdateEvents={onUpdateEvents}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <NumberOfEvents onNumOfEventsChange={onUpdateEvents} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEditEvents;
