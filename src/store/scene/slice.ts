import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";

interface SceneState {
  scene: THREE.Scene | null;
}

const initialState: SceneState = {
  scene: null,
};

const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setScene: (state, action: PayloadAction<THREE.Scene>) => {
      state.scene = action.payload;
    },
    clearScene: (state) => {
      state.scene = null;
    },
  },
});

export const { setScene, clearScene } = sceneSlice.actions;

export default sceneSlice.reducer;
