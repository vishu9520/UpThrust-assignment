import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CurveCanvasProps {
  className?: string;
}

export const CurveCanvas: React.FC<CurveCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let reqId = 0;

    try {
      const scene = new THREE.Scene();
      const width = container.clientWidth || 1400;
      const height = container.clientHeight || 450;

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);

      // Warm directional and ambient lighting for glossy orange tube
      const ambLight = new THREE.AmbientLight(0xffeedd, 1.5);
      scene.add(ambLight);

      const dirLight1 = new THREE.DirectionalLight(0xff6a00, 3.5);
      dirLight1.position.set(5, 4, 6);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xff9944, 2.5);
      dirLight2.position.set(-6, -2, 4);
      scene.add(dirLight2);

      const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
      rimLight.position.set(0, 6, -5);
      scene.add(rimLight);

      const curveGroup = new THREE.Group();
      scene.add(curveGroup);

      const loader = new GLTFLoader();
      loader.load(
        '/models/curve-line.glb',
        (gltf) => {
          const root = gltf.scene;

          const box = new THREE.Box3().setFromObject(root);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 11.5 / maxDim;
          root.scale.setScalar(scale);

          root.position.x = -center.x * scale;
          root.position.y = -center.y * scale;
          root.position.z = -center.z * scale;

          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              const orangeMat = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(0xd63e00),
                emissive: new THREE.Color(0x380a00),
                roughness: 0.18,
                metalness: 0.85,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                reflectivity: 0.95
              });
              mesh.material = orangeMat;
            }
          });

          curveGroup.add(root);
          setHasLoaded(true);
        },
        undefined,
        (err) => {
          console.warn('Curve model load fallback:', err);
        }
      );

      let isVisible = true;
      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();
      const animate = () => {
        reqId = requestAnimationFrame(animate);
        if (!isVisible || !renderer) return;

        const t = clock.getElapsedTime();
        curveGroup.rotation.y = Math.sin(t * 0.3) * 0.05;
        curveGroup.position.y = Math.sin(t * 0.8) * 0.1;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('WebGL init error in curve:', err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {!hasLoaded && (
        <div className="w-full h-full opacity-30 bg-gradient-to-r from-transparent via-orange-600/10 to-transparent blur-3xl animate-pulse" />
      )}
    </div>
  );
};
