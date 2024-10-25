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
const renderer = new THREE.WebGLRenderer({
  // Set antialias
  antialias: true
});

// Enable shadows
renderer.shadowMap.enabled = true;

// Set renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append renderer to DOM
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Add ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff, .5 );
scene.add( ambientLight );

// Add directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 5, 5, 5 );

// Allow light to cast shadows
directionalLight.castShadow = true;

// Add directional light to scene
scene.add( directionalLight );

// Create back wall cube
const backWallgeometry = new THREE.BoxGeometry( 6, 1, .1 ); // width, height, depth
const backWallmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const backWallcube = new THREE.Mesh( backWallgeometry, backWallmaterial );

// Set back wall cube position
backWallcube.position.z = -2.479;

// Add cube to scene
scene.add( backWallcube );

// Add left side wall cube
const leftWallgeometry = new THREE.BoxGeometry( .1, 1, 5 ); // width, height, depth
const leftWallmaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const leftWallcube = new THREE.Mesh( leftWallgeometry, leftWallmaterial );

// Set left wall cube position
leftWallcube.position.x = -3.05;

// Add cube to scene
scene.add( leftWallcube );

// Add right side wall cube
const rightWallgeometry = new THREE.BoxGeometry( .1, 1, 5 ); // width, height, depth
const rightWallmaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const rightWallcube = new THREE.Mesh( rightWallgeometry, rightWallmaterial );

// Set right wall cube position
rightWallcube.position.x = 3.05;

// Add cube to scene
scene.add( rightWallcube );

// Add front wall cube
const frontWallgeometry = new THREE.BoxGeometry( 5, 1, .1 ); // width, height, depth
const frontWallmaterial = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
const frontWallcube = new THREE.Mesh( frontWallgeometry, frontWallmaterial );

// Set front wall cube position
frontWallcube.position.z = 2.479;
frontWallcube.position.x = -0.5;

// Add cube to scene
scene.add( frontWallcube );

// Add a plane
const planeGeometry = new THREE.PlaneGeometry( 10, 10 );
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );

// Rotate plane
plane.rotation.x = - Math.PI / 2;
plane.position.y = - 0.5;

// Allow plane to receive shadows
plane.receiveShadow = true;

// Add plane to scene
scene.add( plane );

// Set camera position
camera.position.z = 5;

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

// Axes helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Directional lights helper
const directionalLightsHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( directionalLightsHelper );

// Add animation
function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}