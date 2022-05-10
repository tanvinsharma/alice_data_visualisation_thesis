import * as D3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import TimeVParticles from './TimeVParticles';
import React, { Component } from 'react';

const var GRAPHS = {
  time_v_particles: TimeParticles,
}

class GraphsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph_type = ''
    }
  }
  
  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      input_data: nextProps.input_data,
    };
  }

  render() {
    const Type = GRAPHS[this.state.graph_type];
    return(
      <>
        <Type input_data = {this.state.input_data} />
      </>
    )
  }
}

export default GraphsComponent;
