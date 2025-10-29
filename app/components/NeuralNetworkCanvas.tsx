'use client';

import { useEffect, useState, useRef } from 'react';

export default function NeuralNetworkCanvas() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    
    // Wait for React to fully initialize
    const timer = setTimeout(() => {
      setMounted(true);
      
      // Dynamically import and mount React Three Fiber components
      Promise.all([
        import('@react-three/fiber'),
        import('@react-three/drei'),
        import('three'),
        import('react-dom/client'),
        import('react')
      ]).then(([
        { Canvas, useFrame, extend },
        { shaderMaterial },
        THREE,
        { createRoot },
        React
      ]) => {
        if (!canvasRef.current) return;

        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          #ifdef GL_ES
            precision lowp float;
          #endif
          uniform float iTime;
          uniform vec2 iResolution;
          varying vec2 vUv;
          
          vec4 buf[8];
          
          vec4 sigmoid(vec4 x) { return 1. / (1. + exp(-x)); }
          
          vec4 cppn_fn(vec2 coordinate, float in0, float in1, float in2) {
            buf[6] = vec4(coordinate.x, coordinate.y, 0.3948333106474662 + in0, 0.36 + in1);
            buf[7] = vec4(0.14 + in2, sqrt(coordinate.x * coordinate.x + coordinate.y * coordinate.y), 0., 0.);
            buf[0] = mat4(vec4(6.5404263, -3.6126034, 0.7590882, -1.13613), vec4(2.4582713, 3.1660357, 1.2219609, 0.06276096), vec4(-5.478085, -6.159632, 1.8701609, -4.7742867), vec4(6.039214, -5.542865, -0.90925294, 3.251348)) * buf[6]
              + mat4(vec4(0.8473259, -5.722911, 3.975766, 1.6522468), vec4(-0.24321538, 0.5839259, -1.7661959, -5.350116), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0)) * buf[7]
              + vec4(0.21808943, 1.1243913, -1.7969975, 5.0294676);
            buf[1] = mat4(vec4(-3.3522482, -6.0612736, 0.55641043, -4.4719114), vec4(0.8631464, 1.7432913, 5.643898, 1.6106541), vec4(2.4941394, -3.5012043, 1.7184316, 6.357333), vec4(3.310376, 8.209261, 1.1355612, -1.165539)) * buf[6]
              + mat4(vec4(5.24046, -13.034365, 0.009859298, 15.870829), vec4(2.987511, 3.129433, -0.89023495, -1.6822904), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0)) * buf[7]
              + vec4(-5.9457836, -6.573602, -0.8812491, 1.5436668);
            buf[0] = sigmoid(buf[0]);
            buf[1] = sigmoid(buf[1]);
            buf[2] = mat4(vec4(-15.219568, 8.095543, -2.429353, -1.9381982), vec4(-5.951362, 4.3115187, 2.6393783, 1.274315), vec4(-7.3145227, 6.7297835, 5.2473326, 5.9411426), vec4(5.0796127, 8.979051, -1.7278991, -1.158976)) * buf[6]
              + mat4(vec4(-11.967154, -11.608155, 6.1486754, 11.237008), vec4(2.124141, -6.263192, -1.7050359, -0.7021966), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0)) * buf[7]
              + vec4(-4.17164, -3.2281182, -4.576417, -3.6401186);
            buf[3] = mat4(vec4(3.1832156, -13.738922, 1.879223, 3.233465), vec4(0.64300746, 12.768129, 1.9141049, 0.50990224), vec4(-0.049295485, 4.4807224, 1.4733979, 1.801449), vec4(5.0039253, 13.000481, 3.3991797, -4.5561905)) * buf[6]
              + mat4(vec4(-0.1285731, 7.720628, -3.1425676, 4.742367), vec4(0.6393625, 3.714393, -0.8108378, -0.39174938), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0)) * buf[7]
              + vec4(-1.1811101, -21.621881, 0.7851888, 1.2329718);
            buf[2] = sigmoid(buf[2]);
            buf[3] = sigmoid(buf[3]);
            buf[0] = mat4(vec4(1.6794263, 1.3817469, 2.9625452, 0.0), vec4(-1.8834411, -1.4806935, -3.5924516, 0.0), vec4(-1.3279216, -1.0918057, -2.3124623, 0.0), vec4(0.2662234, 0.23235129, 0.44178495, 0.0)) * buf[0];
            buf[0] = sigmoid(buf[0]);
            return vec4(buf[0].x , buf[0].y , buf[0].z, 1.0);
          }
          
          void main() {
            vec2 uv = vUv * 2.0 - 1.0; uv.y *= -1.0;
            gl_FragColor = cppn_fn(uv, 0.1 * sin(0.3 * iTime), 0.1 * sin(0.69 * iTime), 0.1 * sin(0.44 * iTime));
          }
        `;

        const CPPNShaderMaterial = shaderMaterial(
          { iTime: 0, iResolution: new THREE.Vector2(1, 1) },
          vertexShader,
          fragmentShader
        );

        extend({ CPPNShaderMaterial });

        // Create React root and mount Canvas
        const root = createRoot(canvasRef.current);
        
        // Create ShaderPlane component using React.createElement
        const ShaderPlane = () => {
          const meshRef = useRef<any>(null);
          const materialRef = useRef<any>(null);
          
          useFrame((state: any) => {
            if (!materialRef.current) return;
            materialRef.current.iTime = state.clock.elapsedTime;
            const { width, height } = state.size;
            materialRef.current.iResolution.set(width, height);
          });

          return React.createElement('mesh', { ref: meshRef, position: [0, 0, 0] },
            React.createElement('planeGeometry', { args: [4, 4] }),
            React.createElement('cPPNShaderMaterial', { ref: materialRef, side: THREE.DoubleSide })
          );
        };

        root.render(
          React.createElement(Canvas, {
            camera: { position: [0, 0, 1], fov: 75, near: 0.1, far: 1000 },
            gl: { antialias: true, alpha: false },
            dpr: [1, 2],
            style: { width: '100%', height: '100%' }
          },
            React.createElement(ShaderPlane)
          )
        );
      }).catch((error) => {
        console.error('Failed to load neural network canvas:', error);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />;
  }

  return (
    <div className="fixed inset-0 -z-10 w-full h-full" aria-hidden>
      <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
}
