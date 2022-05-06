import * as THREE from 'three';

function Mpoly(trackinfo, charge) {
  var points = [];
  var color = 0x0000ff;
  if(charge === "neutral") color = 0xffffff;
  if(charge === "negative") color = 0xff0000;

  var material = new THREE.LineBasicMaterial({
    color: color
  });

  // console.log(trackinfo);
  var length = trackinfo.mPolyX.length;
  for(var i = 0; i < length; i++) {
    points.push( new THREE.Vector3( 
      trackinfo.mPolyX[i], 
      trackinfo.mPolyY[i],
      trackinfo.mPolyZ[i]
    ));
  }
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var line = new THREE.Line( geometry, material );
  
  return line;
}

export default Mpoly