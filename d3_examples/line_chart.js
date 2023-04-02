const MARGIN = { top: 20, right: 20, bottom: 80, left: 80};
const SVG_WIDTH = 500;
const SVG_HEIGHT = 400;

const CHART_WIDTH = SVG_WIDTH - MARGIN.left - MARGIN.right;
const CHART_HEIGHT = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

const svg = d3.select('.d3-content') //create Svg element
              .append('svg')
              .attr('width', SVG_WIDTH)
              .attr('height', SVG_HEIGHT);

const data = [
    {  date:'2020/01/01 00:00:00', patients: 600 },
    {  date:'2020/02/01 00:00:00', patients: 500 },
    {  date:'2020/03/01 00:00:00', patients: 400 },
    {  date:'2020/04/01 00:00:00', patients: 500 },
    {  date:'2020/05/01 00:00:00', patients: 300 },
    {  date:'2020/06/01 00:00:00', patients: 100 },
    {  date:'2020/07/01 00:00:00', patients: 50  },
    {  date:'2020/08/01 00:00:00', patients: 500 },
    {  date:'2020/09/01 00:00:00', patients: 550 },
    {  date:'2020/10/01 00:00:00', patients: 550 },
];

const chart_data = data.map(d => ({
  date: new Date(d.date),
  patients: d.patients,
}));

console.log(chart_data);

// Draw x-scale
const xscale = d3.scaleTime()
  .domain(d3.extent(chart_data, d => d.date))
  .range([0, CHART_WIDTH]);

// Draw y-scale
const yscale = d3.scaleLinear()
  .domain([0, 600])
  .range([CHART_HEIGHT, 0]);

const chart = svg.append('g')
  .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT);

chart.append('g')
     .call(d3.axisBottom(xscale).tickFormat(d3.timeFormat('%b')))
     .attr('transform', `translate(0, ${CHART_HEIGHT})`);

chart.append('g')
     .call(d3.axisLeft(yscale))

// Draw x-axis label
svg.append('text')
   .text('Month')          
   .attr('transform', `translate(${SVG_WIDTH/2}, ${CHART_HEIGHT + 60})`);

// Draw y-axis label
svg.append('text')
   .text('Number of patients')
   .attr('transform', `translate(${MARGIN.left/2}, ${SVG_HEIGHT/2 + 50}) rotate(-90)`);

const generator = d3.line()
                    .x(d => { return xscale(d.date); })
                    .y(d => { return yscale(d.patients); });      

chart.append('path')
     .datum(chart_data)
     .attr('d', generator)
     .attr('fill', 'none')
     .attr('stroke', 'blue');
