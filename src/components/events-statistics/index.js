import React from "react";
import { Tab, Tabs, Accordion } from "react-bootstrap";

import BarRechart from "../charts/bar-rechart";
import PieRechart from "../charts/pie-rechart";

import "./styles.css";

const EventsStatistics = (props) => {
  const { cityStatisticsData, eventsGenreStatisticsData } = props;

  return (
    <Accordion className="accordion-container">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="text-green">Statistics</div>
        </Accordion.Header>
        <Accordion.Body>
          <Tabs
            defaultActiveKey="cityStats"
            id="statistics"
            className="mb-3"
            justify
          >
            <Tab eventKey="cityStats" title="Number of events per city">
              <BarRechart
                data={cityStatisticsData}
                plotData={{
                  xData: "city",
                  xLabel: "City",
                  yData: "number",
                  yLabel: "Number of Events",
                }}
              />
            </Tab>
            <Tab eventKey="genreStats" title="Number of events per genre">
              <PieRechart
                data={eventsGenreStatisticsData}
                plotData={{
                  xData: "genre",
                  xLabel: "Genre",
                  yData: "number",
                  yLabel: "Number of Events",
                }}
              />
            </Tab>
          </Tabs>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default EventsStatistics;
