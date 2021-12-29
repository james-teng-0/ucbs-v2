import './style.css'
import * as THREE from "three"

// ******************************************************** SCENE SETUP ******************************************************************************
const scene = new THREE.Scene(); // container for threejs objects
scene.background = new THREE.Color( 0x1e1e25 );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); // fov, aspect ratio, view frustrum

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.setZ(40);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight, pointLight);

// ********************************************************* COIN ******************************************************************************
const bitcoinColour = new THREE.TextureLoader().load('/bitcoin.png');
const normal = new THREE.TextureLoader().load('/bitcoin-normal.png');

const geometry = new THREE.CylinderGeometry( 20, 20, 2, 64 );
const material = new THREE.MeshStandardMaterial({
    map: bitcoinColour,
    metalness:0.7,
    roughness:0.3,
    wireframe:true,
});
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.setX(20);
cylinder.position.setY(5);
cylinder.position.setZ(-10);

cylinder.rotateX(23);
cylinder.rotateY(14);
cylinder.rotateZ(170);

scene.add( cylinder );  

// ********************************************************* PARTICLE SYSTEM ******************************************************************************


// ******************************************************** ANIMATION LOOP ******************************************************************************

function animate() {
    requestAnimationFrame(animate);

    cylinder.rotation.y += 0.00009;
    cylinder.rotation.x += 0.00009;

    renderer.render(scene, camera);
}
  
animate()