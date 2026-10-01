import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { usePerformanceTier } from '../hooks/usePerformanceTier';
import AICore from './components/AICore';
import NeuralScene from '../components/NeuralNetwork/NeuralScene';
import ProjectUniverse3D from './components/ProjectUniverse3D';

// Adaptive canvas config
function AdaptiveConfig() {
  return (
    <>
      <Preload all />
    </>
  );
}

export default function SceneContainer() {
  const { tier, config } = usePerformanceTier();

  return (
    <div className="fixed inset-0 z-0 w-full h-screen bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, config.maxDpr]}
        gl={{
          antialias: tier !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        <color attach="background" args={['#02040a']} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d4ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#06b6d4" distance={20} />

        {/* Global fog for depth */}
        <fog attach="fog" args={['#02040a', 10, 50]} />

        {/* Continuous 3D objects driven by window scroll progress */}
        <AICore />
        <NeuralScene />
        <ProjectUniverse3D />

        <AdaptiveConfig />
      </Canvas>
    </div>
  );
}

