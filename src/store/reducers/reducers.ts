import { combineReducers } from "@reduxjs/toolkit";
import sceneReducer from "../scene/slice";

export const rootReducer = combineReducers({
  scene: sceneReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
