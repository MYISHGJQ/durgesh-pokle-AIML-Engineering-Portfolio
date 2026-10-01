import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceTier } from '../../hooks/usePerformanceTier';
import { useStore } from '../../store';

// This scene surrounds the AI core. As the camera moves forward (on scroll),
// it enters this massive neural network.

export default function NeuralScene() {
  const group = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const { config } = usePerformanceTier();
  
  const particleCount = config.particleCount * 3; // Wider distribution

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color('#00d4ff');
    const color2 = new THREE.Color('#7c3aed');

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a large tunnel/cloud starting behind the AI Core
      const theta = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 30; // Between radius 5 and 35
      const z = -5 - Math.random() * 100; // Deep into the Z axis (-5 to -105)
      
      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(theta);
      pos[i * 3 + 2] = z;
      
      const mixedColor = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    
    return [pos, col];
  }, [particleCount]);

  useFrame((state) => {
    if (!group.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Slowly rotate the entire network
    group.current.rotation.z = time * 0.02;
    
    // The Neural Network becomes fully visible as scroll progresses
    group.current.position.z = scrollProgress * 25; 
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          vertexColors 
          transparent 
          opacity={0.6}
          sizeAttenuation 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* We can add line segments here for connections in a future phase if performance allows */}
    </group>
  );
}
