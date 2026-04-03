import React, { useEffect, useRef } from 'react';

export default function LiquidHeroBackground() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initBackground = async () => {
      try {
        // Dynamic import from CDN
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js');
        const LiquidBackground = module.default;

        // Initialize with ref
        if (canvasRef.current) {
            appRef.current = LiquidBackground(canvasRef.current);
            
            // Apply user settings
            appRef.current.loadImage('https://assets.codepen.io/33787/liquid.webp');
            appRef.current.liquidPlane.material.metalness = 0.75;
            appRef.current.liquidPlane.material.roughness = 0.25;
            appRef.current.liquidPlane.uniforms.displacementScale.value = 5;
            appRef.current.setRain(false);
        }
      } catch (error) {
        console.error('Failed to load LiquidBackground:', error);
      }
    };

    initBackground();

    return () => {
      // Cleanup if the library provides a destroy method, 
      // though liquid1.min.js usually doesn't expose a clear one in snippets
      if (appRef.current && appRef.current.destroy) {
        appRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas 
      id="canvas-liquid-bg" 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -99, 
        pointerEvents: 'none',
        background: '#000'
      }} 
    />
  );
}
