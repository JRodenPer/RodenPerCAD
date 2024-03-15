import { Mesh } from "three";

export default class Scene {
    // Items
    meshes: Mesh[];
  
    // Constructor
    constructor(nombre: string, edad: number) {
      this.meshes = [];
    }
  
    // Methods
    addMesh( mesh: Mesh) {
        this.meshes.push(mesh);
    }
  }