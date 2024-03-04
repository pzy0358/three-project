import './style.css'


// 借助GUI工具

// 1.下载并导入
import * as THREE from 'three';

// 引入dat.gui
import * as dat from 'dat.gui'

const gui = new dat.GUI()

let scene, camera,renderer
let controls
let cube

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
  cube = new THREE.Mesh( geometry, material );
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
  // controls.maxPolarAngle = Math.PI / 2;
  // 下限
  // controls.minPolarAngle = 0.5 * Math.PI;

  // 设置摄像机向外拉动的距离
  controls.maxDistance = 20;
  // 设置摄像机向内拉动的距离
  controls.minDistance = 3;
}

// 3.循环更新场景
function renderLoop() {
  requestAnimationFrame( renderLoop );
   // 设置物体旋转
  //  cube.rotation.x += 0.1

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

// 移动物体
function moveCube() {
  // x轴
  cube.position.x = 5
 // 设置物体旋转
//  cube.rotation.x = Math.PI / 6 
 // 设置物体缩放--x,y,z
  cube.scale.z = 0.5
}

// 创建gui工具
function createGUI(){
  // 创建gui对象
  const gui = new dat.GUI();
  // 添加具体控制器
  // 添加一个标题控制器
  gui.add(document, 'title')
  // 控制物体显示与隐藏
  gui.add(cube, 'visible')
  // 重置控制器
  gui.add(controls,'reset')

  // 添加颜色
  const colorObj = {
    "col":`#${cube.material.color.getHexString()}`
  }

  gui.addColor(colorObj,'col').onChange((val)=>{
    // cube.material.color.set(val)
    cube.material.color = new THREE.Color(val)
  })

  // 添加分组
  const group = gui.addFolder('位移')
  group.add(cube.position,'x',0,1,0.1)
  group.add(cube.position,'y',0,1,0.1)
  group.add(cube.position,'z',0,1,0.1)

  gui.add({type:"1"},'type',{"方案1":"1","方案2":"2"}).onChange((val)=>{
    switch(val){
      case '1':
        cube.position.x = 5
        break;
      case '2':
        cube.position.x = 2
        break;
    }
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

// 调用循环渲染中更新方法 
renderLoop()

// 调用移动物体方法
moveCube()

// 调用createGUI
createGUI()

// 调用适配方法
renderResize()

