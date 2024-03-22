import * as THREE from "three";
import Camera from "./camera";

export class Scene {
  // Items
  //meshes: Mesh[];
  scene: THREE.Scene;
  camera?: Camera;
  renderer?: THREE.WebGLRenderer;

  // Constructor
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.scene.add(new THREE.AmbientLight(0xf0f0f0, 3));
    const light = new THREE.SpotLight(0xffffff, 4.5);
    light.position.set(0, 1500, 200);
    light.angle = Math.PI * 0.2;
    light.decay = 0;
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 2000;
    light.shadow.bias = -0.000222;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);

    this.createGrid();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
  }

  // Methods
  addCamera(camera: Camera, position: { x: number; y: number; z: number }) {
    this.camera = camera;
    camera.camInstance.position.set(position.x, position.y, position.z);
    this.scene.add(camera.camInstance);
  }

  createGrid() {
    const helper = new THREE.GridHelper(2000, 100);
    helper.position.y = -199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.scene.add(helper);
  }

  addElement(element: THREE.Mesh) {
    this.scene.add(element);
  }
}
