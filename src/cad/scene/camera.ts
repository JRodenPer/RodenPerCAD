import * as THREE from "three";

export default class Camera {
  // Items
  camInstance: THREE.OrthographicCamera | THREE.PerspectiveCamera;
  is2D: boolean;

  // Constructor
  constructor(type: string) {
    this.is2D = type === "2D";

    this.camInstance = this.is2D
      ? new THREE.OrthographicCamera(
          -window.innerWidth / 200,
          window.innerWidth / 200,
          window.innerHeight / 200,
          -window.innerHeight / 200,
          1,
          1000
        )
      : new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          1,
          10000
        );
  }

  // Methods
}
