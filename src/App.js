import React from "react";
import logo from "./logo.svg";
import {
  complex,
  multiply,
  sqrt,
  pow,
  hypot,
  erf,
  arg,
  conj,
  chain,
  divide,
} from "mathjs";
import "./App.css";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {
  Vector3,
  PixelFormat,
  Vector4,
  ColorKeyframeTrack,
  LinearInterpolant,
  BackSide,
  DoubleSide,
  FrontSide,
  SpotLightShadow,
} from "three";
import { getDefaultNormalizer } from "@testing-library/react";
const THREE = require("three");
// const math = require("mathjs");
const PI = Math.PI;
const c = 299792458;
const matmul = new THREE.Matrix4();
var renderer, scene, camera;
var count = Math.pow(4, 4);
var velx = new Array(count).fill(0);
var vely = new Array(count).fill(0);
var velz = new Array(count).fill(0);
var velw = new Array(count).fill(0);
var posw = new Array(count).fill(0);
// for (var j = 0; j < weight.length; j++)
//   for (var i = 0; i < weight.length; i++) weight[j][i] = Math.random();
var clicked = false;
var switchcam = 640;
var controls;
const gravconst = 6.6741e-11;
const angdif = (x, y) => x.dot(y) / (x.length() * y.length());
const frnd = (x) => Math.fround(x);
var stats, tempsphere;
const speck = (x) => x>0?2 * 2 ** (-x - 1):2 * 2 ** (x - 1);
const tanh = (x) => Math.tanh(x);
const tan = (x) => Math.tan(x);
const asin = (x) => Math.asin(x);
const sign = (x) => Math.sign(x);
const round = (x) => Math.round(x);
var fib = (x) =>
  x > 0
    ? (1 / sqrt(5)) * Math.pow((1 + sqrt(5)) / 2, x)
    : -((1 / sqrt(5)) * Math.pow((1 + sqrt(5)) / 2, -x));
var ef = (x) => (2 / sqrt(PI)) * Math.exp(-pow(x, 2));

const lor = (x) => (2 / PI) * Math.atan(x) ;
const sigscaler = 1;//PI**3;
const leg = (x) => x / (sigscaler + Math.abs(x));
const sig = (x) => 1 / (1 + Math.exp(-x));
const sigdriv = (x) => sig(x) * (1 - sig(x)) * 4; //sig(x)*(-1+sig(x))
const signedsig = (x) => 1 / (1 + Math.exp(-x));
const cosatan = (x) => (x > 0 ? 1 - cos(Math.atan(x)) : -1 + cos(Math.atan(x)));
const sinatan = (x) => sin(Math.atan(x));
const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);
const log = (x) => (1 / (1 + Math.exp(-x)) - 0.5) * 2;
const atan = (x) => Math.atan(x) / (PI / 2);
const spheres = [];

var start = Date.now();
init();

animate();

