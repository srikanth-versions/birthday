"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#12080D");
    scene.fog = new THREE.FogExp2("#12080D", 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x3b0d1e, 1.8);
    scene.add(ambientLight);

    // Warm champagne spotlight through arch
    const spotLight = new THREE.SpotLight(0xd9b88f, 5);
    spotLight.position.set(2, 6, 2);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // Deep Rose Point Light behind arch
    const roseLight = new THREE.PointLight(0xc77c8a, 4, 15);
    roseLight.position.set(1.5, 2.5, -2);
    scene.add(roseLight);

    // Wine Accent Light
    const wineLight = new THREE.PointLight(0x641a35, 3, 10);
    wineLight.position.set(-3, 1, 3);
    scene.add(wineLight);

    // --- ARCHITECTURAL PORTAL ARCH (Inspired by EOSAI structure) ---
    const archGroup = new THREE.Group();
    archGroup.position.set(2.2, 0.2, -1);

    // Outer Monolithic Arch Frame
    const archShape = new THREE.Shape();
    const w = 1.8, h = 3.5, r = 0.9;
    archShape.moveTo(-w / 2, 0);
    archShape.lineTo(-w / 2, h - r);
    archShape.absarc(0, h - r, w / 2, Math.PI, 0, true);
    archShape.lineTo(w / 2, 0);
    archShape.closePath();

    const extrudeSettings = {
      depth: 0.8,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const archGeo = new THREE.ExtrudeGeometry(archShape, extrudeSettings);
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x240915,
      roughness: 0.4,
      metalness: 0.6,
    });
    const archMesh = new THREE.Mesh(archGeo, archMat);
    archMesh.position.set(0, 0, -0.4);
    archGroup.add(archMesh);

    // Glowing Inner Ring Halo
    const ringGeo = new THREE.TorusGeometry(1.0, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd9b88f,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 2.2, 0.1);
    archGroup.add(ringMesh);

    // Secondary Rose Gold Ring Orbit (tilt like Saturn ring in reference)
    const orbitRingGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xc77c8a,
      transparent: true,
      opacity: 0.7,
    });
    const orbitRingMesh = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRingMesh.position.set(0, 2.2, 0);
    orbitRingMesh.rotation.x = Math.PI / 3;
    orbitRingMesh.rotation.y = Math.PI / 8;
    archGroup.add(orbitRingMesh);

    scene.add(archGroup);

    // --- REFLECTIVE WATER PLANE ---
    const waterGeo = new THREE.PlaneGeometry(30, 30);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x12080d,
      roughness: 0.1,
      metalness: 0.9,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.5;
    scene.add(waterMesh);

    // --- FLOATING ROSE PETALS (3D Parametric Mesh) ---
    const petalCount = 45;
    const petalGroup = new THREE.Group();

    // Create a petal shape geometry
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.2, 0.3, 0.3, 0.7, 0, 1.0);
    petalShape.bezierCurveTo(-0.3, 0.7, -0.2, 0.3, 0, 0);

    const petalGeo = new THREE.ShapeGeometry(petalShape);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0x641a35,
      emissive: 0x3b0d1e,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });

    const petals: {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      floatSpeed: number;
      initialY: number;
    }[] = [];

    for (let i = 0; i < petalCount; i++) {
      const mesh = new THREE.Mesh(petalGeo, petalMat);
      const scale = 0.12 + Math.random() * 0.15;
      mesh.scale.set(scale, scale, scale);

      const posX = (Math.random() - 0.5) * 12;
      const posY = Math.random() * 7 - 0.5;
      const posZ = (Math.random() - 0.5) * 8;
      mesh.position.set(posX, posY, posZ);

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      petalGroup.add(mesh);

      petals.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.003 + Math.random() * 0.005,
        initialY: posY,
      });
    }

    scene.add(petalGroup);

    // --- SUBTLE FLOATING 3D HEARTS ---
    const heartGroup = new THREE.Group();
    const heartCount = 14;

    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const heartExtrude = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, heartExtrude);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xc77c8a,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x3b0d1e,
      transparent: true,
      opacity: 0.85,
    });

    const hearts: {
      mesh: THREE.Mesh;
      speed: number;
      baseY: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < heartCount; i++) {
      const mesh = new THREE.Mesh(heartGeo, heartMat);
      mesh.scale.set(0.18, 0.18, 0.18);
      mesh.rotation.z = Math.PI; // Flip heart right side up

      const posX = (Math.random() - 0.5) * 10;
      const posY = Math.random() * 5 + 0.5;
      const posZ = (Math.random() - 0.5) * 6;
      mesh.position.set(posX, posY, posZ);

      heartGroup.add(mesh);
      hearts.push({
        mesh,
        speed: 0.005 + Math.random() * 0.008,
        baseY: posY,
        phase: Math.random() * Math.PI * 2,
      });
    }

    scene.add(heartGroup);

    // --- TINY GLOWING PARTICLES (Volumetric Star Dust) ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xd9b88f); // Champagne
    const c2 = new THREE.Color(0xe8a6b5); // Soft Blush
    const c3 = new THREE.Color(0xc77c8a); // Rose Gold

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 8 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const pick = Math.random();
      const col = pick < 0.4 ? c1 : pick < 0.7 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // --- MOUSE PARALLAX VARIABLES ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse parallax
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX * 0.8;
      camera.position.y = 1.2 - targetY * 0.5;
      camera.lookAt(0, 1.2, 0);

      // Rotate arch rings slowly
      orbitRingMesh.rotation.z = elapsedTime * 0.15;

      // Animate floating petals
      petals.forEach((p) => {
        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.y += p.rotSpeedY;
        p.mesh.rotation.z += p.rotSpeedZ;
        p.mesh.position.y -= p.floatSpeed;
        p.mesh.position.x += Math.sin(elapsedTime + p.mesh.position.z) * 0.002;

        if (p.mesh.position.y < -0.5) {
          p.mesh.position.y = 7;
          p.mesh.position.x = (Math.random() - 0.5) * 12;
        }
      });

      // Animate floating hearts
      hearts.forEach((h) => {
        h.mesh.position.y = h.baseY + Math.sin(elapsedTime * 1.5 + h.phase) * 0.15;
        h.mesh.rotation.y = Math.sin(elapsedTime + h.phase) * 0.3;
      });

      // Animate particle swirl
      particlesMesh.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    />
  );
};
