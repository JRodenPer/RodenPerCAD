import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Viewer2D = () => {
  const containerRef = useRef<any>();

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Create orthographic cam (2D)
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      1,
      1000
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);

    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Crear un cuadrado 2D
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const square = new THREE.Mesh(geometry, material);
    scene.add(square);

    
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Manejar el cambio de tamaño de la ventana
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} />;
};
