import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";

interface SceneState {
  id: string;
}

const initialState: SceneState = {
  id: '',
};

const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setScene: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearScene: (state) => {
      state.id = '';
    },
  },
});

export const { setScene, clearScene } = sceneSlice.actions;

export default sceneSlice.reducer;
