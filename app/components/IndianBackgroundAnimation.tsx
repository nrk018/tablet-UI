'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function IndianBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particles inspired by Indian mandala patterns
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = [
      'rgba(99, 102, 241, 0.4)',  // Indian blue
      'rgba(139, 92, 246, 0.4)',  // Purple
      'rgba(236, 72, 153, 0.4)',  // Pink
      'rgba(255, 217, 0, 0.3)',    // Gold
    ];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrame: number;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('0.4', String(particle.opacity));
        ctx.fill();

        // Draw connections (mandala-like patterns)
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color.replace('0.4', String(0.1 * (1 - distance / 150)));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed inset-0 indian-background opacity-40" />
      
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-30"
      />
      
      {/* Mandala-inspired decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              background: `radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`,
              borderRadius: '50%',
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </>
  );
}

