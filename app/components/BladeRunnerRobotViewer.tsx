'use client';

import { Suspense, useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Text, Environment, PerspectiveCamera, Float, Sparkles, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
// Postprocessing temporarily disabled pending runtime error investigation
// import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Rain particles
function Rain() {
  const rainRef = useRef<THREE.Points>(null);
  const rainCount = 300;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 20;
      arr[i + 1] = Math.random() * 10 + 5;
      arr[i + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!rainRef.current) return;
    const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= delta * 3;
      if (positions[i] < -5) {
        positions[i] = 10;
        positions[i - 1] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={rainRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        transparent
        opacity={0.3}
        color="#8bd3e6"
      />
    </points>
  );
}

// Volumetric fog
function Fog() {
  return (
    <fog attach="fog" args={['#1a1a2e', 5, 15]} />
  );
}

// Elegant robot model with feminine lines
function RobotModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { components } = useStore();
  const damagedComponents = components.filter((c) => c.damaged);
  
  // Subtle breathing animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.scale.y = 1 + Math.sin(time * 0.5) * 0.01;
    meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
  });

  // Materials
  const bodyMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: '#1c2140',
      metalness: 1.0,
      roughness: 0.15,
      emissive: '#0a1f33',
      emissiveIntensity: 0.08,
    })
  ), []);

  const accentMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: '#00e5c3',
      metalness: 0.85,
      roughness: 0.25,
      emissive: '#00e5c3',
      emissiveIntensity: 0.35,
    })
  ), []);

  const jointMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: '#9aa3b2',
      metalness: 0.7,
      roughness: 0.4,
    })
  ), []);

  const damagedMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: '#ff3366',
      metalness: 0.7,
      roughness: 0.3,
      emissive: '#ff3366',
      emissiveIntensity: 0.6,
    })
  ), []);

  return (
    <group ref={meshRef}>
      {/* Main body */}
      <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.24}>
        {/* Chest */}
        <RoundedBox args={[1.6, 2.2, 1]} radius={0.2} smoothness={8} position={[0, 0.2, 0]} material={bodyMaterial} />

        {/* Spine glow */}
        <mesh position={[0, 0.25, 0.52]} material={accentMaterial}>
          <boxGeometry args={[0.12, 1.4, 0.06]} />
        </mesh>
        <mesh position={[0, -0.8, 0.45]} material={accentMaterial}>
          <boxGeometry args={[0.08, 0.9, 0.04]} />
        </mesh>

        {/* Head */}
        <RoundedBox args={[1.0, 0.9, 0.9]} radius={0.18} smoothness={8} position={[0, 1.6, 0]} material={bodyMaterial} />
        {/* Visor (translucent) */}
        <mesh position={[0, 1.62, 0.46]}>
          <boxGeometry args={[0.9, 0.36, 0.04]} />
          <MeshTransmissionMaterial samples={8} thickness={0.2} anisotropy={0.3} chromaticAberration={0.08} transmission={1} ior={1.2} roughness={0.2} color="#00e5c3" />
        </mesh>

        {/* Shoulders */}
        <mesh position={[-0.95, 0.9, 0]} material={jointMaterial}>
          <sphereGeometry args={[0.28, 24, 24]} />
        </mesh>
        <mesh position={[0.95, 0.9, 0]} material={jointMaterial}>
          <sphereGeometry args={[0.28, 24, 24]} />
        </mesh>

        {/* Arms */}
        <group position={[-1.1, 0.5, 0]} rotation={[0, 0, -0.15]}>
          <mesh material={bodyMaterial}>
            <cylinderGeometry args={[0.16, 0.16, 0.9, 16]} />
          </mesh>
          <mesh position={[0, -0.6, 0]} material={jointMaterial}>
            <sphereGeometry args={[0.18, 20, 20]} />
          </mesh>
          <mesh position={[0, -1.1, 0]} material={bodyMaterial}>
            <cylinderGeometry args={[0.14, 0.14, 1.0, 16]} />
          </mesh>
          {damagedComponents.find(c => c.id === 'left-arm') && (
            <pointLight position={[0, -0.6, 0]} color="#ff3366" intensity={1} distance={2} />
          )}
        </group>

        <group position={[1.1, 0.5, 0]} rotation={[0, 0, 0.15]}>
          <mesh material={bodyMaterial}>
            <cylinderGeometry args={[0.16, 0.16, 0.9, 16]} />
          </mesh>
          <mesh position={[0, -0.6, 0]} material={jointMaterial}>
            <sphereGeometry args={[0.18, 20, 20]} />
          </mesh>
          <mesh position={[0, -1.1, 0]} material={bodyMaterial}>
            <cylinderGeometry args={[0.14, 0.14, 1.0, 16]} />
          </mesh>
        </group>

        {/* Hips */}
        <RoundedBox args={[0.9, 0.5, 0.9]} radius={0.12} smoothness={8} position={[0, -0.9, 0]} material={bodyMaterial} />

        {/* Legs */}
        <group position={[-0.4, -1.2, 0]}>
          <mesh material={jointMaterial} position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 20, 20]} />
          </mesh>
          <mesh material={bodyMaterial} position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 1.2, 16]} />
          </mesh>
          <mesh material={jointMaterial} position={[0, -1.35, 0]}>
            <sphereGeometry args={[0.18, 20, 20]} />
          </mesh>
          <mesh material={bodyMaterial} position={[0, -1.9, 0.05]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.32, 0.14, 0.6]} />
          </mesh>
        </group>
        <group position={[0.4, -1.2, 0]}>
          <mesh material={jointMaterial} position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 20, 20]} />
          </mesh>
          <mesh material={bodyMaterial} position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 1.2, 16]} />
          </mesh>
          <mesh material={jointMaterial} position={[0, -1.35, 0]}>
            <sphereGeometry args={[0.18, 20, 20]} />
          </mesh>
          <mesh material={bodyMaterial} position={[0, -1.9, 0.05]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.32, 0.14, 0.6]} />
          </mesh>
        </group>

        {/* Core indicator (shows only when damaged) */}
        {damagedComponents.find(c => c.id === 'core') && (
          <>
            <pointLight position={[0, 0, 0]} color="#ff3366" intensity={1.8} distance={3} />
            <mesh position={[0, 0, 0.4]} material={damagedMaterial}>
              <sphereGeometry args={[0.32, 20, 20]} />
            </mesh>
          </>
        )}
      </Float>
    </group>
  );
}

