import { Preset } from '../types/preset';

const html = '';
const script = `
const createViz = (myData) => {
  // Define constants
  const svgWidth = 600;
  const svgHeight = 400;
  const aubergine = "#75485E";
  const margin = {
    top: 30,
    bottom: 40,
    left: 40,
    right: 20,
  }
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // select the d3-content container
  const selection = d3.select('.d3-content');

  // Draw the svg view-port
  const svg = selection
    .append('svg')
    .attr('viewBox', \`0 0 \${svgWidth} \${svgHeight}\`);
  // Draw the inner chart container
  const innerChart = svg
    .append("g")
    .attr("transform", \`translate(\${margin.left}, \${margin.top})\`);

  // Define the scale
  const xScale = d3.scalePoint()
    .domain(myData.map(d => d.technology))
    .range([0, width]);
  console.log(xScale('D3.js'));

  const maxPractitioner = d3.max(myData.map(d => d.count));
  const yScale = d3.scaleLinear()
    .domain([0, maxPractitioner])
    .range([height, 0]);
  console.log(yScale(1000));

  // Appending the axes
  const bottomAxis = d3.axisBottom(xScale);
  innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", \`translate(0, \${height})\`)
      .call(bottomAxis);
  
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);
  
  const lineGenerator = d3.line()
    .x(d => xScale(d.technology)) // A
    .y(d => yScale(d.count)); // B
  
  innerChart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", aubergine);

  // Add y-axis text
  svg
    .append("text")
    .text("Number of practitioners")
    .attr("y", margin.top - 10)
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "14px");

  // Some styling
  d3.selectAll(".axis-x text, .axis-y text")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "14px");
};

// CSV Data: Only work at localhost
// d3.csv('src/data/1.csv', d => {
//   return {
//     technology: d.technology,
//     count: +d.count
//   };
// }).then(data => {
//   console.log(data.length); // => 33
//   console.log(d3.max(data, d => d.count)); // => 1078
//   console.log(d3.min(data, d => d.count)); // => 20
//   console.log(d3.extent(data, d => d.count)); // => [20, 1078]
 
//   data.sort((a, b) => b.count - a.count);
 
//   createViz(data);
// });

// JSON data
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
    "technology": "Illustrator",
    "count": 426
  },
  {
    "technology": "Tableau",
    "count": 852
  },
  {
    "technology": "Vega",
    "count": 48
  },
  {
    "technology": "WebGL",
    "count": 65
  },
  {
    "technology": "Canvas",
    "count": 121
  },
]

console.log(data.length); // => 33
console.log(d3.max(data, d => d.count)); // => 1078
console.log(d3.min(data, d => d.count)); // => 20
console.log(d3.extent(data, d => d.count)); // => [20, 1078]
data.sort((a, b) => b.count - a.count);
createViz(data);
`
export const convertToLineChart : Preset = {
  name: 'Convert To Line Chart',
  html,
  script,
}