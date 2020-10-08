import React from "react";
import logo from "./logo.svg";
import { complex } from "mathjs";
import "./App.css";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { Vector3, PixelFormat, Vector4, ColorKeyframeTrack, LinearInterpolant, BackSide, DoubleSide, FrontSide } from "three";
import { getDefaultNormalizer } from "@testing-library/react";
const THREE = require("three");
const PI = Math.PI;
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
var switchcam = 2048;
var controls;
const gravconst = 6.6741e-11;
const frnd = (x) => Math.fround(x);
var stats, tempsphere;
const tanh = (x) => Math.tanh(x);
const tan = (x) => Math.tan(x);
const asin = (x) => Math.asin(x);
const sign = (x) => Math.sign(x);
const round = (x) => Math.round(x * 100) / 100;
const sqrt = (x) => Math.sqrt(x);
var fib = (x) =>
  x > 0
    ? (1 / sqrt(5)) * Math.pow((1 + sqrt(5)) / 2, x)
    : -((1 / sqrt(5)) * Math.pow((1 + sqrt(5)) / 2, -x));
var ef = (x) =>
  x > 0 ? 1 - Math.exp(-1 * x ** 2) : -1 + Math.exp(-1 * x ** 2);
const erf = (x) =>
  x > 0
    ? 1 - (1 / Math.sqrt(PI)) * Math.exp(-0.5 * Math.pow(x, 2))
    : -1 + (1 / Math.sqrt(PI)) * Math.exp(-0.5 * Math.pow(-x, 2));
