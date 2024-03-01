import './style.css'


// document.querySelector("#app").innerHTML = `小彭`

// 1.下载并导入
import * as THREE from 'three';

let scene, camera,renderer
let controls


// 2.创建场景
// function createScene() {
//   scene= new THREE.Scene()
// }
// // 3.创建摄像机
// function createCamera() {
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// }

// // 4.创建渲染器
// function render(){
//   renderer = new THREE.WebGLRenderer()
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   renderer.render(scene, camera)
// }
// // 5.添加到DOM
// function addDOM(){
//   document.body.append( renderer.domElement );
// }

// // 6.初始化加载
// function init() {
//   createScene()
//   createCamera()
//   render ()
//   addDOM()
// }
// init()


function init() {
  // 创建场景
  scene = new THREE.Scene();
  // 创建摄像机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   // 改变摄像机z轴距离(后移5个单位)
   camera.position.z = 5;
  // 渲染器
  renderer = new THREE.WebGLRenderer();
  // 画布大小
  renderer.setSize(window.innerWidth, window.innerHeight);
 
  // 添加到DOM
  document.body.append(renderer.domElement);
}







// -----创建立方体-----
// function createCube() {
//   // 创建图形，宽高深为1单位（创建立方缓冲几何体）
//   const geometry = new THREE.BoxGeometry(1, 1, 1);
//   // 创建材质（默认绿色）
//   const material = new THREE.MeshBasicMaterial( {color: 0xff00ff} ); 
//   // 创建网格对象
//   const cube = new THREE.Mesh( geometry, material );

 
//   // 将物体添加到场景中
//   scene.add( cube );
// }
// // 调用初始方法
// init()

// // 调用立方体方法
// createCube()


// // 渲染到画布
// renderer.render(scene, camera);



// ---创建球体---
// function createCube() {
//   // 球体半径（1）
//   // 水平分段数
//   // 垂直分段数
//   const geometry = new THREE.SphereGeometry( 1, 32, 16 );
//   // 创建材质（默认绿色）
//   const material = new THREE.MeshBasicMaterial( {color: 0xEECBAD} ); 
//   // 创建网格对象
//   const sphere = new THREE.Mesh( geometry, material );

 
//   // 将物体添加到场景中
//   scene.add( sphere );
// }
// // 调用初始方法
// init()

// // 调用立方体方法
// createCube()


// // 渲染到画布
// renderer.render(scene, camera);




// 1.引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// -----创建立方体-----
function createCube() {
  // 创建图形，宽高深为1单位（创建立方缓冲几何体）
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 创建材质（默认绿色）
  const material = new THREE.MeshBasicMaterial( {color: 0xFFDAB9} ); 
  // 创建网格对象
  const cube = new THREE.Mesh( geometry, material );
  // 将物体添加到场景中
  scene.add( cube );
}

// 2.创建轨道控制器
function createControls() {
  controls = new OrbitControls(camera, renderer.domElement);
}

// 3.循环更新场景
function renderLoop() {
  requestAnimationFrame( renderLoop );

  // 更新
	controls.update();

	renderer.render( scene, camera );
}

// 调用初始方法
init()

// 调用立方体方法
createCube()


// 调用轨道控制器方法
createControls()

// 调用循环渲染中更新方法 
renderLoop()