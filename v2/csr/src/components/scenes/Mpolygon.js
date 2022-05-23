import * as THREE from 'three';
// import OBJLoader from 'three/examples/jsm/loaders/OBJLoader.js';
import OrbitControls from 'three-orbitcontrols';
import Scene from "../resources/Scene";
import Mpoly from "../shapes/Mpoly";
import SpotLight from '../resources/SpotLight';
import React, { Component } from 'react';
import '../../styles/scenes/ApiLineSegments.css';


var charge_pos_group = new THREE.Group();
charge_pos_group.name = "positive";
var charge_neg_group = new THREE.Group();
charge_neg_group.name = "negative";
var charge_net_group = new THREE.Group();
charge_net_group.name = "neutral";

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  10000
);

var controls = new OrbitControls( 
  camera, 
  renderer.domElement 
);

//position(x, y, z), color
var spotlight = SpotLight([0, 20, 50], 0x000000);
// light.add(spotlight.position, 'y', -100, 100).listen();

var scene = Scene(spotlight);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var sphereInter = new THREE.Mesh(
  new THREE.SphereBufferGeometry( 5 ),
  new THREE.MeshBasicMaterial( { color: 0xff0000 })
);
var material = new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, rotate: 120, transparent: true, color: 0xffff00, alphaMap: 0x000000});
// material.color = '0xffff00'
var mesh = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 50, 8, 1, true), material);
// scene.add(mesh);
var group = new THREE.Group();

var findTimeSegment = function(tracks, current_time) {
  var new_tracks = [];

  if(tracks.length > 0) {
    tracks.forEach(function(element, index) {
      if(element.time <= current_time) {
        new_tracks.push(element);
      }
    })
  }

  return new_tracks;
}

var addSegment = function(tracks, current_time) {
  tracks = findTimeSegment(tracks, current_time);

  if(tracks.length > 0) {
    tracks.forEach(function(element, index) {

      if(element.charge === 0) {
        charge_net_group.add(
          Mpoly(element, "neutral")
        )
      } else if (element.charge === -1) {
        charge_neg_group.add(
          Mpoly(element, "negative")
        )
      } else {
        charge_pos_group.add(
          Mpoly(element, "positive")
        )
      }
    });
  }

  renderer.render(scene, camera);
  document.getElementById('root').append(renderer.domElement)
  return ( null );
}

var colored = [];

class Mpolygon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      touched: false,
      touched_original_color: '',
      charge_pos_group_visible: true,
      charge_neg_group_visible: true,
      charge_net_group_visible: true,
      first_render: true,
      current_time: 0,
      time_arr: [],
      graph: 'time_v_particle'
    }

    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);
    this.updateTimeTracks = this.updateTimeTracks.bind(this);
    this.handleGraphChange = this.handleGraphChange.bind(this);
    this.handleGraphs = this.handleGraphs.bind(this);
  }
  
  componentDidMount() {
    this.init();
    this.animate();

    document.addEventListener(
      'mousemove', 
      this.onDocumentMouseMove, 
      false
    );
    window.addEventListener( 
      'resize', 
      this.onWindowResize, 
      false 
    );
    localStorage.setItem('input_data', JSON.stringify(this.state.tracks));
    document.getElementById('graph_type').value = localStorage.getItem('graph_type');
  }

  onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      tracks: nextProps.json,
      time_arr: nextProps.time_arr
    };
  }

  init() {
    renderer.setPixelRatio( window.devicePixelRatio );
    sphereInter.visible = true;
    scene.add(sphereInter);
    scene.add(charge_pos_group);
    scene.add(charge_neg_group);
    scene.add(charge_net_group);

    // scene.add(cylinder);
    raycaster.params.Line.threshold = 1;
    renderer.setSize(
      window.innerWidth, 
      window.innerHeight
    );

    renderer.shadowMap.enabled = true;

    camera.position.x = 350; 
    camera.position.y = 350; 
    camera.position.z = 350; 
    camera.lookAt(scene.position);
    controls.update();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.onAnimate();
  }

  onAnimate() {
    renderer.render( scene, camera );
  }

  handleChangeRequest() {
    console.log(this.state.tracks.mTracks);

    if(this.state.tracks.mTracks) {
      charge_pos_group.children = [];
      charge_neg_group.children = [];
      charge_net_group.children = [];

      addSegment(
        this.state.tracks.mTracks,
        this.state.current_time
      );
    }
  }  

  updateVisibility(e) {
    e.preventDefault();

    if(e.target.id === "positive") {
      this.setState({charge_pos_group_visible: !this.state.charge_pos_group_visible});
    } else if(e.target.id === "negative") {
      this.setState({charge_neg_group_visible: !this.state.charge_neg_group_visible});
    } else {
      this.setState({charge_net_group_visible: !this.state.charge_net_group_visible});
    }
  }
  
  updateTimeTracks(e) {
    e.preventDefault();

    // console.log(e.target.value);
    this.setState({current_time: e.target.value});
  }
  
  handleGraphChange(event) {
    this.setState({graph_type: event.target.value});
    localStorage.setItem('graph_type', event.target.value);
  }

  handleGraphs(event) {
    window.open("http://localhost:3000/graphs/", '_blank');
    event.preventDefault();
  }

  render() {
    charge_pos_group.visible = this.state.charge_pos_group_visible;
    charge_neg_group.visible = this.state.charge_neg_group_visible;
    charge_net_group.visible = this.state.charge_net_group_visible;

    var track_count = 0
    if(this.props.json.mTracks) {
      track_count = this.props.json.mTracks.length;
    }
    
    return(
      <div>
        {this.handleChangeRequest()}
        <div style={{'zIndex': 265, position: 'absolute', right: 10, top: 10, color: 'black'}}> 
          <div className="box">
            <div className="select">
              <h1>Graphs</h1>
            </div>
            <form onSubmit={this.handleGraphs}>
              <select id="graph_type" onChange={this.handleGraphChange}>
                <option value="time_v_particle">Time vs Particles</option>
                <option value="charge_particle_pie">Charge Particle Count</option>
                <option value="theta_phi_lolipop">Theta/Phi vs Time</option>
                <option value="theta_time">Theta vs Time</option>
                <option value="phi_time">Phi vs Time</option>
              </select>
              <br/>
              <br/>
              <input type="submit" value="Open Graph"/>
              </form>
            </div>
            </div>
        <div style={{'zIndex': 265, position: 'absolute', right: 10, bottom: 10, color: 'black'}}> 
          <div className="box">
            <div className="slidecontainer">
              <input type="range" min={this.state.time_arr[0]} max={this.state.time_arr[this.state.time_arr.length - 1]} class="slider" onClick={this.updateTimeTracks} />
              <label for="time">Time</label>
            </div>

            <h1>Total Tracks: <span>{track_count}</span></h1>
            <h3> 
              Postive: 
              <span>{charge_pos_group.children.length}</span>
              <span id="positive" onClick={this.updateVisibility} className="positive-box"></span>
            </h3>
            <h3> 
              Negative: 
              <span>{charge_neg_group.children.length}</span>
              <span id="negative" onClick={this.updateVisibility} className="negative-box"></span>
            </h3>
            <h3> 
              Neutral: 
              <span>{charge_net_group.children.length}</span>
              <span id="neutral" onClick={this.updateVisibility} className="neutral-box"></span>
            </h3>
          </div> 
        </div>
      </div>
    )
  }
}

export default Mpolygon;
