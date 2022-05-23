import * as d3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import React, { Component } from 'react';

var  x, y, global_data, xAxis, yAxis, svg, height, width, margin, histogram;

class ThetaPieLolipop extends Component {
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
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = window.innerWidth/0.5;
    height = window.innerHeight/2;

// append the svg object to the body of the page
	svg = d3.select("#lolipop")
	  .append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", `translate(${margin.left}, ${margin.top})`);

	var data_array = JSON.parse(this.state.input_data)['mTracks'].map((e) => { return {time: e.time, theta: e.theta, phi: e.phi}});
	
	global_data = data_array;
	// Initialize the X axis
	x = d3.scaleBand()
	  .range([ 0, width ])
	  .padding(1);
	xAxis = svg.append("g")
	  .attr("transform", `translate(0, ${height})`)
	  // .call(d3.axisBottom(x))
	  // .selectAll("text")
	  // 	.attr("transform", "translate(-10,10)rotate(-90)")

	// Initialize the Y axis
	y = d3.scaleLinear()
	  .range([ height, 0]);
	yAxis = svg.append("g")
	  .attr("class", "myYaxis")

    // Initialize with 20 bins
    this.update('theta')
  }

    // A function that builds the graph for a specific value of bin
  update(selectedVar) {
    // X axis

    x.domain(global_data.map(function(d) { return d.time; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(global_data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing circle
    const j = svg.selectAll(".myLine")
      .data(global_data)
    // update lines
    j
      .join("line")
      .attr("class", "myLine")
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.time); })
        .attr("x2", function(d) { return x(d.time); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d[selectedVar]); })
        .attr("stroke", "grey")


    // variable u: map data to existing circle
    const u = svg.selectAll("circle")
      .data(global_data)
    // update bars
    u
      .join("circle")
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.time); })
        .attr("cy", function(d) { return y(d[selectedVar]); })
        .attr("r", 8)
        .attr("fill", "#69b3a2");


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
      <p>
      	<button onClick={this.update('theta')}>Theta</button>
		<button onClick={this.update('phi')}>Phi</button>
        <div id="lolipop"></div>
      </p>
      </>
    )
  }
}

export default ThetaPieLolipop;
