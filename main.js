import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import fragment from "./assets/fragment.glsl";
import vertex from "./assets/vertexParticles.glsl";

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
const bitcoinColour = new THREE.TextureLoader().load('./bitcoin.png');
const normal = new THREE.TextureLoader().load('./bitcoin-normal.png');

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
const loader = new GLTFLoader();
const decoder = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(decoder);

var dnaShape;
loader.load('./assets/dna.glb', 
  // called when resource is loaded
  (gltf) => {
    const geometry = gltf.scene.children[0].geometry;
    geometry.center();

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uColor1: {value: new THREE.Color(0x612574)},
        uColor2: {value: new THREE.Color(0x293583)},
        uColor3: {value: new THREE.Color(0x1954ec)},
        resolution: {value: new THREE.Vector4()}
      },
      transparent:true,
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const pixelNum = geometry.attributes.position.array.length/3;
    let randomSize = new Float32Array(pixelNum);
    let randomColour = new Float32Array(pixelNum);

    for (let i = 0; i < pixelNum; i++) {
      randomSize.set([Math.random()], i);
      randomColour.set([Math.random()], i);
    }
    geometry.setAttribute('randomSize', new THREE.BufferAttribute(randomSize, 1));
    geometry.setAttribute('randomColour', new THREE.BufferAttribute(randomColour, 1));


		dnaShape = new THREE.Points( geometry, material );
    dnaShape.position.setZ(30)
		scene.add( dnaShape );

    // ******************************************************** ANIMATION LOOP *****************************
    const controls = new OrbitControls( camera, renderer.domElement );


    function animate() {
        requestAnimationFrame(animate);

        cylinder.rotation.y += 0.00009;
        cylinder.rotation.x += 0.00009;
        dnaShape.rotation.y += 0.0009;

        controls.update();
        renderer.render(scene, camera);
    }
      
    animate()
})