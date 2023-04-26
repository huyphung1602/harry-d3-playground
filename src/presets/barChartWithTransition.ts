import { Preset } from '../types/preset';

const html = ''
const script = `
const createViz = (myData) => {
  const svgWidth = 600;
  const svgHeight = 700;
  const selection = d3
    .select('.d3-content');
  const svg = selection
    .append('svg')
    .attr('viewBox', \`0 0 \${svgWidth} \${svgHeight}\`);
  const defaultColor = '#39B5E0';
  const xScale = d3.scaleLinear()
    .domain(d3.extent(myData, d => d.count))
    .range([0, 450]);
  const yScale = d3.scaleBand()
    .domain(myData.map(d => d.technology))
    .range([0, svgHeight])
    .paddingInner(0.2);

  const barAndLabel = svg
    .selectAll('g')
      .data(myData)
      .join('g')
      .attr('transform', d => \`translate(0, \${yScale(d.technology)})\`);

  barAndLabel
    .append('rect')
      .attr('width', 0)
      .attr('height', yScale.bandwidth())
      .attr('x', 100)
      .attr('y', 0)
      .attr('fill', d => d.technology === 'D3.js' ? 'yellowgreen': defaultColor)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('width', d => xScale(d.count));

  barAndLabel
    .append('text')
      .text(d => d.technology)
      .attr('x', 96)
      .attr('y', 12)
      .attr('text-anchor', 'end')
      .style('font-family', 'sans-serif')
      .style('font-size', '11px')

  barAndLabel
    .append('text')
      .text(d => d.count)
      .attr('x', d => 100 + xScale(d.count) + 4)
      .attr('y', 12)
      .style('font-family', 'sans-serif')
      .style('font-size', '9px')
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .style('opacity', 1)

  svg
    .append('line')
      .attr('x1', 100)
      .attr('y1', 0)
      .attr('x2', 100)
      .attr('y2', svgHeight)
      .attr('stroke', 'black');
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
    "technology": "ArcGIS",
    "count": 147
  },
  {
    "technology": "D3.js",
    "count": 414
  },
  {
    "technology": "Angular",
    "count": 20
  },
  {
    "technology": "Datawrapper",
    "count": 171
  },
  {
    "technology": "Excel",
    "count": 1078
  },
  {
    "technology": "Flourish",
    "count": 198
  },
  {
    "technology": "ggplot2",
    "count": 435
  },
  {
    "technology": "Gephi",
    "count": 71
  },
  {
    "technology": "Google Data Studio",
    "count": 176
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
    "technology": "Java",
    "count": 29
  },
  {
    "technology": "Leaflet",
    "count": 134
  },
  {
    "technology": "Mapbox",
    "count": 167
  },
  {
    "technology": "kepler.gl",
    "count": 24
  },
  {
    "technology": "Observable",
    "count": 157
  },
  {
    "technology": "Plotly",
    "count": 223
  },
  {
    "technology": "Power BI",
    "count": 460
  },
  {
    "technology": "PowerPoint",
    "count": 681
  },
  {
    "technology": "Python",
    "count": 530
  },
  {
    "technology": "QGIS",
    "count": 193
  },
  {
    "technology": "Qlik",
    "count": 61
  },
  {
    "technology": "R",
    "count": 561
  },
  {
    "technology": "React",
    "count": 145
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
    "technology": "Vue",
    "count": 51
  },
  {
    "technology": "Web Components",
    "count": 79
  },
  {
    "technology": "WebGL",
    "count": 65
  },
  {
    "technology": "Pen & paper",
    "count": 522
  },
  {
    "technology": "Physical materials",
    "count": 69
  },
  {
    "technology": "Canvas",
    "count": 121
  },
  {
    "technology": "P5/Processing",
    "count": 55
  }
]

console.log(data.length); // => 33
console.log(d3.max(data, d => d.count)); // => 1078
console.log(d3.min(data, d => d.count)); // => 20
console.log(d3.extent(data, d => d.count)); // => [20, 1078]
data.sort((a, b) => b.count - a.count);
createViz(data);
`

export const barChartWithTransition : Preset = {
  name: 'Bar Chart With Transition',
  html,
  script,
}