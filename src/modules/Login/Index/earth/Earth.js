/* webgl地球 */
import React, { Component, createRef } from 'react';
import * as THREE from 'three';
import './OrbitControls';
import style from '../style.sass';

class Earth extends Component{
  element: Object = createRef();
  timer: ?number = null;                    // 刷新定时器
  scene: ?THREE.Scene = null;               // 场景
  camera: ?THREE.PerspectiveCamera = null;  // 照相机
  renderer: ?THREE.WebGLRenderer = null;    // 渲染器
  earth: ?THREE.Mesh = null;                // 地球模型
  controls: ?THREE.OrbitControls = null;          // 控制器

  async componentDidMount(): void{
    try{
      this.initScene();
      this.initSettingLight();
      await this.initEarth();
      this.initCamera();
      this.camera.position.set(200, 1.2, 1.2);
      this.camera.lookAt({
        x: 1,
        y: 1,
        z: 1
      });
      this.initRenderer();
      this.controls = new THREE.OrbitControls(this.camera, this.element.current);
      this.timer = requestAnimationFrame(this.animation);
    }catch(err){
      console.error(err);
    }
  }
  // 初始化环境光
  initSettingLight(): void{
    const settingLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(settingLight);
  }
  // 初始化地球
  async initEarth(): Promise<void>{
    return new Promise((resolve: Function, reject: Function): void=>{
      const loader: THREE.TextureLoader = new THREE.TextureLoader();
      loader.load(require('./earth.jpg'), (texture: any): void=>{
        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(95, 100, 100);
        const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          side: THREE.DoubleSide
        });
        this.earth = new THREE.Mesh(geometry, material);
        this.scene.add(this.earth);
        this.earth.position.set(1, 1, 1);
        resolve();
      });
    }).catch((err: any): void=>{
      console.error(err);
    });
  }
  // 自转
  rotation(): void{
    if(this.earth){
      const { y }: { y: number } = this.earth.rotation;
      this.earth.rotation.y = y + 0.01 >= 2 * Math.PI ? 0 : y + 0.01;
    }
  }
  // 初始化场景
  initScene(): void{
    this.scene = new THREE.Scene();
  }
  // 初始化照相机
  initCamera(): void{
    this.camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
  }
  // 渲染器初始化
  initRenderer(): void{
    const current: Element = this.element.current;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(current.clientWidth, current.clientHeight);
    this.renderer.setClearColor(0xffffff);
    current.appendChild(this.renderer.domElement);
  }
  // 动画
  animation: Function = (): void=>{
    this.renderer.clear();
    this.rotation();
    this.renderer.render(this.scene, this.camera);
    this.timer = requestAnimationFrame(this.animation);
  };
  render(): React.Element{
    return (
      <div ref={ this.element } className={ style.earth } />
    );
  }
}

export default Earth;