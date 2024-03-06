// 性能监视器


import './style.css'
// 引入three.js
import * as THREE from 'three'

// 轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//引入性能监视器的stats组件
import Stats from 'three/examples/jsm/libs/stats.module.js';

// 创建场景  相机 渲染器的全局变量
let scene, camera, renderer
// 创建物体
let cube
// 创建全局变量
let controls
let stats

function init(){
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  // 创建画布
  renderer = new THREE.WebGLRenderer({
     // 开启抗锯齿
  antialias:true
  })
  // 设置画布大小 
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 讲画布添加到dom
  document.body.append(renderer.domElement)
}

// 创建立方体
function createCube() {
  // 创建数组保存多个立方体数据
  const cubeInfoArr = []

//  let random = Math.floor(Math.random()*(255-0+1)+0)

  for(let i = 0; i < 10; i++){
    const obj = {
      color:`rgb(${Math.floor(Math.random()*(255-0+1)+0)},${Math.floor(Math.random()*(255-0+1)+1)},${Math.floor(Math.random()*(255-0+1)+1)},${Math.floor(Math.random()*(255-0+1)+2)})`,
      w:Math.floor(Math.random()*(3-1+1)+1),
      h:Math.floor(Math.random()*(3-1+1)+1),
      d:Math.floor(Math.random()*(3-1+1)+1),
      x:Math.floor(Math.random()*(5-(-5)+1)+(-5)),
      y:Math.floor(Math.random()*(5-(-5)+1)+(-5)),
      z:Math.floor(Math.random()*(5-(-5)+1)+(-5)),
    }
    cubeInfoArr.push(obj)
  }

  cubeInfoArr.map(item=>{
    const geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    const material = new THREE.MeshBasicMaterial({ color: item.color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(item.x, item.y, item.z)
    scene.add(cube);
  })



  //  创建图形
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
    //   加载不同的文理图片
  // 创建材质
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //  创建图形
  // cube = new THREE.Mesh(geometry, material);
  // 将物体添加到场景中
  scene.add(cube);
}

// 创建轨道控制器
function createControl(){
  controls = new OrbitControls(camera,renderer.domElement)
  // 开启阻尼效果
  controls.enableDamping = true
}

// 创建循环渲染
function renderLoop() {
  renderer.render(scene,camera );
 
  // 更新
	controls.update();
  // 更新fps
  stats.update()
  requestAnimationFrame(renderLoop);

	
}

// 创建坐标系
function createHelper(){
  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)
}

// 创建场景适配方法
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
// 创建监视器
function createStats(){
  // 实例化
  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  stats.domElement.position = 'fixed';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';
  document.body.appendChild(stats.domElement);
}

// 调用初始方法
init()

// 调用 创建物体方法
createCube()
// 调用轨道控制器方法
createControl()
// 调用坐标轴
createHelper()

// 调用性能监视器
createStats()
// 调用适配方法
renderResize()

// 调用循环方法
renderLoop()