d3.csv('src/data/1.csv', d => {
  return {
    technology: d.technology,
    count: +d.count
  };
}).then(data => {
  console.log(data.length); // => 33
  console.log(d3.max(data, d => d.count)); // => 1078
  console.log(d3.min(data, d => d.count)); // => 20
  console.log(d3.extent(data, d => d.count)); // => [20, 1078]
 
  data.sort((a, b) => b.count - a.count);
 
  createViz(data);
});

const createViz = (myData) => {
  const svgWidth = 600;
  const svgHeight = 700;
  const selection = d3
    .select('.d3-content');
  const svg = selection
    .append('svg')
    .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  const defaultColor = '#39B5E0';
  const xScale = d3.scaleLinear()
    .domain(d3.extent(myData, d => d.count))
    .range([0, 450]);
  const yScale = d3.scaleBand()
    .domain(myData.map(d => d.technology))
    .range([0, svgHeight])
    .paddingInner(0.2);

  // svg
  //   .selectAll('rect')
  //   .data(myData)
  //   .join('rect')
  //     .attr('class', d => {
  //       console.log(d);
  //       return `bar bar-${d.technology}`;
  //     })
  //     .attr('width', d => xScale(d.count))
  //     .attr('height', yScale.bandwidth())
  //     .attr('x', '100')
  //     .attr('y', d => yScale(d.technology))
  //     .attr('fill', defaultColor);

  const barAndLabel = svg
    .selectAll('g')
      .data(myData)
      .join('g')
      .attr('transform', d => `translate(0, ${yScale(d.technology)})`);

  barAndLabel
    .append("rect")
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("x", 100)
      .attr("y", 0)
      .attr("fill", d => d.technology === 'D3.js' ? 'yellowgreen': defaultColor);

  barAndLabel
    .append('text')
      .text(d => d.technology)
      .attr('x', 96)
      .attr('y', 12)
      .attr('text-anchor', 'end')
      .style('font-family', 'sans-serif')
      .style('font-size', '11px');

  barAndLabel
    .append('text')
      .text(d => d.count)
      .attr('x', d => 100 + xScale(d.count) + 4)
      .attr('y', 12)
      .style('font-family', 'sans-serif')
      .style('font-size', '9px');

  svg
    .append('line')
      .attr('x1', 100)
      .attr('y1', 0)
      .attr('x2', 100)
      .attr('y2', svgHeight)
      .attr('stroke', 'black');
};
