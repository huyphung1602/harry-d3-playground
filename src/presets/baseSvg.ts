import { Preset } from '../types/preset';

const html = '';

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
`;

export const baseSvg : Preset = {
  name: 'Base SVG',
  html,
  script,
}
