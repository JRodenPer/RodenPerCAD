import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { RootState } from "../../../store/reducers";

interface viewerProps {
  type: "2D" | "3D";
}

export const Viewer = (props: viewerProps) => {
  const is2D = props.type === "2D";
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const shiftKeyPressed = useRef(false);
  const scene = useSelector((state: RootState) => state.scene.scene);

  useEffect(() => {
    if (!scene) return;

    let renderer: THREE.WebGLRenderer,
      square: THREE.Mesh,
      gridHelper: THREE.GridHelper;
    let isDragging = false;

    // Create camera
    const camera = is2D
      ? new THREE.OrthographicCamera(
          -window.innerWidth / 200,
          window.innerWidth / 200,
          window.innerHeight / 200,
          -window.innerHeight / 200,
          1,
          1000
        )
      : new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );

    if (is2D) {
      camera.position.set(0, 0, 10);
      camera.lookAt(scene.position);
    } else {
      camera.position.z = 5;
    }

    // Crear el renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Crear un grid de fondo
    const size = 10;
    const divisions = 10;
    gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // Crear un cuadrado
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    square = new THREE.Mesh(geometry, material);
    scene.add(square);

    // Eventos de ratón / táctiles
    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      isDragging = true;
      previousMousePosition.current = {
        x:
          event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX,
        y:
          event instanceof MouseEvent
            ? event.clientY
            : event.touches[0].clientY,
      };
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (isDragging) {
        const mouseX =
          event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX;
        const mouseY =
          event instanceof MouseEvent
            ? event.clientY
            : event.touches[0].clientY;
        const deltaX = mouseX - previousMousePosition.current.x;
        const deltaY = mouseY - previousMousePosition.current.y;
        previousMousePosition.current = { x: mouseX, y: mouseY };
        if (!shiftKeyPressed.current) {
          square.rotation.x += deltaY * 0.01;
          square.rotation.y += deltaX * 0.01;
          gridHelper.rotation.x += deltaY * 0.01;
          gridHelper.rotation.y += deltaX * 0.01;
        } else {
          camera.position.x -= deltaX * 0.01;
          camera.position.y += deltaY * 0.01;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        shiftKeyPressed.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        shiftKeyPressed.current = false;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomSpeed = 0.1;
      camera.position.z += event.deltaY * zoomSpeed;
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("touchstart", handleMouseDown);
    renderer.domElement.addEventListener("touchmove", handleMouseMove);
    renderer.domElement.addEventListener("touchend", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Limpieza
    return () => {
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("touchstart", handleMouseDown);
      renderer.domElement.removeEventListener("touchmove", handleMouseMove);
      renderer.domElement.removeEventListener("touchend", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [scene]);

  return <div ref={containerRef} />;
};