function makeSphere() {
  const sphere = new THREE.Line(
    new THREE.OctahedronBufferGeometry(1, 4),

    new THREE.MeshPhongMaterial({
      color: 0x8d7619,

      // fog: true,

      // blending: THREE.NormalBlending,
      // castshadow:true,
      // receiveshadow:true,
      // wireframe:true,
      // flatShading:true,
      // dithering: true,
      // size:.0001,
      transparent: true,
      opacity: 0.025,
      specular: 0x7e7a8a,
      depthTest: 0, //.25,
      side: BackSide,
      // shininess:1,
      // emissive:0x7e7a8a,//0x8D7619 ,
      // skinning:true,
      premultipliedAlpha: true,
      // reflectivity: 1,
      //  bumpScale:.25
    })
  );
  return sphere;
}
function init() {
  camera = new THREE.PerspectiveCamera(
    45,

    window.innerWidth / window.innerHeight,

    1,
    1000000000
  );

  camera.position.y = switchcam;
  camera.position.z = switchcam;
  camera.position.x = switchcam;
  var color = 0x00000e;
  scene = new THREE.Scene();
  var intensity = 6;
  var light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(10000.0, 10000, 10000.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(-10000.0, -10000, -10000.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(-0, 10000, 10000.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(0, -10000, -10000.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(10000, 10000, 0.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(-10000, -10000, 0.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(10000.0, -0, 10000);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(-10000.0, 0, -10000);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(0.0, -0, 10000);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(0.0, 0, -10000);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(0, 10000, 0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.00001);
  light.position.set(0, -10000, 0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(10000, 0, 0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.00001);
  light.position.set(-10000, 0, 0);
  scene.add(light);
  var lighta = new THREE.PointLight(0x7a7a7a, 5, 100000000, 0.1);
  lighta.position.set(0.0, 0.0, 0.0);
  scene.add(lighta);
  // scene.background = new THREE.Color(0xffffff)
  var d = new Date();
  var c = 0;
  var countsplit = Math.pow(count, 1 / 4);
  var shaderMaterial = new THREE.ShaderMaterial({
    // uniforms: 		customUniforms,
    // attributes:		customAttributes,
    // vertexShader:   document.getElementById( 'vertexshader' ).textContent,
    // fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    transparent: true,
    alphaTest: 0.5, // if having transparency issues, try including: alphaTest: 0.5,
    // blending: THREE.AdditiveBlending, depthTest: false,
  });
  for (var j = 0; j < countsplit; j++) {
    for (var k = 0; k < countsplit; k++) {
      for (var i = 0; i < countsplit; i++) {
        for (var l = 0; l < countsplit; l++) {
          tempsphere = makeSphere(); // new THREE.ParticleSystem(new THREE.OctahedronBufferGeometry(1,5),new THREE.MeshPhongMaterial({transparent: true, alphaTest: 0.5,}))
          // tempsphere.position.set(0, 50, 0);
          // tempsphere.dynamic = true;
          const tempcount = (countsplit - 1) / 2;
          const ii = i - tempcount;
          const kk = k - tempcount;
          const jj = j - tempcount;
          const ll = l - tempcount; //(l - ((countsplit -1) / 2));
          const r = Math.hypot(ii, jj, kk);
          const rhat = Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2));
          const phi = Math.atan2(jj, ii); //(i / countsplit) * PI; //Math.atan2(ii, -kk) * (Math.PI / 180);
          const theta = Math.atan2(rhat, kk);
          const time = parseInt(d.getTime());
          tempsphere.position.x = 32 * ii;
          tempsphere.position.y = 32 * jj;
          tempsphere.position.z = 32 * kk;
          posw[c++] = (32)*(l)//(l/(l+1))///( (((l)))); //((ii*jj*kk)%ll); //(256 / tempcount) * Math.abs(l); //abs((kk*jj*ii)%ll)//             (256 / (1)) * ((ii*jj*kk)%(ll)/1  ); // (count/1)*((ll*jj*kk*ii)%countsplit); //sign(ll*jj*kk*ii)%countsplit * (count/countsplit)*((ii*jj*kk)%count)//((ii*jj*kk)%c)>0?-256:256//(c%2)?256:-256
          // tempsphere.setScale(0);
          // tempsphere.castShadow = true;

          spheres.push(tempsphere);
          scene.add(tempsphere);
        }
      }
    }
  }
  const gr = (sqrt(5.0) + 1.0) / 2.0; // golden ratio = 1.6180339887498948482
  const ga = (2.0 - gr) * (2.0 * PI); // golden angle = 2.39996322972865332

  let size = spheres.length;

  renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setSize(window.innerWidth, window.innerHeight);

  stats = new Stats();

  document.body.appendChild(stats.dom);

  document.body.appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);
  window.addEventListener("click", onclick, false);
  window.addEventListener("resize", onWindowResize, false);
}

function onclick() {
  // switchcam = clicked===true?(clicked=false,4000):(clicked=true,0);
  camera.updateProjectionMatrix();
  camera.position.x =
    clicked === true ? ((clicked = false), switchcam) : ((clicked = true), 0); //switchcam;
  camera.position.y =
    clicked === true
      ? ((clicked = false), switchcam)
      : ((clicked = true), switchcam); //switchcam;
  camera.position.z =
    clicked === true ? ((clicked = false), switchcam) : ((clicked = true), 0); //switchcam;
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
var step = false;
function animate() {
  // () => {
  // stats.begin();
  stats.update();
  render();
   setTimeout(function cb() {
  requestAnimationFrame(animate);
   }, 1000 / 30);
  // (1000 / 10) * step == false ? 2 : (step = false)
    // ,1
  // );
  // step = true;
  // stats.end();
}

function render() {
  var size = spheres.length;
  var x1, y1, z1, w1, x, y, z, w, sph1;
  var sphere1, sphere, s;

  const scale = 1e0;
  var check = 0.001;

  for (let ndx1 = 0; ndx1 < size; ndx1++) {
    sphere1 = spheres[ndx1];
    //  var  vx =velx[ndx1]+(Math.random()>.5?1:-1);
    //  var  vy =vely[ndx1]+(Math.random()>.5?1:-1);
    //  var  vz =velz[ndx1]+(Math.random()>.5?1:-1);
    //  var  vw =velw[ndx1]+(Math.random()>.5?1:-1);
    //   velx[ndx1] =.5-sig(vx)
    //   vely[ndx1] =.5-sig(vy)
    //   velz[ndx1] =.5-sig(vz)
    //   velw[ndx1] =.5-sig(vw)

    sphere1.translateX(((velx[ndx1])) * scale);
    sphere1.translateY(((vely[ndx1])) * scale);
    sphere1.translateZ(((velz[ndx1])) * scale);
    posw[ndx1] +=      ((velw[ndx1])) * scale;
    // if (posw[ndx1] <= 1 && posw[ndx1] >= -1) {
      // posw[ndx1] = 0;
      // check = 1;
      // } else if (posw[ndx1] > 1) {
      //   posw[ndx1] = 1;
      // check = 1;
    // } else 
    // posw[ndx1] =posw[ndx1]>0?posw[ndx1]:posw[ndx1]>1?1:0
    check = Math.abs(posw[ndx1]);
    s = check*.5/PI ; //.1 * PI *0.0000009403 * pow(posw[ndx1] <= 1 ? 1 : posw[ndx1], 2); //1.77245//0.2821//0.1592//0.09403///8//1///Math.pow(PI,1)/2 ;//1.77245//
    sphere1.scale.set(s, s, s); //1
  }
  
  // const mergedo = (l, r) => {
    // var m = Math.floor(l + (r - 1)) / 2;
    
    // for(l;l<r;l++) 
    // {
      // r=r-l
      var tempspheres = spheres//.splice(0,spheres.length/2);
      for(let l = 1;l<tempspheres.length; l++){
  for(let r =0;r<l;){
    // if (l >=r) continue;
      // let r = tempspheres.length -1;
      sphere1 = tempspheres[l].position; //getWorldPosition(spheres[i].position);
      sphere =  tempspheres[r].position; //.getWorldPosition(spheres[j].position);
      // const wpos1 = sphere1.getWorldPosition();

      x1 = Math.round(sphere1.x*1e5); //2*(sig((sphere1.x * 1e6) / 1e6)-.5);
      y1 = Math.round(sphere1.y*1e5); //2*(sig((sphere1.y * 1e6) / 1e6)-.5);
      z1 = Math.round(sphere1.z*1e5); //2*(sig((sphere1.z * 1e6) / 1e6)-.5);
      w1 = Math.round(posw[l]  *1e5); //2*(sig((posw[i]   * 1e6) / 1e6)-.5); //*299792458;
      const sph1 = new Vector4(x1, y1, z1, w1)//.normalize()

      x = Math.round(sphere.x*1e5); ////2*(sig((sphere.x * 1e6) / 1e6)-.5);
      y = Math.round(sphere.y*1e5); ////2*(sig((sphere.y * 1e6) / 1e6)-.5);
      z = Math.round(sphere.z*1e5); ////2*(sig((sphere.z * 1e6) / 1e6)-.5);
      w = Math.round(posw[r] *1e5); //*(sig((posw[j]  * 1e6) / 1e6)-.5); //*299792458;

      const sph = new Vector4(x, y, z, w)//.normalize();
      const s = size;let c = 299792548;
      var sphdis = new Vector4().subVectors(sph1, sph).normalize() //.normalize(); //.normalize()//
      var sphdis1 = new Vector4().subVectors(sph1, sph)//.normalize(); //.normalize()//
      var mid = (
       (
          ((sphdis1.x))**2 + ((sphdis1.y))**2 + ((sphdis1.z))**2 + (sphdis1.w ** 2) 
        )
      );
      const gr = (sqrt(5.0) + 1.0) / 2.0; // golden ratio = 1.6180339887498948482
      const ga = (2.0 - gr) * (2.0 * PI); // golden angle = 2.39996322972865332
      var midangle = (sph.length() * sph1.length())?Math.acos(-sph1.dot(sph) /(sph.length() * sph1.length())):0//(sph.length() * sph1.length()));//arg(mid);
	  midangle = midangle?midangle*(1/PI):0;
	mid= (mid)?sigdriv(1/(mid)):0//-((mid));
	  
      // mid=(1/mid**2)
      // mid=mid==0?1:mid

      sphdis
        
          // .applyMatrix4(
          //   matmul.set(
          //   sphdis.x,0,-1,0,
          //   0,sphdis.y,0,-1,
          //   -1,0,sphdis.z,0,
          //   0,-1,0,sphdis.w)
          // )
        .multiplyScalar(1/2**midangle)
	.divideScalar(s*1e0)
        // .setLength(1/mid)
 
      velx[l] = (velx[l] - (Math.round(sphdis.x*1e5)/1e5)); //sphdis.x)) / 1000; // * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
      vely[l] = (vely[l] - (Math.round(sphdis.y*1e5)/1e5)); //sphdis.y)) / 1000; // * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
      velz[l] = (velz[l] - (Math.round(sphdis.z*1e5)/1e5)); //sphdis.z)) / 1000; // * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +
      velw[l] = (velw[l] - (Math.round(sphdis.w*1e5)/1e5)); //sphdis.w)) / 1000; // * dis * s; //?dirw-.000001:dirw==0?0:dirw
      velx[r] = (velx[r] + (Math.round(sphdis.x*1e5)/1e5)); //sphdis.x)) / 1000; // * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
      vely[r] = (vely[r] + (Math.round(sphdis.y*1e5)/1e5)); //sphdis.y)) / 1000; // * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
      velz[r] = (velz[r] + (Math.round(sphdis.z*1e5)/1e5)); //sphdis.z)) / 1000; // * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +r
      velw[r] = (velw[r] + (Math.round(sphdis.w*1e5)/1e5)); //sphdis.w)) / 1000; // * dis * s; //?dirw-.000001:dirw==0?0:dirw
    // }1
    // mergedo(l, m);
    // mergedo(m +1, r);
    r++;
  }
}
  // mergedo(0,size-1);
  // mergedo((size/2)+1,size-1)
  // function mergeSort(input) {
  //   // Here is your recursion stop condition

  //   const median = Math.floor(input.length / 2);
  //   var l = 0;
  //   var r = median;
  //   // Limit arrays should get sliced with each iteration
  //   const limitA = input.slice(0, median);
  //   const limitB = input.slice(median);
  //   if (input.length === 1) return input;
    
  //   for(r=0;r<input.length;r++)
  //   {
  //     sphere1 = input[l].position; //getWorldPosition(spheres[i].position);

  //     x1 = round(sphere1.x); //2*(sig((sphere1.x * 1e6) / 1e6)-.5);
  //     y1 = round(sphere1.y); //2*(sig((sphere1.y * 1e6) / 1e6)-.5);
  //     z1 = round(sphere1.z); //2*(sig((sphere1.z * 1e6) / 1e6)-.5);
  //     w1 = round(posw[l]); //2*(sig((posw[i]   * 1e6) / 1e6)-.5); //*299792458;
  //     const sph1 = new Vector4(x1, y1, z1, w1);

  //     // for(r=0;r<input.length;r++){
  //     sphere = input[r].position; //.getWorldPosition(spheres[j].position);
  //     // const wpos1 = sphere1.getWorldPosition();
  //     x = round(sphere.x); ////2*(sig((sphere.x * 1e6) / 1e6)-.5);
  //     y = round(sphere.y); ////2*(sig((sphere.y * 1e6) / 1e6)-.5);
  //     z = round(sphere.z); ////2*(sig((sphere.z * 1e6) / 1e6)-.5);
  //     w = round(posw[r]); //*(sig((posw[j]  * 1e6) / 1e6)-.5); //*299792458;

  //     const sph = new Vector4(x, y, z, w); //.normalize();
  //     const s = size - 1;
  //     var sphdis = new Vector4().subVectors(sph1, sph); //.normalize()//
  //     var mid = complex(
  //       sqrt(
  //         sphdis.x ** 2 + sphdis.y ** 2 + sphdis.z ** 2 - sphdis.w ** 2 * c ** 2
  //       )
  //     );
  //     var midangle = arg(mid);
  //     mid = sigdriv(erf(mid.re));
  //     // mid=mid==0?1:mid

  //     const gr = (sqrt(5.0) + 1.0) / 2.0; // golden ratio = 1.6180339887498948482
  //     const ga = (2.0 - gr) * (2.0 * PI); // golden angle = 2.39996322972865332
  //     sphdis
  //       .set(
  //         //.multiplyScalar(dis-mid).divideScalar(s*sqrt(sphdis.length()))//.normalize() // mid= (mid.re)//
  //         mid * erf(sphdis.x),
  //         mid * erf(sphdis.y),
  //         mid * erf(sphdis.z),
  //         mid * erf(sphdis.w)
  //       )
  //       .divideScalar(s * 1e1);

  //     velx[l] = velx[l] - sphdis.x; //sphdis.x)) / 1000; // * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
  //     vely[l] = vely[l] - sphdis.y; //sphdis.y)) / 1000; // * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
  //     velz[l] = velz[l] - sphdis.z; //sphdis.z)) / 1000; // * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +
  //     velw[l] = velw[l] - sphdis.w; //sphdis.w)) / 1000; // * dis * s; //?dirw-.000001:dirw==0?0:dirw
  //     velx[r] = velx[r] + sphdis.x; //sphdis.x)) / 1000; // * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
  //     vely[r] = vely[r] + sphdis.y; //sphdis.y)) / 1000; // * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
  //     velz[r] = velz[r] + sphdis.z; //sphdis.z)) / 1000; // * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +r
  //     velw[r] = velw[r] + sphdis.w; //sphdis.w)) / 1000; // * dis * s; //?dirw-.000001:dirw==0?0:dirw
  //   }
  //       mergeSort(limitA);
  //   mergeSort(limitB);

  // }

  // mergeSort(spheres);

  // // for(let q = 0 ; q<2;  q++)
  // for (let i = size - 1; i >= 0; i) {
  //   // let i=i
  //   let sync2 = async () => {
  //     sphere1 = spheres[i].position; //getWorldPosition(spheres[i].position);
  //     // const wpos1 = sphere1.getWorldPosition();

  //     x1 = round(sphere1.x);//2*(sig((sphere1.x * 1e6) / 1e6)-.5);
  //     y1 = round(sphere1.y);//2*(sig((sphere1.y * 1e6) / 1e6)-.5);
  //     z1 = round(sphere1.z);//2*(sig((sphere1.z * 1e6) / 1e6)-.5);
  //     w1 = round(posw[i]  );//2*(sig((posw[i]   * 1e6) / 1e6)-.5); //*299792458;
  //     sph1 = new Vector4(x1, y1, z1, w1)//.normalize();
  //     // elx =  0 || y1 == 0 || z1 == 0 || w1 == 0) continue;

  //     for (var j = size-1; j > i; j) {
  //       let sync = async () => {
  //         sphere = spheres[j].position; //.getWorldPosition(spheres[j].position);
  //         // if (i == j) continue;
  //         // if(!Max[j]||!Min[j]||Max[j] - Min[j]<0)continue;
  //         x = round(sphere.x);////2*(sig((sphere.x * 1e6) / 1e6)-.5);
  //         y = round(sphere.y);////2*(sig((sphere.y * 1e6) / 1e6)-.5);
  //         z = round(sphere.z);////2*(sig((sphere.z * 1e6) / 1e6)-.5);
  //         w = round(posw[j] );//*(sig((posw[j]  * 1e6) / 1e6)-.5); //*299792458;

  //         const sph = new Vector4(x, y, z, w)//.normalize();
  //         // sph.normalize();sph1.normalize();
  //         // const sphd1 = new Vector4().lerpVectors(sph,sph1,1)//subVectors(sph1, sph); //.normalize(); //.normalize()
  //         // const sphd = new  Vector4().lerpVectors(sph1,sph,1)//
  //         var dis = (Math.acos(-sph1.dot(sph) / (sph.length() * sph1.length()))); //**2//1-1/(sqrt(sphd.length()))//((mid*mid))//(Math.pow((mid),2/3)*4.83598);
  //         // const sphd = new Vector4().subVectors(sph, sph1); //.normalize(); //.normalize()
  //         // sphd.set(ef(sphd.x),ef(sphd.y),ef(sphd.z),ef(sphd.w))
  //         // sphd.w = -sphd.w*299792458
  //         // console.log(sphd.toArray());
  //         // const thing = new Vector4(1, 1, 1, 1);
  //         // var mid =  sqrt(abs(pow(sphd.x,2)+pow(sphd.y,2)+pow(sphd.z,2)-pow(sphd.w,2)))//sphd.length(); //sqrt(pow(sphd.x,2))+sqrt(pow(sphd.y,2))+sqrt(pow(sphd.z,2))-sqrt(pow(sphd.w*299792458,2))//sqrt((sphd.x*sphd.x)+(sphd.y*sphd.y)+(sphd.z*sphd.z)-(complex(0,sphd.w*299792458).im*complex(0,sphd.w*299792458).im))//(x1 - x), (y1 - y), (z1 - z), -(w1 - w));
  //         // sphd.setComponent(3, sphd.w*c)
  //         const s = size-1;
  //         var sphdis = new Vector4().subVectors(sph1,sph)//.normalize()//
  //         var mid = complex(
  //           sqrt(sphdis.x ** 2 + sphdis.y ** 2 + sphdis.z ** 2 - (sphdis.w ** 2 * c**2))
  //           );
  //           var midangle =arg((mid))
  //           mid=sigdriv(erf(mid.re))
  //           // mid=mid==0?1:mid

  //           const gr = (sqrt(5.0) + 1.0) / 2.0; // golden ratio = 1.6180339887498948482
  //           const ga = (2.0 - gr) * (2.0 * PI); // golden angle = 2.39996322972865332
  //           sphdis.set(//.multiplyScalar(dis-mid).divideScalar(s*sqrt(sphdis.length()))//.normalize() // mid= (mid.re)//
  //             mid*erf(sphdis.x) ,
  //             mid*erf(sphdis.y) ,
  //             mid*erf(sphdis.z) ,
  //             mid*erf(sphdis.w)
  //           ).divideScalar((s*1e1))

  //           // mid = sig(mid.re-2)
  //         // mid = (sig(mid)*(1 - sig(mid)));
  //         // mid=mid
  //         // complex(
  //         // sqrt(**2
  //         //  (sphd.x * sphd.x) +
  //         //  (sphd.y * sphd.y) +
  //         //  (sphd.z * sphd.z) -
  //         //  (sphd.w * sphd.w)
  //         // )
  //         // );
  //         // mid = sqrt(multiply(mid.conjugate(),mid))//(((mid.re)+parseFloat(mid.im)))*(mid.re-parseFloat(mid.im))//||mid.im;
  //         // (sphd.normalize());
  //         if (!dis) dis = 0;
  //         // if(mid)
  //         // sphdis.set(
  //         //   (sphdis.x)/mid,
  //         //   (sphdis.y)/mid,
  //         //   (sphdis.z)/mid,
  //         //   (sphdis.w)/mid
  //         // ).divideScalar(1e15*s)

  //           // .normalize()

  //         // // Math.complex(2,2)
  //         // mid = ((mid))
  //         // sphdis.addVectors(sphd1,sphd).divideScalar(1e4)// dis = 1-pow(dis,-1/2);
  //         // if (mid == 0) {
  //           // sphdis.set(0, 0, 0, 0);
  //         // } else {
  //           // sphd.set(sign(sphd.x),sign(sphd.y),sign(sphd.z),sign(sphd.w))
  //           // sphdis = Vector4().subVectors(sphd,sphd1).normalize()
  //           //   ( .5 -sig(sphd.x) ) ,
  //           //   ( .5 -sig(sphd.y) ) ,
  //           //   ( .5 -sig(sphd.z) ) ,
  //           //   ( .5 -sig(sphd.w) )
  //           // )
  //           //.multiplyScalar(dis/mid).divideScalar(s)
  //       //  .set(
  //           // //   ( (sphd.x)/mid ) ,
  //           // //   ( (sphd.y)/mid ) ,
  //           // //   ( (sphd.z)/mid ) ,
  //           // //   ( (sphd.w)/mid )
  //           // // )
  //           //   // // .normalize()
  //           //   .multiplyScalar(1e-2)
  //           //   .divideScalar( s )
  //           //  mid = parseFloat(mid.im)?parseFloat(mid.im):mid.re;
  //           // sphd
  //           //   .multiplyScalar(dis)
  //           //   .multiplyScalar(mid / s); ///((mid*mid)).divideScalar(1/s);//pow(mid,1/2))//.divideScalar(s);
  //           // // .multiplyScalar(1/pow(dis,2)).thing.multiplyScalar(1/(mid)).divideScalar(s)//.multiplyScalar(s)///.divideScalar(s)//.normalize()//.divideScalar(s)
  //         // }
  //         var cs = c ** 0.6;
  //         velx[i] = (velx[i]-(sphdis.x))//sphdis.x)) / 1000; // * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
  //         vely[i] = (vely[i]-(sphdis.y))//sphdis.y)) / 1000; // * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
  //         velz[i] = (velz[i]-(sphdis.z))//sphdis.z)) / 1000; // * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +
  //         velw[i] = (velw[i]-(sphdis.w))//sphdis.w)) / 1000; // * dis * s; //?dirw-.000001:dirw==0?0:dirw
  //         velx[j] = (velx[j]+(sphdis.x))//sphdis.x)) / 1000; // * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
  //         vely[j] = (vely[j]+(sphdis.y))//sphdis.y)) / 1000; // * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
  //         velz[j] = (velz[j]+(sphdis.z))//sphdis.z)) / 1000; // * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +r
  //         velw[j] = (velw[j]+(sphdis.w))//sphdis.w)) / 1000; // * dis * s; //?dirw-.000001:dirw==0?0:dirw

  //         j--;
  //       };
  //       sync()//.then(j--);
  //     } //.then(i--);

  //     // callbackFunc();
  //     i--;
  //   };
  //   sync2()//.then(i--);//.then(i--);
  //   //velx[i]+=elx;
  //   //vely[i]+=ely;
  //   //velz[i]+=elz;
  //   //velw[i]+=elw;
  // }
  step = false;
  // console.table(velw)
  renderer.render(scene, camera);
  controls.update();
  stats.update();
}

function App() {
  return <div />;
}

export default App;

// for (var i = 0; i < count; i++) {
//   tempsphere = makeSphere();

//   tempsphere.position.x = (360 * cos(lon) * cos(lat));
//   tempsphere.position.y = (360 * sin(lon) * cos(lat));
//   tempsphere.position.z = (360 * sin(lat));

//   spheres.push(tempsphere);
//   scene.add(tempsphere);
// }

// for (let ndx = size; ndx >= 0; ndx--) {
//   var i = (ndx1 + ndx) % size;
//   if (ndx1 === i) continue;
//   sphere = spheres[i];

// //   max = Math.max(max, sphere.position.distanceTo(sphere1.position));
// // }
// for (let ndx = size; ndx >= 0; ndx--) {
//   var i = (ndx1 + ndx) % size;
//   sphere = spheres[i];
//   if (ndx1 === i ) continue;
//   const x = sphere.position.x;
//   const y = sphere.position.y;
//   const z = sphere.position.z;
//   const dis = ((sphere.position.distanceTo(sphere1.position)/max));
//   const dis1 = (Math.cos(sq(dis))) ;
//   if(dis1<.9)continue;
//   const midx = (x - x1) !== 0 ? (x - x1) / Math.abs(x - x1) : 0;
//   const midy = (y - y1) !== 0 ? (y - y1) / Math.abs(y - y1) : 0;
//   const midz = (z - z1) !== 0 ? (z - z1) / Math.abs(z - z1) : 0;
//   const dirx = midx *((dis1)); //Math.sqrt(Math.pow((x1 - x),2))!==0?Math.sqrt(Math.pow((x1 - x),2)):0;
//   const diry = midy *((dis1)); //Math.sqrt(Math.pow((y1 - y),2))!==0?Math.sqrt(Math.pow((y1 - y),2)):0;
//   const dirz = midz *((dis1)); //Math.sqrt(Math.pow((z1 - z),2))!==0?Math.sqrt(Math.pow((z1 - z),2)):0;
//   // if (disx === 0 ||
//   //     disy === 0 ||
//   //     disz === 0||
//   //   dis===0) continue;

//   // for(let  dis2 =dis;dis2<=2;dis2= sphere1.position.distanceTo(sphere.position) )
//   // if(sphere1.position.distanceTo(sphere.position)<=2)
//   //  {
//   //   weight[i] = true;

//   //  // weight[ndx1]=true;
//   //   bounce=true;
//   //   //bcount++;
//   //   const midvelx = (velx[i])-velx[ndx1] ;
//   //   const midvely = (vely[i])-vely[ndx1] ;
//   //   const midvelz = (velz[i])-velz[ndx1] ;
//   //   const midvelx1 = (velx[i])+velx[ndx1] ;
//   //   const midvely1 = (vely[i])+vely[ndx1] ;
//   //   const midvelz1 = (velz[i])+velz[ndx1] ;

//   //   velx[ndx1]= midvelx1;
//   //   vely[ndx1]= midvely1;
//   //   velz[ndx1]= midvelz1;
//   //   velx[i] = midvelx;
//   //   vely[i] = midvely;
//   //   velz[i] = midvelz;

//   //   // dis2= sphere1.position.distanceTo(sphere.position)
//   //  continue;
//   // }
//   {
//     velx[i] -= .0001 * ((dirx));
//     vely[i] -= .0001 * ((diry));
//     velz[i] -= .0001 * ((dirz));
//     //  alert(   velx[ndx1]);
//   }
//   weight[i] = false;
//   //weight[ndx1]=false;
// }
// var light= new THREE.PointLight(25,33,1000000,0);
// light.position.set(0.0, 0.0, 1000000.0);
// scene.add(light);
// var light=new THREE.PointLight(255,6,1000000,0);
// light.position.set(1000000.0, 0.0, 1000000.0);
// scene.add(light);
// var light= new THREE.PointLight(255,33,1000000,0);
// light.position.set(.0, 1000000.0, 1000000.0);
// scene.add(light);
// var light = new THREE.PointLight(32,255,1000000,100);
// light.position.set(-1000000.0, -1000000.0, 1000000.0);
// scene.add(light);
// var light = new THREE.HemisphereLight(55, 255, 55);
// light.position.set(1, 1, 1);
// light.decay = 0;
// scene.add(light);
// var light = new THREE.HemisphereLight(255, 55, 55);
// light.position.set(1, -1, 1);
// light.decay = 0;
// scene.add(light);
// var light = new THREE.HemisphereLight(5, 255, 55);
// light.position.set(1, 1, -1);
// light.decay = 0;
// scene.add(light);

// var light = new THREE.HemisphereLight(255, 0x880000, 0.5);
// light.position.set(-1, -1.5, -1);
// light.decay = 0;
// scene.add(light);
//   // velx[j] *=Math.fround(Math.abs(.999999));
//   // vely[j] *=Math.fround(Math.abs(.999999));
//   // velz[j] *=Math.fround(Math.abs(.999999));
//   velx[i] = Math.fround(-velx[i] - velx[j]);
//   vely[i] = Math.fround(-vely[i] - vely[j]);
//   velz[i] = Math.fround(-velz[i] - velz[j]);
//   velx[j] = Math.fround(-velx[j] - velx[i]);
//   vely[j] = Math.fround(-vely[j] - vely[i]);
//   velz[j] = Math.fround(-velz[j] - velz[i]);
// //   // hit[i]=true;
// //   hit[i][j] = true;
// hit[i][j] = false;
// // hit[j]=true;
// var finx = dis >= 0.3 ? Math.fround(dirx * 360 * Math.pow(dis, -2)) : 0; //*Math.pow(PI,PI):0;
// var finy = dis >= 0.3 ? Math.fround(diry * 360 * Math.pow(dis, -2)) : 0; //*Math.pow(PI,PI):0;
// var finz = dis >= 0.3 ? Math.fround(dirz * 360 * Math.pow(dis, -2)) : 0; //*Math.pow(PI,PI):0;
//people give resume and resume is interpretted to a specified category of jobs in which
//the client can select for shorting the job seeking process

//incomplete pass
//mans can't catch
