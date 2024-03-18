import { createAction } from "@reduxjs/toolkit";
import * as THREE from "three";

export const setScene = createAction<THREE.Scene>("scene/setScene");
export const clearScene = createAction("scene/clearScene");
