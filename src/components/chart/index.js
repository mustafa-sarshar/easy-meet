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
} from "recharts";

const ChartStatistics = (props) => {
  const { data } = props;
  console.log(data);
  if (data.length === 0) return <div></div>;
  return (
    <ScatterChart
      width={730}
      height={250}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="city" type="category" name="City" />
      <YAxis
        dataKey="number"
        type="number"
        name="number of events"
        allowDecimals={false}
      />
      {/* <ZAxis dataKey="number" range={[64, 144]} name="score" unit="km" /> */}
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend verticalAlign="top" height={36} />
      <Scatter name="Statistics" data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ChartStatistics;
