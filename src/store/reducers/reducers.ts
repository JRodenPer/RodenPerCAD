import { combineReducers } from "@reduxjs/toolkit";
import sceneReducer from "../sceneSlice";

export const rootReducer = combineReducers({
  scene: sceneReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
