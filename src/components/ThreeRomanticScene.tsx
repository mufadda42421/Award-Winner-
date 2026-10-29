import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeRomanticSceneProps {
  interactive?: boolean;
}

export const ThreeRomanticScene: React.FC<ThreeRomanticSceneProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050104, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (PMREM)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffedd5, 3.2); // Warm champagne key
    keyLight.position.set(4.5, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf472b6, 2.4); // Cool rose rim
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0xffe4e6, 0x14030d, 1.4);
    scene.add(fillLight);

    // 5. Composite Procedural Romantic Subject: The Crystalline Celestial Heart Group (7 distinct parts)
    const romanticGroup = new THREE.Group();

    // Part 1: Procedural Heart Outer Silhouette (Extrude with luxury bevels)
    const heartShape = new THREE.Shape();
    const x0 = 0, y0 = 0;
    heartShape.moveTo(x0, y0 + 0.38);
    heartShape.bezierCurveTo(x0, y0 + 0.8, x0 - 0.75, y0 + 1.0, x0 - 0.75, y0 + 0.48);
    heartShape.bezierCurveTo(x0 - 0.75, y0 + 0.15, x0 - 0.38, y0 - 0.28, x0, y0 - 0.72);
    heartShape.bezierCurveTo(x0 + 0.38, y0 - 0.28, x0 + 0.75, y0 + 0.15, x0 + 0.75, y0 + 0.48);
    heartShape.bezierCurveTo(x0 + 0.75, y0 + 1.0, x0, y0 + 0.8, x0, y0 + 0.38);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.14,
      bevelThickness: 0.16,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    // PBR Rose Gold / Deep Crimson Heart Material
    const outerHeartMat = new THREE.MeshPhysicalMaterial({
      color: 0x9f1239,
      emissive: 0x4c0519,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });
    const heartMesh = new THREE.Mesh(heartGeo, outerHeartMat);
    romanticGroup.add(heartMesh);

    // Part 2: Inner Radiant Crystal Core (Secondary Read)
    const innerCoreGeo = new THREE.OctahedronGeometry(0.42, 2);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0xfda4af,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.1,
      metalness: 0.15,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.75,
      transparent: true,
      opacity: 0.95,
      ior: 1.52,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    innerCoreMesh.position.set(0, 0, 0.06);
    romanticGroup.add(innerCoreMesh);

    // Part 3: Primary Celestial Orbital Ring (Accent 1: Brushed Champagne Gold)
    const primaryRingGeo = new THREE.TorusGeometry(1.5, 0.024, 16, 120);
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xfcd34d,
      metalness: 0.96,
      roughness: 0.14,
    });
    const primaryRingMesh = new THREE.Mesh(primaryRingGeo, goldRingMat);
    primaryRingMesh.rotation.x = Math.PI / 3;
    primaryRingMesh.rotation.y = Math.PI / 6;
    romanticGroup.add(primaryRingMesh);

    // Part 4: Intersecting Counter Ring (Accent 2: Rose Gold Halo)
    const secondaryRingGeo = new THREE.TorusGeometry(1.68, 0.018, 16, 120);
    const roseRingMat = new THREE.MeshStandardMaterial({
      color: 0xfb7185,
      metalness: 0.88,
      roughness: 0.22,
    });
    const secondaryRingMesh = new THREE.Mesh(secondaryRingGeo, roseRingMat);
    secondaryRingMesh.rotation.x = -Math.PI / 3.8;
    secondaryRingMesh.rotation.y = -Math.PI / 4.5;
    romanticGroup.add(secondaryRingMesh);

    // Part 5: Satellite Gem Star Nodes (Accent 3: 8 Orbiting Diamonds)
    const satelliteGroup = new THREE.Group();
    const satelliteCount = 8;
    const nodeGeo = new THREE.OctahedronGeometry(0.048, 1);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfef08a,
      emissiveIntensity: 1.4,
      metalness: 0.9,
      roughness: 0.08,
    });
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satelliteCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      satelliteGroup.add(node);
      satellites.push(node);
    }
    romanticGroup.add(satelliteGroup);

    // Part 6: Soft Radial Contact Shadow / Grounding Aura beneath
    const shadowGeo = new THREE.CircleGeometry(1.8, 32);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
    grad.addColorStop(0.45, 'rgba(159, 18, 57, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.45;
    romanticGroup.add(shadowMesh);

    scene.add(romanticGroup);

    // 6. Floating Rose Petals & Stardust Field
    const particleCount = 160;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xf472b6), // Rose pink
      new THREE.Color(0xfbbf24), // Champagne gold
      new THREE.Color(0xffffff), // Pure starlight
      new THREE.Color(0xe11d48), // Deep ruby
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      scales[i] = Math.random() * 0.05 + 0.015;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGrad.addColorStop(0.3, 'rgba(255, 225, 235, 0.85)');
    pGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particlesMat = new THREE.PointsMaterial({
      size: 0.13,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlePoints);

    // 7. Mouse Interaction & Pre-allocated Math helpers (Zero GC in loop)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = nx * 0.45;
      mouse.targetY = ny * 0.35;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 8. Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping for smooth mouse inertia
      const dampingFactor = 1 - Math.exp(-3.2 * dt);
      mouse.x += (mouse.targetX - mouse.x) * dampingFactor;
      mouse.y += (mouse.targetY - mouse.y) * dampingFactor;

      // Group rotation & gentle levitation
      romanticGroup.rotation.y = time * 0.26 + mouse.x * 0.55;
      romanticGroup.rotation.x = Math.sin(time * 0.35) * 0.08 - mouse.y * 0.35;
      romanticGroup.position.y = Math.sin(time * 0.75) * 0.12;

      // Interlocking Rings spin with counter-momentum
      primaryRingMesh.rotation.z = time * 0.2;
      secondaryRingMesh.rotation.z = -time * 0.16;

      // Inner core breathing light
      const pulse = 1 + Math.sin(time * 2.0) * 0.07;
      innerCoreMesh.scale.set(pulse, pulse, pulse);

      // Orbit satellites around primary ring
      satellites.forEach((sat, idx) => {
        const angle = time * 0.55 + (idx * Math.PI * 2) / satelliteCount;
        const rad = 1.5;
        sat.position.set(
          Math.cos(angle) * rad,
          Math.sin(angle) * rad,
          Math.sin(angle * 2.2) * 0.18
        );
        sat.rotation.y = time * 2;
      });

      // Drift floating stardust particles
      const posAttr = particlesGeo.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += dt * 0.16;
        if (arr[i * 3 + 1] > 3.2) {
          arr[i * 3 + 1] = -3.2;
        }
      }
      posAttr.needsUpdate = true;
      particlePoints.rotation.y = time * 0.025;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    frameId = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      heartGeo.dispose();
      outerHeartMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      primaryRingGeo.dispose();
      goldRingMat.dispose();
      secondaryRingGeo.dispose();
      roseRingMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      shadowGeo.dispose();
      shadowTex.dispose();
      shadowMat.dispose();
      particlesGeo.dispose();
      particleTexture.dispose();
      particlesMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
