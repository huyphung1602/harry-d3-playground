import { Preset } from '../types/preset';

const html = '';
const script = `
// Create svg
const svgWidth = 900;
const svgHeight = 900;
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
  .attr('viewBox', \`0 0 \${svgWidth} \${svgHeight}\`);

const data = [40, 10, 20, 60, 30];
const numberOfCircles = data.length;

// Scale the circle position x
const xScale = d3
  .scaleLinear()
  .domain([0, numberOfCircles])
  .range([0, width]);

// Scale the r of the circle
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(data))
  .range([10, width/(2*5)]);

svg
  .selectAll('circle')
  .data(data)
  .join('circle')
  .attr('cx', (d, i) => xScale(i + 0.5))
  .attr('cy', width/2)
  .attr('r', (d) => yScale(d))
  .style('fill', 'orange');
`

export const dataBinding : Preset = {
  name: 'Data Binding',
  html,
  script,
}