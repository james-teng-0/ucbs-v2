uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying float vColourRandom; 
uniform sampler2D texture1;
float PI = 3.141592653589793238;

attribute float randomSize;
attribute float randomColour;

void main() {
  vUv = uv;
  vColourRandom = randomColour;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
  gl_PointSize = (30.*randomSize + 5.) * ( 1. / - mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}