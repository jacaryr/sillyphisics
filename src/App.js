import React from "react";
import logo from "./logo.svg";
import { complex } from "mathjs";
import "./App.css";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { Vector3, PixelFormat } from "three";
import { getDefaultNormalizer } from "@testing-library/react";
const THREE = require("three");
const PI = (Math.PI);
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

var controls;

var stats, tempsphere;
const frnd = (x) => Math.fround(x);
const tanh = (x) => Math.tanh(x);
const tan = (x) => Math.tan(x);
const asin = (x) => Math.asin(x);
const sign = (x) => Math.sign(x);
const round = (x)=>Math.round(x);
const leg = (x)=> x>0?(1-(PI/(PI+Math.abs(x)))-.5)*2:-(1-(PI/(PI+Math.abs(x)))-.5)*2;
const sin = (x) => Math.sin(x);
const sqrt = (x) => Math.sqrt(x);
const cos = (x) => Math.cos(x);
const logg = (x) => x / ( PI + Math.abs(x));
const sig = (x)=>(1/(1+Math.exp(-x))-.5)*2;
const atan = (x)=>Math.atan(x)/(PI/2);
const spheres = [];

var start = Date.now();
init();

animate();

function makeSphere() {
  const sphere = new THREE.Line(
    new THREE.SphereBufferGeometry(16, 8, 8),

    new THREE.MeshPhongMaterial({
        color:0x7a7a7a
      //     (Math.random() * (255*255)%255

      // ),(Math.random() * (255*255)%255

      // ),(Math.random() * (255*255)%255

      ,

      // flatShading: true,

      fog: true,

      blending: THREE.NormalBlending,

      transparent: true,

      reflectivity: 255,
      //  bumpScale:5
    })
  );
  return sphere;
}
function init() {
  camera = new THREE.PerspectiveCamera(
    50,

    window.innerWidth / window.innerHeight,

    0.000001,
    10000000000000
  );

  camera.position.y = 512.0;
  camera.position.z = 512.0;
  camera.position.x = 512.0;
var color = 0x280000 ;
  scene = new THREE.Scene();
  var light = new THREE.PointLight(color, 2, 100, 0);
  light.position.set(1000000.0, 1000000, 1000000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 2, 100, 0);
  light.position.set(-1000000.0, 0, -1000000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 2, 100, 0);
  light.position.set(0.0, 1000000, 1000000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 2, 100, 0);
  light.position.set(0.0, -1000000, -1000000.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 2, 100, 0);
  light.position.set(1000000.0, 1000000, 0.0);
  scene.add(light);
  var light = new THREE.PointLight(color, 2, 100, 0);
  light.position.set(-1000000.0, -1000000, 0.0);
  scene.add(light);
  var light = new THREE.PointLight(0x0000f0 , 4, 100, 0);
  light.position.set(0.0, 0.0, 0.0);
  scene.add(light);

  var d = new Date();
  var countsplit = Math.pow(count, 1 / 3);
  for (var j = 0; j <= countsplit; j++) {
    for (var k = 0; k <= countsplit; k++) {
       for (var i = 0; i <= countsplit; i++) {

      tempsphere = makeSphere();

      const ii= ((i - (countsplit-1) / 2));
      const kk= ((k - (countsplit-1) / 2));
      const jj= ((j - (countsplit-1) / 2));
      const r = Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2) + Math.pow(kk, 2));
      const rhat = (Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2)));
      const phi =   Math.atan2(jj,ii )   ;//(i / countsplit) * PI; //Math.atan2(ii, -kk) * (Math.PI / 180);
      const theta = (Math.atan2(rhat,kk));
      const time = parseInt(d.getTime());
        tempsphere.position.x =128*ii;
        tempsphere.position.y =128*jj;
        tempsphere.position.z =128*kk;

    spheres.push(tempsphere);
    scene.add(tempsphere);
       }
      }
    }
  const gr = frnd((sqrt(5.0) + 1.0) / 2.0); // golden ratio = 1.6180339887498948482
  const ga =frnd((2.0 - gr) * (2.0 * PI)); // golden angle = 2.39996322972865332

 
  let size = spheres.length;

  renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setSize(window.innerWidth, window.innerHeight);

  stats = new Stats();

  document.body.appendChild(stats.dom);

  document.body.appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
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
  //     // stats.begin();
  //   },
  //   (1000 / 60) * step == false ? 2 : (step = true),
  //   1
  //   );
  requestAnimationFrame(animate);
  // step = true;
  render();
  // stats.end();
}