const lor = (x) => (1 / PI) * Math.atan(x) * 2;
const sigscaler = PI;
const leg = (x) => x / (sigscaler + Math.abs(x));
const sig = (x) => 1 / (1 + Math.E ** -x);
const cosatan = (x) => (x > 0 ? 1- cos(Math.atan(x)) : -1 + cos(Math.atan(x)));
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
    new THREE.OctahedronBufferGeometry (1,4),

    new THREE.MeshPhongMaterial({
      color: 0x8D7619,

      fog: true,

      blending: THREE.NormalBlending,
      // castshadow:true,
      // receiveshadow:true,
      // wireframe:true,
      // flatShading:true,
      // dithering:true,
      // size:100,
      transparent:true,
      opacity:.0009,
      specular:0x8D7619,
      depthTest:false,
      side:BackSide,
      // shininess:.1,
      sizeAttenuation:false,
      emissive:0x8D7619 ,
      // skinning:true,
      premultipliedAlpha:true, 
      reflectivity: 1,
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
  var color = 0x00007a;
  scene = new THREE.Scene();
  var intensity = 10;
  var light = new THREE.AmbientLight(color, intensity, 100000000, 0.0001);
  light.position.set(10000.0, 10000, 10000.0);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(-10000.0, -10000, -10000.0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(-0, 10000, 10000.0);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(0, -10000, -10000.0);
  scene.add(light);   
  light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(10000, 10000, .0);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(-10000, -10000, .0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(10000.0,-0, 10000);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity, 100000000,   0.0001);
  light.position.set(-10000.0, 0, -10000);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity,  100000000,    0.0001);
  light.position.set(.0,-0, 10000);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity, 100000000,   0.0001);
  light.position.set(.0, 0, -10000);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity, 100000000,   0.0001);
   light.position.set(0, 10000, 0);
  scene.add(light);
   light = new THREE.AmbientLight(color, intensity, 100000000, 0.00001);
  light.position.set(0, -10000, 0);
  scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000,   0.0001);
  light.position.set(10000, 0, 0);
 scene.add(light);
  light = new THREE.AmbientLight(color, intensity, 100000000, 0.00001);
 light.position.set(-10000, 0, 0);
 scene.add(light);
  var lighta = new THREE.PointLight(0x7a7a00, 25, 100000000, .1);
  lighta.position.set(0.0, 0.0, 0.0);
  scene.add(lighta);

  var d = new Date();
  var c = 0;
  var countsplit = Math.pow(count, 1 / 4);
  for (var j = 0; j < countsplit; j++) {
    for (var k = 0; k < countsplit; k++) {
      for (var i = 0; i < countsplit; i++) {
        for (var l = 0; l < countsplit; l++) {
          tempsphere = makeSphere();

          const ii = (i - ((countsplit -1) / 2));
          const kk = (k - ((countsplit -1) / 2));
          const jj = (j - ((countsplit -1) / 2));
          const ll = (l - ((countsplit -1) / 2));
          const r = Math.hypot(ii, jj, kk);
          const rhat = Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2));
          const phi = Math.atan2(jj, ii); //(i / countsplit) * PI; //Math.atan2(ii, -kk) * (Math.PI / 180);
          const theta = Math.atan2(rhat, kk);
          const time = parseInt(d.getTime());
          tempsphere.position.x = (256) * ii;
          tempsphere.position.y = (256) * jj;
          tempsphere.position.z = (256) * kk;
          posw[c++] =             (256 / (1)) * ((ll*ii*jj*kk)%(countsplit)/2  ); // (count/1)*((ll*jj*kk*ii)%countsplit); //sign(ll*jj*kk*ii)%countsplit * (count/countsplit)*((ii*jj*kk)%count)//((ii*jj*kk)%c)>0?-256:256//(c%2)?256:-256
          // tempsphere.setScale(0);
          // tempsphere.castShadow = true;
          
          spheres.push(tempsphere)
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
  // setTimeout(
  // () => {
  // stats.begin();
  requestAnimationFrame(animate);
  render();
  // },
  // (1000 / 10) * step == false ? 2 : (step = false),
  // 1

  // );
  // step = true;
  // stats.end();
  stats.update();
}

function render() {
  var size = spheres.length;
  var sphere1, sphere;
  for (let ndx1 = 0; ndx1 < size; ndx1++) {
    sphere1 = spheres[ndx1];
    const scale = 1;
   
    sphere1.translateX(scale * velx[ndx1]);
    sphere1.translateY(scale * vely[ndx1]);
    sphere1.translateZ(scale * velz[ndx1]);
    posw[ndx1] += scale * velw[ndx1];
    const x = Math.round(sphere1.position.x);
    const y = Math.round(sphere1.position.y);
    const z = Math.round(sphere1.position.z);
    // alert(posw[ndx1])
    // if(posw[ndx1]>0)
    const s = 1//0.09403//6*Math.pow(PI,1/2) ;
    sphere1.scale.set(
      Math.pow( (posw[ndx1]) ,1)*s, //x
      Math.pow( (posw[ndx1]) ,1)*s, //y
      Math.pow( (posw[ndx1]) ,1)*s
    ); //z
    //  else(sphere1.scale.set( -posw[ndx1],-posw[ndx1],-posw[ndx1]))
    // sphere1.updateMatrix();
    // Array(hit[ndx1]).fill(false,0 de,size);
  }
  // for(let q = 0 ; q<2;  q++)
  for (let i = 1; i < size; i++) {
    sphere1 = spheres[i].getWorldPosition(spheres[i].position);
    // const wpos1 = sphere1.getWorldPosition();

    const x1 = round(sphere1.x);
    const y1 = round(sphere1.y);
    const z1 = round(sphere1.z);
    const w1 = round(posw[i]);
    // const sph1 = new Vector4( sphere1.position.x,sphere1.position.y,
    //                          sphere1.position.z,posw[i])
    //   sph1.normalize()
    // if (x1 == 0 || y1 == 0 || z1 == 0 || w1 == 0) continue;

    for (var j = i - 1; j >= 0; j--) {
      sphere = spheres[j].getWorldPosition(spheres[j].position);
      // if (i == j) continue;
      // if(!Max[j]||!Min[j]||Max[j] - Min[j]<0)continue;
      const x = round(sphere.x);
      const y = round(sphere.y);
      const z = round(sphere.z);
      const w = round(posw[j]);
      const sph = new Vector4( x1-x,y1-y,z1-z,w1-w)
      const thing = new Vector4(0,0,0,0);
      var mid =  Math.hypot(sph.x,sph.y,sph.z,sph.w)//(x1 - x), (y1 - y), (z1 - z), -(w1 - w));
      if (mid == 0.0) mid=1;
      const gr = (sqrt(5.0) + 1.0) / 2.0; // golden ratio = 1.6180339887498948482
      const ga = (2.0 - gr) * (2.0 * PI); // golden angle = 2.39996322972865332
      // Math.complex(2,2)
      const s = (size-1)/1;
      // var comp = complex(1,1);
      // comp = comp*2;
      
      // mid = ((((mid>size-1?size-1:mid<1?1:mid))))//<1?1:mid))))//>256?256:fib(mid)<.5?.5:fib(mid))))//)<4?4:mid>64?64:mid))//(lor(fib(mid))-.268/(1-.268));//Math.pow(fib(mid),Math.pow(fib(mid),-1))-.165;
      // 
      var dis= ((mid*mid))//(Math.pow((mid),2/3)*4.83598);
      
      // dis*= (dis)
      // dis = -(1- dis);
      if(dis==0)continue;
      // dis*= (dis)
      // if(dis==0)dis=1;
      // sph.divideScalar(gr)//.multiplyScalar(1/dis).divideScalar(s)
      if(!sph.dot(sph))continue;
      sph.multiplyScalar(1/(sph.dot(sph))).normalize().divideScalar(s)//.normalize()//.divideScalar(s)
      // if(sph.dot(sph)==0)continue
      // dis *= dis//>2?2:dis;
      // if (mid === 0) continue;
      // var dirx = sph.x//(x1 - x)/(dx)//(1-1/Math.pow(dx,1.5)===0?(dirx=0,1):1-1/Math.pow(dx,1.5)) ; ////PI*(1+((3*(dis)))/(10+sqrt(4-3*((dis))))) //>0?(x-x1)/Math.abs(x-x1):0;//>0? (x1-x/Math.abs(x1-x)):0 ;//Math.fround(Math.atan2(x, x1-x ));//a*Math.sign(x1-x));
      // var diry = sph.y//(y1 - y)/(dy)//(1-1/Math.pow(dy,1.5)===0?(diry=0,1):1-1/Math.pow(dy,1.5)) ; ////PI*(1+((3*(dis)))/(10+sqrt(4-3*((dis))))) //>0?(y-y1)/Math.abs(y-y1):0;//>0? (y1-y/Math.abs(y1-y)):0 ;//Math.fround(Math.atan2(y, y1-y ));//a*Math.sign(y1-y));
      // var dirz = sph.z//(z1 - z)/(dz)//(1-1/Math.pow(dz,1.5)===0?(dirz=0,1):1-1/Math.pow(dz,1.5)) ; ////PI*(1+((3*(dis)))/(10+sqrt(4-3*((dis))))) //>0?(z-z1)/Math.abs(z-z1):0;//>0? (z1-z/Math.abs(z1-z)):0 ;//Math.fround(Math.atan2(z, z1-z ));//a*Math.sign(z1-z));
      // var dirw = sph.w//(w1 - w)/(dw)//(1-1/Math.pow(dw,1.5)===0?(dirw=0,1):1-1/Math.pow(dw,1.5)) ; //
      // if(sph.x==0||sph.y==0||sph.z==0||sph.w==0)continue;// dirx /=  (dis); //sin(Math.atan2((dx),(mid*mid)))
      // diry /=  (dis); //sin(Math.atan2((dy),(mid*mid)))
      // dirz /=  (dis); //sin(Math.atan2((dz),(mid*mid)))
      // dirw /=  (dis); //sin(Math.atan2((dw),(mid*mid)))
      velx[i] = (velx[i] - (sph.x)) ;// * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
      vely[i] = (vely[i] - (sph.y)) ;// * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
      velz[i] = (velz[i] - (sph.z)) ;// * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +
      velw[i] = (velw[i] - (sph.w)) ;// * dis * s; //?dirw-.000001:dirw==0?0:dirw
      velx[j] = (velx[j] + (sph.x)) ;// * dis * s; //?dirx-.000001:dirx==0?0:dirx//+frnd(rot*dirx*s);//frnd(dix * s +
      vely[j] = (vely[j] + (sph.y)) ;// * dis * s; //?diry-.000001:diry==0?0:diry//+frnd(rot*diry*s);//frnd(diy * s +
      velz[j] = (velz[j] + (sph.z)) ;// * dis * s; //?dirz-.000001:dirz==0?0:dirz//+frnd(rot*dirz*s);//frnd(diz * s +r
      velw[j] = (velw[j] + (sph.w)) ;// * dis * s; //?dirw-.000001:dirw==0?0:dirw
    
    }
  }
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
