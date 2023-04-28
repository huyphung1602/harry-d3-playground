import { Preset } from '../types/preset';

const html = '';

const script = `// JSON data
const data = [
  {
    "technology": "D3.js",
    "count": 414
  },
  {
    "technology": "Excel",
    "count": 1078
  },
  {
    "technology": "Highcharts",
    "count": 58
  },
  {
    "technology": "Power BI",
    "count": 460
  },
  {
    "technology": "Tableau",
    "count": 852
  },
  {
    "technology": "Vega",
    "count": 48
  },
]

const sortedData = data.sort((a, b) => b.count - a.count);

const createViz = (myData) => {
  // Declare the constants
  const svgWidth = 600;
  const svgHeight = 400;
  const margin = {
    top: 40,
    bottom: 40,
    left: 60,
    right: 40,
  }
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;
  const defaultColor = '#39B5E0';

  // Select the DOM container
  const selection = d3.select('.d3-content');
  const svg = selection
    .append('svg')
    .attr('viewBox', \`0 0 \${svgWidth} \${svgHeight}\`);

  // Define the scale functions
  const xScale = d3.scaleLinear()
    .domain(d3.extent(myData, d => d.count))
    .range([0, innerWidth]);
  const yScale = d3.scaleBand()
    .domain(myData.map(d => d.technology))
    .range([0, innerHeight])
    .paddingInner(0.2);

  // Declare the bar and label selection
  const barAndLabel = svg
    .selectAll('g')
      .data(myData)
      .join('g')
      .attr('transform', d => \`translate(0, \${yScale(d.technology) + margin.top })\`);

  // Append the rects (the bars)
  barAndLabel
    .append("rect")
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("x", margin.left)
      .attr("y", 0)
      .attr("fill", d => d.technology === 'D3.js' ? 'yellowgreen': defaultColor);

  // Append the technology name
  barAndLabel
    .append('text')
      .text(d => d.technology)
      .attr('x', margin.left - 4)
      .attr('y', 24)
      .attr('text-anchor', 'end')
      .style('font-family', 'sans-serif')
      .style('font-size', '11px');

  // Append the count text
  barAndLabel
    .append('text')
      .text(d => d.count)
      .attr('x', d => margin.left + xScale(d.count) + 4)
      .attr('y', 12)
      .style('font-family', 'sans-serif')
      .style('font-size', '9px');

  svg
    .append('line')
      .attr('x1', margin.left)
      .attr('y1', margin.top)
      .attr('x2', margin.left)
      .attr('y2', svgHeight - margin.bottom)
      .attr('stroke', 'black');
};

data.sort((a, b) => b.count - a.count);
createViz(sortedData);
`;

export const barChart : Preset = {
  name: 'Bar Chart',
  html,
  script,
}