// Edge status bars
function StatusBar({ value, max = 100, position, label, color }: {
  value: number;
  max?: number;
  position: 'left' | 'right' | 'top' | 'bottom';
  label: string;
  color: string;
}) {
  const percentage = (value / max) * 100;
  const isCritical = percentage < 20;
  const amberColor = '#ffaa00';
  
  const positions = {
    left: { x: -4.5, y: 0, rotation: Math.PI / 2 },
    right: { x: 4.5, y: 0, rotation: -Math.PI / 2 },
    top: { x: 0, y: 3.5, rotation: 0 },
    bottom: { x: 0, y: -3.5, rotation: 0 },
  };
  
  const pos = positions[position];
  const barColor = isCritical ? amberColor : color;

  return (
    <group position={[pos.x, pos.y, 0]} rotation={[0, 0, pos.rotation]}>
      {/* Label */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.15}
        color={barColor}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      
      {/* Bar background */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3, 0.1, 0.01]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.8} />
      </mesh>
      
      {/* Bar fill */}
      <mesh position={[-1.5 + (percentage / 100) * 1.5, 0.4, 0.02]}>
        <boxGeometry args={[(percentage / 100) * 3, 0.08, 0.02]} />
        <meshStandardMaterial
          color={barColor}
          emissive={barColor}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Glow effect for critical */}
      {isCritical && (
        <pointLight position={[0, 0.4, 0]} color={amberColor} intensity={0.5} distance={2} />
      )}
    </group>
  );
}

// Holographic UI text
function HolographicText({ children, position, size = 0.2, color = '#00d4aa' }: {
  children: string;
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  // Static text to avoid per-frame React state updates

  return (
    <Text
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {children}
    </Text>
  );
}

function SceneContent() {
  const { robotStats } = useStore();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Auto-center camera with slow drift
  useFrame((state) => {
    if (!cameraRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Slow, dreamlike camera movement
    cameraRef.current.position.x = Math.sin(time * 0.1) * 0.5;
    cameraRef.current.position.y = Math.cos(time * 0.15) * 0.3 + 0.5;
    cameraRef.current.position.z = 8 + Math.sin(time * 0.05) * 0.3;
    cameraRef.current.lookAt(0, 0.5, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.5, 8]} fov={50} />
      
      {/* Environment and lighting */}
      <Environment preset="city" environmentIntensity={0.25} />
      <ambientLight intensity={0.25} color="#888888" />
      <directionalLight position={[6, 7, 5]} intensity={0.5} color="#8bd3e6" />
      <directionalLight position={[-6, 4, 5]} intensity={0.25} color="#ff9933" />
      <pointLight position={[0, 3.2, 5]} intensity={0.35} color="#00d4aa" />
      
      {/* Volumetric fog */}
      <Fog />
      
      {/* Rain and sparkles */}
      <Rain />
      <Sparkles count={60} scale={[8, 4, 2]} size={1.5} speed={0.15} opacity={0.15} color="#00e5c3" position={[0, 1.2, -1.5]} />
      
      {/* Robot model */}
      <Suspense fallback={null}>
        <RobotModel />
      </Suspense>
      
      {/* Edge status bars */}
      <StatusBar
        value={robotStats.battery}
        position="left"
        label="BATTERY"
        color="#00d4aa"
      />
      <StatusBar
        value={robotStats.armor}
        position="right"
        label="ARMOR"
        color="#00d4aa"
      />
      <StatusBar
        value={robotStats.weaponHeat}
        position="top"
        label="HEAT"
        color="#00d4aa"
      />
      <StatusBar
        value={robotStats.stability}
        position="bottom"
        label="STABILITY"
        color="#00d4aa"
      />
      
      {/* Ambient UI whispers */}
      <HolographicText position={[-3, 2.5, -2]} size={0.12} color="#8bd3e6">
        Signal uncertainty...
      </HolographicText>
      <HolographicText position={[3, -2.5, -2]} size={0.12} color="#ffaa00">
        Memory chrono-shifts detected
      </HolographicText>
      
      {/* Post-processing (disabled for now) */}

      {/* Custom cursor will be handled via CSS */}
    </>
  );
}

export default function BladeRunnerRobotViewer() {
  const { robotStats } = useStore();
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] overflow-hidden" style={{ cursor: 'none' }}>
      {/* Custom cursor - minimal glowing needle */}
      <div 
        ref={cursorRef}
        className="absolute pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-1 h-8 bg-[#00d4aa] opacity-50 blur-sm" style={{
          boxShadow: '0 0 10px #00d4aa'
        }} />
      </div>
      
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
        dpr={1}
        camera={{ position: [0, 0.5, 8], fov: 50 }}
        className="bg-black"
      >
        <SceneContent />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={12}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Boost Mode Overlay */}
      {robotStats.battery <= 20 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 right-4 px-4 py-2 border border-[#00d4aa] bg-[#00d4aa]/10 backdrop-blur-sm"
        >
          <div className="text-[#00d4aa] text-xs font-mono uppercase tracking-wider">
            Boost Mode Available
          </div>
        </motion.div>
      )}
      
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

