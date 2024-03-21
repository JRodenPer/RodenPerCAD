import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScene } from "../sceneContext";
import * as S from "./viewer.styles";

interface viewerProps {
  type: "2D" | "3D";
}

export const Viewer = (props: viewerProps) => {
  const is2D = props.type === "2D";
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const shiftKeyPressed = useRef(false);
  const scene = useScene();

  useEffect(() => {
    if (!scene) return;

    let renderer: THREE.WebGLRenderer;
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
      camera.position.set(0, 10, 0);
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
          /*scene.children.forEach((item) => {
            item.rotation.x += deltaY * 0.01;
            item.rotation.y += deltaX * 0.01;
            item.rotation.z += deltaX * 0.01;
          });*/
          if (is2D) camera.rotation.z -= (deltaX - deltaY) * 0.005;
          else {
            camera.rotation.x += deltaY * 0.01;
            camera.rotation.y += deltaX * 0.01;
          }
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
      if (event.deltaY > 0) camera.zoom -= 0.1;
      else camera.zoom += 0.1;

      // Limitar el zoom mínimo y máximo (ajústalo según tus necesidades)
      camera.zoom = Math.max(0.1, Math.min(10.0, camera.zoom));

      camera.updateProjectionMatrix();
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

  return (
    <S.Container>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </S.Container>
  );
};
