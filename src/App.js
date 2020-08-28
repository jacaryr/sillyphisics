import React from "react";
import logo from "./logo.svg";
import { complex } from "mathjs";
import "./App.css";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { Vector3, PixelFormat, Vector4, ColorKeyframeTrack } from "three";
import { getDefaultNormalizer } from "@testing-library/react";
const THREE = require("three");
const PI = Math.PI;
var renderer, scene, camera;
var count = Math.pow(8, 3);
var velx = new Array(count).fill(0);
var vely = new Array(count).fill(0);
var velz = new Array(count).fill(0);
var hit = new Array(count).fill(new Array(count).fill(false));
var y = new Array(count).fill(0);
var z = new Array(count).fill(0);
var Max = new Array(count).fill(0);
var Min = new Array(count).fill(999999);
var move = false;

// for (var j = 0; j < weight.length; j++)
//   for (var i = 0; i < weight.length; i++) weight[j][i] = Math.random();
var clicked = false;
var switchcam = 4200;
var controls;

var stats, tempsphere;
const frnd = (x) => Math.fround(x);
const tanh = (x) => Math.tanh(x);
const tan = (x) => Math.tan(x);
const asin = (x) => Math.asin(x);
const sign = (x) => Math.sign(x);
const round = (x) => Math.round(x);
const modtanh = (x) =>
  0 > x
    ? (Math.E ** (2 * x) - 1) / (Math.E ** (2 * -x) + 1)
    : -(Math.E ** (2 * x) - 1) / (Math.E ** (2 * -x) + 1);
const erf = (x) =>
  x > 0
    ? Math.exp(Math.fround(1 / -x))
    : x != 0
    ? -Math.exp(Math.fround(1 / x))
    : 0;

const sigscaler = Math.fround(1);
const leg = (x) => x / (sigscaler + Math.abs(x));
const sig = (x) => 1 / (1 + Math.E ** -x);
const sin = (x) => Math.sin(x);
const sqrt = (x) => Math.sqrt(x);
const cos = (x) => Math.cos(x);
const log = (x) => (1 / (1 + Math.exp(-x)) - 0.5) * 2;
const atan = (x) => Math.atan(x) / (PI / 2);
const spheres = [];

var start = Date.now();
init();

animate();

function makeSphere() {
  const sphere = new THREE.LineSegments(
    new THREE.SphereBufferGeometry(2, 16, 16),

    new THREE.MeshPhongMaterial({
      color: 0xfffff, // 0x7a7a7a,

      // fog: true,

      blending: THREE.NormalBlending,

      transparent: true,

      reflectivity: 255,
      //  bumpScale:5
    }),
    1
  );
  return sphere;
}
function init() {
  camera = new THREE.PerspectiveCamera(
    50,

    window.innerWidth / window.innerHeight,

    0.000000001,
    10000000000000
  );

  camera.position.y = switchcam;
  camera.position.z = switchcam;
  camera.position.x = switchcam;
  var color = 0x0f000f;
  scene = new THREE.Scene();
  var light = new THREE.PointLight(color, 16, 100000000, 0.0001);
  light.position.set(10000.0, 10000, 10000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 16, 100000000, 0.0001);
  light.position.set(-10000.0, -10000, -10000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 16, 100000000, 0.0001);
  light.position.set(0.0, 10000, 10000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 16, 100000000, 0.0001);
  light.position.set(0.0, -10000, -10000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 16, 100000000, 0.00001);
  light.position.set(10000.0, 10000, 0.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 16, 100000000, 0.00001);
  light.position.set(-10000.0, -10000, 0.0);
  scene.add(light);
  var lighta = new THREE.PointLight(0xa00a0e, 18, 1000000, 0.01);
  lighta.position.set(0.0, 0.0, 0.0);
  scene.add(lighta);

  var d = new Date();
  var countsplit = Math.pow(count, 1 / 3);
  for (var j = 0; j <= countsplit; j++) {
    for (var k = 0; k <= countsplit; k++) {
      for (var i = 0; i <= countsplit; i++) {
        tempsphere = makeSphere();

        const ii = i - (countsplit - 1) / 2;
        const kk = k - (countsplit - 1) / 2;
        const jj = j - (countsplit - 1) / 2;
        const r = Math.sqrt(
          Math.pow(ii, 2) + Math.pow(jj, 2) + Math.pow(kk, 2)
        );
        const rhat = Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2));
        const phi = Math.atan2(jj, ii); //(i / countsplit) * PI; //Math.atan2(ii, -kk) * (Math.PI / 180);
        const theta = Math.atan2(rhat, kk);
        const time = parseInt(d.getTime());
        tempsphere.position.x = 360 * ii;
        tempsphere.position.y = 360 * jj;
        tempsphere.position.z = 360 * kk;

        spheres.push(tempsphere);
        scene.add(tempsphere);
      }
    }
  }
  const gr = frnd((sqrt(5.0) + 1.0) / 2.0); // golden ratio = 1.6180339887498948482
  const ga = frnd((2.0 - gr) * (2.0 * PI)); // golden angle = 2.39996322972865332

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
    clicked === true ? ((clicked = false), switchcam) : ((clicked = true), switchcam); //switchcam;
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
  stats.update();
  // setTimeout(
  //   () => {
  stats.begin();
  requestAnimationFrame(animate);
  render();
  // },
  // (1000 / 30) * step == false ? 2 : (step = false),
  // 1
  // );
  // step = true;
  stats.end();
}

