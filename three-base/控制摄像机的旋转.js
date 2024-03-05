import './style.css'


// 实现阻尼

// 1.下载并导入
import * as THREE from 'three';

let scene, camera,renderer
let controls

function init() {
  // 创建场景
  scene = new THREE.Scene();
  // 创建摄像机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   // 改变摄像机z轴距离(后移5个单位)
   camera.position.z = 5;
  // 渲染器
  renderer = new THREE.WebGLRenderer({
    // 开启抗锯齿
    antialias: true
  });
  // 画布大小
  renderer.setSize(window.innerWidth, window.innerHeight);
 
  // 添加到DOM
  document.body.append(renderer.domElement);
}


// 1.引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// -----创建图形-----
function createCube() {
  // 立方体
  // 创建图形，宽高深为1单位（创建立方缓冲几何体）
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 创建材质（默认绿色）
  const material = new THREE.MeshBasicMaterial( {color: 0xFFDAB9} ); 
  // 创建网格对象
  const cube = new THREE.Mesh( geometry, material );
  // 将物体添加到场景中
  scene.add( cube );
  // 圆
  // const geometry = new THREE.SphereGeometry( 1, 32, 16 );
  //   // 创建材质（默认绿色）
    // const material = new THREE.MeshBasicMaterial( {color: 0xEECBAD} ); 
  //   // 创建网格对象
    // const sphere = new THREE.Mesh( geometry, material );
  // scene.add( sphere );
}

// 2.创建轨道控制器
function createControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  // 开启阻尼效果
  controls.enableDamping = true;
  // 开启轨道控制器自动旋转
  // controls.autoRotate = true;
  // 设置旋转速度
  // controls.autoRotateSpeed = 5;

  // 垂直旋转角度上限
  controls.maxPolarAngle = Math.PI / 2;
  // 下限
  controls.minPolarAngle = 0.5 * Math.PI;

  // 设置摄像机向外拉动的距离
  controls.maxDistance = 10;
  // 设置摄像机向内拉动的距离
  controls.minDistance = 3;
}

// 3.循环更新场景
function renderLoop() {
  requestAnimationFrame( renderLoop );

  // 更新
	controls.update();

	renderer.render( scene, camera );
}

// 创建坐标轴
function createHelper(){
  // 创建坐标轴
  const axesHelper = new THREE.AxesHelper( 5 );
  // 添加到场景中
  scene.add( axesHelper );
}

// 创建适配方法
function renderResize() {
  window.addEventListener('resize',  () => {
    // 重新设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重新设置宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 重新更新锥体空间
    camera.updateProjectionMatrix();
  })
}


// 调用初始方法
init()

// 调用立方体方法
createCube()


// 调用轨道控制器方法
createControls()

// 坐标轴方法
createHelper()



// 调用适配方法
renderResize()

// 调用循环渲染中更新方法 
renderLoop()