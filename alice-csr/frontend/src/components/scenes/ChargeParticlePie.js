import * as d3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import React, { Component } from 'react';

var  x, y, global_data, yAxis, svg, height, width, margin, histogram;

class ChargeParticlePie extends Component {
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
    return { input_data: nextProps.input_data, };
  }

  graphMaker(){
  	const width = window.innerWidth/2;
    const height = window.innerHeight/2;
    const margin = 0;


		// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
		const radius = Math.min(width, height) / 2 - margin

		// append the svg object to the div called 'my_dataviz'
		const svg = d3.select("#charge_pie")
		  .append("svg")
		    .attr("width", width)
		    .attr("height", height)
		  .append("g")
		    .attr("transform", `translate(${width/2},${height/2})`);

		// Create dummy data
		var pos = 0;
		var neg = 0;
		var neut = 0;
		function countCharge(charge){
			if (charge == 1){
				pos+=1;
			}
			else if (charge == -1){
				neg +=1;
			}
			else{
				neut+=1;
			}
		}
		var charge_array = JSON.parse(this.state.input_data)['mTracks'].map((e) => { return e.charge });
		charge_array.forEach(countCharge);
		console.log(pos);
		console.log(charge_array);
		const data = {Positive: pos, Negative: neg, Neutral: neut};

		// set the color scale
		const color = d3.scaleOrdinal()
		  .domain(["Positive", "Negative", "Neutral"])
		  .range(d3.schemeDark2);

		// Compute the position of each group on the pie:
		const pie = d3.pie()
		  .sort(null) // Do not sort group by size
		  .value(d => d[1])
		const data_ready = pie(Object.entries(data))

		// The arc generator
		const arc = d3.arc()
		  .innerRadius(radius * 0.5)         // This is the size of the donut hole
		  .outerRadius(radius * 0.8)

		// Another arc that won't be drawn. Just for labels positioning
		const outerArc = d3.arc()
		  .innerRadius(radius * 0.9)
		  .outerRadius(radius * 0.9)

		// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
		svg
		  .selectAll('allSlices')
		  .data(data_ready)
		  .join('path')
		  .attr('d', arc)
		  .attr('fill', d => color(d.data[1]))
		  .attr("stroke", "white")
		  .style("stroke-width", "2px")
		  .style("opacity", 0.7)

		// Add the polylines between chart and labels:
		svg
		  .selectAll('allPolylines')
		  .data(data_ready)
		  .join('polyline')
		    .attr("stroke", "black")
		    .style("fill", "none")
		    .attr("stroke-width", 1)
		    .attr('points', function(d) {
		      const posA = arc.centroid(d) // line insertion in the slice
		      const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
		      const posC = outerArc.centroid(d); // Label position = almost the same as posB
		      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
		      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
		      return [posA, posB, posC]
		    })

		// Add the polylines between chart and labels:
		svg
		  .selectAll('allLabels')
		  .data(data_ready)
		  .join('text')
		    .text(d => d.data[0])
		    .attr('transform', function(d) {
		        const pos = outerArc.centroid(d);
		        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
		        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
		        return `translate(${pos})`;
		    })
		    .style('text-anchor', function(d) {
		        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
		        return (midangle < Math.PI ? 'start' : 'end')
		    })
  }
 
  render() {    
    return(
      <>
        <div id="charge_pie"></div>
      </>
    )
  }
}

export default ChargeParticlePie;
