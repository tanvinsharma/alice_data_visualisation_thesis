import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as GLTFLoader from 'three-gltf-loader'
import * as OBJLoader from 'three-obj-mtl-loader'
import Scene from "../resources/Scene";
import SpotLight from '../resources/SpotLight';

// import OrbitControls from 'three-orbitcontrols';

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
var spotlight = SpotLight([0, 20, 50], 0x000000);
var scene = Scene(spotlight);

// var loader = new GLTFLoader();
const loader = new GLTFLoader();
loader.load( '../../objects/object.gltf', function ( gltf ) {
  // var obj = gltf.scene.children[0];
  // obj.scale.set(2, 2, 2);
	// gltf.scene.traverse( function ( child ) {
	// 	if ( child.isMesh ) {
	// 		child.material.envMap = envMap;
	// 	}
	// } );
	scene.add( gltf.scene );
  // },
  // function ( xhr ) {
  //   console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //   console.log(xhr.loaded, xhr.total);
  // },
  // // called when loading has errors
  // function ( error ) {
  //   console.log( 'An error happened' );
  // }
});

// const loader = new OBJLoader();

// // load a resource
// loader.load(
//   // resource URL
//   '../../objects/object.',
//   // called when resource is loaded
//   function ( object ) {

//     scene.add( object );

//   },
//   // called when loading is in progresses
//   function ( xhr ) {

//     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//   },
//   // called when loading has errors
//   function ( error ) {

//     console.log( 'An error happened' );

//   }
// );

function ImportGlb() {
	renderer.setSize(
    window.innerWidth, 
    window.innerHeight
  );

  renderer.shadowMap.enabled = true;

  camera.position.x = 50; 
  camera.position.y = 50; 
  camera.position.z = 0; 

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
  
	document.getElementById('root').append(renderer.domElement);
	return ( null );
}

export default ImportGlb