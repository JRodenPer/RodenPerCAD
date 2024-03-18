import { createReducer } from "@reduxjs/toolkit";
import { setScene, clearScene } from "./actions";
import * as THREE from "three";

interface SceneState {
  scene: THREE.Scene | null;
}

const initialState: SceneState = {
  scene: null,
};

const sceneReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setScene, (state, action) => {
      state.scene = action.payload;
    })
    .addCase(clearScene, (state) => {
      state.scene = null;
    });
});

export default sceneReducer;
