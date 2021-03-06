import {AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, MOUSE, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export class TEngine {
  private dom: HTMLElement
  private renderer: WebGLRenderer

  private scene:Scene
  private camera:PerspectiveCamera


  constructor(dom:HTMLElement) {
    this.dom = dom
    // this.renderer = new WebGLRenderer()  //未添加抗锯齿

    this.renderer = new WebGLRenderer({
      antialias:true                  //添加抗锯齿
    })

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(45, dom.offsetWidth/dom.offsetHeight,1,1000)
    // console.log(dom)

    this.camera.position.set(20,20,20) //相机的位置
    this.camera.lookAt(new Vector3(0,0,0))  //相机的视角
    this.camera.up = new Vector3(0,1,0)   //相机的朝向

    //给画布设置大小的第一种方式
    // this.renderer.domElement.width = dom.offsetWidth
    // this.renderer.domElement.height = dom.offsetHeight
    //给画布设置大小的第二种方式
    this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)  //给画布设置大小 

    //创建一个box几何体
    const box:Mesh = new Mesh(
      new BoxBufferGeometry(10,10,10),
      new MeshStandardMaterial({color:'rgb(100,255,0)'})  //给几何体加上颜色
    )
    
    const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',1)  //添加灯光

    //添加辅助线
    const axesHelper:AxesHelper = new AxesHelper(500)
    const gridHelper:GridHelper = new GridHelper(500,10,'rgb(200,200,200)','rgb(100,100,100)')
    

    this.scene.add(box)
    this.scene.add(ambientLight)
    this.scene.add(axesHelper)
    this.scene.add(gridHelper)
    //在没有灯光的时候需要加上
    // this.renderer.setClearColor('rgb(2552,255,255)') //白色场景
    // this.renderer.clearColor() //在没有灯光时需要

    // this.renderer.render(this.scene,this.camera) //渲染场景和相机
    
    // 初始性能监视器
    const stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0'
    statsDom.style.right= '5px'
    statsDom.style.left = 'unset'  
    
    //初始轨道控制器
    const orbitControls:OrbitControls = new OrbitControls(this.camera,this.renderer.domElement)
    // orbitControls.autoRotate = true //让相机跟着转
   // orbitControls.enableDamping = true //将其设置为true以启用阻尼（惯性），这将给控制器带来重量感，默认值为false

      // 对轨道控制器按键设置
      orbitControls.mouseButtons = {
        LEFT: null as unknown as MOUSE, //鼠标左键禁用
        MIDDLE:MOUSE.DOLLY,  //中键缩放
        RIGHT:MOUSE.ROTATE   //右键旋转

      }
       
      
    // 动画方法,使用递归
    const renderFun = () => {
      
      box.position.x += -0.01  // 让几何体的x轴移动
      box.rotation.y += 0.001  // 让几何体的y轴移动
      // this.camera.position.x += -0.01   // 让相机也跟着移动,有了轨道控制器后就不需要这个了，以免冲突
      orbitControls.update()
      this.renderer.render(this.scene,this.camera) //渲染场景和相机

      stats.update()
      
      requestAnimationFrame(renderFun)
    }
    renderFun()

    dom.appendChild(this.renderer.domElement)  //将dom元素插入到场景中
    dom.appendChild(statsDom) //将性能监视器插入到场景中

  }
}