import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const PieRechart = (props) => {
  const { data, plotData } = props;
  const COLORS = ["#001678", "#4A009A", "#036EC1", "#135616", "#382803"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "2px 3px",
            border: "1px solid #cccc",
            borderRadius: "0.375rem",
          }}
        >
          <label>{`${payload[0].name} (${payload[0].value.toFixed(
            1
          )}%)`}</label>
        </div>
      );
    }
    return null;
  };

  const customLabel = ({ name, value }) => {
    const width = document.getElementsByTagName("body")[0].clientWidth;

    if (width >= 650) {
      return `${name} (${value.toFixed(1)}%)`;
    } else {
      return `${value.toFixed(1)}%`;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          color="#000000"
          dataKey={plotData.yData}
          nameKey={plotData.xData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={customLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieRechart;
