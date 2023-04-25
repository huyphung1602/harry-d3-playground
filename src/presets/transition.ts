import { Preset } from '../types/preset';

const html = ''
const script = `
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
  .attr('viewBox', \`0 0 \${svgWidth} \${svgHeight}\`);

svg
  .append('rect')
  .attr('width', 40)
  .attr('height', 0)
  .attr('fill', 'red')
  .attr('x', 0)
  .attr('y', 0)
  .transition()
  .duration(1000) // Transition lasts 500ms
  .attr('height', 400) // End value
  .ease(d3.easeLinear)
`

export const transition : Preset = {
  name: 'Transition',
  html,
  script,
}
