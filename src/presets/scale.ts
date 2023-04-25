import { Preset } from '../types/preset';

const html = `
<div id="x1"></div>
<div id="x2"></div>
<br>
<div id="y1"></div>
<div id="y2"></div>
`;
const script = `
const data = [
  {  date:'2020/01/01 00:00:00', customers: 600 },
  {  date:'2020/02/01 00:00:00', customers: 500 },
  {  date:'2020/03/01 00:00:00', customers: 400 },
  {  date:'2020/04/01 00:00:00', customers: 500 },
  {  date:'2020/05/01 00:00:00', customers: 300 },
  {  date:'2020/06/01 00:00:00', customers: 100 },
  {  date:'2020/07/01 00:00:00', customers: 50  },
  {  date:'2020/08/01 00:00:00', customers: 500 },
  {  date:'2020/09/01 00:00:00', customers: 550 },
  {  date:'2020/10/01 00:00:00', customers: 550 },
];

const chartData = data.map(d => ({
  date: new Date(d.date),
  customers: d.customers,
}));

const chartWidth = 400;
const chartHeight = 400;

const xScale = d3.scaleTime()
  .domain(d3.extent(chartData, d => d.date))
  .range([0, chartWidth]);

const x1 = xScale(chartData[0].date);
const x2 = xScale(chartData[chartData.length - 1].date);

const selection = d3.select('.d3-content');
selection.select('#x1').text(\`x1 = \${x1}\`);
selection.select('#x2').text(\`x2 = \${x2}\`);

const yScale = d3.scaleLinear()
  .domain(d3.extent(chartData, d => d.customers))
  .range([chartHeight, 0]);

const y1 = yScale(50);
const y2 = yScale(600);

selection.select('#y1').text(\`y1 = \${y1}\`);
selection.select('#y2').text(\`y2 = \${y2}\`);
`;

export const scale : Preset = {
  name: 'Scale',
  html,
  script,
}
