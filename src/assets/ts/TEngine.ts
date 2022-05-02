import {AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
export class TEngine {
  private dom: HTMLElement
  private renderer: WebGLRenderer

  private scene:Scene
  private camera:PerspectiveCamera


  constructor(dom:HTMLElement) {
    this.dom = dom
    this.renderer = new WebGLRenderer()

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(45, dom.offsetWidth/dom.offsetHeight,1,1000)
    // console.log(dom)

    this.camera.position.set(20,20,20) //相机的位置
    this.camera.lookAt(new Vector3(0,0,0))  //相机的视角
    this.camera.up = new Vector3(0,1,0)   //相机的朝向

    dom.appendChild(this.renderer.domElement)
    //给画布设置大小的第一种方式
    // this.renderer.domElement.width = dom.offsetWidth
    // this.renderer.domElement.height = dom.offsetHeight
    //给画布设置大小的第二种方式
    this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)  //给画布设置大小 

    //创建一个box几何体
    const box:Mesh = new Mesh(
      new BoxBufferGeometry(10,10,10),
      new MeshStandardMaterial({color:'rgb(0,255,0)'})  //给几何体加上颜色
    )
    
    const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',1)  //添加灯光

    const axesHelper:AxesHelper = new AxesHelper(500)
    const gridHelper:GridHelper = new GridHelper(500,10,'rgb(200,200,200)','rgb(100,100,100')
    

    this.scene.add(box)
    this.scene.add(ambientLight)
    this.scene.add(axesHelper)
    this.scene.add(gridHelper)
    //在没有灯光的时候需要加上
    // this.renderer.setClearColor('rgb(2552,255,255)') //白色场景
    // this.renderer.clearColor() //在没有灯光时需要

    this.renderer.render(this.scene,this.camera) //渲染场景和相机
  }
}