function render() {
  var size = spheres.length;
  var sphere1, sphere;
  for (let ndx1 = 0; ndx1 < size; ndx1++) {
    sphere1 = spheres[ndx1];
    // const x1 = frnd((sphere1.position.x));
    // const y1 = frnd((sphere1.position.y));
    // const z1 = frnd((sphere1.position.z));
    // var dis = sphere1.position.distanceTo(new Vector3(0,0,0));
    // velx[ndx1] = frnd(.99999 * velx[ndx1]);
    // vely[ndx1] = frnd(.99999 * vely[ndx1]);
    // velz[ndx1] = frnd(.99999 * velz[ndx1]);
    sphere1.translateX(10 * velx[ndx1]);
    sphere1.translateY(10 * vely[ndx1]);
    sphere1.translateZ(10 * velz[ndx1]);
    // Array(hit[ndx1]).fill(false,0,size);
  }

  for (let i = 0; i < size; i++) {
    sphere1 = spheres[i];
    const x1 = frnd(sphere1.position.x);
    const y1 = frnd(sphere1.position.y);
    const z1 = frnd(sphere1.position.z);
    for (var j = i; j >= 0; --j) {
      sphere = spheres[j];
      if (i == j) continue;
      // if(!Max[j]||!Min[j]||Max[j] - Min[j]<0)continue;
      const x = frnd(sphere.position.x);
      const y = frnd(sphere.position.y);
      const z = frnd(sphere.position.z);
      var dis = frnd(sphere1.position.distanceTo(sphere.position)); //
      // var dis = frnd(sig(Math.sqrt(((x1-x)**2)+((y1-y)**2)+((z1-z)**2))));
      // if (dis <= 0.25) continue;
      // dis = (dis - 0.25) /  (1-0.25);
      // if ((360*(1-dis**(2))) >= 90/360) {
      const mid = Math.hypot(x1 - x, y1 - y, z1 - z);
      const gr = 1.6; //round(1e16*(sqrt(5.0) + 1.0) / 2.0)*1e-16; // golden ratio = 1.6180339887498948482
      const ga = 2.4; //round(1e16*(2.0 - gr) * (2.0 * PI))*1e-16; // golden angle = 2.39996322972865332
      const qbccir = 1 ** (1 / 2);

      const s = 1e-5 / size ;

      dis = erf(dis);
      var dirx = tanh(x1 - x); //));// / frnd(dis*dis* dis))); //>0?(x-x1)/Math.abs(x-x1):0;//>0? (x1-x/Math.abs(x1-x)):0 ;//Math.fround(Math.atan2(x, x1-x ));//a*Math.sign(x1-x));
      var diry = tanh(y1 - y); //));// / frnd(dis*dis* dis))); //>0?(y-y1)/Math.abs(y-y1):0;//>0? (y1-y/Math.abs(y1-y)):0 ;//Math.fround(Math.atan2(y, y1-y ));//a*Math.sign(y1-y));
      var dirz = tanh(z1 - z); //));// / frnd(dis*dis* dis))); //>0?(z-z1)/Math.abs(z-z1):0;//>0? (z1-z/Math.abs(z1-z)):0 ;//Math.fround(Math.atan2(z, z1-z ));//a*Math.sign(z1-z));
      const scale = Math.pow(dis, 1/3); //dis*dis);
      if ((1 - scale) === 0 || scale === 0) continue;

      const dix = dirx * ((1-scale) * 360);
      const diy = diry * ((1-scale) * 360);
      const diz = dirz * ((1-scale) * 360);
      var lat = asin(-1.0 + (2.0 * ((1-scale) * 360)) / 360);
      var lon = ga * ((1-scale) * 360);
      lat *= 2*(ga * PI) / 180;
      lon *= 2*PI / 180;
      var rot = -Math.atan2(lat, lon); //cos(lat) *sin(lon));
      velx[i] -= frnd(gr * (dix * 1e1 * 360) * s + frnd(1 * rot * dirx * 1e1 * 360 * s));
      vely[i] -= frnd(gr * (diy * 1e1 * 360) * s + frnd(1 * rot * diry * 1e1 * 360 * s));
      velz[i] -= frnd(gr * (diz * 1e1 * 360) * s + frnd(1 * rot * dirz * 1e1 * 360 * s));
      velx[j] += frnd(gr * (dix * 1e1 * 360) * s + frnd(1 * rot * dirx * 1e1 * 360 * s));
      vely[j] += frnd(gr * (diy * 1e1 * 360) * s + frnd(1 * rot * diry * 1e1 * 360 * s));
      velz[j] += frnd(gr * (diz * 1e1 * 360) * s + frnd(1 * rot * dirz * 1e1 * 360 * s));

      // }
    }
  }
  step = false;

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

//   tempsphere.position.x = frnd(360 * cos(lon) * cos(lat));
//   tempsphere.position.y = frnd(360 * sin(lon) * cos(lat));
//   tempsphere.position.z = frnd(360 * sin(lat));

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
