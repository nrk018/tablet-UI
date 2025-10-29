'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { ShaderAnimation } from '@/components/ui/shader-animation';

export default function SplineArmViewer() {
  const { armInfo, setSelectedArm, setArmState } = useStore();
  const [spline, setSpline] = useState<any>(null);
  const [armObject, setArmObject] = useState<any>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (armInfo.health < 30) {
      const interval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [armInfo.health]);

  useEffect(() => {
    if (typeof window === 'undefined' || !splineRef.current) return;

    let splineApp: any;
    let cleanup: () => void;

    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        
        // Create a canvas element for Spline
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        splineRef.current!.appendChild(canvas);
        
        splineApp = new Application(canvas);
        await splineApp.load('https://prod.spline.design/d4f1ffbe-49f3-4d06-892d-0c5941da4337/scene.splinecode');
        
        setIsLoading(false);
        setSpline(splineApp);
        
        // Find the RobotArm object by name
        const findArm = () => {
          try {
            const arm = splineApp.findObjectByName?.('RobotArm') || 
                        splineApp.scene?.children?.find((obj: any) => obj.name === 'RobotArm') ||
                        splineApp.objects?.find((obj: any) => obj.name === 'RobotArm');
            
            if (arm) {
              setArmObject(arm);
              updateArmMaterial(arm);
              
              // Add hover listeners
              splineApp.addEventListener('mouseHover', (e: any) => {
                if (e.target?.name === 'RobotArm') {
                  setIsHovering(true);
                  if (containerRef.current) {
                    containerRef.current.style.cursor = 'pointer';
                  }
                } else {
                  setIsHovering(false);
                  if (containerRef.current) {
                    containerRef.current.style.cursor = 'grab';
                  }
                }
              });
              
              // Add click listener
              splineApp.addEventListener('mouseDown', (e: any) => {
                if (e.target?.name === 'RobotArm') {
                  setSelectedArm(true);
                }
              });
            } else {
              setTimeout(findArm, 200);
            }
          } catch (error) {
            console.error('Error finding RobotArm:', error);
            setTimeout(findArm, 200);
          }
        };
        
        setTimeout(findArm, 500);
        
        cleanup = () => {
          if (splineApp) {
            splineApp.dispose?.();
          }
          if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        };
      } catch (error) {
        console.error('Failed to load Spline:', error);
        setIsLoading(false);
      }
    };

    loadSpline();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const updateArmMaterial = (arm: any) => {
    if (!arm) return;

    // Try multiple ways to access material
    const material = arm.material || arm.materials?.[0];
    if (!material) {
      console.warn('RobotArm material not found');
      return;
    }

    switch (armInfo.state) {
      case 'normal':
        if (material.color) {
          if (typeof material.color.setRGB === 'function') {
            material.color.setRGB(0.5, 0.5, 0.5);
          } else {
            material.color = { r: 0.5, g: 0.5, b: 0.5 };
          }
        }
        if (material.emissive) {
          if (typeof material.emissive.setRGB === 'function') {
            material.emissive.setRGB(0, 0, 0);
          } else {
            material.emissive = { r: 0, g: 0, b: 0 };
          }
        }
        if (material.emissiveIntensity !== undefined) material.emissiveIntensity = 0;
        break;
      case 'damaged':
        if (material.color) {
          if (typeof material.color.setRGB === 'function') {
            material.color.setRGB(1, 0, 0);
          } else {
            material.color = { r: 1, g: 0, b: 0 };
          }
        }
        if (material.emissive) {
          if (typeof material.emissive.setRGB === 'function') {
            material.emissive.setRGB(1, 0, 0);
          } else {
            material.emissive = { r: 1, g: 0, b: 0 };
          }
        }
        if (material.emissiveIntensity !== undefined) material.emissiveIntensity = 0.5;
        break;
      case 'repaired':
        if (material.color) {
          if (typeof material.color.setRGB === 'function') {
            material.color.setRGB(0, 1, 0);
          } else {
            material.color = { r: 0, g: 1, b: 0 };
          }
        }
        if (material.emissive) {
          if (typeof material.emissive.setRGB === 'function') {
            material.emissive.setRGB(0, 1, 0);
          } else {
            material.emissive = { r: 0, g: 1, b: 0 };
          }
        }
        if (material.emissiveIntensity !== undefined) material.emissiveIntensity = 0.3;
        break;
    }
  };

  useEffect(() => {
    if (armObject) {
      updateArmMaterial(armObject);
      
      // Flicker effect for damaged state
      if (armInfo.state === 'damaged') {
        const material = armObject.material || armObject.materials?.[0];
        if (material) {
          const interval = setInterval(() => {
            if (material.emissiveIntensity !== undefined) {
              material.emissiveIntensity = material.emissiveIntensity === 0.5 ? 0.8 : 0.5;
            }
          }, 500);
          return () => clearInterval(interval);
        }
      }
    }
  }, [armObject, armInfo.state]);

  return (
    <div className="relative w-full h-full">
      {isLoading ? (
        <div className="w-full h-full relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <ShaderAnimation />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-white/80 font-mono text-sm mb-2">Loading 3D Model</p>
              <p className="text-white/40 font-mono text-xs">Initializing Robot Arm...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            ref={containerRef}
            className="w-full h-full"
            style={{ cursor: isHovering ? 'pointer' : 'grab' }}
          >
            <div ref={splineRef} className="w-full h-full" />
          </div>

          {/* Glitch overlay when health < 30% */}
          {glitchActive && armInfo.health < 30 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              animate={{
                opacity: [0, 0.3, 0],
                filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 0, 0, 0.1) 2px,
                    rgba(255, 0, 0, 0.1) 4px
                  )
                `,
              }}
            />
          )}

          {/* Hover indicator */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20"
            >
              <p className="text-xs text-white font-mono">Click to inspect</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
