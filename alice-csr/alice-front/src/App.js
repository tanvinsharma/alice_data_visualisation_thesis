import React, { Component } from 'react';

import Mpolygon from './components/scenes/Mpolygon.js';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	json: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  	event.preventDefault();
  	
  	var file = event.target.children[1];
    var read = new FileReader();

		read.readAsBinaryString(event.target.children[1].files[0]);
		var _self = this;
		read.onloadend = function(){
    	_self.setState({
    		json: read.result
    	})
		}
	}

	render() {
		var json = this.state.json;
		var json_any = Object.keys(json).length === 0

		return(<div> 
			{ json_any ? (<>
		  		<h1>ALICE Experiment -  Upload File!</h1>
					  <div id="outputDiv"> </div>
					  <form onSubmit={this.handleSubmit} >
					    <label>Please select file</label>
					    <input name="file" type="file" />
					    <input type="submit" />
					  </form>
					  </>
				)
			: <Mpolygon json={JSON.parse(this.state.json)} time_arr={ [-80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90] }/>
		}
		</div>)
	}
}

export default App;
