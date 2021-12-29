import './style.css'
import * as THREE from "three"
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
pointLight.position.set(30, 20, 20);


const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight, pointLight);

// ********************************************************* BITCOIN ******************************************************************************
const bitcoinColour = new THREE.TextureLoader().load('./bitcoin.png');

const bitcoinGeometry = new THREE.CylinderGeometry( 4, 4, 0.5, 64 );
const bitcoinMaterial = new THREE.MeshStandardMaterial({
    map: bitcoinColour,
    metalness:0.7,
    roughness:0.3,
    wireframe:true,
});
const bitcoin = new THREE.Mesh( bitcoinGeometry, bitcoinMaterial );
bitcoin.position.setX(42);
bitcoin.position.setY(25);
bitcoin.position.setZ(-10);

bitcoin.rotateX(23);
bitcoin.rotateY(14);
bitcoin.rotateZ(170);

scene.add( bitcoin );  

// ********************************************************* ETH ******************************************************************************
const ethColour = new THREE.TextureLoader().load('./eth.png');

const ethGeometry = new THREE.CylinderGeometry( 4, 4  , 0.5, 64 );
const ethMaterial = new THREE.MeshStandardMaterial({
    map: ethColour,
    metalness:0.7,
    roughness:0.3,
    wireframe:true,
});

const ethCoin = new THREE.Mesh( ethGeometry, ethMaterial );
ethCoin.position.setX(20);
ethCoin.position.setY(-17);
ethCoin.position.setZ(-10);

ethCoin.rotateX(23);
ethCoin.rotateY(14);
ethCoin.rotateZ(170);

scene.add( ethCoin );  

// ********************************************************* PARTICLE SYSTEM ******************************************************************************
const loader = new GLTFLoader();
const decoder = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(decoder);

var dnaShape;
loader.load('./dna.glb', 
  // called when resource is loaded
  (gltf) => {
    const geometry = gltf.scene.children[0].geometry;
    geometry.center();

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uColor1: {value: new THREE.Color(0x2a322e)},
        uColor2: {value: new THREE.Color(0x212427)},
        uColor3: {value: new THREE.Color(0x8D806F)},
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
    dnaShape.position.setX(5)
    dnaShape.position.setY(2)
    dnaShape.position.setZ(32)
		scene.add( dnaShape );

    // ******************************************************** ANIMATION LOOP *****************************


    function animate() {
        requestAnimationFrame(animate);

        ethCoin.rotation.x -= 0.00009;
        ethCoin.rotation.y -= 0.00009;

        bitcoin.rotation.x += 0.0001;
        bitcoin.rotation.y += 0.0001;

        dnaShape.rotation.y += 0.00006;

        renderer.render(scene, camera);
    }
      
    animate()
})