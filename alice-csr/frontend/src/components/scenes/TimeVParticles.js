import * as d3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import React, { Component } from 'react';


class TimeVParticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_data: null
    }
  }
  
  componentDidMount() {
    this.graphMaker();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      input_data: nextProps.input_data,
    };
  }

  graphMaker(){
   // set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#time_vs_particles")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left},${margin.top})`);

// get the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv").then( function(data) {

  // X axis: scale and draw:
  const x = d3.scaleLinear()
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

  // Y axis: initialization
  const y = d3.scaleLinear()
      .range([height, 0]);
  const yAxis = svg.append("g")

  // A function that builds the graph for a specific value of bin
  function update(nBin) {

    // set the parameters for the histogram
    const histogram = d3.histogram()
        .value(function(d) { return d.price; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(data);

    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

    // Join the rect with the bins data
    const u = svg.selectAll("rect")
        .data(bins)

    // Manage the existing bars and eventually the new ones:
    u
        .join("rect") // Add a new rect for each new elements
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")

    }


  // Initialize with 20 bins
  update(20)


  // Listen to the button -> update if user change it
  d3.select("#nBin").on("input", function() {
    update(+this.value);
  });

});
  }

  render() {
    console.log('rendered this bitch');

    return(
      <>
        <div id="time_vs_particles"></div>
        <p>
  <label># bins</label>
  <input type="number" min="1" max="100" step="30" value="20" id="nBin"/>
      </p>
      </>
    )
  }
}

export default TimeVParticles;
