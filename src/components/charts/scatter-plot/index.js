import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyScatterPlot = (props) => {
  const { data, plotData } = props;

  return (
    <ResponsiveContainer height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={plotData.xData}
          type="category"
          name={plotData.xLabel}
        />
        <YAxis
          dataKey={plotData.yData}
          type="number"
          name={plotData.yLabel}
          allowDecimals={false}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend verticalAlign="top" height={36} />
        <Scatter name={plotData.legend} data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MyScatterPlot;
