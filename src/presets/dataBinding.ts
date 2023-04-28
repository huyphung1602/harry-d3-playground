import { Preset } from '../types/preset';

const html = '';
const script = `// Create svg
const svgWidth = 600;
const svgHeight = 400;
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

const data = [100, 88, 69, 20];

// Scale to define the width of the rects
const xScale = d3
  .scaleLinear()
  .domain(d3.extent(data))
  .range([20, width]);

// Scale to locate the position of the rects
const yScale = d3
  .scaleBand()
  .domain(data)
  .range([margin.top, height]);

svg
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('width', d => xScale(d))
  .attr('height', yScale.bandwidth()- 20)
  .attr('x', margin.left)
  .attr('transform', d => \`translate(0, \${yScale(d)})\`)
  .style('fill', 'orange');
`

export const dataBinding : Preset = {
  name: 'Data Binding',
  html,
  script,
}