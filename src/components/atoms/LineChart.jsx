import React from "react";
import Plot from "react-plotly.js";

const LineChart = (props) => {
  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
          line: { shape: "spline" },
          ...props.data,
        },
      ]}
      layout={{ autosize: true, yaxis: { side: "right" } }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
      config={{displayModeBar: false}}
    />
  );
};

export default LineChart;
