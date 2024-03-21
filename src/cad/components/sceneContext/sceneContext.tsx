import React, { createContext, useContext } from "react";
import * as THREE from "three";

interface SceneContextProps extends React.PropsWithChildren {
  scene: THREE.Scene | undefined;
}

const SceneContext = createContext<SceneContextProps | undefined>(undefined);

export const SceneProvider: React.FC<SceneContextProps> = ({
  scene,
  children,
}) => (
  <SceneContext.Provider value={{ scene }}>{children}</SceneContext.Provider>
);

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene debe ser usado dentro de un SceneProvider");
  }
  return context.scene;
};
