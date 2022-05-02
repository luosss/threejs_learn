import {WebGLRenderer } from 'three'
export class TEngine {
  private dom: HTMLElement
  private renderer: WebGLRenderer


  constructor(dom:HTMLElement) {
    this.dom = dom
    this.renderer = new WebGLRenderer()
    console.log(dom)
    dom.appendChild(this.renderer.domElement)
    //给画布设置大小的第一种方式
    // this.renderer.domElement.width = dom.offsetWidth
    // this.renderer.domElement.height = dom.offsetHeight
    //给画布设置大小的第二种方式
    this.renderer.setSize(dom.offsetWidth,dom.offsetHeight)  //给画布设置大小 
  }
}