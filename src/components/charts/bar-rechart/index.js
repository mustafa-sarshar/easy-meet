import React, { useEffect } from "react";
import { randomColorPicker } from "../../../apis";

import "./styles.css";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarRechart = (props) => {
  const { data, plotData } = props;

  const colors = data.map((data, index) => {
    return { id: index, color: randomColorPicker() };
  });

  return (
    <ResponsiveContainer height={350}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
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
        <Tooltip />
        <Bar
          name={plotData.legend}
          dataKey={plotData.yData}
          fill="#006400"
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index].color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarRechart;
