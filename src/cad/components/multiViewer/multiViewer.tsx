import React, { useEffect } from "react";
import * as THREE from "three";
import { Viewer2D } from "../viewer2D";
import { Viewer3D } from "../viewer3D";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { setScene } from "../../../store/scene/actions";

export const MultiViewer = () => {
  const dispatch = useDispatch();
  const scene = useSelector((state: RootState) => state.scene.scene);

  useEffect(() => {
    if (!scene) {
      const newScene = new THREE.Scene();
      dispatch(setScene(newScene));
    }

    // Aquí puedes agregar más lógica relacionada con la escena si es necesario, como la configuración de la cámara, renderizador, etc.

    return () => {
      // Aquí puedes realizar la limpieza necesaria al desmontar el componente
    };
  }, [scene, dispatch]);

  return (
    <div>
      <Viewer2D />
      <Viewer3D />
    </div>
  );
};
