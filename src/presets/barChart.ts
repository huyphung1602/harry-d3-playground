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
    top: 50,
    bottom: 60,
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

  // Draw the inner chart container
  const innerChart = svg
    .append("g")
    .attr("transform", \`translate(\${margin.left}, \${margin.top})\`);

  // Define the scale functions
  const xScale = d3.scaleLinear()
    .domain(d3.extent(myData, d => d.count))
    .range([0, innerWidth])
    .nice();
  const yScale = d3.scaleBand()
    .domain(myData.map(d => d.technology))
    .range([0, innerHeight])
    .paddingInner(0.2);

  // Appending the axes
  const bottomAxis = d3.axisBottom(xScale);
  innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", \`translate(0, \${innerHeight})\`)
      .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale);
  const chartLeftAxis = innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);
  chartLeftAxis.selectAll("path").attr("fill", "none");

  const graph = innerChart.append('g');

  // Declare the bar and label selection
  const barAndLabel = graph
    .selectAll('g')
      .data(myData)
      .join('g')
      .attr('transform', d => \`translate(0, \${yScale(d.technology)})\`);

  // Append the rects (the bars)
  barAndLabel
    .append("rect")
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", d => d.technology === 'D3.js' ? 'yellowgreen': defaultColor);

    // Add x-axis text
    svg
      .append("text")
      .text("Number of practitioners")
      .attr("y", svgHeight - margin.bottom + 40)
      .attr('x', svgWidth/2 - 50)
      .style("font-family", "Arial, sans-serif")
      .style("font-size", "12px");

  // Append the count text
  barAndLabel
    .append('text')
      .text(d => d.count)
      .attr('x', d => xScale(d.count) + 4)
      .attr('y', 24)
      .style('font-family', 'sans-serif')
      .style('font-size', '9px');

  // Append the chart title
  svg
    .append("text")
    .text("Most popular technologies among data visualization practitioners")
    .attr("y", margin.top -20)
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "16px");
};

data.sort((a, b) => b.count - a.count);
createViz(sortedData);
`;

export const barChart : Preset = {
  name: 'Bar Chart',
  html,
  script,
}
