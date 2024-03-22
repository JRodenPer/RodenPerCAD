import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Viewer2D } from "../viewer2D";
import { Viewer3D } from "../viewer3D";
import { SceneProvider } from "../sceneContext";
import * as S from "./multiViewer.styles";
import { Scene } from "../../scene";

export const MultiViewer = () => {
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    if (!scene) {
      const newScene = new Scene();

      /*// Crear un cuadrado
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const square = new THREE.Mesh(geometry, material);
      newScene.addElement(square);*/

      setScene(newScene);
    }

    // Aquí puedes agregar más lógica relacionada con la escena si es necesario, como la configuración de la cámara, renderizador, etc.

    return () => {
      // Aquí puedes realizar la limpieza necesaria al desmontar el componente
    };
  }, [scene]);

  return (
    <S.Container>
      <SceneProvider scene={scene}>
        {/*<Viewer2D />*/}
        <Viewer3D />
      </SceneProvider>
    </S.Container>
  );
};
