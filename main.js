// Import style
import './style.css';

// Import three.js
import * as THREE from 'three';

// Import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Create renderer
const renderer = new THREE.WebGLRenderer();

// Set renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append renderer to DOM
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Create cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

// Add cube to scene
scene.add( cube );

// Set camera position
camera.position.z = 5;

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

// Add animation
function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}