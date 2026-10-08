import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface StatueCanvasProps {
  className?: string;
}

export const StatueCanvas: React.FC<StatueCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasError(true);
        setIsLoading(false);
        return;
      }
    } catch {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio Lighting setup to produce iridescent reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xff7733, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x33aaff, 2.4);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff00bb, 3.2);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 6, 2);
    scene.add(topLight);

    // Root model group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let isVisible = true;
    let reqId = 0;

    // Mouse tracking for reactive tilt
    const targetRotation = { x: 0, y: -0.38 };
    const currentRotation = { x: 0, y: -0.38 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      // Base orientation: head turned slightly to left (~ -0.38 rad)
      targetRotation.y = -0.38 + x * 0.45;
      targetRotation.x = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Load GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/statue.glb',
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.95 / maxDim;
        root.scale.setScalar(scale);

        // Center on origin, slightly lifted
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale - 0.12;
        root.position.z = -center.z * scale;

        // Ensure materials shine with iridescent chromatic gloss
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness || 0.25, 0.3);
              mat.metalness = Math.max(mat.metalness || 0.7, 0.75);
              mat.envMapIntensity = 1.8;
              mat.needsUpdate = true;
            }
          }
        });

        modelGroup.add(root);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Statue model loading notice:', err);
        setHasError(true);
        setIsLoading(false);
      }
    );

    // Visibility Observer to pause rendering when offscreen (Performance target >= 85)
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clock and animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      // Subtle breathing float animation
      const floatY = Math.sin(elapsed * 1.2) * 0.03;
      modelGroup.position.y = floatY;

      modelGroup.rotation.x = currentRotation.x + Math.sin(elapsed * 0.8) * 0.02;
      modelGroup.rotation.y = currentRotation.y + Math.cos(elapsed * 0.6) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-auto ${className}`}
      style={{ minHeight: '380px' }}
      aria-label="Interactive 3D iridescent bust of Upthrust"
      role="img"
    >
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-orange-500 border-t-transparent animate-spin opacity-60" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400">
          <img
            src="/og-preview.png"
            alt="Upthrust 3D Statue preview"
            className="w-full h-full object-contain filter drop-shadow-xl"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};
