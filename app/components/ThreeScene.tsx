'use client';

import { Suspense, useState, useEffect } from 'react';

function RobotModel() {
  return (
    <>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[2, 3, 1]} />
        <meshStandardMaterial 
          color="#00ff88" 
          emissive="#00ff88" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Left arm */}
      <mesh position={[-1.5, 1, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Right arm */}
      <mesh position={[1.5, 1, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Left leg */}
      <mesh position={[-0.7, -2, 0]}>
        <boxGeometry args={[0.6, 1.5, 0.6]} />
        <meshStandardMaterial color="#2a2520" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Right leg */}
      <mesh position={[0.7, -2, 0]}>
        <boxGeometry args={[0.6, 1.5, 0.6]} />
        <meshStandardMaterial color="#2a2520" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Damage indicators */}
      <mesh position={[-1.5, 1, 0]} rotation={[0, 0, -0.3]}>
        <pointLight color="#ff0044" intensity={0.5} distance={3} />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <pointLight color="#ff0044" intensity={0.3} distance={2} />
      </mesh>
    </>
  );
}

function SceneContent({ Canvas, OrbitControls }: { Canvas: any; OrbitControls: any }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.6} />
      
      <Suspense fallback={null}>
        <RobotModel />
      </Suspense>
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={15}
      />
    </Canvas>
  );
}

export default function ThreeScene() {
  const [components, setComponents] = useState<{ Canvas: any; OrbitControls: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only load Three.js after component mounts on client
    if (typeof window === 'undefined') return;

    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
    ])
      .then(([r3f, drei]) => {
        setComponents({
          Canvas: r3f.Canvas,
          OrbitControls: drei.OrbitControls,
        });
      })
      .catch((err) => {
        console.error('Failed to load Three.js:', err);
        setError('Failed to load 3D viewer');
      });
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-dust-rose-red">
        <div className="text-center">
          <p className="font-stencil">{error}</p>
          <p className="text-xs mt-2 text-dust-rose-neon-green-dark">Please refresh the page</p>
        </div>
      </div>
    );
  }

  if (!components) {
    return (
      <div className="w-full h-full flex items-center justify-center text-dust-rose-neon-green-dark">
        <div className="text-center">
          <p className="font-stencil animate-pulse">Loading 3D viewer...</p>
        </div>
      </div>
    );
  }

  return <SceneContent Canvas={components.Canvas} OrbitControls={components.OrbitControls} />;
}
