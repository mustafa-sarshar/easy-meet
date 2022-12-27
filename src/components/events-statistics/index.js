import React from "react";

import BarRechart from "../charts/bar-rechart";
import PieRechart from "../charts/pie-rechart";

import "./styles.css";

const EventsStatistics = (props) => {
  const { cityStatisticsData, eventsGenreStatisticsData } = props;

  return (
    <div className="accordion" id="accordionEventsStatistics">
      <div className="accordion-item">
        <h2 className="accordion-header" id="#">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEventsStatistics-1"
            aria-expanded="false"
            aria-controls="collapseEventsStatistics-1"
          >
            Statistics
          </button>
        </h2>
        <div
          id="collapseEventsStatistics-1"
          className="accordion-collapse collapse"
          aria-labelledby="#headingOneEventsStatistics"
          data-bs-parent="#accordionEventsStatistics"
        >
          <div className="accordion-body">
            <ul
              className="nav nav-tabs mb-5 justify-content-around"
              id="eventsStatisticsTabs"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="nCityEvents-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nCityEvents"
                  type="button"
                  role="tab"
                  aria-controls="nCityEvents"
                  aria-selected="true"
                >
                  Number of events per city
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="eventsGenre-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#eventsGenre"
                  type="button"
                  role="tab"
                  aria-controls="eventsGenre"
                  aria-selected="false"
                >
                  Number of events per genre
                </button>
              </li>
            </ul>
            <div className="tab-content" id="eventsStatisticsTabsContent">
              <div
                className="tab-pane fade show active"
                id="nCityEvents"
                role="tabpanel"
                aria-labelledby="#nCityEvents-tab"
              >
                <BarRechart
                  data={cityStatisticsData.filter(
                    (data) => data.number !== undefined
                  )}
                  plotData={{
                    xData: "city",
                    xLabel: "City",
                    yData: "number",
                    yLabel: "Number of Events",
                  }}
                />
              </div>
              <div
                className="tab-pane fade"
                id="eventsGenre"
                role="tabpanel"
                aria-labelledby="eventsGenre-tab"
              >
                <PieRechart
                  data={eventsGenreStatisticsData.filter(
                    (data) => data.number !== 0
                  )}
                  plotData={{
                    xData: "genre",
                    xLabel: "Genre",
                    yData: "number",
                    yLabel: "Number of Events",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsStatistics;
