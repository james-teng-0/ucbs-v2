import{S as C,C as l,P as y,W as b,a as P,A as x,T as g,b as S,M as L,c as A,G as R,D as M,d as O,e as z,V as D,f as F,B as p,g as W,O as Z}from"./vendor.c9e111fb.js";const G=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function u(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=u(e);fetch(e.href,o)}};G();var N="uniform float time;uniform float progress;uniform sampler2D texture1;uniform vec4 resolution;varying vec2 vUv;varying vec3 vPosition;varying float vColourRandom;uniform vec3 uColor1;uniform vec3 uColor2;uniform vec3 uColor3;float PI=3.141592653589793238;void main(){float alpha=1.-smoothstep(-0.2,0.5,length(gl_PointCoord-vec2(0.5)));alpha*=0.5;vec3 finalColor=uColor1;if(vColourRandom>0.33&&vColourRandom<0.66){finalColor=uColor2;}if(vColourRandom>0.66){finalColor=uColor3;}float gradient=smoothstep(0.1,0.6,vUv.y);gl_FragColor=vec4(finalColor,alpha);}",T="uniform float time;varying vec2 vUv;varying vec3 vPosition;varying float vColourRandom;uniform sampler2D texture1;float PI=3.141592653589793238;attribute float randomSize;attribute float randomColour;void main(){vUv=uv;vColourRandom=randomColour;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_PointSize=(30.*randomSize+5.)*(1./-mvPosition.z);gl_Position=projectionMatrix*mvPosition;}";const a=new C;a.background=new l(1973797);const f=new y(75,window.innerWidth/window.innerHeight,.1,1e3),d=new b({canvas:document.querySelector("#bg")});d.setPixelRatio(window.devicePixelRatio);d.setSize(window.innerWidth,window.innerHeight);f.position.setZ(40);const w=new P(16777215,2);w.position.setZ(40);const U=new x(16777215,2);a.add(U,w);const _=new g().load("./bitcoin.png");new g().load("./bitcoin-normal.png");const q=new S(20,20,2,64),B=new L({map:_,metalness:.7,roughness:.3,wireframe:!0}),r=new A(q,B);r.position.setX(20);r.position.setY(5);r.position.setZ(-10);r.rotateX(23);r.rotateY(14);r.rotateZ(170);a.add(r);const h=new R,I=new M().setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");h.setDRACOLoader(I);var c;h.load("./dna.glb",m=>{const t=m.scene.children[0].geometry;t.center();const u=new O({side:z,uniforms:{uColor1:{value:new l(6366580)},uColor2:{value:new l(2700675)},uColor3:{value:new l(1660140)},resolution:{value:new D}},transparent:!0,vertexShader:T,fragmentShader:N,depthTest:!1,depthWrite:!1,blending:F}),n=t.attributes.position.array.length/3;let e=new Float32Array(n),o=new Float32Array(n);for(let s=0;s<n;s++)e.set([Math.random()],s),o.set([Math.random()],s);t.setAttribute("randomSize",new p(e,1)),t.setAttribute("randomColour",new p(o,1)),c=new W(t,u),c.position.setZ(30),a.add(c);const i=new Z(f,d.domElement);function v(){requestAnimationFrame(v),r.rotation.y+=9e-5,r.rotation.x+=9e-5,c.rotation.y+=9e-4,i.update(),d.render(a,f)}v()});
