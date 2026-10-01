import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../../data/projects';
import { useStore } from '../../store';

// Helper component for Factory Visual (AI Digital Twin)
function FactoryVisual() {
  return (
    <group>
      {/* Abstract industrial machine representation */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} wireframe />
      </mesh>
      {/* Live data streams floating up */}
      <points>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[new Float32Array(Array.from({ length: 300 }).flatMap(() => [
              (Math.random() - 0.5) * 3,
              Math.random() * 4 - 1,
              (Math.random() - 0.5) * 3
            ])), 3]} 
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.6} />
      </points>
      {/* Prediction ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Helper component for Weather Visual
function WeatherVisual() {
  return (
    <group>
      {/* Atmospheric particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[new Float32Array(Array.from({ length: 500 }).flatMap(() => {
              const r = 2.5 * Math.cbrt(Math.random());
              const theta = Math.random() * 2 * Math.PI;
              const phi = Math.acos(2 * Math.random() - 1);
              return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)];
            })), 3]} 
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#3b82f6" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

// Helper component for Mechanical Visual
function MechanicalVisual() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * 0.2;
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#f59e0b" wireframe />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#fcd34d" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Helper component for Creative Visual
function CreativeVisual() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
      });
    }
  });
  return (
    <group ref={group}>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[(i - 4.5) * 0.4, 0, 0]}>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.6 - Math.abs(i - 4.5) * 0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Helper component for Management Visual
function ManagementVisual() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      {/* Orbiting nodes */}
      <group>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[2 * Math.cos(i * Math.PI / 2), 0, 2 * Math.sin(i * Math.PI / 2)]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ProjectNode({ project, index }: { project: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  // Arrange nodes in a Z-path tunnel
  const zPosition = - (index + 1) * 30; // Spaced 30 units apart
  const xPosition = index % 2 === 0 ? 5 : -5; // Staggered left/right

  useFrame((state) => {
    if (group.current) {
      // Subtle floating
      group.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
    }
  });

  return (
    <group ref={group} position={[xPosition, 0, zPosition]}>
      {/* Project Visual */}
      <group scale={project.featured ? 1.5 : 1}>
        {project.visualStyle === 'factory' && <FactoryVisual />}
        {project.visualStyle === 'weather' && <WeatherVisual />}
        {project.visualStyle === 'mechanical' && <MechanicalVisual />}
        {project.visualStyle === 'creative' && <CreativeVisual />}
        {project.visualStyle === 'management' && <ManagementVisual />}
      </group>

      {/* 3D Text Title */}
      <Text
        position={[0, -3.5, 0]}
        fontSize={1}
        color={project.accentColor}
        anchorX="center"
        anchorY="middle"
      >
        {project.title.toUpperCase()}
      </Text>
    </group>
  );
}

export default function ProjectUniverse3D() {
  const group = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame(() => {
    if (!group.current) return;
    
    // Move project universe forward in Z space as user scrolls
    if (scrollProgress > 0.15) {
      const projectProgress = Math.min(1, (scrollProgress - 0.15) / 0.6);
      const maxZ = projects.length * 30 + 30;
      group.current.position.z = projectProgress * maxZ;
    } else {
      group.current.position.z = 0;
    }
  });

  return (
    <group ref={group}>
      {projects.map((project, index) => (
        <ProjectNode key={project.id} project={project} index={index} />
      ))}
    </group>
  );
}
