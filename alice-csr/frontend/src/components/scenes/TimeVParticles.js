import * as d3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import React, { Component } from 'react';

var  x, y, global_data, xAxis, yAxis, svg, height, width, margin, histogram;

class TimeVParticles extends Component {
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
    return { input_data: nextProps.input_data, };
  }

  graphMaker(){
    // set the dimensions and margins of the graph
    margin = {top: 10, right: 30, bottom: 30, left: 40};
    width = window.innerWidth/2;
    height = window.innerHeight/2;

    // append the svg object to the body of the page
    svg = d3.select("#time_vs_particles")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    // console.log(typeof this.state.input_data);
    // get the data

    var time_array = JSON.parse(this.state.input_data)['mTracks'].map((e) => { return e.time }).sort().map((e, idx) => { return {id: idx, time: e }});

    global_data = time_array;
    // X axis: scale and draw:

    x = d3.scaleLinear()
      .domain([time_array['0'].time, time_array['259'].time])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);

    console.log(height);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Y axis: initialization
    y = d3.scaleLinear().range([height, 0]);
    
    yAxis = svg.append("g")

    // Initialize with 20 bins
    this.update(19)
  }

    // A function that builds the graph for a specific value of bin
  update(nBin) {
    // set the parameters for the histogram
    histogram = d3.histogram()
      .value(function(d) { return d.time; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(global_data);

    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis.transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    // Join the rect with the bins data
    const u = svg.selectAll("rect").data(bins)
    
    // Manage the existing bars and eventually the new ones:
    u.join("rect") // Add a new rect for each new elements
      .transition() // and apply changes to all of them
      .duration(1000)
      .attr("x", 1)
      .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
      .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
      .attr("height", function(d) { return height - y(d.length); })
      .style("fill", "#69b3a2")
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
        <div id="time_vs_particles"></div>
        <p>
          <label># bins</label>
          <input onChange={ this.handleChange } type="number" min="1" max="100" step="1" id="nBin"/>
          <button id='download'>Download</button>
        </p>
      </>
    )
  }
}

export default TimeVParticles;
