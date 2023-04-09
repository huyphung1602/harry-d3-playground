// shared constants
/************************/
/*      Dimensions      */
/************************/
const margin = { top: 50, right: 30, bottom: 50, left: 40 };
const width = 1000;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;


/**********************/
/*       Colors       */
/**********************/
const slateGray = '#305252';
const gray = '#606464';
const white = '#faffff';
const womenColor = '#826C7F';
const menColor = '#FA7E61';


/*****************************************/
/*  Make the scales accessible globally  */
/*****************************************/
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


/*************************************************/
/*  Make the bins generator accessible globally  */
/*************************************************/
const binGenerator = d3.bin()
  .value(d => d.salary);


/***********************/
/*       Filters       */
/***********************/
const filters = [
  { id: 'all', label: 'All', isActive: true },
  { id: 'female', label: 'Women', isActive: false },
  { id: 'male', label: 'Men', isActive: false },
];

// getRandomSalary data
const getRandomSalary = (salary) => {
  const lowerLimit = +salary.slice(1, salary.indexOf(' -')).replace(',', '');
  const upperLimit = +salary.slice(salary.indexOf(' $') + 2).replace(',', '');
  
  return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
}

// drawHistogram
const drawHistogram = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select('.d3-content')
    .append('svg')
      .attr('viewBox', `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  

  /***************************/
  /*    Generate the bins    */
  /***************************/
  const bins = binGenerator(data);


  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const minSalary = bins[0].x0;
  const maxSalary = bins[bins.length - 1].x1;
  xScale
    .domain([minSalary, maxSalary])
    .range([0, innerWidth]);

  // Y scale
  const binsMaxLength = d3.max(bins, d => d.length);
  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();
  
  /*******************************/
  /*    Append the rectangles    */
  /*******************************/
  innerChart
    .selectAll('rect')
    .data(bins)
    .join('rect')
      .attr('x', d => xScale(d.x0))
      .attr('y', d => yScale(d.length))
      .attr('width', d => xScale(d.x1) - xScale(d.x0))
      .attr('height', d => innerHeight - yScale(d.length))
      .attr('fill', slateGray)
      .attr('stroke', white)
      .attr('stroke-width', 2);


  /*******************************/
  /*   Add the axes and labels   */
  /*******************************/
  const bottomAxis = d3.axisBottom(xScale);
  innerChart
    .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  svg
    .append('text')
      .text('Yearly salary (USD)')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height - 5);

  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append('g')
      .call(leftAxis);
  svg
    .append('text')
      .text('Frequency')
      .attr('x', 5)
      .attr('y', 20);

};

// Load data
d3.csv('src/data/2.csv', d => {
  if (d.pay_annual_USD !== '$240,000 or more') {
    return {
      role: d.role,
      gender: d.gender,
      salary: getRandomSalary(d.pay_annual_USD)
    };
  }
}).then(data => {
  drawHistogram(data);
});
