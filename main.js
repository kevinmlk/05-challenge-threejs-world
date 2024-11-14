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
const backWallGeometry = new THREE.BoxGeometry( 4.9, 1, .1 ); // width, height, depth
const backWallMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const backWallCube = new THREE.Mesh( backWallGeometry, backWallMaterial );

// Set back wall cube position
backWallCube.position.z = -2.52;
backWallCube.position.x = .4;

// Add cube to scene
scene.add( backWallCube );

// Add left side wall cube
const leftWallGeometry = new THREE.BoxGeometry( .1, 1, 4.9 ); // width, height, depth
const leftWallMaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const leftWallCube = new THREE.Mesh( leftWallGeometry, leftWallMaterial );

// Set left wall cube position
leftWallCube.position.x = -2;
leftWallCube.position.z = -.1;

// Add cube to scene
scene.add( leftWallCube );

// Add right side wall cube
const rightWallGeometry = new THREE.BoxGeometry( .1, 1, 4.9 ); // width, height, depth
const rightWallMaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const rightWallCube = new THREE.Mesh( rightWallGeometry, rightWallMaterial );

// Set right wall cube position
rightWallCube.position.x = 2.8;
rightWallCube.position.z = -.1;

// Add cube to scene
scene.add( rightWallCube );

// Add front wall cube
const frontWallGeometry = new THREE.BoxGeometry( 3.9, 1, .1 ); // width, height, depth
const frontWallMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
const frontWallCube = new THREE.Mesh( frontWallGeometry, frontWallMaterial );

// Set front wall cube position
frontWallCube.position.z = 2.32;
frontWallCube.position.x = .8;

// Add cube to scene
scene.add( frontWallCube );

// Add ceiling wall cube
const roofGeometry = new THREE.ConeGeometry( 3.5, 1, 4 ); 
const roofMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const roofCube = new THREE.Mesh( roofGeometry, roofMaterial );

// Set roof cube position

roofCube.rotation.y = Math.PI / 4;

roofCube.position.x = Math.PI / 8;
roofCube.position.y = Math.PI / 3.1;
roofCube.position.z = -0.1;

// Add cube to scene
scene.add( roofCube );

// Add painting
// Load texture
const textureLoader = new THREE.TextureLoader();
const paintingTexture = textureLoader.load( './rickroll.jpg' );

// Create painting
const paintingGeometry = new THREE.BoxGeometry( 1, .5, 0.02 );
const paintingMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, map: paintingTexture } );
const painting = new THREE.Mesh( paintingGeometry, paintingMaterial );

// Set painting position
painting.position.z = -2.46;

// Add painting to scene
scene.add( painting );

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