import React, { useState, useEffect, useRef } from 'react';
import { liquidMetalFragmentShader, ShaderMount } from "https://esm.sh/@paper-design/shaders";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef(null);
  const shaderRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any previous shader mount if it exists
    if (shaderRef.current) {
        // ShaderMount doesn't seem to have a clear destroy in the snippet, 
        // but we can clear the container
        containerRef.current.innerHTML = '';
    }

    try {
        shaderRef.current = new ShaderMount(
            containerRef.current,
            liquidMetalFragmentShader,
            {
                u_repetition: 1.5,
                u_softness: 0.5,
                u_shiftRed: 0.3,
                u_shiftBlue: 0.3,
                u_distortion: 0,
                u_contour: 0,
                u_angle: 100,
                u_scale: 1.5,
                u_shape: 1,
                u_offsetX: 0.1,
                u_offsetY: -0.1
            },
            undefined,
            0.6
        );
    } catch (e) {
        console.error("Shader failed to load:", e);
    }

    // Load theme from localStorage or system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setIsDarkMode(false);
        document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="theme-toggle-wrapper">
      <div 
        id="liquid-metal" 
        ref={containerRef} 
        onClick={toggleTheme}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div className="outline">
          <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            {isDarkMode ? (
                /* Moon Icon */
                <path d="M512 128a384 384 0 0 0-384 384 384 384 0 0 0 384 384 381.184 381.184 0 0 0 252.16-96 32 32 0 1 0-41.6-48.64A317.184 317.184 0 0 1 512 832a320 320 0 1 1 0-640 317.184 317.184 0 0 1 156.416 41.6 32 32 0 1 0-32 55.424A381.184 381.184 0 0 0 512 128z"></path>
            ) : (
                /* Sun Icon */
                <path d="M512 704a192 192 0 1 1 192-192 192 192 0 0 1-192 192z m0-448a32 32 0 0 0 32-32V160a32 32 0 0 0-64 0v64a32 32 0 0 0 32 32z m0 512a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0v-64a32 32 0 0 0-32-32z m256-256a32 32 0 0 0 32-32h64a32 32 0 0 0 0-64h-64a32 32 0 0 0-32 32 32 32 0 0 0 0 32zM160 544h64a32 32 0 0 0 0-64h-64a32 32 0 0 0 0 64z m574.08-285.44l45.248-45.248a32 32 0 1 0-45.248-45.248l-45.248 45.312a32 32 0 1 0 45.248 45.184zM289.92 734.08l-45.248 45.248a32 32 0 1 0 45.248 45.248l45.248-45.312a32 32 0 1 0-45.248-45.184z m0-444.16a32 32 0 0 0 45.248-45.248l-45.248-45.248a32 32 0 1 0-45.248 45.248l45.248 45.248z m444.16 444.16a32 32 0 0 0-45.248 45.248l45.248 45.248a32 32 0 1 0 45.248-45.248l-45.248-45.248z"></path>
            )}
          </svg>
        </div>
      </div>
      
      <style>{`
        .theme-toggle-wrapper {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 2000;
        }

        #liquid-metal {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        #liquid-metal:hover {
          transform: scale(1.1);
        }

        #liquid-metal::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          background: linear-gradient(#444, #000);
          border-radius: 50%;
          box-shadow: inset 0 0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.3);
          z-index: 0;
        }

        .outline {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .outline::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: conic-gradient(from 180deg, blue, purple, red, purple, blue);
          filter: grayscale(1);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all 0.3s ease;
        }

        #liquid-metal:hover .outline::before {
          filter: grayscale(0);
        }

        .outline .svg-icon {
          width: 20px;
          fill: #fff;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
