import React from "react";
import { Tab, Tabs, Accordion } from "react-bootstrap";

import "./styles.css";
import MyPieChart from "../../charts/pie-chart";

const EventsStatisticsPieChart = (props) => {
  const { cityStatisticsData, eventsSummaryStatisticsData } = props;

  return (
    <Accordion className="accordion-container">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="event-details">
          Statistics (PieChart)
        </Accordion.Header>
        <Accordion.Body>
          <Tabs
            defaultActiveKey="cityStats"
            id="statistics"
            className="mb-3"
            justify
          >
            <Tab eventKey="cityStats" title="Number of events per city">
              <MyPieChart
                data={cityStatisticsData}
                plotData={{
                  xData: "city",
                  xLabel: "City",
                  yData: "number",
                  yLabel: "Number of Events",
                }}
              />
            </Tab>
            <Tab eventKey="summaryStats" title="Number of events per title">
              <MyPieChart
                data={eventsSummaryStatisticsData}
                plotData={{
                  xData: "summary",
                  xLabel: "Event Name",
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

export default EventsStatisticsPieChart;
