// @TODO: YOUR CODE HERE!
var svgWidth = 1080;
var svgHeight = 660;
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 80,
    left: 50
};
    
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



d3.csv("../StarterCode/assets/data/data.csv").then((healthdata, err)=>{
    if (err) throw err;


    healthdata.forEach((data)=>{
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
    })
        
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d['income']), d3.max(healthdata, d=>d['income'])])
      .range([0, chartWidth]);    
    
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d['obesity']), d3.max(healthdata, d=>d['obesity'])])
      .range([chartHeight, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    
    var leftAxis = d3.axisLeft(yLinearScale);
   
    var xAxis = chartGroup.append("g")
      .classed("xAxis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
    
    var yAxis = chartGroup.append('g')
      .classed("yAxis", true)
      .call(leftAxis);
    
    
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthdata)
      .enter()
      .append("circle")
      .attr("cx", d=>xLinearScale(d['income']))
      .attr("cy", d=>yLinearScale(d['obesity']))
      .attr("r", 5)
      .attr("fill", "lightseagreen")
      .attr("opacity", "0.6");
    
    chartGroup.append("g")
        .selectAll("text")
        .data(healthdata)
        .enter()
        .append("text")
        .text((d)=>(d.abbr))
        .attr("x", d =>xLinearScale(d['income']))
        .attr("y", d =>yLinearScale(d['obesity']))
        .style("font-size", "10px");
    
     var labelsGroup = chartGroup.append("g")
      .attr("transform",        `translate(${chartWidth/2},${chartHeight+10})`);
 
    var incomeLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "income")
      .classed("active", true)
      .text("HH Income (USD)");
    
        
     chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .classed("active", true)
      .text("Obesity");
    
  
}).catch(function(error){
    console.log(error);
});