function render() {
  var size = spheres.length;
  var bounce = false,
    bcount = 0;
  var avgx, avgy, avgz, bavgx, bavgy, bavgz;
  const r = 1 / size; 
  var sphere1, sphere;

  const r1 = 0.00001;
 

  
  for (let i = 0; i < size; i++) {
    sphere1 = spheres[i];
    const x1 = frnd(sig(sphere1.position.x));
    const y1 = frnd(sig(sphere1.position.y));
    const z1 = frnd(sig(sphere1.position.z));
    for (var j = i - 1; j >= 0; j--) {
      sphere = spheres[j];
      // if(!Max[j]||!Min[j]||Max[j] - Min[j]<0)continue;
      const x = frnd(sig(sphere.position.x));
      const y = frnd(sig(sphere.position.y));
      const z = frnd(sig(sphere.position.z));
      var dis = frnd(sig((sphere.position.distanceTo(sphere1.position)))); // 
      // var dis = frnd(sig(Math.sqrt(((x1-x)**2)+((y1-y)**2)+((z1-z)**2))));
      if(dis<=(1/360)||dis>1)continue;
      var dirx =  ((x1 - x));//));// / frnd(dis*dis* dis))); //>0?(x-x1)/Math.abs(x-x1):0;//>0? (x1-x/Math.abs(x1-x)):0 ;//Math.fround(Math.atan2(x, x1-x ));//a*Math.sign(x1-x));
      var diry =  ((y1 - y));//));// / frnd(dis*dis* dis))); //>0?(y-y1)/Math.abs(y-y1):0;//>0? (y1-y/Math.abs(y1-y)):0 ;//Math.fround(Math.atan2(y, y1-y ));//a*Math.sign(y1-y));
      var dirz =  ((z1 - z));//));// / frnd(dis*dis* dis))); //>0?(z-z1)/Math.abs(z-z1):0;//>0? (z1-z/Math.abs(z1-z)):0 ;//Math.fround(Math.atan2(z, z1-z ));//a*Math.sign(z1-z));
      // dirx = (3*(dirx**2)-(1))/2;
      // diry = (3*(diry**2)-(1))/2;
      // dirz = (3*(dirz**2)-(1))/2;
      // if (dis <= 1 && !hit[j][i]) {
      {
        // } else if (dis > 1)frnd(1/)
        const s =   (100/size);
        const gr =  ((sqrt(5.0) + 1.0) / 2.0); // golden ratio = 1.6180339887498948482
        const ga =  ((2.0 - gr) * (2.0 * PI)); // golden angle = 2.39996322972865332
        const scale = frnd((360*dis*dis*gr));
        dirx = (frnd((dirx) / scale));
        diry = (frnd((diry) / scale));
        dirz = (frnd((dirz) / scale));
        var lat = frnd(asin(-1.0 + (2.0 * frnd(dis*360))/frnd(360) ));
        var lon = frnd((ga * frnd(dis*360)));
        lat  *= 2*PI/180; 
        lon  *= PI/180; 
        var rot = (frnd(cos(lat)*sin(lon)));
        velx[i] -= (frnd(rot*(dirx*s)));//*cos(lat)*sin(lon)*s))));//Math.sin(2 * finx) * Math.cos(finx)); //360 * (Math.sin((finx * PI) / 180)*(Math.cos((finx * PI*2) / 180)))); //-Math.cos((finx*PI*2)/180)*-Math.sin((finx*PI)/180)*360);
        vely[i] -= (frnd(rot*(diry*s)));//*cos(lat)*sin(lon)*s))));//Math.sin(2 * finy) * Math.cos(finy)); //360 * (Math.sin((finy * PI) / 180)*(Math.cos((finy * PI*2) / 180)))); //-Math.cos((finy*PI*2)/180)*-Math.sin((finy*PI)/180)*360);
        velz[i] -= (frnd(rot*(dirz*s)));//*cos(lat)*sin(lon)*s))));//Math.sin(2 * finz) * Math.cos(finz)); //360 * (Math.sin((finz * PI) / 180)*(Math.cos((finz * PI*2) / 180)))); //-Math.cos((finz*PI*2)/180)*-Math.sin((finz*PI)/180)*360);
        velx[j] += (frnd(rot*(dirx*s)));//*cos(lat)*sin(lon)*s))));//Math.sin(2 * finx) * Math.cos(finx)); //360 * (Math.sin((finx * PI) / 180)*(Math.cos((finx * PI*2) / 180)))); //-Math.cos((finx*PI*2)/180)*-Math.sin((finx*PI)/180)*360);
        vely[j] += (frnd(rot*(diry*s)));//*cos(lat)*sin(lon)*s))));//Math.sin(2 * finy) * Math.cos(finy)); //360 * (Math.sin((finy * PI) / 180)*(Math.cos((finy * PI*2) / 180)))); //-Math.cos((finy*PI*2)/180)*-Math.sin((finy*PI)/180)*360);
        velz[j] += (frnd(rot*(dirz*s)));//*cos(lat)*sin(lon)*s))));//Math.sin(2 * finz) * Math.cos(finz)); //360 * (Math.sin((finz * PI) / 180)*(Math.cos((finz * PI*2) / 180)))); //-Math.cos((finz*PI*2)/180)*-Math.sin((finz*PI)/180)*360);
      
      }
    }
  }
      for (let ndx1 = 0; ndx1 < size; ndx1++) {
        sphere1 = spheres[ndx1];
        // velx[ndx1] = frnd(.9999 * velx[ndx1]);
        // vely[ndx1] = frnd(.9999 * vely[ndx1]);
        // velz[ndx1] = frnd(.9999 * velz[ndx1]);
    
        sphere1.translateX(frnd(velx[ndx1]));
        sphere1.translateY(frnd(vely[ndx1]));
        sphere1.translateZ(frnd(velz[ndx1]));
        // sphere1.rotateOnAxis(new THREE.Vector3(1, 0, 0), (velx[ndx1]));
        // sphere1.rotateOnAxis(new THREE.Vector3(0, 1, 0), (vely[ndx1]));
        // sphere1.rotateOnAxis(new THREE.Vector3(0, 0, 1), (velz[ndx1]));
        // Array(hit[ndx1]).fill(false,0,size);
      }
  // camera.translateX(-.1);
  // camera.translateY(-.1);
  //
  // }

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
