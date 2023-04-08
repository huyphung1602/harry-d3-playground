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
  const selection = d3
    .select('.d3-content');
  const svg = selection
    .append('svg')
    .attr('viewBox', '0 0 1200 1600');
  const barHeight = 20;  

  svg
    .selectAll('rect')
    .data(myData)
    .join('rect')
      .attr('class', d => {
        console.log(d);
        return `bar bar-${d.technology}`;
      })
      .attr('width', d => d.count)
      .attr('height', barHeight)
      .attr('x', 0)
      .attr('y', (d, i) => (barHeight + 4) * i)
      .attr('fill', '#0d88e6');
};