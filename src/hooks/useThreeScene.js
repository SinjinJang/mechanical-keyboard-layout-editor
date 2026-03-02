import { useState, useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

export function useThreeScene({ open, stlData, initialColor = '#808080' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const animationIdRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [modelColor, setModelColor] = useState(initialColor);

  const cleanupThree = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }
    if (meshRef.current) {
      meshRef.current.geometry.dispose();
      meshRef.current.material.dispose();
      meshRef.current = null;
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    sceneRef.current = null;
    cameraRef.current = null;
  }, []);

  const initThree = useCallback(() => {
    if (!containerRef.current || !stlData) return;

    cleanupThree();
    setLoading(true);

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 100, 200);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-100, 100, -100);
    scene.add(directionalLight2);

    // Grid
    const gridHelper = new THREE.GridHelper(300, 30, 0x444444, 0x333333);
    scene.add(gridHelper);

    // Load STL
    const loader = new STLLoader();
    const blob = new Blob([stlData], { type: 'model/stl' });
    const url = URL.createObjectURL(blob);

    loader.load(
      url,
      (geometry) => {
        URL.revokeObjectURL(url);

        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(modelColor),
          metalness: 0.3,
          roughness: 0.6,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        mesh.position.y = size.z / 2;
        mesh.rotation.x = -Math.PI / 2;

        scene.add(mesh);
        meshRef.current = mesh;

        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(maxDim, maxDim * 0.8, maxDim * 1.5);
        controls.target.set(0, size.z / 4, 0);
        controls.update();

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading STL:', error);
        URL.revokeObjectURL(url);
        setLoading(false);
      }
    );

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [stlData, cleanupThree]);

  // Initialize/cleanup when dialog opens/closes
  useEffect(() => {
    if (open && stlData) {
      const timer = setTimeout(() => {
        initThree();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      cleanupThree();
    }
  }, [open, stlData, initThree, cleanupThree]);

  // Update model color
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.color.set(modelColor);
    }
  }, [modelColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupThree();
    };
  }, [cleanupThree]);

  return {
    containerRef,
    loading,
    modelColor,
    setModelColor,
  };
}
