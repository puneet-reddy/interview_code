import React from 'react';
import * as d3 from 'd3-scale';

const BarChart = (props) => {
  const { data, dimensions } = props;
  const xScale = d3
    .scaleBand()
    .domain(data.map((d, dNdx) => dNdx))
    .range([0, dimensions.width]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([0, dimensions.height]);

  return (
    <svg overflow="hidden" style={{border: "1px solid black", width: dimensions.width, height: dimensions.height}}>
      {data.map((d, dNdx) => (
        <rect 
            height={yScale(d)} 
            width={xScale.bandwidth()} 
            x={xScale(dNdx)} 
            y={dimensions.height - yScale(d)}
            stroke="grey"
            fill="darkgrey"
        ></rect>
      ))}
    </svg>
  );
};

export default BarChart;
