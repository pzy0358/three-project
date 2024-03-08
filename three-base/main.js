// 添加事件
// 实现3d物体添加单机事件

import './style.css'
// 引入three.js
import * as THREE from 'three'

// 轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入3d转换器与渲染器
import { CSS3DObject,CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
//引入性能监视器的stats组件
import Stats from 'three/examples/jsm/libs/stats.module.js';

// 创建场景  相机 渲染器的全局变量
let scene, camera, renderer
// 创建物体
let cube
// 创建全局变量
let controls
let stats
let group
let labelRenderer

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

// 创建分组
function createGroup(){
  group=new THREE.Group()
}

// 圆形缓冲几何体
function createCircle(){
  const geometry = new THREE.CircleGeometry(1, 32);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 ,side:THREE.DoubleSide});
  // 创建网格
  const circle = new THREE.Mesh(geometry, material);
  
  circle.position.set(10,10,10)
  
  // 添加到场景
  scene.add(circle);
}


// 球形缓冲几合体(点材质)
function createSphere(){
  const geometry = new THREE.SphereGeometry(2, 32, 16);
  // 创建材质
  const material = new THREE.PointsMaterial({ color: 0xff0000,size:0.05});
  // 创建网格
  const sphere = new THREE.Points(geometry, material);
  sphere.position.set(3,3,3)
  // 添加到场景
  scene.add(sphere);
}


// 球形缓冲几合体(线材质)(连续的线)
function createLine(){


const points = []
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  points.push(new THREE.Vector3(2, 2, 2));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // 创建材质
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  // 创建网格
  // const sphere = new THREE.Line(geometry, material);
  
  // const line = new THREE.Line(geometry, material);
  // const line = new THREE.LineLoop(geometry, material);
  const line = new THREE.LineSegments(geometry, material);
  // 添加到场景
  scene.add(line);
}


// 球形缓冲几何体并且全景贴图
function createMap(){
  const geometry = new THREE.SphereGeometry(2, 32, 16);
  // const material = new THREE.MeshBasicMaterial({color: 0xffff00})
// 创建文理加载器
  const texture = new THREE.TextureLoader().load('image/earth/earth.jpg');
  const material = new THREE.MeshBasicMaterial({
    map: texture
  })
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
}

// 创建立方缓冲体并进行贴图
function createCubeAndImage(){
  const geometry = new THREE.BoxGeometry(1,1,1);
// 图片路径
  const imgUrlArr = ['6.jpg','6.jpg', '6.jpg', '6.jpg', '6.jpg', '6.jpg']

  // 设置公共路径
  const textureLoader = new THREE.TextureLoader();//初始化文理加载器
  textureLoader.setPath('image/park/'); //设置公共资源路径
  const materialArr = imgUrlArr.map(item=>{
    const texture = textureLoader.load(item)
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    })
  })

  const cube = new THREE.Mesh(geometry, materialArr);
  scene.add(cube)
}

// 创建平面缓冲物体将视频进行加载(视频纹理)
function createPlaneMap(){
  const geometry = new THREE.PlaneGeometry(6,3);
// 创建视频标签
  const video = document.createElement('video');
  // 视频资源路径
  // video.src = 'video/video.mp4';
  video.src = 'video/video2.mp4';
  // 设置视频默认静音
  video.muted = true;
  // 加载完毕进行播放
  video.addEventListener('loadeddata',()=>{
    video.play();
  })
  // 创建视频纹理加载器
  const texture = new THREE.VideoTexture(video);
  const material = new THREE.MeshBasicMaterial({
    map: texture
  })
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  // 点击按钮进行播放
  const button = document.createElement('button');
  button.innerHTML='play'
  button.style.position = 'fixed';
  button.style.bottom = '0';
  button.style.left = '0';
  document.body.appendChild(button);
  button.addEventListener('click',()=>{
    video.muted = !video.muted;
  })
}

// 将原生dom转换并渲染到3d场景
function domTo3D(){
  // dom标签内容样式
  const tag = document.createElement('span');
  tag.innerHTML='啦啦啦啦'
  tag.style.color = 'pink';
  // 2d转3d
  const tag3D = new CSS3DObject(tag);
  tag3D.scale.set(1/16,1/16,1/16);
  scene.add(tag3D);

  // 通过渲染器渲染到浏览器
  labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.pointerEvents = 'none';
  labelRenderer.domElement.style.position = 'fixed';
  labelRenderer.domElement.style.left = '0';
  labelRenderer.domElement.style.top = '0';
  document.body.appendChild(labelRenderer.domElement);

}


// 创建原生dom标签
function domTo3DCopy(){
  const tag = document.createElement('div')
  tag.innerHTML = '前进' 
  tag.className = 'custom-text'
  tag.style.color='pink'
  tag.style.cursor='pointer'

  tag.addEventListener('click',()=>{
    alert('前进')
  })

  // 将2d转为3d
  const tag3D = new CSS3DObject(tag);
  tag3D.scale.set(1/40,1/40,1/40);
  scene.add(tag3D);
  // 将3d文本场景渲染到浏览器
  labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.pointerEvents = 'none';
  labelRenderer.domElement.style.position = 'fixed';
  labelRenderer.domElement.style.left = '0';
  labelRenderer.domElement.style.top = '0';
  document.body.appendChild(labelRenderer.domElement);
}

// 实现3d物体添加点击事件
function bindClick(){
  // 先给window绑定点击事件
  window.addEventListener('click',()=>{
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const list = raycaster.intersectObjects(scene.children, true);
    console.log(list);
    const e = list.find(item=>item.object.name==='cn') 
    console.log(e);
    if(e) alert('点击了立方体')
  })
}

// 创建立方体
function createCube() {
  // 创建数组保存多个立方体数据
  const cubeInfoArr = []

//  let random = Math.floor(Math.random()*(255-0+1)+0)

  for(let i = 0; i < 1; i++){
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
    const material = new THREE.PointsMaterial({ color: item.color,size:0.5 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(item.x, item.y, item.z)


    // 创建的立方体定义名称
    cube.name = 'cn'


    // 将立方体添加到分组中
    group.add(cube)

    
  })
  // 将分组添加到场景中
  scene.add(group);


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
  requestAnimationFrame(renderLoop);
 // 更新
	controls.update();
  // 更新fps
  stats.update()
  renderer.render(scene,camera );
  
  // 渲染到文本画布上
  labelRenderer.render(scene,camera );

	
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

// 删除立方体
function removeCube() {
  window.addEventListener('dblclick', () => {
    // const arr = scene.children.filter(item=>item.name === 'cn')
    // const c = arr[0]

    // if(c){
    //   if(arr.length ===1) return
    //   // 移除图形
    //   c.geometry.dispose()
    //   // 移除材质
    //   c.material.dispose()
    //   // 从场景中移除
    //   scene.remove(c)
    // }

    group.children.map(item=>{
      // 从内存中删除材质图形
      item.geometry.dispose()
      item.material.dispose()
    })
    scene.remove(group)

  })
}

// 调用初始方法
init()

// 调用分组方法
createGroup()

// 调用 创建物体方法
createCube()

// createCircle()

// createSphere()

// createLine()

// createMap()

// createCubeAndImage()

// createPlaneMap()

// domTo3D()

domTo3DCopy()
// 3d物体点击事件方法
bindClick()


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

// 删除
removeCube()

