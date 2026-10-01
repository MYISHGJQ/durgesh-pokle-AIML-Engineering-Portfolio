import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceTier } from '../../hooks/usePerformanceTier';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useStore } from '../../store';

// Custom shader for the AI Core particles
const coreVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  
  attribute float size;
  attribute vec3 randomOffset;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = color;
    
    // Base position
    vec3 pos = position;
    
    // Gentle breathing effect based on time
    float breath = sin(uTime * 0.5 + randomOffset.x) * 0.1;
    pos += normal * breath;
    
    // Core expansion based on scroll (transition to neural network)
    // As we scroll (uScrollProgress 0 -> 1), the core explodes outwards
    float expansion = pow(uScrollProgress * 2.0, 3.0);
    pos += normalize(pos) * expansion * (randomOffset.y * 50.0);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = size * (300.0 / -mvPosition.z);
    
    // Alpha fades out as it expands too much
    vAlpha = 1.0 - smoothstep(0.5, 1.0, uScrollProgress * 1.5);
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const coreFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Soft circular particle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Glow effect
    float glow = exp(-dist * 3.0);
    
    gl_FragColor = vec4(vColor * glow, vAlpha * glow);
  }
`;

export default function AICore() {
  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const mouse = useMousePosition();
  const { config } = usePerformanceTier();
  const bootComplete = useStore((state) => state.bootComplete);
  
  const particleCount = config.particleCount * 2; // AI core is dense

  // Generate particles on a sphere surface with some noise
  const [positions, colors, sizes, randoms] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);
    const rnd = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color('#00d4ff'); // Cyan
    const color2 = new THREE.Color('#7c3aed'); // Violet
    const color3 = new THREE.Color('#ffffff'); // White hot

    for (let i = 0; i < particleCount; i++) {
      // Golden ratio spiral on a sphere
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const r = 3 + (Math.random() * 0.5 - 0.25); // Radius ~3 with noise
      
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Color mixing based on position
      const mixedColor = color1.clone().lerp(color2, Math.random());
      if (Math.random() > 0.9) mixedColor.lerp(color3, 0.8); // 10% white hot nodes
      
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
      
      siz[i] = Math.random() * 2.0 + 0.5;
      
      rnd[i * 3] = Math.random() * Math.PI * 2;
      rnd[i * 3 + 1] = Math.random();
      rnd[i * 3 + 2] = Math.random();
    }
    return [pos, col, siz, rnd];
  }, [particleCount]);

  useFrame((state) => {
    if (!group.current || !materialRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Only animate if boot is complete
    if (bootComplete) {
      // 1. Mouse interaction (parallax and rotation)
      const targetRotationX = mouse.normalizedY * 0.2;
      const targetRotationY = mouse.normalizedX * 0.2;
      
      group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.05;
      group.current.rotation.y += (targetRotationY + time * 0.1 - group.current.rotation.y) * 0.05;
      
      // Update shader uniform for scroll-based explosion/transition
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
      materialRef.current.uniforms.uTime.value = time;
      
      // Move the camera INTO the core as scroll progresses
      const targetZ = 15 - (scrollProgress * 40); 
      state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
      
      // Parallax the camera based on mouse slightly
      state.camera.position.x += (mouse.normalizedX * 2 - state.camera.position.x) * 0.05;
      state.camera.position.y += (mouse.normalizedY * 2 - state.camera.position.y) * 0.05;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-randomOffset" args={[randoms, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uScrollProgress: { value: 0 }
          }}
        />
      </points>
      
      {/* Central energy field glow */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
