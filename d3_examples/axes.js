// Create svg
const svgWidth = 600;
const svgHeight = 600;
const margin = {
  top: 20,
  bottom: 40,
  left: 40,
  right: 20,
}
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
const selection = d3.select('.d3-content');
const svg = selection
  .append('svg')
  .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

// Create scale
let xScale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, width]);

// Create axis 
let xAxis = d3.axisBottom(xScale);

// Append axis to SVG 
svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
  .call(xAxis);

// Create left y scale 
let yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([height, 0]);

// Create left y axis   
let yAxis = d3.axisLeft(yScale);

// Append left y axis to SVG
svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(yAxis);