import React, { Component } from 'react';
import TimeVParticles from './components/scenes/TimeVParticles.js';
import ChargeParticlePie  from './components/scenes/ChargeParticlePie.js'
import ThetaPieLolipop  from './components/scenes/ThetaPieLolipop.js'
import ThetaTime  from './components/scenes/ThetaTime.js'

const GRAPHS = {
  time_v_particle: TimeVParticles,
  charge_particle_pie: ChargeParticlePie,
  theta_phi_lolipop: ThetaPieLolipop,
  theta_time: ThetaTime
}

class Graphs extends Component {
	constructor(props) {
    super(props);
    this.state = {
			graph_type: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      input_data: nextProps.input_data,
    };
  }

 	componentDidMount() {
		this.setState({
			graph_type: (localStorage.getItem('graph_type') || null)
		})
  }

  render() {
    const Type = GRAPHS[this.state.graph_type] || 'empty';
		console.log(this.state.input_data);

    return(
      <>
        { Type == 'empty' ? <h1>Nothing to render</h1> : <Type input_data = { localStorage.getItem('input_data') } /> }
      </>
    )
  }
}

export default Graphs;
