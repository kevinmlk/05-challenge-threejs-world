// Import style
import './style.css';

// Import three.js
import * as THREE from 'three';

// Import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import text
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

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
const backWallMaterial = new THREE.MeshBasicMaterial( { color: 0x76808f  } );
const backWallCube = new THREE.Mesh( backWallGeometry, backWallMaterial );

// Set back wall cube position
backWallCube.position.z = -2.52;
backWallCube.position.x = .4;

// Add cube to scene
scene.add( backWallCube );

// Add left side wall cube
const leftWallGeometry = new THREE.BoxGeometry( .1, 1, 4.9 ); // width, height, depth
const leftWallMaterial = new THREE.MeshBasicMaterial( { color: 0x76808f  } );
const leftWallCube = new THREE.Mesh( leftWallGeometry, leftWallMaterial );

// Set left wall cube position
leftWallCube.position.x = -2;
leftWallCube.position.z = -.1;

// Add cube to scene
scene.add( leftWallCube );

// Add right side wall cube
const rightWallGeometry = new THREE.BoxGeometry( .1, 1, 4.9 ); // width, height, depth
const rightWallMaterial = new THREE.MeshBasicMaterial( { color: 0x76808f  } );
const rightWallCube = new THREE.Mesh( rightWallGeometry, rightWallMaterial );

// Set right wall cube position
rightWallCube.position.x = 2.8;
rightWallCube.position.z = -.1;

// Add cube to scene
scene.add( rightWallCube );

// Add front wall cube
const frontWallGeometry = new THREE.BoxGeometry( 3.9, 1, .1 ); // width, height, depth
const frontWallMaterial = new THREE.MeshBasicMaterial( { color: 0x76808f    } );
const frontWallCube = new THREE.Mesh( frontWallGeometry, frontWallMaterial );

// Set front wall cube position
frontWallCube.position.z = 2.32;
frontWallCube.position.x = .8;

// Add cube to scene
scene.add( frontWallCube );

// Add ceiling wall cube
const roofGeometry = new THREE.ConeGeometry( 3.5, 1, 4 ); 
const roofMaterial = new THREE.MeshBasicMaterial( { color: 0x393c3e   } );
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

// Add text
// Font loader
const fontLoader = new FontLoader();
fontLoader.load('./Halcom_Regular.json', function(font) {
  // Create text geometry
  const textGeometry = new TextGeometry('Kevin Malekera', {
    font: font,
    size: 0.2,
    height: 0.2,
  });

  const textMaterial = new THREE.MeshStandardMaterial({ color: 0x02314d  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text
  textMesh.position.set(-1, 0, 2.5);

  // Calculate the bounding box of the text to size the background plane
  textGeometry.computeBoundingBox();
  const boundingBox = textGeometry.boundingBox;
  const textWidth = boundingBox.max.x - boundingBox.min.x;
  const textHeight = boundingBox.max.y - boundingBox.min.y;

  // Create a background plane slightly larger than the text dimensions
  const backgroundGeometry = new THREE.PlaneGeometry(textWidth + 0.1, textHeight + 0.1);
  const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Set desired background color
  const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

  // Position the background plane behind the text
  backgroundPlane.position.set(
    textMesh.position.x + textWidth / 2,
    textMesh.position.y + textHeight / 2,
    textMesh.position.z - 0.1 // Move slightly behind the text
  );

  // Add both text and background plane to the scene
  scene.add(backgroundPlane);
  scene.add(textMesh);
});

// Add trees
// Tree creation function
function createTree(position = { x: 0, y: 0, z: 0 }, scale = 1) {
  const trunkGeometry = new THREE.CylinderGeometry(0.1 * scale, 0.1 * scale, 1 * scale, 12);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  const foliageGeometry = new THREE.SphereGeometry(0.5 * scale, 16, 16);
  const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);

  trunk.position.set(position.x, position.y + (0.5 * scale), position.z);
  foliage.position.set(position.x, position.y + (1 * scale), position.z);

  trunk.castShadow = true;
  foliage.castShadow = true;

  const tree = new THREE.Group();
  tree.add(trunk);
  tree.add(foliage);

  scene.add(tree);
}

// Adding multiple trees
const treePositions = [
  { x: -3, y: -.5, z: -3 },
  { x: 1, y: -.5, z: 4 },
  { x: 4, y: -.5, z: -1 },
  { x: -3, y: -.5, z: 2 }
];

treePositions.forEach((position) => {
  const scale = 0.5 + Math.random() * 0.5;
  createTree(position, scale);
});



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