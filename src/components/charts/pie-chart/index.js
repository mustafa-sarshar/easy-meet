import React from "react";
import Plot from "react-plotly.js";

import "./styles.css";

const MyPieChart = (props) => {
  const { data, plotData } = props;
  return (
    <div className="plot-container">
      <Plot
        data={[
          {
            values: data.map((data) => data[plotData.yData]),
            labels: data.map((data) => data[plotData.xData]),
            type: "pie",
            insidetextorientation: "radial",
          },
        ]}
        layout={{
          height: "80%",
          width: "100%",
          margin: { t: 0, b: 0, l: 0, r: 0 },
        }}
      />
    </div>
  );
};

export default MyPieChart;
