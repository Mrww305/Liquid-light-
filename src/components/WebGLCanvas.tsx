import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShaderSettings } from '../types';
import { COLORWAY_PRESETS } from '../data/colorways';
import { BACKDROP_THEMES } from '../data/backdropThemes';

interface WebGLCanvasProps {
  settings: ShaderSettings;
  onFpsUpdate?: (fps: number) => void;
  onMouseCoordinates?: (coords: { x: number; y: number }) => void;
}

export const WebGLCanvas: React.FC<WebGLCanvasProps> = ({
  settings,
  onFpsUpdate,
  onMouseCoordinates,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  const settingsRef = useRef<ShaderSettings>(settings);
  const loomPhaseRef = useRef<number>(0.0);

  // Keep settings ref current for the requestAnimationFrame loop
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Convert fabric weave string to numeric enum for shader
  const getWeaveModeIndex = (weave: string): number => {
    switch (weave) {
      case 'satinAnisotropic': return 1;
      case 'crepeCrinkle': return 2;
      case 'peachFuzz': return 3;
      case 'metallicMesh': return 4;
      case 'plainWeave':
      default: return 0;
    }
  };

  // Geometry generator with high-density fabric draping meshes
  const createGeometry = (type: string, aspect: number): { geometry: THREE.BufferGeometry; isClothPlane: boolean } => {
    const baseScale = Math.min(1.6, aspect * 1.2);
    switch (type) {
      case 'silkDrape': {
        // High-density cloth drape grid (130 x 130 vertices)
        const geo = new THREE.PlaneGeometry(3.6, 4.0, 130, 130);
        return { geometry: geo, isClothPlane: true };
      }
      case 'satinRibbon': {
        // Sculptural twisting silk sash
        const geo = new THREE.TorusKnotGeometry(baseScale * 1.1, 0.44, 260, 32, 2, 3);
        return { geometry: geo, isClothPlane: false };
      }
      case 'tactileSwatch': {
        // Elevated fabric presentation board tilted for micro-weave inspection
        const geo = new THREE.PlaneGeometry(3.2, 3.2, 110, 110);
        return { geometry: geo, isClothPlane: true };
      }
      case 'sphere':
        return { geometry: new THREE.IcosahedronGeometry(baseScale * 0.95, 32), isClothPlane: false };
      case 'mobius':
        return { geometry: new THREE.TorusGeometry(baseScale * 0.9, 0.42, 64, 200, Math.PI * 2), isClothPlane: false };
      case 'cylinder':
        return { geometry: new THREE.CylinderGeometry(baseScale * 0.7, baseScale * 0.85, 2.4, 96, 64, true), isClothPlane: false };
      case 'torusKnot':
      default:
        return { geometry: new THREE.TorusKnotGeometry(baseScale, 0.42, 220, 26), isClothPlane: false };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const initialTheme = BACKDROP_THEMES[settings.backdropTheme] || BACKDROP_THEMES.studioDark;
    renderer.setClearColor(initialTheme.threeClearColor, 0);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    const initialZoom = settings.macroZoom || 1.0;
    camera.position.set(0, 0, 6.0 / initialZoom);
    cameraRef.current = camera;

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(amb);
    const dir1 = new THREE.DirectionalLight(0xfff8ee, 2.1);
    dir1.position.set(4, 8, 6);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xe8f0ff, 1.1);
    dir2.position.set(-5, -4, -3);
    scene.add(dir2);

    const colorConfig = COLORWAY_PRESETS[settings.colorway] || COLORWAY_PRESETS.opal;
    const aspect = window.innerWidth / window.innerHeight;
    const { geometry, isClothPlane } = createGeometry(settings.geometry, aspect);

    // Custom Fabric & Texture Shader Uniforms
    const uniforms: Record<string, THREE.IUniform> = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uCream: { value: new THREE.Vector3(...colorConfig.cream) },
      uColor1: { value: new THREE.Vector3(...colorConfig.color1) },
      uColor2: { value: new THREE.Vector3(...colorConfig.color2) },
      uColor3: { value: new THREE.Vector3(...colorConfig.color3) },
      uFresnelPower: { value: colorConfig.fresnelPower },
      uSpecular: { value: colorConfig.specular },
      uDisplacementScale: { value: settings.displacementScale },
      uWaveSpeed: { value: settings.waveSpeed },
      uWeaveDensity: { value: settings.weaveDensity || 90.0 },
      uFabricWeave: { value: getWeaveModeIndex(settings.fabricWeave || 'plainWeave') },
      uSheerness: { value: settings.sheerness ?? 0.3 },
      uLuster: { value: settings.luster ?? 1.2 },
      uRoughness: { value: settings.roughness ?? 0.2 },
      uMacroZoom: { value: settings.macroZoom ?? 1.0 },
      uIsClothPlane: { value: isClothPlane ? 1.0 : 0.0 },
      // Automated Loom Simulation & Weave Shifting
      uLoomActive: { value: settings.loomActive !== false ? 1.0 : 0.0 },
      uLoomPhase: { value: 0.0 },
      uLoomSpeed: { value: settings.loomSpeed || 1.0 },
      uLoomShedDepth: { value: settings.loomShedDepth || 1.0 },
      uThreadContrast: { value: settings.threadContrast || 1.0 },
      uIsDarkBackdrop: { value: initialTheme.isDark ? 1.0 : 0.0 },
    };
    uniformsRef.current = uniforms;

    // Vertex Shader: Dynamic Cloth Gravity Draping, Loom Tension Waves, Wind Flutter, and Touch Ripples
    const vertexShader = `
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vViewPosition;
      varying vec3 vWorldPosition;
      varying vec3 vTangent;
      varying float vLoomTension;
      
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uDisplacementScale;
      uniform float uWaveSpeed;
      uniform float uIsClothPlane;
      uniform float uLoomActive;
      uniform float uLoomPhase;
      uniform float uLoomSpeed;

      void main() {
        vUv = uv;
        vec3 pos = position;

        vTangent = normalize(vec3(1.0, 0.0, 0.0));

        // Automated Loom Tension and Reed Beat-Up Impulse
        float loomBeat = 0.0;
        if (uLoomActive > 0.5) {
          // Sharp reed impact pulse traveling down warp yarns
          float beatPulse = pow(abs(sin(uLoomPhase * 2.0)), 6.0);
          loomBeat = beatPulse * 0.045 * (1.0 - uv.y * 0.45);
          
          // Warp tension stretch
          pos.y += sin(uLoomPhase * 1.0) * 0.012 * (1.0 - uv.y);
        }
        vLoomTension = loomBeat;

        if (uIsClothPlane > 0.5) {
          float hangWeight = pow(1.0 - uv.y, 1.2);
          float horizontalSag = sin(uv.x * 3.14159);
          
          float verticalFolds = sin(uv.x * 12.5 + sin(uv.y * 3.0)) * 0.18 * hangWeight;
          verticalFolds += cos(uv.x * 25.0) * 0.06 * hangWeight;

          float windWave = sin(uv.x * 4.0 - uv.y * 6.0 + uTime * uWaveSpeed * 1.4) * (0.16 * uDisplacementScale);
          windWave += cos(uv.x * 7.0 + uv.y * 3.0 - uTime * (uWaveSpeed * 0.9)) * (0.08 * uDisplacementScale);

          pos.z += (verticalFolds + windWave + loomBeat) * uDisplacementScale;
          pos.z += horizontalSag * 0.35 * hangWeight;
          pos.y -= pow(horizontalSag, 2.0) * 0.18 * hangWeight;
        } else {
          float wave = sin(pos.x * 2.2 + pos.y * 2.2 + uTime * uWaveSpeed) * (0.15 * uDisplacementScale);
          wave += cos(pos.y * 3.4 + uTime * (uWaveSpeed * 0.6)) * (0.09 * uDisplacementScale);
          pos.z += (wave + loomBeat * 0.5);
        }

        // Pointer proximity touch elasticity
        float dist = distance(uv, uMouse * 0.5 + 0.5);
        float touchRipple = sin(dist * 18.0 - uTime * 3.5) * exp(-dist * 3.0);
        pos.z += touchRipple * (0.22 * uDisplacementScale);

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPosition = worldPos.xyz;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormal = normalize(normalMatrix * normal);
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    // Fragment Shader: Microscopic Warp & Weft Weave, Dynamic Loom Shedding & Weave Shift, High Contrast Crevices
    const fragmentShader = `
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vViewPosition;
      varying vec3 vWorldPosition;
      varying vec3 vTangent;
      varying float vLoomTension;

      uniform float uTime;
      uniform vec3 uCream;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uFresnelPower;
      uniform float uSpecular;
      uniform float uWeaveDensity;
      uniform int uFabricWeave;
      uniform float uSheerness;
      uniform float uLuster;
      uniform float uRoughness;
      uniform float uMacroZoom;
      uniform float uLoomActive;
      uniform float uLoomPhase;
      uniform float uLoomSpeed;
      uniform float uLoomShedDepth;
      uniform float uThreadContrast;
      uniform float uIsDarkBackdrop;

      // Pseudo-random hash for thread fiber micro-variations
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
        vec3 halfVec = normalize(lightDir + viewDir);

        float NdotV = max(dot(normal, viewDir), 0.0);
        float fresnel = pow(1.0 - NdotV, uFresnelPower);

        // ----------------------------------------------------
        // AUTOMATIC LOOM WEAVE SHIFTING COORDINATES
        // ----------------------------------------------------
        vec2 shiftedUv = vUv;
        if (uLoomActive > 0.5) {
          // Continuous cloth take-up advancement along warp axis
          shiftedUv.y += uLoomPhase * 0.045 * uLoomSpeed;
          // Micro weft insertion traversal across weft axis
          shiftedUv.x += sin(uLoomPhase * 1.5 + vUv.y * 3.5) * 0.003 * uLoomSpeed;
        }

        // Microscopic Weave Coordinate System
        vec2 weaveCoord = shiftedUv * (uWeaveDensity * 0.7);
        vec2 cell = fract(weaveCoord);
        vec2 cellId = floor(weaveCoord);

        // Individual Yarn Thread Cross-section Profile
        float warpProfile = sin(cell.x * 3.14159);
        float weftProfile = sin(cell.y * 3.14159);

        // Spinning filament striations (visible on macro zoom)
        float microTwist = sin((cell.y * 32.0 + cell.x * 6.0) * 3.14159) * (0.14 * smoothstep(1.0, 2.5, uMacroZoom));
        warpProfile = clamp(warpProfile + microTwist, 0.0, 1.0);
        weftProfile = clamp(weftProfile + microTwist, 0.0, 1.0);

        // Dynamic Heddle Shedding Oscillation
        // Harness A lifts odd warp threads, Harness B lifts even warp threads
        float shedCycle = sin(uLoomPhase * 1.2) * (uLoomShedDepth * 0.35) * uLoomActive;

        float yarnElevation = 0.5;
        float isWarpOver = 0.0;
        float poreGap = 0.0;
        float anisotropicSpec = 0.0;
        float pebbleScatter = 0.0;
        float peachFuzzRim = 0.0;
        float metallicSparkle = 0.0;

        // WEAVE PATTERN ARCHITECTURES
        if (uFabricWeave == 1) {
          // SHAMUSES SATIN (5-End Anisotropic Floating Weave)
          float satinFloating = step(1.0, mod(cellId.x * 3.0 + cellId.y, 5.0));
          isWarpOver = satinFloating;
          yarnElevation = mix(weftProfile * 0.35, warpProfile * 1.08, satinFloating) + shedCycle * (satinFloating - 0.5) * 0.2;
          
          vec3 tangent = normalize(vTangent);
          float dotTH = dot(tangent, halfVec);
          float sinTH = sqrt(max(0.0, 1.0 - dotTH * dotTH));
          anisotropicSpec = pow(sinTH, 42.0) * (2.2 * uLuster);
          poreGap = 0.02;
        }
        else if (uFabricWeave == 2) {
          // CAINA CREPE (High-Twist Pebbled Grain)
          float p1 = noise(weaveCoord * 1.4);
          float p2 = noise(weaveCoord * 3.1 + vec2(1.7, 4.3));
          float crinkle = (p1 * 0.65 + p2 * 0.35);
          isWarpOver = step(0.5, crinkle);
          yarnElevation = mix(warpProfile * 0.6, crinkle, 0.7) + shedCycle * 0.12;
          pebbleScatter = (crinkle - 0.5) * 0.35;
          poreGap = 0.06;
        }
        else if (uFabricWeave == 3) {
          // PEACH KHUSHBOO (Emerald-Sanded Emerized Micro-Fuzz)
          float fuzzNoise = noise(weaveCoord * 2.8);
          peachFuzzRim = pow(1.0 - NdotV, 1.3) * (0.85 * (fuzzNoise * 0.5 + 0.5));
          isWarpOver = step(0.5, fuzzNoise);
          yarnElevation = mix(warpProfile * 0.7, fuzzNoise, 0.45);
          poreGap = 0.04;
        }
        else if (uFabricWeave == 4) {
          // MASSORI NET (Open Diaphanous Metallic Diamond Mesh)
          float distEdge = min(min(cell.x, 1.0 - cell.x), min(cell.y, 1.0 - cell.y));
          float isThread = smoothstep(0.12, 0.22, distEdge);
          isWarpOver = isThread;
          yarnElevation = isThread * warpProfile + shedCycle * 0.15;
          poreGap = 1.0 - isThread;
          
          float sparkleHash = hash(cellId + floor(uTime * 0.15));
          metallicSparkle = pow(sparkleHash, 16.0) * (4.5 * uLuster);
        }
        else {
          // PLAIN 1/1 WEAVE (ZBM Chiffon / Combed Cotton Lawn)
          isWarpOver = mod(cellId.x + cellId.y, 2.0);
          float dynamicShed = (isWarpOver - 0.5) * 2.0 * shedCycle;
          yarnElevation = mix(weftProfile, warpProfile, isWarpOver) + dynamicShed * 0.25;
          
          float openX = smoothstep(0.40, 0.5, abs(cell.x - 0.5));
          float openY = smoothstep(0.40, 0.5, abs(cell.y - 0.5));
          poreGap = openX * openY;
        }

        // ----------------------------------------------------
        // VISIBILITY & CONTRAST ENHANCEMENT
        // ----------------------------------------------------
        // 1. Thread Crevice Shadow (Ambient Occlusion between individual yarns)
        float creviceX = abs(cell.x - 0.5);
        float creviceY = abs(cell.y - 0.5);
        float creviceAO = smoothstep(0.04, 0.44, min(creviceX, creviceY));
        float creviceShadow = mix(0.42 - uThreadContrast * 0.22, 1.0, creviceAO);

        // 2. Warp vs Weft Directional Fiber Glint
        // Yarns reflect light perpendicularly to their spin axes
        float threadReflect = isWarpOver > 0.5 ? (0.92 + 0.16 * sin(cell.y * 3.14159)) : (0.84 + 0.16 * cos(cell.x * 3.14159));

        // Perturb the physical surface normal using yarn micro-elevation
        vec3 yarnNormal = normalize(normal + vec3(
          (cell.x - 0.5) * 0.55 * (1.0 - uRoughness),
          (cell.y - 0.5) * 0.55 * (1.0 - uRoughness),
          0.0
        ));

        float NdotL = max(dot(yarnNormal, lightDir), 0.0);
        float specHighlight = pow(max(dot(yarnNormal, halfVec), 0.0), 28.0) * uSpecular * uLuster;

        // Chromatic pearlescent refraction wave
        float w1 = sin(vUv.x * 4.0 + vUv.y * 4.0 + uTime) * 0.5 + 0.5;
        float w2 = sin(vUv.x * 2.5 - vUv.y * 3.0 + uTime * 0.7) * 0.5 + 0.5;
        vec3 iridescent = mix(uColor1, uColor2, w1);
        iridescent = mix(iridescent, uColor3, w2 * 0.45);

        // Robust Fiber Core Tone with High Weave Contrast
        vec3 threadHighlight = mix(uCream * 0.96, vec3(1.0), 0.35);
        vec3 threadShadow = uCream * (0.60 - uThreadContrast * 0.20);
        vec3 fabricBase = mix(threadShadow, threadHighlight, clamp(yarnElevation, 0.0, 1.0));
        fabricBase *= threadReflect;

        if (uIsDarkBackdrop > 0.5) {
          // On dark studio backdrops: high luminous refraction and crisp thread edges
          fabricBase = mix(fabricBase, iridescent * 1.15, fresnel * 0.78);
        } else {
          // On light backdrops: deepen thread shadows and contrast so fabric pops cleanly
          fabricBase = mix(fabricBase * 0.82, iridescent, fresnel * 0.65);
        }

        vec3 finalColor = fabricBase * creviceShadow;

        // Apply specialized material highlights
        if (uFabricWeave == 1) {
          finalColor += mix(uColor1, vec3(1.0), 0.6) * anisotropicSpec;
        } else if (uFabricWeave == 3) {
          finalColor += uColor2 * peachFuzzRim;
        } else if (uFabricWeave == 4) {
          finalColor += vec3(1.0, 0.92, 0.75) * metallicSparkle;
        } else {
          finalColor += vec3(specHighlight) * (0.4 + fresnel * 0.6);
        }

        finalColor += vec3(pebbleScatter * 0.08);

        // Cloth Fold Self-Shading (Ambient Occlusion in Creases)
        float foldShadow = mix(0.72, 1.0, NdotL * 0.5 + 0.5);
        finalColor *= foldShadow;

        // Edge silhouette darkening to detach cloth cleanly from backdrop
        float edgeContrast = pow(NdotV, 0.25);
        finalColor *= mix(0.85, 1.0, edgeContrast);

        // Optical Sheerness & Subsurface Translucency
        float baseAlpha = mix(0.45, 0.98, 1.0 - uSheerness);
        float threadAlpha = mix(baseAlpha, 0.15, poreGap * uSheerness);
        float finalAlpha = clamp(threadAlpha + fresnel * 0.4, 0.22, 0.98);

        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: settings.wireframe,
      depthWrite: false, // Prevents z-fighting on sheer double-sided textiles
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    if (isClothPlane) {
      mesh.position.set(0, 0.15, 0);
      mesh.rotation.x = 0.08;
    }
    scene.add(mesh);
    meshRef.current = mesh;

    // Mouse & Touch Tracking
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      targetMouse.x = (clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(clientY / window.innerHeight) * 2 + 1;

      if (onMouseCoordinates) {
        onMouseCoordinates({
          x: Math.round(targetMouse.x * 100) / 100,
          y: Math.round(targetMouse.y * 100) / 100,
        });
      }

      if (isDragging && meshRef.current) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        meshRef.current.rotation.y += deltaX * 0.005 * settingsRef.current.mouseSensitivity;
        meshRef.current.rotation.x += deltaY * 0.005 * settingsRef.current.mouseSensitivity;

        previousMousePosition = { x: clientX, y: clientY };
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      if (uniformsRef.current) {
        uniformsRef.current.uResolution.value.set(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Animation & Physics Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const t = clock.getElapsedTime();
      const currentSettings = settingsRef.current;

      // Update automated continuous loom cycle phase
      if (currentSettings.loomActive !== false) {
        loomPhaseRef.current += delta * (currentSettings.loomSpeed || 1.0) * 2.2;
      }

      // Smooth Camera Macro Zoom Lerping
      if (cameraRef.current) {
        const targetZ = 6.0 / (currentSettings.macroZoom || 1.0);
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
      }

      if (uniformsRef.current) {
        uniformsRef.current.uTime.value = t;
        uniformsRef.current.uLoomPhase.value = loomPhaseRef.current;
        uniformsRef.current.uLoomActive.value = currentSettings.loomActive !== false ? 1.0 : 0.0;
        uniformsRef.current.uLoomSpeed.value = currentSettings.loomSpeed || 1.0;
        uniformsRef.current.uLoomShedDepth.value = currentSettings.loomShedDepth || 1.0;
        uniformsRef.current.uThreadContrast.value = currentSettings.threadContrast || 1.0;
        uniformsRef.current.uDisplacementScale.value = currentSettings.displacementScale;
        uniformsRef.current.uWaveSpeed.value = currentSettings.waveSpeed;
        uniformsRef.current.uWeaveDensity.value = currentSettings.weaveDensity || 90.0;
        uniformsRef.current.uFabricWeave.value = getWeaveModeIndex(currentSettings.fabricWeave || 'plainWeave');
        uniformsRef.current.uSheerness.value = currentSettings.sheerness ?? 0.3;
        uniformsRef.current.uLuster.value = currentSettings.luster ?? 1.2;
        uniformsRef.current.uRoughness.value = currentSettings.roughness ?? 0.2;
        uniformsRef.current.uMacroZoom.value = currentSettings.macroZoom ?? 1.0;

        const currentTheme = BACKDROP_THEMES[currentSettings.backdropTheme] || BACKDROP_THEMES.studioDark;
        uniformsRef.current.uIsDarkBackdrop.value = currentTheme.isDark ? 1.0 : 0.0;

        // Smooth mouse lerp
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.07;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.07;
        uniformsRef.current.uMouse.value.copy(currentMouse);
      }

      // Gentle natural cloth breeze sway
      if (meshRef.current && !isDragging) {
        if (currentSettings.geometry === 'silkDrape' || currentSettings.geometry === 'tactileSwatch') {
          meshRef.current.rotation.y = Math.sin(t * 0.35) * 0.10;
          meshRef.current.rotation.x = Math.cos(t * 0.25) * 0.05;
        } else {
          meshRef.current.rotation.y += 0.003 * currentSettings.waveSpeed;
          meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.16;
        }
      }

      renderer.render(scene, camera);

      // FPS Calculation
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        if (onFpsUpdate) {
          onFpsUpdate(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        }
        frameCount = 0;
        lastFpsTime = now;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Update uniforms when settings change
  useEffect(() => {
    if (!uniformsRef.current) return;
    const colorConfig = COLORWAY_PRESETS[settings.colorway] || COLORWAY_PRESETS.opal;
    const currentTheme = BACKDROP_THEMES[settings.backdropTheme] || BACKDROP_THEMES.studioDark;

    uniformsRef.current.uCream.value.set(...colorConfig.cream);
    uniformsRef.current.uColor1.value.set(...colorConfig.color1);
    uniformsRef.current.uColor2.value.set(...colorConfig.color2);
    uniformsRef.current.uColor3.value.set(...colorConfig.color3);
    uniformsRef.current.uFresnelPower.value = colorConfig.fresnelPower;
    uniformsRef.current.uSpecular.value = colorConfig.specular;
    uniformsRef.current.uWeaveDensity.value = settings.weaveDensity || 90.0;
    uniformsRef.current.uFabricWeave.value = getWeaveModeIndex(settings.fabricWeave || 'plainWeave');
    uniformsRef.current.uSheerness.value = settings.sheerness ?? 0.3;
    uniformsRef.current.uLuster.value = settings.luster ?? 1.2;
    uniformsRef.current.uRoughness.value = settings.roughness ?? 0.2;
    uniformsRef.current.uMacroZoom.value = settings.macroZoom ?? 1.0;
    uniformsRef.current.uLoomActive.value = settings.loomActive !== false ? 1.0 : 0.0;
    uniformsRef.current.uLoomSpeed.value = settings.loomSpeed || 1.0;
    uniformsRef.current.uLoomShedDepth.value = settings.loomShedDepth || 1.0;
    uniformsRef.current.uThreadContrast.value = settings.threadContrast || 1.0;
    uniformsRef.current.uIsDarkBackdrop.value = currentTheme.isDark ? 1.0 : 0.0;

    if (rendererRef.current) {
      rendererRef.current.setClearColor(currentTheme.threeClearColor, 0);
    }

    if (materialRef.current) {
      materialRef.current.wireframe = settings.wireframe;
    }
  }, [
    settings.colorway,
    settings.wireframe,
    settings.fabricWeave,
    settings.weaveDensity,
    settings.sheerness,
    settings.luster,
    settings.roughness,
    settings.macroZoom,
    settings.loomActive,
    settings.loomSpeed,
    settings.loomShedDepth,
    settings.threadContrast,
    settings.backdropTheme,
  ]);

  // Update geometry when geometry setting changes
  useEffect(() => {
    if (!meshRef.current || !uniformsRef.current) return;
    const aspect = window.innerWidth / window.innerHeight;
    const { geometry: newGeo, isClothPlane } = createGeometry(settings.geometry, aspect);
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = newGeo;
    uniformsRef.current.uIsClothPlane.value = isClothPlane ? 1.0 : 0.0;

    if (isClothPlane) {
      meshRef.current.position.set(0, 0.15, 0);
      meshRef.current.rotation.set(0.08, 0, 0);
    } else {
      meshRef.current.position.set(0, 0, 0);
    }
  }, [settings.geometry]);

  return (
    <canvas
      id="webgl-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-1 block cursor-grab active:cursor-grabbing"
    />
  );
};
