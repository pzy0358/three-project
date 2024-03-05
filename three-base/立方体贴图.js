// 立方体贴图


import './style.css'
// 引入three.js
import * as THREE from 'three'

// 轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景  相机 渲染器的全局变量
let scene, camera, renderer
// 创建物体
let cube
// 创建全局变量
let controls

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
  //  创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);
    //   加载不同的文理图片
  let imgUrlArr = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg']
    //   纹理加载器
  const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('image/park/');
    
  const materialArr = imgUrlArr.map(item=>{
    //  创建纹理图片对象
    const texture = textureLoader.load(item);
    return new THREE.MeshBasicMaterial({ 
        map:texture,
        side:THREE.DoubleSide
     })
  })
  // 创建材质
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // 创建物体网格对象, 并且图形与材质加载的物体网格对象中
  cube = new THREE.Mesh(geometry, materialArr);
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
  requestAnimationFrame( renderLoop );

  // 更新
	controls.update();

	renderer.render( scene, camera );
}

// 创建坐标系
// function createHelper(){
//   const axesHelper = new THREE.AxesHelper(10)
//   scene.add(axesHelper)
// }

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

// 调用初始方法
init()

// 调用 创建物体方法
createCube()
// 调用轨道控制器方法
createControl()
// 调用坐标轴
// createHelper()
// 调用循环方法
renderLoop()
// 调用适配方法
renderResize()