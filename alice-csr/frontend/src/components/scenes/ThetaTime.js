import * as d3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import React, { Component } from 'react';
import * as saveSvgAsPng from 'save-svg-as-png';

var  x, y, global_data, xAxis, yAxis, svg, height, width, margin, histogram;

class ThetaTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_data: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() { 
    this.graphMaker();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {input_data: nextProps.input_data,};
  }

  graphMaker(){
    // set the dimensions and margins of the graph
  margin = {top: 10, right: 30, bottom: 40, left: 100};
    width = window.innerWidth/0.6;
    height = window.innerHeight/0.6;

// append the svg object to the body of the page
svg = d3.select("#theta")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
var data_array = JSON.parse(this.state.input_data)['mTracks'].map((e) => { return {time: e.time, theta: e.theta}});
  
global_data = data_array;

// sort data
global_data.sort(function(b, a) {
  return a.Value - b.Value;
});

// Add X axis
x = d3.scaleLinear()
  // .domain([0, ])
  .range([ 0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
y = d3.scaleBand()
  .range([ 0, height ])
  .domain(global_data.map(function(d) { return d.time; }))
  .padding(1);
svg.append("g")
  .call(d3.axisLeft(y))

// Lines
svg.selectAll("myline")
  .data(global_data)
  .enter()
  .append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.time); })
    .attr("y2", function(d) { return y(d.time); })
    .attr("stroke", "grey")

// Circles -> start at X=0
svg.selectAll("mycircle")
  .data(global_data)
  .enter()
  .append("circle")
    .attr("cx", x(0) )
    .attr("cy", function(d) { return y(d.time); })
    .attr("r", "7")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")

// Change the X coordinates of line and circle
svg.selectAll("circle")
  .transition()
  .duration(2000)
  .attr("cx", function(d) { return x(d.theta); })

svg.selectAll("line")
  .transition()
  .duration(2000)
  .attr("x1", function(d) { return x(d.theta); })

d3.select("#download")
.on('click', function(){
    // Get the d3js SVG element and save using saveSvgAsPng.js
    saveSvgAsPng(document.getElementsByTagName("svg")[0], "plot.png", {scale: 2, backgroundColor: "#FFFFFF"});
})
} 



  handleChange(e) {
    // e.preventDefault();
    console.log(parseInt(e.target.value))
    // e.target.value += 1;
    this.update(+e.target.value);
  }

  render() {    
    return(
      <>
      <button id='download'>Download</button>
        <div id="theta"></div>
      </>
    )
  }
}

export default ThetaTime;
